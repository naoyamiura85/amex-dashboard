import { streamText, convertToModelMessages } from 'ai'
import { z } from 'zod'

export async function POST(req: Request) {
  try {
    const { messages } = await req.json()

    const result = streamText({
      model: 'openai/gpt-4-turbo',
      system: `You are YAPPI (Your AI-Powered Personalized Insights), an expert consumer intelligence assistant specializing in trends, market analysis, and consumer behavior.

Your expertise includes:
- Identifying and analyzing emerging consumer trends
- Deep market and competitor analysis
- Consumer demographic and psychographic insights
- Product concept evaluation and messaging strategy
- Channel-specific insights and retail strategies
- Regulatory compliance (薬機法・景表法) for cosmetics and supplements

You provide:
- Data-driven insights with specific numbers and evidence
- Actionable recommendations backed by analysis
- Clear visualizations of complex data
- Trend forecasting and market positioning advice
- Demographic and geographic analysis

Format responses with:
- Clear sections and bullet points
- Specific data points and percentages
- Actionable recommendations
- Charts/tables when helpful (use markdown)
- Always cite your reasoning`,
      messages: await convertToModelMessages(messages),
      temperature: 0.7,
      maxTokens: 2048,
    })

    return result.toUIMessageStreamResponse()
  } catch (error) {
    console.error('YappiChat error:', error)
    return new Response('Internal Server Error', { status: 500 })
  }
}
