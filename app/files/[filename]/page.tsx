import { notFound } from 'next/navigation';
import { existsSync } from 'fs';
import { join } from 'path';
import { QRCodeSVG } from 'qrcode.react';
import { Button } from '@/components/ui/button';
import { Share2Icon } from 'lucide-react';

interface FilePageProps {
  params: {
    filename: string;
  }
}

export default function FilePage({ params }: FilePageProps) {
  const { filename } = params;
  const filePath = join(process.cwd(), 'public', 'uploads', filename);
  
  // Check if file exists
  if (!existsSync(filePath)) {
    notFound();
  }

  const fileUrl = `${process.env.NEXT_PUBLIC_APP_URL}/files/${filename}`;
  const imageUrl = `/uploads/${filename}`;

  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-muted p-8">
      <div className="max-w-2xl mx-auto">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="bg-white p-4 rounded-lg flex justify-center">
              <QRCodeSVG value={fileUrl} size={200} />
            </div>
            <p className="text-sm text-muted-foreground break-all">{fileUrl}</p>
            <Button 
              className="w-full"
              onClick={() => navigator.clipboard.writeText(fileUrl)}
            >
              <Share2Icon className="w-4 h-4 mr-2" />
              Copy Link
            </Button>
          </div>
          <div className="flex items-center justify-center">
            <img
              src={imageUrl}
              alt="Uploaded file"
              className="max-w-full h-auto rounded-lg"
            />
          </div>
        </div>
      </div>
    </main>
  );
}