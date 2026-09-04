const TICKER_COLORS = ["#12958a", "#e17a34", "#ffffff", "#f4c542"];
const TICKER_PIECE_COUNT = 70;

function prefersReducedMotion() {
  return window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function launchTickerTape() {
  if (prefersReducedMotion()) return;

  const container = document.createElement("div");
  container.className = "ticker-tape";
  container.setAttribute("aria-hidden", "true");

  for (let i = 0; i < TICKER_PIECE_COUNT; i++) {
    const piece = document.createElement("span");
    piece.className = "ticker-tape__piece";
    piece.style.left = `${Math.random() * 100}%`;
    piece.style.background = TICKER_COLORS[Math.floor(Math.random() * TICKER_COLORS.length)];
    piece.style.animationDelay = `${Math.random() * 0.35}s`;
    piece.style.animationDuration = `${2.2 + Math.random() * 1.3}s`;
    piece.style.setProperty("--rot", `${Math.random() * 360}deg`);
    piece.style.setProperty("--spin", `${360 + Math.random() * 360}deg`);
    piece.style.setProperty("--drift", `${(Math.random() - 0.5) * 220}px`);
    container.appendChild(piece);
  }

  document.body.appendChild(container);
  setTimeout(() => container.remove(), 3800);
}

let audioCtx = null;

function getAudioContext() {
  const AudioContextClass = window.AudioContext || window.webkitAudioContext;
  if (!AudioContextClass) return null;
  if (!audioCtx) audioCtx = new AudioContextClass();
  if (audioCtx.state === "suspended") audioCtx.resume();
  return audioCtx;
}

function playSuccessChime() {
  const ctx = getAudioContext();
  if (!ctx) return;

  const notes = [523.25, 659.25, 783.99]; // C5, E5, G5 - a short happy arpeggio
  const now = ctx.currentTime;

  notes.forEach((freq, i) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "sine";
    osc.frequency.value = freq;

    const start = now + i * 0.09;
    gain.gain.setValueAtTime(0, start);
    gain.gain.linearRampToValueAtTime(0.18, start + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.001, start + 0.35);

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(start);
    osc.stop(start + 0.4);
  });
}

function celebrateTaskComplete() {
  launchTickerTape();
  playSuccessChime();
}
