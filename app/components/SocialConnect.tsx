'use client';

import { useState } from 'react';
import { ExternalLink, Check } from 'lucide-react';

interface SocialConnectProps {
  connectedAccounts: {
    tiktok: boolean;
    instagram: boolean;
  };
  onConnect: (accounts: { tiktok: boolean; instagram: boolean }) => void;
}

export function SocialConnect({ connectedAccounts, onConnect }: SocialConnectProps) {
  const [isConnecting, setIsConnecting] = useState<'tiktok' | 'instagram' | null>(null);

  const handleConnect = async (platform: 'tiktok' | 'instagram') => {
    setIsConnecting(platform);
    
    // Simulate OAuth flow
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    onConnect({
      ...connectedAccounts,
      [platform]: true,
    });
    
    setIsConnecting(null);
  };

  const handleDisconnect = (platform: 'tiktok' | 'instagram') => {
    onConnect({
      ...connectedAccounts,
      [platform]: false,
    });
  };

  const SocialButton = ({ 
    platform, 
    connected, 
    isLoading 
  }: { 
    platform: 'tiktok' | 'instagram';
    connected: boolean;
    isLoading: boolean;
  }) => {
    const colors = {
      tiktok: 'from-black to-red-500',
      instagram: 'from-purple-500 to-pink-500',
    };

    return (
      <button
        onClick={() => connected ? handleDisconnect(platform) : handleConnect(platform)}
        disabled={isLoading}
        className={`card p-4 w-full text-left transition-all duration-150 ${
          connected ? 'bg-green-50 border-green-200' : 'hover:bg-gray-50'
        }`}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className={`w-10 h-10 bg-gradient-to-br ${colors[platform]} rounded-md flex items-center justify-center`}>
              <span className="text-white font-bold text-sm">
                {platform === 'tiktok' ? 'TT' : 'IG'}
              </span>
            </div>
            <div>
              <h3 className="font-medium capitalize">{platform}</h3>
              <p className="text-sm text-muted-foreground">
                {connected ? 'Connected' : 'Connect your account'}
              </p>
            </div>
          </div>
          <div className="flex items-center">
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin" />
            ) : connected ? (
              <Check className="w-5 h-5 text-green-600" />
            ) : (
              <ExternalLink className="w-5 h-5 text-muted-foreground" />
            )}
          </div>
        </div>
      </button>
    );
  };

  return (
    <div className="space-y-4">
      <div className="text-center">
        <h3 className="font-medium text-text mb-1">Connect Social Accounts</h3>
        <p className="text-sm text-muted-foreground">
          Connect your accounts to post ad variations directly
        </p>
      </div>
      
      <div className="space-y-3">
        <SocialButton
          platform="tiktok"
          connected={connectedAccounts.tiktok}
          isLoading={isConnecting === 'tiktok'}
        />
        <SocialButton
          platform="instagram"
          connected={connectedAccounts.instagram}
          isLoading={isConnecting === 'instagram'}
        />
      </div>
      
      {!connectedAccounts.tiktok && !connectedAccounts.instagram && (
        <div className="card p-3 bg-yellow-50 border-yellow-200">
          <p className="text-sm text-yellow-800">
            💡 Connect at least one account to post your ad variations
          </p>
        </div>
      )}
    </div>
  );
}
