const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

function mod(n, m) {
  return ((n % m) + m) % m;
}

function shiftChar(char, shift, mode) {
  const upper = char.toUpperCase();
  const index = ALPHABET.indexOf(upper);
  if (index === -1) return char;

  const newIndex = mode === "encode"
    ? mod(index - shift, 26)
    : mod(index + shift, 26);

  return ALPHABET[newIndex];
}

function caesarShift(text, shift, mode) {
  return text
    .split("")
    .map((char) => shiftChar(char, shift, mode))
    .join("");
}

function decode(ciphertext, shift) {
  return caesarShift(ciphertext, shift, "decode");
}

function encode(plaintext, shift) {
  return caesarShift(plaintext, shift, "encode");
}

function normalizeForComparison(text) {
  return text.trim().replace(/\s+/g, " ").toUpperCase();
}
