import { createGoogleGenerativeAI } from '@ai-sdk/google'
import { generateText } from 'ai'

type GenerateTextArgs = Omit<Parameters<typeof generateText>[0], 'model'> & {
  model?: string
}

let keyCursor = 0

function getGeminiApiKeys() {
  const keys = [
    process.env.GEMINI_API_KEY_1,
    process.env.GEMINI_API_KEY_2,
    process.env.GEMINI_API_KEY_3,
    process.env.GEMINI_API_KEY,
    process.env.GOOGLE_GENERATIVE_AI_API_KEY,
  ]
    .map((key) => (key || '').trim())
    .filter(Boolean)

  return Array.from(new Set(keys))
}

function getRotatedKeys(keys: string[]) {
  if (keys.length === 0) return []
  const start = keyCursor % keys.length
  keyCursor = (keyCursor + 1) % keys.length
  return [...keys.slice(start), ...keys.slice(0, start)]
}

export async function generateTextWithGemini(args: GenerateTextArgs) {
  const keys = getGeminiApiKeys()
  if (keys.length === 0) {
    throw new Error(
      'No Gemini API key configured. Add GEMINI_API_KEY_1/2/3 (or GOOGLE_GENERATIVE_AI_API_KEY).',
    )
  }

  const { model = 'gemini-2.5-flash', ...rest } = args
  const orderedKeys = getRotatedKeys(keys)
  let lastError: unknown = null

  for (const key of orderedKeys) {
    try {
      const google = createGoogleGenerativeAI({ apiKey: key })
      return await generateText({
        ...rest,
        model: google(model),
      })
    } catch (error) {
      lastError = error
    }
  }

  throw lastError ?? new Error('All configured Gemini keys failed.')
}
