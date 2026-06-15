import { useEffect } from 'react';
import { PortalState } from '../types';
import { loadFromLocalStorage, saveToLocalStorage } from '../utils/storage';

const PORTAL_STORAGE_KEY = 'portalData';

export function loadPortalState(defaultState: PortalState): PortalState {
  const savedState = loadFromLocalStorage<Partial<PortalState>>(PORTAL_STORAGE_KEY);
  if (!savedState) return defaultState;

  return {
    ...defaultState,
    ...savedState,
    businessInfo: { ...defaultState.businessInfo, ...(savedState.businessInfo ?? {}) },
    productInfo: { ...defaultState.productInfo, ...(savedState.productInfo ?? {}) },
    customerExperience: { ...defaultState.customerExperience, ...(savedState.customerExperience ?? {}) },
    orderManagement: { ...defaultState.orderManagement, ...(savedState.orderManagement ?? {}) },
    growthStrategy: { ...defaultState.growthStrategy, ...(savedState.growthStrategy ?? {}) },
    projectPriorities: savedState.projectPriorities ?? defaultState.projectPriorities,
    platformStrategy: { ...defaultState.platformStrategy, ...(savedState.platformStrategy ?? {}) },
    collaborationItems: savedState.collaborationItems ?? defaultState.collaborationItems,
    notes: savedState.notes ?? defaultState.notes,
    currentSection: typeof savedState.currentSection === 'number' ? savedState.currentSection : defaultState.currentSection,
  };
}

export function usePortalPersistence(state: PortalState): void {
  useEffect(() => {
    saveToLocalStorage(PORTAL_STORAGE_KEY, state);
  }, [state]);
}
