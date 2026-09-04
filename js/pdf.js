function collectTaskState(task) {
  const panel = document.querySelector(`[data-task-id="${task.id}"]`);
  if (!panel) {
    return { task, studentInput: "", studentShift: 0, liveOutput: "", givenMessage: "", attempted: false, transcriptionCorrect: false, shiftCorrect: false };
  }
  const studentInput = panel.querySelector(".student-input").value;
  const studentShift = parseInt(panel.querySelector(".wheel-slider").value, 10);
  const liveOutput = panel.querySelector(".output-text").textContent;
  const expectedInput = task.direction === "decode" ? task.chatMessage.text : task.expectedInput;
  const givenMessage = task.direction === "decode" ? task.chatMessage.text : task.toEncrypt;
  const attempted = studentInput.trim() !== "";
  const transcriptionCorrect = attempted && normalizeForComparison(studentInput) === normalizeForComparison(expectedInput);
  const shiftCorrect = studentShift === task.shift;

  return { task, studentInput, studentShift, liveOutput, givenMessage, attempted, transcriptionCorrect, shiftCorrect };
}

function summaryFor(state) {
  const { attempted, transcriptionCorrect, shiftCorrect, task } = state;
  const inputLabel = task.direction === "decode" ? "transcription" : "typed answer";

  if (!attempted) return "No answer typed in yet for this task.";
  if (transcriptionCorrect && shiftCorrect) return "Correct! Both the shift key and the " + inputLabel + " are accurate.";
  if (!transcriptionCorrect && shiftCorrect) return "Shift key is correct, but there is an error in the " + inputLabel + " - check it letter by letter against the original.";
  if (transcriptionCorrect && !shiftCorrect) return "The " + inputLabel + " is accurate, but the chosen shift key does not match the one given for this task.";
  return "There are errors in both the shift key and the " + inputLabel + " - check both against the task.";
}

function generateWorkPDF(studentName) {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  const marginX = 18;
  const maxWidth = 174;
  const pageHeight = 287;
  let y = 20;

  function ensureSpace(lines, lineHeight) {
    if (y + lines * lineHeight > pageHeight) {
      doc.addPage();
      y = 20;
    }
  }

  function writeLine(text, { font = "helvetica", style = "normal", size = 11, color = [20, 20, 20], gap = 6 } = {}) {
    doc.setFont(font, style);
    doc.setFontSize(size);
    doc.setTextColor(color[0], color[1], color[2]);
    ensureSpace(1, gap);
    doc.text(text, marginX, y);
    y += gap;
  }

  function writeWrapped(text, { font = "courier", style = "normal", size = 11, color = [20, 20, 20], gap = 6 } = {}) {
    doc.setFont(font, style);
    doc.setFontSize(size);
    doc.setTextColor(color[0], color[1], color[2]);
    const lines = doc.splitTextToSize(text, maxWidth);
    ensureSpace(lines.length, gap);
    doc.text(lines, marginX, y);
    y += lines.length * gap;
  }

  writeLine("Encryption Wheel - Student Work", { font: "helvetica", style: "bold", size: 18, gap: 9 });
  writeLine(`Name: ${studentName || "(not entered)"}`, { size: 11 });
  writeLine(`Generated: ${new Date().toLocaleString()}`, { size: 11, gap: 10 });

  TASKS_DATA.tasks.forEach((task) => {
    const state = collectTaskState(task);

    ensureSpace(1, 8);
    doc.setDrawColor(200, 200, 200);
    doc.line(marginX, y, marginX + maxWidth, y);
    y += 8;

    writeLine(`${task.label} (${task.direction === "encode" ? "encode" : "decode"} task)`, {
      style: "bold",
      size: 14,
      color: [18, 105, 96],
      gap: 8,
    });

    writeLine(task.direction === "decode" ? "Encrypted message given:" : "Message to encrypt:", { size: 10.5, gap: 6 });
    writeWrapped(state.givenMessage, { size: 11, gap: 6 });
    y += 2;

    writeLine(`Given shift key: ${formatShift(task.shift)}`, { size: 10.5, gap: 6 });
    writeLine(
      `Student's chosen shift key: ${formatShift(state.studentShift)}${state.shiftCorrect ? " (correct)" : " (does not match)"}`,
      { size: 10.5, gap: 8 }
    );

    writeLine(task.direction === "decode" ? "Student typed (transcription):" : "Student typed (their encrypted answer):", { size: 10.5, gap: 6 });
    writeWrapped(state.attempted ? state.studentInput : "(nothing typed)", { size: 11, gap: 6 });
    y += 2;

    writeLine(task.direction === "decode" ? "Decrypted message (using student's shift):" : "Encoded preview (using student's shift):", { size: 10.5, gap: 6 });
    writeWrapped(state.liveOutput, { size: 11, gap: 6 });
    y += 2;

    const summaryColor = !state.attempted
      ? [120, 120, 120]
      : state.transcriptionCorrect && state.shiftCorrect
      ? [20, 120, 80]
      : [170, 50, 50];

    writeWrapped(`Summary: ${summaryFor(state)}`, { font: "helvetica", style: "italic", size: 10.5, color: summaryColor, gap: 6 });
    y += 6;
  });

  const safeName = (studentName || "student").trim().replace(/[^a-z0-9]+/gi, "_").toLowerCase() || "student";
  doc.save(`encryption-wheel-${safeName}.pdf`);
}
