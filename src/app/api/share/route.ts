import { NextResponse } from 'next/server';
import { put } from '@vercel/blob';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { image } = body;

    // Accept both JPEG and PNG just in case
    if (!image || typeof image !== 'string' || !image.startsWith('data:image/')) {
      return NextResponse.json(
        { error: 'Invalid image format. Expected base64 data URL.' },
        { status: 400 }
      );
    }

    // Extract the raw base64 data bytes
    const base64Data = image.replace(/^data:image\/\w+;base64,/, '');
    const buffer = Buffer.from(base64Data, 'base64');

    // Generate a unique 8-character ID for the sharing route
    const id = Math.random().toString(36).substring(2, 10);

    // Upload to Vercel Blob (Save as JPG to match the client export)
    const blob = await put(`shares/${id}.jpg`, buffer, {
      access: 'public',
      contentType: 'image/jpeg',
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
