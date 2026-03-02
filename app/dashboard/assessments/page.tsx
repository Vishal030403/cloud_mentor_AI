'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useEffect, useMemo, useState } from 'react'
import { mockTests, type MockQuestion, type MockTest } from '@/data/mockTests'

type SelectedAnswers = Record<string, number[]>
type SectorStats = Record<string, { correct: number; total: number }>
type MockAttempt = {
  score: number
  totalQuestions: number
  percentage: number
  attemptedAt: string
  sectorStats: SectorStats
}
type MockAttemptsStore = Record<string, MockAttempt[]>
type MockAiEvaluation = {
  readinessPercentage: number
  weakSectors: string[]
  analysis: string
  recommendations: string[]
}
const MOCK_ATTEMPTS_STORAGE_KEY = 'cloudmentor-mock-attempts'

function areArraysEqual(a: number[], b: number[]) {
  if (a.length !== b.length) return false
  for (let i = 0; i < a.length; i += 1) {
    if (a[i] !== b[i]) return false
  }
  return true
}

function isQuestionCorrect(question: MockQuestion, selected: number[]) {
  if (Array.isArray(question.multipleCorrect) && question.multipleCorrect.length > 0) {
    const expected = [...question.multipleCorrect].sort((x, y) => x - y)
    const received = [...selected].sort((x, y) => x - y)
    return areArraysEqual(expected, received)
  }
  if (typeof question.correctIndex === 'number') {
    return selected.length === 1 && selected[0] === question.correctIndex
  }
  return false
}

function formatDuration(secondsLeft: number) {
  const minutes = Math.floor(secondsLeft / 60)
  const seconds = secondsLeft % 60
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
}

function getSectorFromQuestion(questionText: string) {
  const normalized = questionText.toLowerCase()
  if (normalized.includes('vpc') || normalized.includes('network') || normalized.includes('route')) return 'Networking'
  if (normalized.includes('s3') || normalized.includes('ebs') || normalized.includes('efs') || normalized.includes('storage')) return 'Storage'
  if (normalized.includes('ec2') || normalized.includes('compute') || normalized.includes('autoscaling')) return 'Compute'
  if (normalized.includes('rds') || normalized.includes('aurora') || normalized.includes('dynamo') || normalized.includes('database')) return 'Databases'
  if (normalized.includes('iam') || normalized.includes('security') || normalized.includes('kms') || normalized.includes('waf')) return 'Security'
  if (normalized.includes('lambda') || normalized.includes('serverless') || normalized.includes('sqs') || normalized.includes('sns')) return 'Serverless'
  return 'Architecture'
}

function buildSectorStats(questions: MockQuestion[], selectedAnswers: SelectedAnswers) {
  return questions.reduce<SectorStats>((acc, question) => {
    const sector = getSectorFromQuestion(question.question)
    const selected = selectedAnswers[question.id] ?? []
    const correct = isQuestionCorrect(question, selected)
    const current = acc[sector] ?? { correct: 0, total: 0 }
    acc[sector] = {
      correct: current.correct + (correct ? 1 : 0),
      total: current.total + 1,
    }
    return acc
  }, {})
}

export default function AssessmentsPage() {
  const [activeMockTestId, setActiveMockTestId] = useState<string | null>(null)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selectedAnswers, setSelectedAnswers] = useState<SelectedAnswers>({})
  const [examSubmitted, setExamSubmitted] = useState(false)
  const [reviewMode, setReviewMode] = useState(false)
  const [timeLeftSeconds, setTimeLeftSeconds] = useState<number>(0)
  const [aiEvaluation, setAiEvaluation] = useState<MockAiEvaluation | null>(null)
  const [isEvaluating, setIsEvaluating] = useState(false)

  const activeMockTest: MockTest | null = useMemo(() => {
    return mockTests.find((mockTest) => mockTest.id === activeMockTestId) ?? null
  }, [activeMockTestId])

  const activeQuestions = activeMockTest?.questions ?? []
  const activeQuestion = activeQuestions[currentQuestionIndex]

  const score = useMemo(() => {
    if (!activeMockTest) return 0
    return activeMockTest.questions.reduce((sum, question) => {
      const selected = selectedAnswers[question.id] ?? []
      return isQuestionCorrect(question, selected) ? sum + 1 : sum
    }, 0)
  }, [activeMockTest, selectedAnswers])

  const totalQuestions = activeQuestions.length
  const incorrectCount = Math.max(totalQuestions - score, 0)
  const percentage = totalQuestions > 0 ? Math.round((score / totalQuestions) * 100) : 0
  const passed = percentage >= 72

  const submitExam = async () => {
    if (activeMockTest) {
      const attempt: MockAttempt = {
        score,
        totalQuestions: activeMockTest.questions.length,
        percentage:
          activeMockTest.questions.length > 0
            ? Math.round((score / activeMockTest.questions.length) * 100)
            : 0,
        attemptedAt: new Date().toISOString(),
        sectorStats: buildSectorStats(activeMockTest.questions, selectedAnswers),
      }
      const raw = localStorage.getItem(MOCK_ATTEMPTS_STORAGE_KEY)
      const store = raw ? (JSON.parse(raw) as MockAttemptsStore) : {}
      const attempts = store[activeMockTest.id] ?? []
      store[activeMockTest.id] = [...attempts, attempt]
      localStorage.setItem(MOCK_ATTEMPTS_STORAGE_KEY, JSON.stringify(store))

      const incorrectQuestions = activeMockTest.questions
        .filter((question) => {
          const selected = selectedAnswers[question.id] ?? []
          return !isQuestionCorrect(question, selected)
        })
        .map((question) => {
          const selected = selectedAnswers[question.id] ?? []
          const userAnswerText =
            selected.length > 0
              ? selected.map((answerIndex) => question.options[answerIndex] ?? `Option ${answerIndex + 1}`).join(', ')
              : 'Not answered'
          const correctAnswerText =
            Array.isArray(question.multipleCorrect) && question.multipleCorrect.length > 0
              ? question.multipleCorrect
                  .map((answerIndex) => question.options[answerIndex] ?? `Option ${answerIndex + 1}`)
                  .join(', ')
              : typeof question.correctIndex === 'number'
                ? question.options[question.correctIndex] ?? 'N/A'
                : 'N/A'
          return {
            question: question.question,
            userAnswer: userAnswerText,
            correctAnswer: correctAnswerText,
            explanation: question.explanation,
          }
        })

      setIsEvaluating(true)
      try {
        const response = await fetch('/api/mentor/mock-evaluation', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            mockTitle: activeMockTest.title,
            score: attempt.score,
            totalQuestions: attempt.totalQuestions,
            percentage: attempt.percentage,
            sectorStats: attempt.sectorStats,
            incorrectQuestions,
          }),
        })
        if (response.ok) {
          const data = (await response.json()) as MockAiEvaluation
          setAiEvaluation(data)
        }
      } catch (error) {
        console.error('Mock AI evaluation failed:', error)
      } finally {
        setIsEvaluating(false)
      }
    }
    setExamSubmitted(true)
    setReviewMode(true)
  }

  useEffect(() => {
    if (!activeMockTest || examSubmitted) return
    if (timeLeftSeconds <= 0) {
      if (activeMockTest.questions.length > 0) {
        void submitExam()
      }
      return
    }
    const timer = setInterval(() => {
      setTimeLeftSeconds((prev) => prev - 1)
    }, 1000)
    return () => clearInterval(timer)
  }, [activeMockTest, examSubmitted, timeLeftSeconds])

  const handleStartMockTest = (mockTest: MockTest) => {
    setActiveMockTestId(mockTest.id)
    setCurrentQuestionIndex(0)
    setSelectedAnswers({})
    setExamSubmitted(false)
    setReviewMode(false)
    setAiEvaluation(null)
    setIsEvaluating(false)
    setTimeLeftSeconds(mockTest.durationMinutes * 60)
  }

  const handleRetake = () => {
    if (!activeMockTest) return
    handleStartMockTest(activeMockTest)
  }

  const handleSelectOption = (question: MockQuestion, optionIndex: number) => {
    setSelectedAnswers((prev) => {
      const current = prev[question.id] ?? []
      if (Array.isArray(question.multipleCorrect) && question.multipleCorrect.length > 0) {
        const exists = current.includes(optionIndex)
        const next = exists ? current.filter((value) => value !== optionIndex) : [...current, optionIndex]
        return { ...prev, [question.id]: next }
      }
      return { ...prev, [question.id]: [optionIndex] }
    })
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Assessments</h1>
        <p className="text-muted-foreground mt-2">
          Take quizzes and assessments to test your AWS knowledge
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Full-Length Mock Tests</CardTitle>
          <CardDescription>
            Attempt full exam simulations in exam mode. Answers and explanations appear only after submission.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            {mockTests.map((mockTest) => (
              <Card key={mockTest.id}>
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-base font-semibold">{mockTest.title}</p>
                      <p className="text-sm text-muted-foreground">
                        65 Questions • {mockTest.durationMinutes} Minutes
                      </p>
                    </div>
                    <Button onClick={() => handleStartMockTest(mockTest)}>Start</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {activeMockTest && (
            <Card>
              <CardHeader>
                <CardTitle>{activeMockTest.title}</CardTitle>
                <CardDescription>
                  {examSubmitted
                    ? 'Result Mode'
                    : `Exam Mode • Time Left: ${formatDuration(Math.max(timeLeftSeconds, 0))}`}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {activeMockTest.questions.length === 0 ? (
                  <p className="text-sm text-muted-foreground">
                    No questions added yet. Add 65 questions in `data/mockTests.ts`.
                  </p>
                ) : (
                  <>
                    {!examSubmitted && activeQuestion && (
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-medium">
                            Question {currentQuestionIndex + 1}/{activeMockTest.questions.length}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {Array.isArray(activeQuestion.multipleCorrect) && activeQuestion.multipleCorrect.length > 0
                              ? 'Multiple answers allowed'
                              : 'Single answer'}
                          </p>
                        </div>

                        <p className="text-sm">{activeQuestion.question}</p>

                        <div className="space-y-2">
                          {activeQuestion.options.map((option, optionIndex) => {
                            const selected = (selectedAnswers[activeQuestion.id] ?? []).includes(optionIndex)
                            return (
                              <label key={option} className="flex items-center gap-2 text-sm">
                                <input
                                  type={
                                    Array.isArray(activeQuestion.multipleCorrect) &&
                                    activeQuestion.multipleCorrect.length > 0
                                      ? 'checkbox'
                                      : 'radio'
                                  }
                                  name={activeQuestion.id}
                                  checked={selected}
                                  onChange={() => handleSelectOption(activeQuestion, optionIndex)}
                                />
                                <span>{option}</span>
                              </label>
                            )
                          })}
                        </div>

                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            onClick={() => setCurrentQuestionIndex((prev) => Math.max(prev - 1, 0))}
                            disabled={currentQuestionIndex === 0}
                          >
                            Previous
                          </Button>
                          <Button
                            onClick={() =>
                              setCurrentQuestionIndex((prev) =>
                                Math.min(prev + 1, activeMockTest.questions.length - 1),
                              )
                            }
                            disabled={currentQuestionIndex >= activeMockTest.questions.length - 1}
                          >
                            Next
                          </Button>
                          <Button
                            variant="destructive"
                            onClick={() => void submitExam()}
                            className="ml-auto"
                          >
                            Submit Exam
                          </Button>
                        </div>

                        <div className="grid grid-cols-5 sm:grid-cols-10 gap-2">
                          {activeMockTest.questions.map((question, index) => {
                            const hasAnswer = (selectedAnswers[question.id] ?? []).length > 0
                            const isActive = index === currentQuestionIndex
                            return (
                              <Button
                                key={question.id}
                                variant={isActive ? 'default' : 'outline'}
                                size="sm"
                                onClick={() => setCurrentQuestionIndex(index)}
                                className={hasAnswer && !isActive ? 'border-primary text-primary' : undefined}
                              >
                                {index + 1}
                              </Button>
                            )
                          })}
                        </div>
                      </div>
                    )}

                    {examSubmitted && (
                      <div className="space-y-4">
                        <div className="rounded-lg border border-border p-4 space-y-2">
                          <p className="text-lg font-semibold">Final Score: {score}/{totalQuestions}</p>
                          <p className="text-sm">Percentage: {percentage}%</p>
                          <p className="text-sm">Correct: {score} • Incorrect: {incorrectCount}</p>
                          <p className={`text-sm font-medium ${passed ? 'text-green-500' : 'text-amber-500'}`}>
                            {passed
                              ? 'Great performance! You passed this mock test.'
                              : 'Keep practicing. Review explanations and try again.'}
                          </p>
                          <div className="flex items-center gap-2 pt-1">
                            <Button variant="outline" onClick={() => setReviewMode((prev) => !prev)}>
                              {reviewMode ? 'Hide Review' : 'Review Questions'}
                            </Button>
                            <Button variant="outline" onClick={handleRetake}>Retake Test</Button>
                          </div>
                        </div>
                        <div className="rounded-lg border border-border bg-muted/40 p-4 space-y-2">
                          <p className="text-sm font-semibold">AI Cognitive Analysis</p>
                          {isEvaluating ? (
                            <p className="text-sm text-muted-foreground">Analyzing your mock test performance...</p>
                          ) : aiEvaluation ? (
                            <>
                              <p className="text-sm">
                                Readiness for exam:{' '}
                                <span className="font-medium">{aiEvaluation.readinessPercentage}%</span>
                              </p>
                              <p className="text-sm">
                                Weak sectors:{' '}
                                <span className="font-medium">
                                  {aiEvaluation.weakSectors.length > 0
                                    ? aiEvaluation.weakSectors.join(', ')
                                    : 'No major weak sectors detected'}
                                </span>
                              </p>
                              {aiEvaluation.analysis ? (
                                <p className="text-sm text-muted-foreground">{aiEvaluation.analysis}</p>
                              ) : null}
                            </>
                          ) : (
                            <p className="text-sm text-muted-foreground">
                              AI analysis will appear after submission.
                            </p>
                          )}
                        </div>

                        {reviewMode && (
                          <div className="space-y-3">
                            {activeMockTest.questions.map((question, index) => {
                              const selected = selectedAnswers[question.id] ?? []
                              const correct = isQuestionCorrect(question, selected)
                              const userAnswerText =
                                selected.length > 0
                                  ? selected
                                      .map((answerIndex) => question.options[answerIndex] ?? `Option ${answerIndex + 1}`)
                                      .join(', ')
                                  : 'Not answered'
                              const correctAnswerText =
                                Array.isArray(question.multipleCorrect) && question.multipleCorrect.length > 0
                                  ? question.multipleCorrect
                                      .map((answerIndex) => question.options[answerIndex] ?? `Option ${answerIndex + 1}`)
                                      .join(', ')
                                  : typeof question.correctIndex === 'number'
                                    ? question.options[question.correctIndex] ?? 'N/A'
                                    : 'N/A'

                              return (
                                <Card key={question.id}>
                                  <CardContent className="pt-6 space-y-2">
                                    <p className="text-sm font-medium">
                                      {index + 1}. {question.question}
                                    </p>
                                    <p className={`text-sm font-medium ${correct ? 'text-green-500' : 'text-red-500'}`}>
                                      {correct ? '✅ Correct' : '❌ Incorrect'}
                                    </p>
                                    <p className="text-sm">Your answer: {userAnswerText}</p>
                                    <p className="text-sm">Correct answer: {correctAnswerText}</p>
                                    <p className="text-sm text-muted-foreground">
                                      Explanation: {question.explanation}
                                    </p>
                                  </CardContent>
                                </Card>
                              )
                            })}
                          </div>
                        )}
                      </div>
                    )}
                  </>
                )}
              </CardContent>
            </Card>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
