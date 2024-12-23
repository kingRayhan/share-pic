import { ImgBBService } from './services/imgbb';

export async function uploadFile(file: File): Promise<string> {
  try {
    const imgbb = new ImgBBService(process.env.NEXT_PUBLIC_IMGBB_API_KEY);
    const imageUrl = await imgbb.uploadImage(file);
    return imageUrl;
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : 'Failed to upload file');
  }
}