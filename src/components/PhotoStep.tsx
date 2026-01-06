
import React, { useRef, useState } from 'react';
import { Camera, Upload, RefreshCw } from 'lucide-react';

interface PhotoStepProps {
  title: string;
  subtitle: string;
  onCapture: (image: string) => void;
  loading?: boolean;
}

const PhotoStep: React.FC<PhotoStepProps> = ({ title, subtitle, onCapture, loading }) => {
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [showCamera, setShowCamera] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user' } });
      setStream(mediaStream);
      setShowCamera(true);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch (err) {
      alert("Could not access camera. Please upload a photo instead.");
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
      setShowCamera(false);
    }
  };

  const takePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const context = canvasRef.current.getContext('2d');
      if (context) {
        canvasRef.current.width = videoRef.current.videoWidth;
        canvasRef.current.height = videoRef.current.videoHeight;
        context.drawImage(videoRef.current, 0, 0);
        const dataUrl = canvasRef.current.toDataURL('image/jpeg');
        onCapture(dataUrl);
        stopCamera();
      }
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onCapture(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 space-y-6 animate-pulse">
        <div className="relative">
          <div className="w-24 h-24 rounded-full border-4 border-yellow-500/30 border-t-yellow-500 animate-spin"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <RefreshCw size={32} className="text-yellow-500 animate-spin duration-700" />
          </div>
        </div>
        <div className="text-center">
          <h2 className="text-2xl font-serif text-yellow-500 mb-2">Analyzing Your Look...</h2>
          <p className="text-white/50 text-sm">Consulting our AI grooming experts</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="text-center space-y-2">
        <h2 className="text-4xl font-serif">{title}</h2>
        <p className="text-white/50">{subtitle}</p>
      </div>

      <div className="relative bg-white/5 rounded-3xl overflow-hidden aspect-[3/4] flex items-center justify-center border border-white/10">
        {showCamera ? (
          <>
            <video 
              ref={videoRef} 
              autoPlay 
              playsInline 
              className="absolute inset-0 w-full h-full object-cover scale-x-[-1]"
            />
            <div className="absolute bottom-8 left-0 right-0 flex justify-center px-6 gap-4">
              <button 
                onClick={takePhoto}
                className="w-16 h-16 rounded-full bg-white border-4 border-white/20 shadow-2xl flex items-center justify-center hover:scale-105 active:scale-95 transition-transform"
              >
                <div className="w-12 h-12 rounded-full border-2 border-black" />
              </button>
              <button 
                onClick={stopCamera}
                className="px-4 py-2 bg-black/50 backdrop-blur rounded-full text-xs font-bold uppercase tracking-widest border border-white/10"
              >
                Cancel
              </button>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center gap-6">
            <div className="w-20 h-20 rounded-full bg-yellow-500/10 flex items-center justify-center border border-yellow-500/20">
              <Camera size={40} className="text-yellow-500" />
            </div>
            <div className="flex flex-col gap-3 w-full max-w-[240px]">
              <button 
                onClick={startCamera}
                className="flex items-center justify-center gap-2 bg-white text-black font-bold py-4 rounded-2xl hover:bg-yellow-50 transition-colors"
              >
                <Camera size={20} />
                Open Camera
              </button>
              <button 
                onClick={() => fileInputRef.current?.click()}
                className="flex items-center justify-center gap-2 bg-white/10 font-bold py-4 rounded-2xl hover:bg-white/20 transition-colors"
              >
                <Upload size={20} />
                Upload Photo
              </button>
              <input 
                type="file" 
                ref={fileInputRef} 
                className="hidden" 
                accept="image/*"
                onChange={handleFileUpload}
              />
            </div>
          </div>
        )}
      </div>
      <canvas ref={canvasRef} className="hidden" />
    </div>
  );
};

export default PhotoStep;
