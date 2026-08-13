import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { image } = body;

    // Accept both JPEG and PNG
    if (!image || typeof image !== 'string' || !image.startsWith('data:image/')) {
      return NextResponse.json(
        { error: 'Invalid image format. Expected base64 data URL.' },
        { status: 400 }
      );
    }

    // Extract the raw base64 data bytes
    const base64Data = image.replace(/^data:image\/\w+;base64,/, '');
    const buffer = Buffer.from(base64Data, 'base64');
    const fileBlob = new Blob([buffer], { type: 'image/jpeg' });

    // Upload to Catbox (Free anonymous image host, bypasses all Vercel env variable issues!)
    const formData = new FormData();
    formData.append('reqtype', 'fileupload');
    formData.append('fileToUpload', fileBlob, 'card.jpg');

    const response = await fetch('https://catbox.moe/user/api.php', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`Catbox upload failed with status ${response.status}`);
    }

    // Catbox returns a plain text URL, e.g., "https://files.catbox.moe/xxxxx.jpg"
    const textUrl = await response.text();
    
    // Extract just the filename ID to keep our URLs clean (e.g., "xxxxx.jpg")
    const id = textUrl.split('/').pop() || 'error';

    return NextResponse.json({ id, url: textUrl });
  } catch (error: any) {
    console.error('API Share Error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to save generated card to cloud storage.' },
      { status: 500 }
    );
  }
}
