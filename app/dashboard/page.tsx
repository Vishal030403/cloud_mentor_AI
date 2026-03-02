'use client'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { BookOpen, Award, Sparkles, Users } from 'lucide-react'

type MockAttempt = {
  percentage: number
  score: number
  totalQuestions: number
  attemptedAt: string
}

type MockAttemptsStore = Record<string, MockAttempt[]>

const SAA_COMPLETION_STORAGE_KEY = 'cloudmentor-saa-completed'
const MOCK_ATTEMPTS_STORAGE_KEY = 'cloudmentor-mock-attempts'
const DAILY_COMPLETION_DATES_KEY = 'cloudmentor-daily-completion-dates'

function computeCurrentStreak(dates: string[]) {
  if (dates.length === 0) return 0
  const dateSet = new Set(dates)
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  let streak = 0
  const cursor = new Date(today)
  while (true) {
    const key = cursor.toISOString().slice(0, 10)
    if (!dateSet.has(key)) break
    streak += 1
    cursor.setDate(cursor.getDate() - 1)
  }
  return streak
}

export default function DashboardHome() {
  const [userName, setUserName] = useState<string>('')
  const [stats, setStats] = useState({
    coursesEnrolled: 0,
    assessmentsPassed: 0,
    pointsEarned: 0,
    currentStreak: 0,
  })

  useEffect(() => {
    const fetchStats = async () => {
      const response = await fetch('/api/dashboard/summary')
      if (!response.ok) return
      const data = await response.json()
      setUserName(data.userName ?? 'Learner')
      const baseStats = data.stats ?? {
        coursesEnrolled: 0,
        assessmentsPassed: 0,
        pointsEarned: 0,
        currentStreak: 0,
      }

      let pointsEarned = baseStats.pointsEarned
      let currentStreak = baseStats.currentStreak
      let assessmentsAttempted = baseStats.assessmentsPassed

      try {
        const completedRaw = localStorage.getItem(SAA_COMPLETION_STORAGE_KEY)
        const completed = completedRaw ? (JSON.parse(completedRaw) as string[]) : []
        pointsEarned = completed.length
      } catch {
        pointsEarned = baseStats.pointsEarned
      }

      try {
        const attemptsRaw = localStorage.getItem(MOCK_ATTEMPTS_STORAGE_KEY)
        const attemptsStore = attemptsRaw ? (JSON.parse(attemptsRaw) as MockAttemptsStore) : {}
        assessmentsAttempted = Object.values(attemptsStore).reduce(
          (sum, attempts) => sum + (attempts?.length ?? 0),
          0,
        )
      } catch {
        assessmentsAttempted = baseStats.assessmentsPassed
      }

      try {
        const dateRaw = localStorage.getItem(DAILY_COMPLETION_DATES_KEY)
        const completionDates = dateRaw ? (JSON.parse(dateRaw) as string[]) : []
        currentStreak = computeCurrentStreak(completionDates)
      } catch {
        currentStreak = baseStats.currentStreak
      }

      setStats({
        coursesEnrolled: baseStats.coursesEnrolled,
        assessmentsPassed: assessmentsAttempted,
        pointsEarned,
        currentStreak,
      })
    }

    fetchStats()
  }, [])

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Welcome back, {userName}! 👋</h1>
        <p className="text-muted-foreground mt-2">
          Continue your AWS learning journey with CloudMentor AI
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Courses Enrolled
              </CardTitle>
              <BookOpen className="w-4 h-4 text-primary" />
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{stats.coursesEnrolled}</p>
            <p className="text-xs text-muted-foreground mt-1">Active courses</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Assessments Attempted
              </CardTitle>
              <Award className="w-4 h-4 text-secondary" />
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{stats.assessmentsPassed}</p>
            <p className="text-xs text-muted-foreground mt-1">Mock test attempts</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Points Earned
              </CardTitle>
              <Sparkles className="w-4 h-4 text-accent" />
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{stats.pointsEarned}</p>
            <p className="text-xs text-muted-foreground mt-1">Total points</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Current Streak
              </CardTitle>
              <Sparkles className="w-4 h-4 text-orange-500" />
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{stats.currentStreak}</p>
            <p className="text-xs text-muted-foreground mt-1">Days learning</p>
          </CardContent>
        </Card>
      </div>

      {/* Featured Sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-primary" />
              Recommended Courses
            </CardTitle>
            <CardDescription>
              Personalized course recommendations based on your skill level
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="p-3 rounded-lg bg-muted hover:bg-muted/80 transition-colors cursor-pointer">
                <p className="font-medium text-sm">AWS Certified Solutions Architect - Associate</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Associate • 58 lessons
                </p>
              </div>
              <div className="p-3 rounded-lg bg-muted hover:bg-muted/80 transition-colors cursor-pointer">
                <p className="font-medium text-sm">AWS Certified Cloud Practitioner</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Practitioner • 24 lessons
                </p>
              </div>
            </div>
            <Button asChild className="w-full mt-4" variant="outline">
              <Link href="/dashboard/courses">View All Courses</Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-secondary" />
              AI Mentor
            </CardTitle>
            <CardDescription>
              Get instant help from your AI mentor on any AWS topic
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <p className="text-sm text-muted-foreground">
                {"Ask your AI mentor about:"}
              </p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <span className="text-primary">•</span>
                  <span>AWS service explanations</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-primary">•</span>
                  <span>Architecture best practices</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-primary">•</span>
                  <span>Exam preparation strategies</span>
                </li>
              </ul>
              <Button asChild className="w-full">
                <Link href="/dashboard/mentor">Start Mentoring Session</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Common tasks you can do right now</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <Button asChild variant="outline" className="h-auto flex-col p-4">
              <Link href="/dashboard/assessments">
                <Award className="w-6 h-6 mb-2 text-primary" />
                <span className="text-center">Take an Assessment</span>
              </Link>
            </Button>
            <Button asChild variant="outline" className="h-auto flex-col p-4">
              <Link href="/dashboard/collaboration">
                <Users className="w-6 h-6 mb-2 text-secondary" />
                <span className="text-center">Join Collaboration Room</span>
              </Link>
            </Button>
            <Button asChild variant="outline" className="h-auto flex-col p-4">
              <Link href="/dashboard/progress">
                <Sparkles className="w-6 h-6 mb-2 text-accent" />
                <span className="text-center">View Your Progress</span>
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
