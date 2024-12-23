"use client";

import { QRCodeSVG } from "qrcode.react";
import { Share2Icon, RotateCcwIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface QRDisplayProps {
  imageUrl: string;
  onReset: () => void;
}

export function QRDisplay({ imageUrl, onReset }: QRDisplayProps) {
  const { toast } = useToast();

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(imageUrl);
      toast({
        title: "Link copied!",
        description: "The image URL has been copied to your clipboard.",
      });
    } catch (err) {
      toast({
        title: "Failed to copy",
        description: "Please try copying the link manually.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Your Image QR Code</h2>
        <Button variant="ghost" size="sm" onClick={onReset}>
          <RotateCcwIcon className="w-4 h-4 mr-2" />
          Upload Another
        </Button>
      </div>
      
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="bg-white p-4 rounded-lg flex justify-center">
            <QRCodeSVG value={imageUrl} size={200} />
          </div>
          <p className="text-sm text-muted-foreground break-all">{imageUrl}</p>
          <Button className="w-full" onClick={copyToClipboard}>
            <Share2Icon className="w-4 h-4 mr-2" />
            Copy Link
          </Button>
        </div>
        <div className="flex items-center justify-center">
          <img
            src={imageUrl}
            alt="Uploaded preview"
            className="max-w-full h-auto rounded-lg"
          />
        </div>
      </div>
    </div>
  );
}