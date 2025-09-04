'use client';

import { useState } from 'react';
import { AppShell } from './components/AppShell';
import { ImageUploader } from './components/ImageUploader';
import { AdCard } from './components/AdCard';
import { SocialConnect } from './components/SocialConnect';
import { CTAButton } from './components/CTAButton';
import { generateAdVariations } from './lib/ai-service';
import { AdVariation, AdCampaign } from './types';

export default function Home() {
  const [currentStep, setCurrentStep] = useState<'upload' | 'generate' | 'customize' | 'post'>('upload');
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [adVariations, setAdVariations] = useState<AdVariation[]>([]);
  const [selectedVariations, setSelectedVariations] = useState<string[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [connectedAccounts, setConnectedAccounts] = useState<{
    tiktok: boolean;
    instagram: boolean;
  }>({ tiktok: false, instagram: false });

  const handleImageUpload = (imageUrl: string) => {
    setUploadedImage(imageUrl);
    setCurrentStep('generate');
  };

  const handleGenerateAds = async () => {
    if (!uploadedImage) return;
    
    setIsGenerating(true);
    try {
      const variations = await generateAdVariations(uploadedImage);
      setAdVariations(variations);
      setCurrentStep('customize');
    } catch (error) {
      console.error('Error generating ads:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleVariationSelect = (variationId: string) => {
    setSelectedVariations(prev => 
      prev.includes(variationId) 
        ? prev.filter(id => id !== variationId)
        : [...prev, variationId]
    );
  };

  const handleCustomizeVariation = (variationId: string, updates: Partial<AdVariation>) => {
    setAdVariations(prev => prev.map(variation => 
      variation.variationId === variationId 
        ? { ...variation, ...updates }
        : variation
    ));
  };

  const handlePostAds = () => {
    // In a real app, this would integrate with social media APIs
    console.log('Posting selected variations:', selectedVariations);
    setCurrentStep('post');
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 'upload':
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h1 className="text-3xl font-semibold text-text mb-2">AdSpark AI</h1>
              <p className="text-muted-foreground">
                Upload your product image to generate AI-powered ad variations
              </p>
            </div>
            <ImageUploader onImageUpload={handleImageUpload} />
          </div>
        );

      case 'generate':
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-xl font-semibold mb-2">Generate Ad Variations</h2>
              <p className="text-muted-foreground">
                Create 5 unique ad variations with AI-generated visuals and copy
              </p>
            </div>
            {uploadedImage && (
              <div className="card p-4">
                <img 
                  src={uploadedImage} 
                  alt="Uploaded product" 
                  className="w-full h-48 object-cover rounded-md mb-4"
                />
                <CTAButton
                  variant={isGenerating ? 'disabled' : 'primary'}
                  onClick={handleGenerateAds}
                  disabled={isGenerating}
                >
                  {isGenerating ? 'Generating...' : 'Generate Ad Variations ($0.50)'}
                </CTAButton>
              </div>
            )}
          </div>
        );

      case 'customize':
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-xl font-semibold mb-2">Customize Your Ads</h2>
              <p className="text-muted-foreground">
                Select and customize the variations you want to test
              </p>
            </div>
            <div className="space-y-4">
              {adVariations.map((variation) => (
                <AdCard
                  key={variation.variationId}
                  variation={variation}
                  variant="editable"
                  isSelected={selectedVariations.includes(variation.variationId)}
                  onSelect={() => handleVariationSelect(variation.variationId)}
                  onCustomize={(updates) => handleCustomizeVariation(variation.variationId, updates)}
                />
              ))}
            </div>
            {selectedVariations.length > 0 && (
              <div className="space-y-4">
                <SocialConnect 
                  connectedAccounts={connectedAccounts}
                  onConnect={setConnectedAccounts}
                />
                <CTAButton
                  variant="primary"
                  onClick={handlePostAds}
                  disabled={!connectedAccounts.tiktok && !connectedAccounts.instagram}
                >
                  Post Selected Ads ({selectedVariations.length})
                </CTAButton>
              </div>
            )}
          </div>
        );

      case 'post':
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-xl font-semibold mb-2">Ads Posted Successfully!</h2>
              <p className="text-muted-foreground">
                Your ad variations are now live. Check back for performance metrics.
              </p>
            </div>
            <div className="card p-4 text-center">
              <p className="text-sm text-muted-foreground mb-4">
                Performance tracking will be available in 24-48 hours
              </p>
              <CTAButton
                variant="secondary"
                onClick={() => {
                  setCurrentStep('upload');
                  setUploadedImage(null);
                  setAdVariations([]);
                  setSelectedVariations([]);
                }}
              >
                Create New Campaign
              </CTAButton>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <AppShell>
      {renderCurrentStep()}
    </AppShell>
  );
}
