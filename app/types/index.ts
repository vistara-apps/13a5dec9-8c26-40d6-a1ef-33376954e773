export interface User {
  userId: string;
  farcasterId?: string;
  connectedSocialAccounts: {
    tiktok?: boolean;
    instagram?: boolean;
  };
}

export interface AdCampaign {
  campaignId: string;
  userId: string;
  productImage: string;
  createdAt: Date;
  status: 'draft' | 'generating' | 'ready' | 'posted';
}

export interface AdVariation {
  variationId: string;
  campaignId: string;
  generatedVisual: string;
  generatedCopy: {
    headline: string;
    bodyText: string;
    cta: string;
  };
  customizedVisual?: string;
  customizedCopy?: {
    headline: string;
    bodyText: string;
    cta: string;
  };
  postStatus: 'draft' | 'posted' | 'failed';
  performanceMetrics?: {
    views: number;
    likes: number;
    shares: number;
    clicks: number;
  };
}

export interface SocialAccount {
  platform: 'tiktok' | 'instagram';
  accountId: string;
  accessToken: string;
  isConnected: boolean;
}
