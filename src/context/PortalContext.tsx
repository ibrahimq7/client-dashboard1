import { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { loadPortalState, usePortalPersistence } from '../hooks/usePortalPersistence';
import { PortalState, Stage, BusinessInfo, ProductInfo, CustomerExperience, OrderManagement, GrowthStrategy, ProjectPriority, PlatformStrategy, CollaborationItem } from '../types';

interface PortalContextType {
  state: PortalState;
  setCurrentSection: (section: number) => void;
  updateBusinessInfo: (info: Partial<BusinessInfo>) => void;
  updateProductInfo: (info: Partial<ProductInfo>) => void;
  updateCustomerExperience: (exp: Partial<CustomerExperience>) => void;
  updateOrderManagement: (mgmt: Partial<OrderManagement>) => void;
  updateGrowthStrategy: (strategy: Partial<GrowthStrategy>) => void;
  updateProjectPriorities: (priorities: ProjectPriority[]) => void;
  updatePlatformStrategy: (strategy: Partial<PlatformStrategy>) => void;
  updateNotes: (notes: string) => void;
  addCollaborationItem: (item: Omit<CollaborationItem, 'id' | 'timestamp' | 'resolved' | 'responses'>) => void;
  calculateOverallProgress: () => Stage;
}

const defaultPriorities: ProjectPriority[] = [
  { id: 'speed', name: 'Launch Speed', description: 'Priority on getting to market quickly' },
  { id: 'budget', name: 'Budget Efficiency', description: 'Priority on cost-effectiveness' },
  { id: 'scale', name: 'Scalability', description: 'Priority on long-term growth capacity' },
  { id: 'custom', name: 'Customization', description: 'Priority on unique features' },
  { id: 'premium', name: 'Premium Experience', description: 'Priority on exceptional UX' },
  { id: 'security', name: 'Security', description: 'Priority on data protection' },
  { id: 'growth', name: 'Growth Potential', description: 'Priority on expansion features' },
];

const initialState: PortalState = {
  currentSection: -1,
  businessInfo: { companyName: '', industry: '', businessModel: '', targetCustomers: '', countriesOfOperation: [], targetGCCMarkets: [], businessGoals: [] },
  productInfo: { productCount: '', productCategories: [], hasBrands: false, hasColorVariations: false, hasSizeVariations: false, inventorySize: '', futureExpansion: '' },
  customerExperience: { advancedSearch: false, productFilters: false, wishlist: false, customerAccounts: false, productReviews: false, recommendations: false, multiLanguage: false, multiCurrency: false, promotions: false, discountSystems: false, loyaltyPrograms: false },
  orderManagement: { orderReceivingMethod: '', deliveryProcess: '', paymentMethods: [], notifications: [], customerSupport: '' },
  growthStrategy: { expansionCountries: [], mobileApp: false, mobileAppTimeline: '', marketplaceExpansion: [], erpIntegrations: [], crmIntegrations: [] },
  projectPriorities: defaultPriorities,
  platformStrategy: { selectedPlatform: null },
  collaborationItems: [],
  notes: '',
};

const PortalContext = createContext<PortalContextType | undefined>(undefined);

export function PortalProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<PortalState>(() => loadPortalState(initialState));
  usePortalPersistence(state);

  const setCurrentSection = useCallback((section: number) => setState(prev => ({ ...prev, currentSection: section })), []);
  const updateBusinessInfo = useCallback((info: Partial<BusinessInfo>) => setState(prev => ({ ...prev, businessInfo: { ...prev.businessInfo, ...info } })), []);
  const updateProductInfo = useCallback((info: Partial<ProductInfo>) => setState(prev => ({ ...prev, productInfo: { ...prev.productInfo, ...info } })), []);
  const updateCustomerExperience = useCallback((exp: Partial<CustomerExperience>) => setState(prev => ({ ...prev, customerExperience: { ...prev.customerExperience, ...exp } })), []);
  const updateOrderManagement = useCallback((mgmt: Partial<OrderManagement>) => setState(prev => ({ ...prev, orderManagement: { ...prev.orderManagement, ...mgmt } })), []);
  const updateGrowthStrategy = useCallback((strategy: Partial<GrowthStrategy>) => setState(prev => ({ ...prev, growthStrategy: { ...prev.growthStrategy, ...strategy } })), []);
  const updateProjectPriorities = useCallback((priorities: ProjectPriority[]) => setState(prev => ({ ...prev, projectPriorities: priorities })), []);
  const updatePlatformStrategy = useCallback((strategy: Partial<PlatformStrategy>) => setState(prev => ({ ...prev, platformStrategy: { ...prev.platformStrategy, ...strategy } })), []);
  const updateNotes = useCallback((notes: string) => setState(prev => ({ ...prev, notes })), []);

  const addCollaborationItem = useCallback((item: Omit<CollaborationItem, 'id' | 'timestamp' | 'resolved' | 'responses'>) => {
    const newItem: CollaborationItem = { ...item, id: crypto.randomUUID(), timestamp: new Date(), resolved: false, responses: [] };
    setState(prev => ({ ...prev, collaborationItems: [...prev.collaborationItems, newItem] }));
  }, []);

  const calculateOverallProgress = useCallback((): Stage => {
    const { businessInfo, productInfo, customerExperience, orderManagement, platformStrategy } = state;
    let score = 0;
    if (businessInfo.companyName || businessInfo.industry) score += 1;
    if (businessInfo.targetGCCMarkets.length > 0) score += 1;
    if (productInfo.productCount) score += 1;
    if (productInfo.productCategories.length > 0) score += 1;
    if (Object.values(customerExperience).some(v => v)) score += 1;
    if (orderManagement.orderReceivingMethod) score += 1;
    if (platformStrategy.selectedPlatform) score += 2;
    if (score <= 2) return 'initial';
    if (score <= 5) return 'developing';
    if (score <= 7) return 'advanced';
    return 'project_ready';
  }, [state]);

  return (
    <PortalContext.Provider value={{ state, setCurrentSection, updateBusinessInfo, updateProductInfo, updateCustomerExperience, updateOrderManagement, updateGrowthStrategy, updateProjectPriorities, updatePlatformStrategy, updateNotes, addCollaborationItem, calculateOverallProgress }}>
      {children}
    </PortalContext.Provider>
  );
}

export function usePortal() {
  const context = useContext(PortalContext);
  if (!context) throw new Error('usePortal must be used within PortalProvider');
  return context;
}
