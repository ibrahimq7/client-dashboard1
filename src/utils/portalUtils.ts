import { PortalState, BusinessInfo, ProductInfo, CustomerExperience, OrderManagement, GrowthStrategy, ProjectPriority, PlatformStrategy } from '../types';

export interface PortalPayload {
  businessInformation: BusinessInfo;
  productInformation: ProductInfo;
  customerExperience: CustomerExperience;
  orderManagement: OrderManagement;
  growthStrategy: GrowthStrategy;
  projectPriorities: ProjectPriority[];
  platformStrategy: PlatformStrategy;
  notes: string;
  collaborationItems?: PortalState['collaborationItems'];
}

export function createPortalPayload(state: PortalState): PortalPayload {
  return {
    businessInformation: state.businessInfo,
    productInformation: state.productInfo,
    customerExperience: state.customerExperience,
    orderManagement: state.orderManagement,
    growthStrategy: state.growthStrategy,
    projectPriorities: state.projectPriorities,
    platformStrategy: state.platformStrategy,
    notes: state.notes,
    collaborationItems: state.collaborationItems,
  };
}
