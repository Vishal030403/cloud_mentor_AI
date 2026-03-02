import { generateTextWithGemini } from '@/lib/gemini'

type SectionEvaluationBody = {
  sectionName?: string
  moduleTitles?: string[]
  score?: number
  totalQuestions?: number
  percentage?: number
  incorrectQuestions?: Array<{
    question: string
    userAnswer: string
    correctAnswer: string
    explanation: string
  }>
}

type SectionEvaluationResponse = {
  readinessPercentage: number
  weakModules: string[]
  analysis: string
  recommendations: string[]
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as SectionEvaluationBody
    const sectionName = body.sectionName || 'Unknown Section'
    const moduleTitles = body.moduleTitles || []
    const score = Number(body.score || 0)
    const totalQuestions = Number(body.totalQuestions || 0)
    const percentage = Number(body.percentage || 0)
    const incorrectQuestions = body.incorrectQuestions || []

    const result = await generateTextWithGemini({
      model: 'gemini-2.5-flash',
      system:
        'You are an AWS learning evaluator. Output strictly valid JSON only with keys: readinessPercentage (number 0-100), weakModules (string[]), analysis (string), recommendations (string[]).',
      prompt: `Evaluate this learner's section performance and map weak areas to modules.

Section: ${sectionName}
Modules: ${moduleTitles.join(' | ')}
Score: ${score}/${totalQuestions} (${percentage}%)

Incorrect Questions:
${incorrectQuestions
  .map(
    (item, idx) =>
      `${idx + 1}) Q: ${item.question}
   User Answer: ${item.userAnswer}
   Correct Answer: ${item.correctAnswer}
   Explanation: ${item.explanation}`,
  )
  .join('\n\n')}

Rules:
- Pick weakModules only from the provided Modules list.
- If no clear weak module mapping exists, choose up to 2 most likely modules.
- Keep analysis under 70 words.
- Recommendations max 4 concise bullet-style sentences.`,
    })

    let parsed: SectionEvaluationResponse | null = null
    try {
      parsed = JSON.parse(result.text) as SectionEvaluationResponse
    } catch {
      parsed = null
    }

    if (!parsed) {
      return Response.json({
        readinessPercentage: percentage,
        weakModules: moduleTitles.slice(0, Math.min(2, moduleTitles.length)),
        analysis: 'Your quiz performance indicates targeted revision is needed in key modules before moving ahead.',
        recommendations: [
          'Review the modules with the lowest confidence first.',
          'Re-attempt section quiz after revising weak topics.',
        ],
      } satisfies SectionEvaluationResponse)
    }

    return Response.json({
      readinessPercentage:
        typeof parsed.readinessPercentage === 'number' ? parsed.readinessPercentage : percentage,
      weakModules: Array.isArray(parsed.weakModules) ? parsed.weakModules : [],
      analysis: parsed.analysis || '',
      recommendations: Array.isArray(parsed.recommendations) ? parsed.recommendations : [],
    } satisfies SectionEvaluationResponse)
  } catch (error) {
    console.error('POST /api/mentor/section-evaluation failed:', error)
    return new Response('Failed to evaluate section performance', { status: 500 })
  }
}
