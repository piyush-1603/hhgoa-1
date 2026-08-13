import { NextResponse } from 'next/server';
import { put } from '@vercel/blob';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { image } = body;

    // Validation 1: Check image format
    if (!image || typeof image !== 'string' || !image.startsWith('data:image/')) {
      return NextResponse.json(
        { error: 'Invalid image format. Expected base64 data URL.' },
        { status: 400 }
      );
    }

    // Extract the raw base64 data bytes
    const base64Data = image.replace(/^data:image\/\w+;base64,/, '');
    const buffer = Buffer.from(base64Data, 'base64');
    
    // Validation 2: Check image size (max 5MB limit for Serverless Functions and Blob)
    const MAX_SIZE = 5 * 1024 * 1024; // 5MB
    if (buffer.length > MAX_SIZE) {
      return NextResponse.json(
        { error: `Image too large. Max 5MB, got ${(buffer.length / 1024 / 1024).toFixed(2)}MB` },
        { status: 400 }
      );
    }

    // Generate unique ID / filename
    const timestamp = Date.now();
    const random = Math.random().toString(36).substring(7);
    const id = `${timestamp}-${random}`;
    const filename = `hh-cards/${id}.jpg`; // Saving as JPG to keep size small

    // Upload to Vercel Blob
    const blob = await put(filename, buffer, {
      access: 'public',
      contentType: 'image/jpeg',
    });

    return NextResponse.json({ id, url: blob.url, success: true });
  } catch (error: any) {
    console.error('[Blob Upload Error]:', error.message);
    
    // Handle specific Vercel Blob configuration errors
    if (error.message.includes('BLOB_READ_WRITE_TOKEN')) {
      return NextResponse.json(
        { error: 'Blob storage not configured. Please ensure Vercel Blob is linked to your project and you have redeployed.' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { error: error.message || 'Failed to save generated card to cloud storage.' },
      { status: 500 }
    );
  }
}
