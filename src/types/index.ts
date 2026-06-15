export type Stage = 'initial' | 'developing' | 'advanced' | 'project_ready';
export type PlatformType = 'managed' | 'enterprise' | null;

export interface BusinessInfo {
  companyName: string;
  industry: string;
  businessModel: string;
  targetCustomers: string;
  countriesOfOperation: string[];
  targetGCCMarkets: string[];
  businessGoals: string[];
}

export interface ProductInfo {
  productCount: string;
  productCategories: string[];
  hasBrands: boolean;
  hasColorVariations: boolean;
  hasSizeVariations: boolean;
  inventorySize: string;
  futureExpansion: string;
}

export interface CustomerExperience {
  advancedSearch: boolean;
  productFilters: boolean;
  wishlist: boolean;
  customerAccounts: boolean;
  productReviews: boolean;
  recommendations: boolean;
  multiLanguage: boolean;
  multiCurrency: boolean;
  promotions: boolean;
  discountSystems: boolean;
  loyaltyPrograms: boolean;
}

export interface OrderManagement {
  orderReceivingMethod: string;
  deliveryProcess: string;
  paymentMethods: string[];
  notifications: string[];
  customerSupport: string;
}

export interface GrowthStrategy {
  expansionCountries: string[];
  mobileApp: boolean;
  mobileAppTimeline: string;
  marketplaceExpansion: string[];
  erpIntegrations: string[];
  crmIntegrations: string[];
}

export interface ProjectPriority {
  id: string;
  name: string;
  description: string;
}

export interface PlatformStrategy {
  selectedPlatform: PlatformType;
}

export interface CollaborationItem {
  id: string;
  type: 'question' | 'note' | 'clarification' | 'change_request' | 'suggestion';
  content: string;
  section: string;
  timestamp: Date;
  resolved: boolean;
  responses: { id: string; content: string; timestamp: Date; }[];
}

export interface PortalState {
  currentSection: number;
  businessInfo: BusinessInfo;
  productInfo: ProductInfo;
  customerExperience: CustomerExperience;
  orderManagement: OrderManagement;
  growthStrategy: GrowthStrategy;
  projectPriorities: ProjectPriority[];
  platformStrategy: PlatformStrategy;
  collaborationItems: CollaborationItem[];
  notes: string;
}
