// lib/ads.ts
export const ADSENSE_CLIENT = process.env.NEXT_PUBLIC_ADSENSE_CLIENT ?? '';
export const ADSENSE_SLOT_VIDEO = process.env.NEXT_PUBLIC_ADSENSE_SLOT_VIDEO ?? '';

export const GAM_NETWORK_CODE = process.env.NEXT_PUBLIC_GAM_NETWORK_CODE ?? '';
export const GAM_AD_UNIT = process.env.NEXT_PUBLIC_GAM_AD_UNIT ?? '';

// Treat the sample slot as "not configured" so we don't fire a broken ad request
const SAMPLE_SLOT = '1234567890';

export const ADSENSE_ENABLED =
  Boolean(ADSENSE_CLIENT) &&
  Boolean(ADSENSE_SLOT_VIDEO) &&
  ADSENSE_SLOT_VIDEO !== SAMPLE_SLOT;

export const GAM_ENABLED = Boolean(GAM_NETWORK_CODE) && Boolean(GAM_AD_UNIT);

// Which provider wins if both are set: AdSense for now, GAM is future-only
export type AdProvider = 'adsense' | 'gam' | 'none';
export const ACTIVE_AD_PROVIDER: AdProvider = ADSENSE_ENABLED
  ? 'adsense'
  : GAM_ENABLED
  ? 'gam'
  : 'none';