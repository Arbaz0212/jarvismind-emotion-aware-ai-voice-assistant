let lastCall = 0;
const COOLDOWN = 4000; // 4 seconds

export function canCallLLM() {
  const now = Date.now();
  if (now - lastCall < COOLDOWN) return false;
  lastCall = now;
  return true;
}
