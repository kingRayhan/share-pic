import { fileToBase64 } from '../utils/file';

export class ImgBBService {
  private apiKey: string;

  constructor(apiKey: string | undefined) {
    if (!apiKey) {
      throw new Error('ImgBB API key is not configured');
    }
    this.apiKey = apiKey;
  }

  async uploadImage(file: File): Promise<string> {
    const base64Image = await fileToBase64(file);
    const formData = new FormData();
    formData.append('image', base64Image);
    
    const response = await fetch(`https://api.imgbb.com/1/upload?key=${this.apiKey}`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Failed to upload image to ImgBB');
    }

    const data = await response.json();
    return data.data.url;
  }
}