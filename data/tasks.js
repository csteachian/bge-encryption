/*
  This file holds all the classroom challenges as plain JSON data
  (it's a .js file only so the page can load it locally with a
  double-click, without hitting browser file:// security blocks -
  everything inside TASKS_DATA is standard JSON).

  Edit the "tasks" array to change or add challenges. Each task needs
  a unique "id". "direction" is either:
    - "decode": students transcribe an incoming coded message and
      figure out what it says.
    - "encode": students are given a plain message and must write the
      coded version of it.
  "shift" is the Caesar shift key - it can be positive (shift right)
  or negative (shift left).

  "_answerKey" fields are only notes for the teacher editing this file.
  They are never shown to students and are not used by the tool.
*/
const TASKS_DATA = {
  "tasks": [
    {
      "id": "cipher1",
      "label": "Cipher 1",
      "direction": "decode",
      "shift": 3,
      "agentName": "Agent J",
      "chatMessage": { "text": "F KBBA EBIM CFKAFKD QEB EFAABK GBTBIP. PBKA XDBKQ U.", "time": "09:36" },
      "shiftMessage": { "time": "09:36" },
      "instructions": "Agent J has sent you a coded message. Type the encrypted message exactly as it appears in the chat bubble above, then use the sliding alphabet below to reveal what it says.",
      "_answerKey": "I NEED HELP FINDING THE HIDDEN JEWELS. SEND AGENT X."
    },
    {
      "id": "cipher2",
      "label": "Cipher 2",
      "direction": "decode",
      "shift": -16,
      "agentName": "Agent J",
      "chatMessage": { "text": "QWUDJ N XQI RUUD SQFJKHUT! JXUO XQLU ULYB WKQHT CEDAUOI MYJX HEREJYS BUWI. MU DUUT RQSAKF!", "time": "11:13" },
      "shiftMessage": { "time": "11:14" },
      "instructions": "Another message has come in from Agent J - it sounds urgent. Type the encrypted message exactly as shown, then slide the alphabet to the shift key given to decode it.",
      "_answerKey": "AGENT X HAS BEEN CAPTURED! THEY HAVE EVIL GUARD MONKEYS WITH ROBOTIC LEGS. WE NEED BACKUP!"
    },
    {
      "id": "cipher3",
      "label": "Cipher 3",
      "direction": "encode",
      "shift": -12,
      "toEncrypt": "CYBORG MONKEYS ARE SCARED OF COMPUTER MICE. CARRY ONE AT ALL TIMES.",
      "instructions": "Time to send a reply! Use the sliding alphabet and the shift key given to encrypt the message below, then type your encrypted version into the box.",
      "expectedInput": "OKNADS YAZWQKE MDQ EOMDQP AR OAYBGFQD YUOQ. OMDDK AZQ MF MXX FUYQE.",
      "_answerKey": "Shift is -12 here, not -14 as printed in the original booklet's answer key - -12 is the value that actually reproduces this expected ciphertext. Worth fixing in the source document too."
    },
    {
      "id": "cipher4",
      "label": "Cipher 4",
      "direction": "decode",
      "shift": -9,
      "agentName": "Agent J",
      "chatMessage": { "text": "CQJWTB CQJC FXATNM! JPNWC G JWM R QJEN CQN SNFNUB JWM JAN ANCDAWRWP CX QZ.", "time": "11:14" },
      "shiftMessage": { "time": "11:15" },
      "instructions": "One final message has arrived from Agent J. Type it out exactly, then decode it to find out what happened.",
      "_answerKey": "THANKS THAT WORKED! AGENT X AND I HAVE THE JEWELS AND ARE RETURNING TO HQ."
    }
  ]
};
