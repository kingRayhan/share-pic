export async function uploadToImgBB(file: File): Promise<string> {
  if (!process.env.NEXT_PUBLIC_IMGBB_API_KEY) {
    throw new Error('ImgBB API key is not configured');
  }

  const buffer = await file.arrayBuffer();
  const base64Image = Buffer.from(buffer).toString('base64');
  
  const formData = new FormData();
  formData.append('image', base64Image);
  
  const response = await fetch(`https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_API_KEY}`, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    throw new Error('Failed to upload image to ImgBB');
  }

  const data = await response.json();
  return data.data.url;
}