export async function initRevenueCat() {
  return { available: false, mock: true }
}

export async function getCustomerInfo() {
  return {
    activeSubscriptions: [],
    entitlements: { active: {} },
    mock: true
  }
}

export async function purchasePremium() {
  return {
    success: true,
    premium: true,
    mock: true
  }
}
