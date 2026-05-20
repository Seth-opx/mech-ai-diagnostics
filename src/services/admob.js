export async function initAdMob() {
  return { available: false, mock: true }
}

export async function showRewardedAd() {
  await new Promise(resolve => setTimeout(resolve, 700))
  return { rewarded: true, mock: true }
}
