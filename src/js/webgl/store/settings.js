import { getGPUTier } from 'detect-gpu';

// Tier list -> tier: 1 (>= 15 fps), tier: 2 (>= 30 fps), tier: 3 (>= 60 fps)
const settings = { tier: 1 }
export async function init () {
  const { tier } = await getGPUTier()
  settings.tier = tier
  console.log('⚙️ device tier', tier)
}
export default settings
