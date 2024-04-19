import { FeatureFlags } from '@/shared/types/featureFlags';

let featuresFlags: FeatureFlags;

export function setFeatureFlags(newFeatureFlags?: FeatureFlags) {
  if (newFeatureFlags) {
    featuresFlags = newFeatureFlags;
  }
}

export function getFeatureFlags(flag: keyof FeatureFlags) {
  return featuresFlags[flag];
}
