import { UploadForm } from "@/components/upload-form";
import { ImageIcon } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-muted p-8">
      <div className="max-w-2xl mx-auto text-center mb-12">
        <div className="inline-block p-4 rounded-full bg-primary/10 mb-4">
          <ImageIcon className="w-8 h-8 text-primary" />
        </div>
        <h1 className="text-4xl font-bold mb-4">Image Upload & QR Code Generator</h1>
        <p className="text-muted-foreground">
          Upload your images and get a shareable QR code instantly. Perfect for sharing images across devices.
        </p>
      </div>
      <UploadForm />
    </main>
  );
}