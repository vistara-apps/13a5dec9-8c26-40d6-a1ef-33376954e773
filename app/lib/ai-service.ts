import OpenAI from 'openai';
import { AdVariation } from '../types';
import { generateId } from './utils';

const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY || 'your-api-key-here',
  baseURL: "https://openrouter.ai/api/v1",
  dangerouslyAllowBrowser: true,
});

export async function generateAdVariations(productImageUrl: string): Promise<AdVariation[]> {
  try {
    // Generate ad copy variations using GPT
    const copyPrompt = `
      Based on a product image, generate 5 unique social media ad variations.
      Each variation should have:
      - A compelling headline (max 60 characters)
      - Body text (max 125 characters, engaging and benefit-focused)
      - A clear call-to-action (max 20 characters)
      
      Make each variation target different psychological triggers:
      1. Social proof
      2. Urgency/scarcity
      3. Problem/solution
      4. Emotional appeal
      5. Value proposition
      
      Return as JSON array with this structure:
      [
        {
          "headline": "string",
          "bodyText": "string", 
          "cta": "string"
        }
      ]
    `;

    const response = await openai.chat.completions.create({
      model: 'google/gemini-2.0-flash-001',
      messages: [
        { role: 'user', content: copyPrompt }
      ],
      temperature: 0.8,
    });

    let adCopies;
    try {
      const content = response.choices[0]?.message?.content || '[]';
      const jsonMatch = content.match(/\[[\s\S]*\]/);
      adCopies = JSON.parse(jsonMatch ? jsonMatch[0] : '[]');
    } catch (parseError) {
      // Fallback to demo data if API fails
      console.warn('Failed to parse AI response, using fallback data');
      adCopies = getFallbackAdCopies();
    }

    // Create ad variations with generated copy
    const variations: AdVariation[] = adCopies.slice(0, 5).map((copy: any, index: number) => ({
      variationId: generateId(),
      campaignId: generateId(),
      generatedVisual: `ai-visual-${index + 1}`,
      generatedCopy: {
        headline: copy.headline || `Amazing Product Deal #${index + 1}`,
        bodyText: copy.bodyText || `Don't miss out on this incredible offer. Limited time only!`,
        cta: copy.cta || 'Shop Now',
      },
      postStatus: 'draft' as const,
    }));

    return variations;
  } catch (error) {
    console.error('Error generating ad variations:', error);
    
    // Return fallback variations if API fails
    return getFallbackAdCopies().map((copy, index) => ({
      variationId: generateId(),
      campaignId: generateId(),
      generatedVisual: `ai-visual-${index + 1}`,
      generatedCopy: copy,
      postStatus: 'draft' as const,
    }));
  }
}

function getFallbackAdCopies() {
  return [
    {
      headline: "🔥 Thousands Love This!",
      bodyText: "Join the community that's already discovered this game-changing product. See why everyone's talking about it!",
      cta: "Join Now"
    },
    {
      headline: "⏰ Only 24 Hours Left!",
      bodyText: "Limited stock alert! Don't let this amazing deal slip away. Your future self will thank you.",
      cta: "Grab Yours"
    },
    {
      headline: "Finally, A Real Solution",
      bodyText: "Tired of products that don't deliver? This one actually works. Thousands of satisfied customers agree.",
      cta: "Try It Now"
    },
    {
      headline: "You Deserve This ✨",
      bodyText: "Life's too short for settling. Treat yourself to something that brings real joy and value to your day.",
      cta: "Treat Yourself"
    },
    {
      headline: "50% Off Today Only",
      bodyText: "Premium quality at an unbeatable price. This deal won't last long - secure your savings now!",
      cta: "Save 50%"
    }
  ];
}
