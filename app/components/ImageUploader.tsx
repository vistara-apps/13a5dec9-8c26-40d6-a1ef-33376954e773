'use client';

import { useState, useRef } from 'react';
import { Upload, Image as ImageIcon } from 'lucide-react';

interface ImageUploaderProps {
  onImageUpload: (imageUrl: string) => void;
}

export function ImageUploader({ onImageUpload }: ImageUploaderProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file');
      return;
    }

    setIsUploading(true);
    
    // Convert to base64 for demo purposes
    // In a real app, you'd upload to a cloud storage service
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      onImageUpload(result);
      setIsUploading(false);
    };
    reader.readAsDataURL(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  return (
    <div className="space-y-4">
      <div
        className={`card p-8 border-2 border-dashed cursor-pointer transition-all duration-150 ${
          isDragging 
            ? 'border-primary bg-primary/5' 
            : 'border-gray-300 hover:border-primary/50'
        } ${isUploading ? 'opacity-50 cursor-not-allowed' : ''}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={!isUploading ? handleClick : undefined}
      >
        <div className="text-center space-y-4">
          <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
            {isUploading ? (
              <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
            ) : (
              <Upload className="w-6 h-6 text-primary" />
            )}
          </div>
          <div>
            <h3 className="font-medium text-text mb-1">
              {isUploading ? 'Uploading...' : 'Upload Product Image'}
            </h3>
            <p className="text-sm text-muted-foreground">
              Drag and drop your image here, or click to browse
            </p>
          </div>
        </div>
      </div>
      
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
        disabled={isUploading}
      />
      
      {/* Example images for demo */}
      <div className="space-y-2">
        <p className="text-sm text-muted-foreground text-center">Or try with example images:</p>
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => onImageUpload('https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400')}
            className="card p-2 hover:bg-gray-50 transition-colors duration-150"
          >
            <img 
              src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400" 
              alt="Headphones example"
              className="w-full h-20 object-cover rounded-sm mb-1"
            />
            <p className="text-xs text-muted-foreground">Headphones</p>
          </button>
          <button
            onClick={() => onImageUpload('https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400')}
            className="card p-2 hover:bg-gray-50 transition-colors duration-150"
          >
            <img 
              src="https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400" 
              alt="Sneakers example"
              className="w-full h-20 object-cover rounded-sm mb-1"
            />
            <p className="text-xs text-muted-foreground">Sneakers</p>
          </button>
        </div>
      </div>
    </div>
  );
}
