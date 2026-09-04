const TRACK_COPIES = 5;
const CENTER_COPY = 2;

function formatShift(shift) {
  return shift >= 0 ? `+${shift}` : `${shift}`;
}

function diffHighlight(expected, actual) {
  const exp = expected.toUpperCase();
  const act = actual.toUpperCase();
  const len = Math.max(exp.length, act.length);
  let html = "";
  for (let i = 0; i < len; i++) {
    const actChar = act[i];
    if (actChar === undefined) break;
    const expChar = exp[i];
    const safeChar = actChar
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
    const displayChar = actChar === " " ? "&nbsp;" : safeChar;
    const cls = actChar === expChar ? "match" : "mismatch";
    html += `<span class="${cls}">${displayChar}</span>`;
  }
  return html;
}

function isTaskComplete(task) {
  const state = collectTaskState(task);
  return state.transcriptionCorrect && state.shiftCorrect;
}

function buildSlidingAlphabet(container, startShift, onChange) {
  container.innerHTML = "";
  container.classList.add("wheel");

  const plainRow = document.createElement("div");
  plainRow.className = "wheel-row wheel-row--plain";
  for (const letter of ALPHABET) {
    const tile = document.createElement("div");
    tile.className = "wheel-tile";
    tile.textContent = letter;
    plainRow.appendChild(tile);
  }

  const viewport = document.createElement("div");
  viewport.className = "wheel-viewport";
  const cipherTrack = document.createElement("div");
  cipherTrack.className = "wheel-row wheel-row--cipher";
  cipherTrack.style.width = `${TRACK_COPIES * 100}%`;
  for (let i = 0; i < ALPHABET.length * TRACK_COPIES; i++) {
    const tile = document.createElement("div");
    tile.className = "wheel-tile wheel-tile--cipher";
    tile.textContent = ALPHABET[i % ALPHABET.length];
    cipherTrack.appendChild(tile);
  }
  viewport.appendChild(cipherTrack);

  const controls = document.createElement("div");
  controls.className = "wheel-controls";
  const minusBtn = document.createElement("button");
  minusBtn.type = "button";
  minusBtn.className = "wheel-btn";
  minusBtn.textContent = "-";
  minusBtn.setAttribute("aria-label", "Decrease shift");

  const plusBtn = document.createElement("button");
  plusBtn.type = "button";
  plusBtn.className = "wheel-btn";
  plusBtn.textContent = "+";
  plusBtn.setAttribute("aria-label", "Increase shift");

  const slider = document.createElement("input");
  slider.type = "range";
  slider.min = "-25";
  slider.max = "25";
  slider.value = String(startShift);
  slider.className = "wheel-slider";

  const readout = document.createElement("span");
  readout.className = "wheel-readout";

  const resetBtn = document.createElement("button");
  resetBtn.type = "button";
  resetBtn.className = "wheel-btn wheel-btn--reset";
  resetBtn.textContent = "Reset to shift 0";

  controls.append(minusBtn, slider, plusBtn, readout, resetBtn);

  container.append(plainRow, viewport, controls);

  const trackTileCount = ALPHABET.length * TRACK_COPIES;

  function setShift(shift) {
    const clamped = Math.max(-25, Math.min(25, shift));
    slider.value = String(clamped);
    readout.textContent = `Shift: ${formatShift(clamped)}`;
    const index = ALPHABET.length * CENTER_COPY - clamped;
    const percent = (index / trackTileCount) * 100;
    cipherTrack.style.transform = `translateX(-${percent}%)`;
    onChange(clamped);
  }

  minusBtn.addEventListener("click", () => setShift(parseInt(slider.value, 10) - 1));
  plusBtn.addEventListener("click", () => setShift(parseInt(slider.value, 10) + 1));
  slider.addEventListener("input", () => setShift(parseInt(slider.value, 10)));
  resetBtn.addEventListener("click", () => setShift(0));

  setShift(startShift);

  return { setShift };
}

function buildPhoneMock(task) {
  const phone = document.createElement("div");
  phone.className = "phone";

  const header = document.createElement("div");
  header.className = "phone-header";
  header.innerHTML = `
    <span class="phone-back">&lsaquo;</span>
    <span class="phone-avatar" aria-hidden="true"></span>
    <span class="phone-title">
      <strong>${task.agentName}</strong>
      <small>online</small>
    </span>
  `;

  const body = document.createElement("div");
  body.className = "phone-body";

  const msgBubble = document.createElement("div");
  msgBubble.className = "bubble bubble--incoming no-select";
  msgBubble.innerHTML = `<p>${task.chatMessage.text}</p><time>${task.chatMessage.time}</time>`;
  msgBubble.addEventListener("copy", (e) => e.preventDefault());
  msgBubble.addEventListener("contextmenu", (e) => e.preventDefault());

  const shiftBubble = document.createElement("div");
  shiftBubble.className = "bubble bubble--incoming bubble--shift";
  shiftBubble.innerHTML = `<p>${formatShift(task.shift)}</p><time>${task.shiftMessage.time}</time>`;

  body.append(msgBubble, shiftBubble);
  phone.append(header, body);
  return phone;
}

function buildEncodeCard(task) {
  const card = document.createElement("div");
  card.className = "encode-card no-select";
  card.addEventListener("copy", (e) => e.preventDefault());
  card.addEventListener("contextmenu", (e) => e.preventDefault());
  card.innerHTML = `
    <p class="encode-card__label">Message to encrypt</p>
    <p class="encode-card__text">${task.toEncrypt}</p>
    <p class="encode-card__shift">Shift key: <strong>${formatShift(task.shift)}</strong></p>
  `;
  return card;
}

function renderTask(task, onStateChange) {
  const panel = document.createElement("section");
  panel.className = "task-panel";
  panel.dataset.taskId = task.id;

  const heading = document.createElement("h2");
  heading.textContent = task.label;
  panel.appendChild(heading);

  const instructions = document.createElement("p");
  instructions.className = "instructions";
  instructions.textContent = task.instructions;
  panel.appendChild(instructions);

  const layout = document.createElement("div");
  layout.className = "task-layout";

  if (task.direction === "decode") {
    layout.appendChild(buildPhoneMock(task));
  } else {
    layout.appendChild(buildEncodeCard(task));
  }

  const workArea = document.createElement("div");
  workArea.className = "work-area";

  const inputLabel = document.createElement("label");
  inputLabel.className = "input-label";
  inputLabel.textContent = task.direction === "decode"
    ? "Type the encrypted message exactly as shown above:"
    : "Type your encrypted message:";
  const inputId = `input-${task.id}`;
  inputLabel.htmlFor = inputId;

  const textarea = document.createElement("textarea");
  textarea.id = inputId;
  textarea.className = "student-input";
  textarea.rows = 3;
  textarea.spellcheck = false;
  textarea.autocomplete = "off";
  textarea.addEventListener("paste", (e) => e.preventDefault());

  const feedback = document.createElement("div");
  feedback.className = "feedback";

  const checkBtn = document.createElement("button");
  checkBtn.type = "button";
  checkBtn.className = "check-btn";
  checkBtn.textContent = "Check my typing";

  const expectedInput = task.direction === "decode" ? task.chatMessage.text : task.expectedInput;

  function runCheck() {
    const typed = textarea.value;
    const isMatch = normalizeForComparison(typed) === normalizeForComparison(expectedInput);
    if (typed.trim() === "") {
      feedback.className = "feedback";
      feedback.innerHTML = "";
    } else if (isMatch) {
      feedback.className = "feedback feedback--correct";
      feedback.innerHTML = "&#10003; Matches exactly. Nice transcription!";
    } else {
      feedback.className = "feedback feedback--incorrect";
      feedback.innerHTML = `Not quite - check every letter and punctuation mark carefully:<br><span class="diff">${diffHighlight(expectedInput, typed)}</span>`;
    }
    onStateChange();
  }

  checkBtn.addEventListener("click", runCheck);

  const wheelHeading = document.createElement("h3");
  wheelHeading.textContent = "Sliding alphabet";

  const wheelHint = document.createElement("p");
  wheelHint.className = "wheel-hint";
  wheelHint.textContent = `Given shift key: ${formatShift(task.shift)} - move the slider until it matches.`;

  const wheelContainer = document.createElement("div");

  const outputLabel = document.createElement("p");
  outputLabel.className = "output-label";
  outputLabel.textContent = task.direction === "decode"
    ? "Live decoded message:"
    : "Live check - decoding what you typed above (should match the original message):";

  const output = document.createElement("p");
  output.className = "output-text";

  function updateOutput(shift) {
    const source = textarea.value;
    const placeholder = task.direction === "decode"
      ? "(type the message above to see it decoded)"
      : "(type your attempted encrypted message above to check it)";
    output.textContent = source.trim() === "" ? placeholder : decode(source, shift);
    onStateChange();
  }

  buildSlidingAlphabet(wheelContainer, 0, updateOutput);

  textarea.addEventListener("input", () => updateOutput(parseInt(wheelContainer.querySelector(".wheel-slider").value, 10)));

  workArea.append(inputLabel, textarea, checkBtn, feedback, wheelHeading, wheelHint, wheelContainer, outputLabel, output);
  layout.appendChild(workArea);
  panel.appendChild(layout);

  return panel;
}

function init() {
  const tabsEl = document.getElementById("taskTabs");
  const containerEl = document.getElementById("taskContainer");
  const tasks = TASKS_DATA.tasks;

  let unlockedCount = 1;

  function refreshLocks() {
    while (unlockedCount < tasks.length && isTaskComplete(tasks[unlockedCount - 1])) {
      unlockedCount++;
    }
    tabButtons.forEach((btn, i) => {
      const locked = i >= unlockedCount;
      btn.disabled = locked;
      btn.classList.toggle("tab--locked", locked);
      btn.title = locked ? `Complete ${tasks[i - 1].label} first` : "";
    });
  }

  const tabButtons = [];
  const panels = tasks.map((task) => renderTask(task, refreshLocks));

  tasks.forEach((task, i) => {
    const tab = document.createElement("button");
    tab.type = "button";
    tab.className = "tab";
    tab.innerHTML = `<span class="tab-lock" aria-hidden="true">&#128274;</span><span class="tab-label">${task.label}</span>`;
    tab.addEventListener("click", () => {
      tabsEl.querySelectorAll(".tab").forEach((t) => t.classList.remove("tab--active"));
      tab.classList.add("tab--active");
      panels.forEach((p) => p.classList.remove("task-panel--active"));
      panels[i].classList.add("task-panel--active");
    });
    tabsEl.appendChild(tab);
    tabButtons.push(tab);
    containerEl.appendChild(panels[i]);
  });

  if (tabsEl.firstChild) {
    tabsEl.firstChild.classList.add("tab--active");
    panels[0].classList.add("task-panel--active");
  }

  refreshLocks();

  const downloadBtn = document.getElementById("downloadBtn");
  const studentNameInput = document.getElementById("studentName");
  downloadBtn.addEventListener("click", () => generateWorkPDF(studentNameInput.value));

  const readingModeToggle = document.getElementById("readingModeToggle");
  let readingModeSaved = false;
  try {
    readingModeSaved = localStorage.getItem("encryptionWheelReadingMode") === "true";
  } catch (e) {
    // localStorage unavailable (e.g. private browsing) - default to off
  }
  document.body.classList.toggle("reading-mode", readingModeSaved);
  readingModeToggle.checked = readingModeSaved;
  readingModeToggle.addEventListener("change", () => {
    document.body.classList.toggle("reading-mode", readingModeToggle.checked);
    try {
      localStorage.setItem("encryptionWheelReadingMode", readingModeToggle.checked);
    } catch (e) {
      // ignore if storage is unavailable
    }
  });
}

document.addEventListener("DOMContentLoaded", init);
