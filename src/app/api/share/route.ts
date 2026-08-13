import { NextResponse } from 'next/server';
import { put } from '@vercel/blob';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { image } = body;

    if (!image || typeof image !== 'string' || !image.startsWith('data:image/png;base64,')) {
      return NextResponse.json(
        { error: 'Invalid image format. Expected PNG base64 data URL.' },
        { status: 400 }
      );
    }

    // Extract the raw base64 data bytes
    const base64Data = image.replace(/^data:image\/png;base64,/, '');
    const buffer = Buffer.from(base64Data, 'base64');

    // Generate a unique 8-character ID for the sharing route
    const id = Math.random().toString(36).substring(2, 10);

    // Upload to Vercel Blob
    const blob = await put(`shares/${id}.png`, buffer, {
      access: 'public',
      contentType: 'image/png',
    });

    return NextResponse.json({ id, url: blob.url });
  } catch (error) {
    console.error('API Share Error:', error);
    return NextResponse.json(
      { error: 'Failed to save generated card to cloud storage.' },
      { status: 500 }
    );
  }
}
