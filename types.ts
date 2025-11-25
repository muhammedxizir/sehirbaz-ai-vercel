
export enum Language {
  AZ = 'AZ',
  EN = 'EN',
  RU = 'RU',
  GE = 'GE'
}

export type ViewState = 'home' | 'pricing' | 'payment' | 'login' | 'register' | 'profile';

export interface UserUsage {
  video: number;
  image: number;
  audio: number;
}

export interface GeneratedContent {
  type: 'video' | 'image' | 'audio';
  url: string;
  prompt: string;
  timestamp?: number;
}

export interface User {
  name: string;
  email: string;
  plan: string;
  avatar?: string;
  usage: UserUsage;
  history: GeneratedContent[];
}

export interface Translation {
  heroTitle: string;
  heroSubtitle: string;
  ctaButton: string;
  videoTitle: string;
  videoDesc: string;
  videoFeatures: string[];
  langTitle: string;
  langDesc: string;
  imageTitle: string;
  imageDesc: string;
  imageFeatures: string[];
  voiceTitle: string;
  voiceDesc: string;
  voiceFeatures: string[];
  demoTitle: string;
  demoCategories: string[];
  demoItemBadge: string;
  demoItemTitle: string;
  playgroundTitle: string;
  playgroundDesc: string;
  pricingTitle: string;
  pricingSubtitle: string;
  pricingFeatures: string[];
  footerCopyright: string;
  navHome: string;
  navPricing: string;
  generateBtn: string;
  generating: string;
  download: string;
  promptPlaceholder: string;
  selectKey: string;
  loginRequired: string;
  
  // Marketing Quote
  marketingQuote: string;

  // Pricing specific
  planStarter: string;
  planPro: string;
  planEnterprise: string;
  planPopular: string;
  perMonth: string;
  btnChooseStarter: string;
  btnGoPro: string;
  btnContactSales: string;
  
  feat50Images: string;
  feat5MinsVideo: string;
  featStandardSpeed: string;
  feat30MinsVideo: string;
  featVoiceCloning: string;
  featUnlimited: string;
  featPrioritySupport: string;
  featApiAccess: string;

  // Playground specific
  tabVideo: string;
  tabImage: string;
  tabAudio: string;
  labelPrompt: string;
  labelTts: string;
  labelVoice: string;
  btnPreview: string;
  previewing: string;
  errorGeneric: string;
  errorRateLimit: string;
  errorInvalidKey: string;
  errorContentPolicy: string;
  errorNetwork: string;
  
  // New keys
  heroBadge: string;
  browserVideoSupport: string;
  
  // Accessibility
  altGenerated: string;
  altDemo: string;

  // Payment
  paymentTitle: string;
  paymentDesc: string;
  orderSummary: string;
  total: string;
  cardName: string;
  cardNumber: string;
  expiry: string;
  cvc: string;
  payNow: string;
  paymentSuccess: string;
  paymentSuccessDesc: string;
  backToHome: string;
  emailLabel: string;
  enterAmount: string;
  creditsReceived: string;
  topUpBtn: string;
  quickPayTitle: string;

  // Auth & Profile
  loginTitle: string;
  registerTitle: string;
  authSubtitle: string; 
  freeTrialBadge: string; 
  nameLabel: string;
  passwordLabel: string;
  confirmPasswordLabel: string; 
  signInBtn: string;
  signUpBtn: string;
  haveAccount: string;
  noAccount: string;
  profileTitle: string;
  currentPlan: string;
  usageStats: string;
  imagesGenerated: string;
  videosGenerated: string;
  logout: string;
  navLogin: string;
  navProfile: string;
  welcomeBack: string;
  
  // Profile Tabs & Settings
  tabOverview: string;
  tabHistory: string;
  tabSettings: string;
  noHistory: string;
  saveChanges: string;
  settingsSaved: string;
  showMore: string;
  showLess: string;
  
  // Legal & Features
  termsText: string;
  privacyText: string;
  authFeatureInstant: string;
  authFeatureHD: string;
  authFeatureSecure: string;
  
  // Gallery
  viewAll: string;

  // Usage Limits
  usageLimitReached: string;
  usageUpgradeMsg: string;
  usageRemaining: string;
  upgradePlan: string;

  // Magic Tools Section
  magicToolTitle: string;
  magicToolDesc: string;
  
  // Generative Suite Labels
  genTextToImage: string;
  genFill: string;
  genImageFromScene: string;
  genTextToVector: string;
  genRecolor: string;
  genTextEffects: string;
  genTemplate: string;
  genTextToVideo: string;
  genImageToVideo: string;
  genMusic: string;
  genSoundFx: string;
  genAvatar: string;
  genTextToSpeech: string;
  genVoiceToSfx: string;
  genLogo: string;

  // Quick Actions Labels
  qaTitle: string;
  qaRemoveBg: string;
  qaCropImage: string;
  qaMergeVideo: string;
  qaSubtitle: string;
  qaQrCode: string;
  qaCropVideo: string;
  qaResizeVideo: string;
  qaTrimVideo: string;
  qaConvertMp4: string;
  qaResizeImage: string;
  qaTranslateVideo: string;
  qaEnhanceSpeech: string;
  qaTranslateAudio: string;

  // Navigation Menu Categories
  navVideoTools: string;
  navImageTools: string;
  navAudioTools: string;

  // Beta Warning
  betaDisclaimer: string;
}