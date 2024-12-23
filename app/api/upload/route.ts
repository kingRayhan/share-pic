import { NextResponse } from 'next/server';
import crypto from 'crypto';

export async function POST(request: Request) {
  try {
    const { image, filename } = await request.json();
    
    if (!image || !filename) {
      return NextResponse.json(
        { error: 'Missing image data or filename' },
        { status: 400 }
      );
    }

    if (!process.env.NEXT_PUBLIC_IMGBB_API_KEY) {
      throw new Error('ImgBB API key is not configured');
    }

    // Upload to ImgBB
    const formData = new FormData();
    formData.append('image', image);
    
    const imgbbResponse = await fetch(
      `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_API_KEY}`,
      {
        method: 'POST',
        body: formData,
      }
    );

    if (!imgbbResponse.ok) {
      throw new Error('Failed to upload to ImgBB');
    }

    const imgbbData = await imgbbResponse.json();

    // Generate a unique hash for the local URL
    const fileHash = crypto.createHash('sha256')
      .update(Date.now().toString())
      .digest('hex')
      .substring(0, 8);
    const extension = filename.split('.').pop() || 'jpg';
    const localFilename = `${fileHash}.${extension}`;
    
    return NextResponse.json({ 
      url: `/files/${localFilename}`,
      imgbbUrl: imgbbData.data.url 
    });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { error: 'Failed to upload file' },
      { status: 500 }
    );
  }
}