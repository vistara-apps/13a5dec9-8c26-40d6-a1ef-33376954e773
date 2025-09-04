import { NextRequest, NextResponse } from 'next/server';
import { generateAdVariations } from '../../lib/ai-service';

export async function POST(request: NextRequest) {
  try {
    const { productImageUrl } = await request.json();
    
    if (!productImageUrl) {
      return NextResponse.json(
        { error: 'Product image URL is required' },
        { status: 400 }
      );
    }

    const variations = await generateAdVariations(productImageUrl);
    
    return NextResponse.json({ variations });
  } catch (error) {
    console.error('Error in generate-ads API:', error);
    return NextResponse.json(
      { error: 'Failed to generate ad variations' },
      { status: 500 }
    );
  }
}
