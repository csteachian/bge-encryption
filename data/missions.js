/*
  This file holds all four spy missions as plain JSON data
  (it's a .js file only so the page can load it locally with a
  double-click, without hitting browser file:// security blocks -
  everything inside MISSIONS_DATA is standard JSON).

  Each mission has an "id", "title", "tagline", and a "tasks" array of
  five challenges. Each task needs a unique "id" (prefixed with the
  mission id, e.g. "nightfall-1"). "direction" is either:
    - "decode": students transcribe an incoming coded message and
      figure out what it says.
    - "encode": students are given a plain message and must write the
      coded version of it.
  "shift" is the Caesar shift key - it can be positive (shift right)
  or negative (shift left). It is never shown to students directly on
  a decode task (that's the puzzle) - only on the encode task, where
  the instructions say the shift key is given.

  Optional per-task fields:
    - "alphabetHint": { "revealCount": N } - shows a partially filled
      cipher alphabet grid with N letters revealed (challenges 1 & 2).
    - "cribWord": a single word known to appear in the decoded message,
      shown as a hint instead of any alphabet (challenge 4).
      Challenge 5 has neither field - no clues at all.

  "_answerKey" fields are only notes for the teacher editing this file.
  They are never shown to students and are not used by the tool.
*/
const MISSIONS_DATA = {
  "missions": [
    {
      "id": "nightfall",
      "title": "Operation Nightfall",
      "tagline": "Intercept enemy chatter and warn a safehouse team before a midnight raid.",
      "tasks": [
        {
          "id": "nightfall-1",
          "label": "Cipher 1",
          "direction": "decode",
          "shift": -3,
          "agentName": "Agent Frost",
          "chatMessage": {
            "text": "WKH UDLG EHJLQV DW PLGQLJKW",
            "time": "23:41"
          },
          "instructions": "Agent Frost has intercepted enemy radio chatter. Type the coded message exactly as shown, then use the partly-completed cipher alphabet below and the sliding alphabet to work out the shift.",
          "_answerKey": "THE RAID BEGINS AT MIDNIGHT",
          "alphabetHint": {
            "revealCount": 8
          }
        },
        {
          "id": "nightfall-2",
          "label": "Cipher 2",
          "direction": "decode",
          "shift": 9,
          "agentName": "Agent Frost",
          "chatMessage": {
            "text": "KRIXVK ZJ KYV IZMVIJZUV JRWVYFLJV",
            "time": "23:52"
          },
          "instructions": "A second burst of chatter has come through, and this time only a few letters of the cipher alphabet are filled in. Type the message exactly as shown, then use the clues and the sliding alphabet to crack it.",
          "_answerKey": "TARGET IS THE RIVERSIDE SAFEHOUSE",
          "alphabetHint": {
            "revealCount": 3
          }
        },
        {
          "id": "nightfall-3",
          "label": "Cipher 3",
          "direction": "encode",
          "shift": -14,
          "toEncrypt": "EVACUATE THE BUILDING NOW",
          "instructions": "The safehouse team needs an urgent warning sent back to them. Use the sliding alphabet and the shift key given to encrypt the message below, then type your encrypted version into the box.",
          "expectedInput": "SJOQIOHS HVS PIWZRWBU BCK",
          "_answerKey": "SJOQIOHS HVS PIWZRWBU BCK"
        },
        {
          "id": "nightfall-4",
          "label": "Cipher 4",
          "direction": "decode",
          "shift": 5,
          "agentName": "Agent Frost",
          "chatMessage": {
            "text": "VBZIO AJS XJIADMHN OZVH DN NVAZ",
            "time": "00:17"
          },
          "instructions": "No cipher alphabet this time - just a single crib word. Find where it appears in the coded text to work out the shift, then decode the rest of the message.",
          "_answerKey": "AGENT FOX CONFIRMS TEAM IS SAFE",
          "cribWord": "AGENT"
        },
        {
          "id": "nightfall-5",
          "label": "Cipher 5",
          "direction": "decode",
          "shift": -19,
          "agentName": "Agent Frost",
          "chatMessage": {
            "text": "PX FTWX BM HNM CNLM BG MBFX",
            "time": "00:29"
          },
          "instructions": "The final message has arrived with no clues at all. Type it out exactly, then slide the alphabet through every shift until it reveals what happened.",
          "_answerKey": "WE MADE IT OUT JUST IN TIME"
        }
      ]
    },
    {
      "id": "embassy",
      "title": "The Embassy Leak",
      "tagline": "Decode dead-drop messages to identify a mole inside an embassy before they strike again.",
      "tasks": [
        {
          "id": "embassy-1",
          "label": "Cipher 1",
          "direction": "decode",
          "shift": 6,
          "agentName": "Agent Vale",
          "chatMessage": {
            "text": "NBY GIFY GYYNM NBYCL WIHNUWN UN HIIH",
            "time": "08:02"
          },
          "instructions": "Agent Vale has passed you a dead-drop message. Type the coded message exactly as shown, then use the partly-completed cipher alphabet below and the sliding alphabet to work out the shift.",
          "_answerKey": "THE MOLE MEETS THEIR CONTACT AT NOON",
          "alphabetHint": {
            "revealCount": 8
          }
        },
        {
          "id": "embassy-2",
          "label": "Cipher 2",
          "direction": "decode",
          "shift": -10,
          "agentName": "Agent Vale",
          "chatMessage": {
            "text": "VYYU PYB DRO KQOXD GOKBSXQ K BON CMKBP",
            "time": "08:19"
          },
          "instructions": "Another dead-drop, with fewer letters of the cipher alphabet filled in this time. Type the message exactly as shown, then use the clues and the sliding alphabet to crack it.",
          "_answerKey": "LOOK FOR THE AGENT WEARING A RED SCARF",
          "alphabetHint": {
            "revealCount": 3
          }
        },
        {
          "id": "embassy-3",
          "label": "Cipher 3",
          "direction": "encode",
          "shift": 12,
          "toEncrypt": "SUSPECT SPOTTED NEAR THE LIBRARY",
          "instructions": "You need to send word back to Agent Vale. Use the sliding alphabet and the shift key given to encrypt the message below, then type your encrypted version into the box.",
          "expectedInput": "GIGDSQH GDCHHSR BSOF HVS ZWPFOFM",
          "_answerKey": "GIGDSQH GDCHHSR BSOF HVS ZWPFOFM"
        },
        {
          "id": "embassy-4",
          "label": "Cipher 4",
          "direction": "decode",
          "shift": -4,
          "agentName": "Agent Vale",
          "chatMessage": {
            "text": "QMWWMSR JMPIW AIVI GSTMIH PEWX RMKLX",
            "time": "08:47"
          },
          "instructions": "No cipher alphabet this time - just a single crib word. Find where it appears in the coded text to work out the shift, then decode the rest of the message.",
          "_answerKey": "MISSION FILES WERE COPIED LAST NIGHT",
          "cribWord": "MISSION"
        },
        {
          "id": "embassy-5",
          "label": "Cipher 5",
          "direction": "decode",
          "shift": 17,
          "agentName": "Agent Vale",
          "chatMessage": {
            "text": "CQN VXUN RB CQN NVKJBBH LQNO",
            "time": "09:01"
          },
          "instructions": "The final dead-drop has arrived with no clues at all. Type it out exactly, then slide the alphabet through every shift until it reveals the mole's identity.",
          "_answerKey": "THE MOLE IS THE EMBASSY CHEF"
        }
      ]
    },
    {
      "id": "countdown",
      "title": "Countdown to Zero",
      "tagline": "Decode clues fast enough to locate and defuse a planted device.",
      "tasks": [
        {
          "id": "countdown-1",
          "label": "Cipher 1",
          "direction": "decode",
          "shift": -8,
          "agentName": "Command",
          "chatMessage": {
            "text": "BPM LMDQKM QA PQLLMV QV BPM WTL KTWKS BWEMZ",
            "time": "14:10"
          },
          "instructions": "Command has sent word of a planted device. Type the coded message exactly as shown, then use the partly-completed cipher alphabet below and the sliding alphabet to work out the shift.",
          "_answerKey": "THE DEVICE IS HIDDEN IN THE OLD CLOCK TOWER",
          "alphabetHint": {
            "revealCount": 8
          }
        },
        {
          "id": "countdown-2",
          "label": "Cipher 2",
          "direction": "decode",
          "shift": 13,
          "agentName": "Command",
          "chatMessage": {
            "text": "LBH UNIR GRA ZVAHGRF ERZNVAVAT",
            "time": "14:16"
          },
          "instructions": "A follow-up message has come through, with fewer letters of the cipher alphabet filled in this time. Type the message exactly as shown, then use the clues and the sliding alphabet to crack it.",
          "_answerKey": "YOU HAVE TEN MINUTES REMAINING",
          "alphabetHint": {
            "revealCount": 3
          }
        },
        {
          "id": "countdown-3",
          "label": "Cipher 3",
          "direction": "encode",
          "shift": -6,
          "toEncrypt": "SEND THE BOMB SQUAD IMMEDIATELY",
          "instructions": "You need to call in backup. Use the sliding alphabet and the shift key given to encrypt the message below, then type your encrypted version into the box.",
          "expectedInput": "YKTJ ZNK HUSH YWAGJ OSSKJOGZKRE",
          "_answerKey": "YKTJ ZNK HUSH YWAGJ OSSKJOGZKRE"
        },
        {
          "id": "countdown-4",
          "label": "Cipher 4",
          "direction": "decode",
          "shift": 10,
          "agentName": "Command",
          "chatMessage": {
            "text": "SECCQDT IQOI SKJ JXU RBKU MYHU",
            "time": "14:27"
          },
          "instructions": "No cipher alphabet this time - just a single crib word. Find where it appears in the coded text to work out the shift, then decode the rest of the message.",
          "_answerKey": "COMMAND SAYS CUT THE BLUE WIRE",
          "cribWord": "COMMAND"
        },
        {
          "id": "countdown-5",
          "label": "Cipher 5",
          "direction": "decode",
          "shift": -21,
          "agentName": "Command",
          "chatMessage": {
            "text": "OCZ XJPIOYJRI CVN WZZI NOJKKZY",
            "time": "14:30"
          },
          "instructions": "The final message has arrived with no clues at all. Type it out exactly, then slide the alphabet through every shift until it reveals the outcome.",
          "_answerKey": "THE COUNTDOWN HAS BEEN STOPPED"
        }
      ]
    },
    {
      "id": "doubleagent",
      "title": "The Double Agent",
      "tagline": "Investigate whether a colleague is secretly working for the enemy, without tipping them off.",
      "tasks": [
        {
          "id": "doubleagent-1",
          "label": "Cipher 1",
          "direction": "decode",
          "shift": 4,
          "agentName": "Agent Reyes",
          "chatMessage": {
            "text": "UKQN LWNPJAN DWO XAAJ WYPEJC OPNWJCAHU",
            "time": "17:05"
          },
          "instructions": "Agent Reyes has flagged something odd. Type the coded message exactly as shown, then use the partly-completed cipher alphabet below and the sliding alphabet to work out the shift.",
          "_answerKey": "YOUR PARTNER HAS BEEN ACTING STRANGELY",
          "alphabetHint": {
            "revealCount": 8
          }
        },
        {
          "id": "doubleagent-2",
          "label": "Cipher 2",
          "direction": "decode",
          "shift": -15,
          "agentName": "Agent Reyes",
          "chatMessage": {
            "text": "IWTN BTI LXIW IWT TCTBN APHI CXVWI",
            "time": "17:22"
          },
          "instructions": "A second message has come through, with fewer letters of the cipher alphabet filled in this time. Type the message exactly as shown, then use the clues and the sliding alphabet to crack it.",
          "_answerKey": "THEY MET WITH THE ENEMY LAST NIGHT",
          "alphabetHint": {
            "revealCount": 3
          }
        },
        {
          "id": "doubleagent-3",
          "label": "Cipher 3",
          "direction": "encode",
          "shift": 8,
          "toEncrypt": "REQUEST BACKUP AT ONCE",
          "instructions": "You need to report back to Agent Reyes. Use the sliding alphabet and the shift key given to encrypt the message below, then type your encrypted version into the box.",
          "expectedInput": "JWIMWKL TSUCMH SL GFUW",
          "_answerKey": "JWIMWKL TSUCMH SL GFUW"
        },
        {
          "id": "doubleagent-4",
          "label": "Cipher 4",
          "direction": "decode",
          "shift": -11,
          "agentName": "Agent Reyes",
          "chatMessage": {
            "text": "ESP SLYOWPC FDPD L STOOPY CLOTZ",
            "time": "17:44"
          },
          "instructions": "No cipher alphabet this time - just a single crib word. Find where it appears in the coded text to work out the shift, then decode the rest of the message.",
          "_answerKey": "THE HANDLER USES A HIDDEN RADIO",
          "cribWord": "HANDLER"
        },
        {
          "id": "doubleagent-5",
          "label": "Cipher 5",
          "direction": "decode",
          "shift": 18,
          "agentName": "Agent Reyes",
          "chatMessage": {
            "text": "GWCZ XIZBVMZ EIA BMABQVO GWCZ TWGITBG",
            "time": "17:58"
          },
          "instructions": "The final message has arrived with no clues at all. Type it out exactly, then slide the alphabet through every shift until it reveals the truth.",
          "_answerKey": "YOUR PARTNER WAS TESTING YOUR LOYALTY"
        }
      ]
    }
  ]
};
