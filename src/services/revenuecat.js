// RevenueCat service (placeholder - to be implemented after APK stable)
export async function initRevenueCat() {
  console.log('RevenueCat init (placeholder)')
  return { isConfigured: false }
}

export async function checkPremiumStatus() {
  return { isPremium: false, entitlement: null }
}

export async function purchasePackage(packageId) {
  throw new Error('RevenueCat not configured yet')
}