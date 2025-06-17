const $ = (s, e = document.body) => e.querySelector(s);
const $$ = (s, e = document.body) => [...e.querySelectorAll(s)];
const wait = (ms) => new Promise((done) => setTimeout(done, ms));

function xmur3(str) {
  for (var i = 0, h = 1779033703 ^ str.length; i < str.length; i++) {
    h = Math.imul(h ^ str.charCodeAt(i), 3432918353);
    h = (h << 13) | (h >>> 19);
  }
  return function () {
    h = Math.imul(h ^ (h >>> 16), 2246822507);
    h = Math.imul(h ^ (h >>> 13), 3266489909);
    return (h ^= h >>> 16) >>> 0;
  };
}

function mulberry32(a) {
  return function () {
    var t = (a += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function toIsoString(date) {
  var tzo = -date.getTimezoneOffset(),
    dif = tzo >= 0 ? "+" : "-",
    pad = function (num) {
      var norm = Math.floor(Math.abs(num));
      return (norm < 10 ? "0" : "") + norm;
    };

  return (
    date.getFullYear() +
    "-" +
    pad(date.getMonth() + 1) +
    "-" +
    pad(date.getDate()) +
    "T" +
    pad(date.getHours()) +
    ":" +
    pad(date.getMinutes()) +
    ":" +
    pad(date.getSeconds()) +
    dif +
    pad(tzo / 60) +
    ":" +
    pad(tzo % 60)
  );
}

let seedString = toIsoString(new Date());
if (window.localStorage[seedString.slice(0, 10)] !== "done") {
  seedString = seedString.slice(0, 10);
  $("#daily").innerText = "Daily " + seedString;

} else {
  $("#daily").innerText = "Unlimited";
  $("#daily-done").innerHTML = `<input type="checkbox" CHECKED disabled /> Daily IPA ${seedString.slice(0,10)} Completed`
  
}
window.localStorage[seedString] = true;
let seed = xmur3(seedString);
const rand = mulberry32(seed());

if (window.location.protocol !== "https:") window.location.protocol = "https:";
const phonemes = [
  "AA",
  "AE",
  "AH",
  "AO",
  "AW",
  "AY",
  "B",
  "CH",
  "D",
  "DH",
  "EH",
  "ER",
  "EY",
  "F",
  "G",
  "HH",
  "IH",
  "IY",
  "JH",
  "K",
  "L",
  "M",
  "N",
  "NG",
  "OW",
  "OY",
  "P",
  "R",
  "S",
  "SH",
  "T",
  "TH",
  "UH",
  "UW",
  "V",
  "W",
  "Y",
  "Z",
  "ZH",
];

const dom = (tag, attrs, ...children) => {
  const el = document.createElement(tag);
  if (attrs instanceof HTMLElement) {
    children.unshift(attrs);
  } else {
    Object.entries(attrs).forEach(([key, value]) => {
      if (key === "class" && value instanceof Array) {
        value = value.join(" ");
      }
      el.setAttribute(key, value);
    });
  }
  el.append(...children.flat());
  return el;
};

// const KEYS = ["QWERTYUIOP", "ASDFGHJKL", "+ZXCVBNM-"];
const KEYS = [
  [["IY"], ["IH"], ["EH"], ["AE"], ["AA"], ["AO"], ["UH"], ["UW"]],
  [["AH"], ["ER"], ["AY"], ["EY"], ["AW"], ["OW"], ["OY"]],
  [["P"], ["B"], ["T"], ["D"], ["K"], ["G"], ["M"], ["N"], ["NG"]],
  [["F"], ["V"], ["TH"], ["DH"], ["S"], ["Z"], ["SH"], ["ZH"], ["HH"]],
  [["+"], ["CH"], ["JH"], ["W"], ["R"], ["Y"], ["L"], ["-"]],
];
const PRETTY_KEYS = {
  IY: "i",
  IH: "ɪ",
  EH: "ɛ",
  AE: "æ",
  AA: "ɑ",
  AO: "ɔ",
  AH: "ə",
  UH: "ʊ",
  UW: "u",
  ER: "eə",
  AY: "aɪ",
  EY: "e",
  AW: "aʊ",
  OW: "oʊ",
  OY: "ɔɪ",
  P: "p",
  B: "b",
  T: "t",
  D: "d",
  K: "k",
  G: "g",
  M: "m",
  N: "n",
  NG: "ŋ",
  F: "f",
  V: "v",
  TH: "θ",
  DH: "ð",
  S: "s",
  Z: "z",
  SH: "ʃ",
  ZH: "ʒ",
  HH: "h",
  CH: "tʃ",
  JH: "dʒ",
  W: "w",
  R: "r",
  Y: "j",
  L: "l",
};
const LEXICAL_SET_HEADWORDS = {
  IY: "b<em>ee</em>t",
  IH: "b<em>i</em>t",
  EH: "b<em>e</em>t",
  AE: "b<em>a</em>t",
  AA: "p<em>o</em>t",
  AO: "b<em>o</em>re",
  AH: "sof<em>a</em>",
  UH: "f<em>oo</em>t",
  UW: "b<em>oo</em>t",
  ER: "lett<em>er</em>",
  AY: "b<em>i</em>te",
  EY: "b<em>ai</em>t",
  AW: "b<em>ou</em>t",
  OW: "g<em>oa</em>t",
  OY: "b<em>oy</em>",
  P: "<em>p</em>ill",
  B: "<em>b</em>ill",
  T: "<em>t</em>ill",
  D: "<em>d</em>ill",
  K: "<em>k</em>ill",
  G: "<em>g</em>ill",
  M: "<em>m</em>ill",
  N: "<em>n</em>il",
  NG: "ri<em>ng</em>",
  F: "<em>f</em>eel",
  V: "<em>v</em>eal",
  TH: "<em>th</em>igh",
  DH: "<em>th</em>y",
  S: "<em>s</em>eal",
  Z: "<em>z</em>eal",
  SH: "<em>sh</em>ill",
  ZH: "mea<em>s</em>ure",
  HH: "<em>h</em>eal",
  CH: "<em>ch</em>ill",
  JH: "<em>g</em>in",
  W: "<em>w</em>itch",
  R: "<em>r</em>eef",
  Y: "<em>y</em>ou",
  L: "<em>l</em>eaf",
};
const CONTROL_KEYS = {
  "+": "Enter",
  "-": "Delete",
};

let ROUNDS = 7;
let moreRounds = window.location.search.match(/rounds=(\d+)/);
if (moreRounds) {
  ROUNDS = parseInt(moreRounds[1]);
}

const LENGTH = 5;

const dictionaryRequest = fetch(
  "https://rawcdn.githack.com/jmandel/heardle/453f0c8feb0d1755788a5a7c8d0bd16baf8be130/words.json"
).then((r) => r.json());

  const targetWordsRequest = fetch("words-to-target.json")
  .then((r) => r.json())
  .then((r) => r.filter((r) => r.p >= 0.9 && r.phonemes.length == LENGTH));

const board = $(".board");
const keyboard = $(".keyboard");

window.onload = () => init().catch((e) => console.error(e));

async function init() {
  const board = generateBoard();
  const kb = generateKeyboard();

  const initialState = window.location.hash
    ? JSON.parse(atob(window.location.hash.slice(1)))
    : {};

  const words = await dictionaryRequest.then((r) =>
    r.filter((r) => r.phonemes.length == LENGTH)
  );
  const targetWords = await targetWordsRequest;
  const word =
    initialState.word ?? targetWords[(rand() * targetWords.length) | 0];

  await startGame({
    word,
    kb,
    board,
    words,
    guesses: initialState.guesses ?? [],
  });
}

async function animate(el, name, ms) {
  el.style.animation = `${ms}ms ${name}`;
  await wait(ms * 1.2);
  el.style.animation = "none";
}

function saveState(s) {
  window.gameState = s;
  const atRound = new URL(window.location);
  atRound.hash = btoa(JSON.stringify(s));
  console.log("At round", s.guesses.length, atRound.toString());
}

async function endGame({ word, kb, board, words, guesses, win }) {
  let message = "";
  if (win) {
    message = `Congratulations!`;
  } else {
    message = `${word.word.toUpperCase()} (${word.phonemes
      .map((p) => PRETTY_KEYS[p])
      .join(" ")})`;
  }
  window.wip = false;
  window.localStorage[seedString] = "done"

  $(".feedback").innerHTML = message + ` <button id="share">share</button>`;
  const mask = guesses
    .map((guess) =>
      scoreProbe(word.phonemes, guess)
        .map((c) => {
          if (c == "G") {
            return "🟩";
          } else if (c == "Y") {
            return "🟨";
          }
          return "⬜";
        })
        .join("")
    )
    .join("\n");
  let shareText = `Heardle ${
    seedString.length == 10 ? "Daily " + seedString : ""
  } ${
    win ? guesses.length : "X"
  }/${ROUNDS}\n${mask}\nhttps://heardle.glitch.me`;
  $("#share").addEventListener("click", async function (e) {
    if (navigator.share &&
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) && 
        !/firefox/i.test(navigator.userAgent)) {
      await navigator.share({
        text: shareText,
      });
    } else {
      await navigator.clipboard.writeText(shareText);
      e.target.innerText = "copied";
    }
  });
}
async function startGame({ word, kb, board, words, guesses }) {
  const solution = word;
  let round = 0;
  saveState({ word, guesses });
  for (round = 0; round < ROUNDS; round++) {
    const guess = await collectGuess({
      kb,
      board,
      round,
      words,
      guess: guesses[round],
    });
    if (round >= guesses.length) {
      guesses.push(guess);
    }
    saveState({ word, guesses });
    const hints = scoreProbe(word.phonemes, guess).map((c) => {
      if (c == "G") {
        return "correct";
      } else if (c == "Y") {
        return "close";
      }
      return "wrong";
    });
    board.revealHint(round, hints);
    kb.revealHint(guess, hints);
    if (hints.every((h) => h === "correct")) {
      return endGame({ word, kb, board, words, guesses, win: true });
    }
  }

  return endGame({ word, kb, board, words, guesses, win: false });
}

function collectGuess({ kb, board, round, words, guess }) {
  return new Promise((submit) => {
    let letters = [];
    async function keyHandler(key) {
      window.wip = true;
      $(".feedback").innerText = "";

      if (key === "+") {
        if (letters.length === LENGTH) {
          const guessIsValid = words.some((w) =>
            w.phonemes.every((p, i) => p == letters[i])
          );
          if (!guessIsValid) {
            $(".feedback").innerText = "Not in dictionary";
            await animate($$(".round")[round], "shake", 800);
          } else {
            $(".feedback").innerText = "";
            kb.off(keyHandler);
            submit(letters);
          }
        }
      } else if (key === "-") {
        if (letters.length > 0) {
          letters.pop();
        }
        board.updateGuess(round, letters);
      } else if (key.trim()) {
        if (letters.length < LENGTH) {
          letters.push(key);
        } else {
          $(".feedback").innerText = "Too long";
          await animate($$(".round")[round], "shake", 800);
        }
        board.updateGuess(round, letters);
      }
    }
    kb.on(keyHandler);
    if (guess) {
      guess.forEach((g) => {
        keyHandler(g);
      });
      keyHandler("+");
    }
  });
}

function generateBoard() {
  const rows = [];
  for (let i = 0; i < ROUNDS; i++) {
    const row = dom("div", {
      class: "round",
      "data-round": i,
    });
    for (let j = 0; j < LENGTH; j++) {
      row.append(
        dom("div", {
          class: "letter",
          "data-pos": j,
        })
      );
    }
    board.append(row);
  }
  return {
    updateGuess: (round, letters) => {
      const blanks = $$(".letter", $$(".round")[round]);
      blanks.forEach(
        (b, i) => (b.innerText = PRETTY_KEYS[letters[i]] || letters[i] || "")
      );
    },
    revealHint: (round, hints) => {
      const blanks = $$(".letter", $$(".round")[round]);
      hints.forEach((hint, i) => {
        if (hint) {
          blanks[i].classList.add("letter--hint-" + hint);
        }
      });
    },
  };
}

function generateKeyboard() {
  keyboard.append(
    ...KEYS.map((row, i) =>
      dom(
        "div",
        {
          class: "keyboard__row",
        },
        row.map((key) =>
          dom(
            "button",
            {
              class: ` ${i == 1 ? "wide" : ""} key${
                CONTROL_KEYS[key] ? " key--control" : ""
              }`,
              "data-key": key,
            },
            PRETTY_KEYS[key]
              ? dom(
                  "div",
                  {},
                  `${PRETTY_KEYS[key]}`,
                  dom("div", { class: "sound" }, "")
                )
              : CONTROL_KEYS[key]
          )
        )
      )
    )
  );

  KEYS.flatMap((k) => k).forEach((k) => {
    const keySound = $(`button[data-key="${k}"] div.sound`);
    if (!keySound) {
      return;
    }
    keySound.innerHTML = LEXICAL_SET_HEADWORDS[k];
  });

  let selfEntry = dom(
    "div",
    { class: "keyboard-button-holder" },
    dom("input", {
      class: "english",
      type: "text",
      spellcheck:"false",
      autocomplete: "off",
      autocorrect: "off",
      autocapitalize: "off",
      placeholder: "you can type an English word here!",
    }),
    dom("button", { class: "toggle-ipa" }, "Toggle pronunciation key")
  );

  selfEntry.addEventListener("keyup", async (e) => {
    if (e.key === "Enter" || e.keyCode === 13) {
      keyListeners.forEach((l) => l("+"));
      event.target.value = "";
    }
  });

  selfEntry.addEventListener("input", async (e) => {
    const allWords = await dictionaryRequest;

    const asWord = allWords.find(
      (w) => w.word === e.target.value.toUpperCase()
    );
    for (let i = 0; i < LENGTH; i++) {
      keyListeners.forEach((l) => l("-"));
    }

    if (asWord && asWord.word.length > 1) {
      asWord.phonemes.forEach((p) => {
        keyListeners.forEach((l) => l(p));
      });
    }
  });
  keyboard.append(selfEntry);
  const keyListeners = new Set();
  keyboard.addEventListener("click", (e) => {
    e.preventDefault();
    const key = e.target.closest("button");
    if (key) {
      keyListeners.forEach((l) => l(key.getAttribute("data-key")));
      key.blur();
      //$("button[data-key='+']").focus()
    }
  });

  let hidePronunciationGuide = localStorage.hidePronunciationGuide == "true";
  $(".toggle-ipa").addEventListener("click", function (e) {
    hidePronunciationGuide = !hidePronunciationGuide;
    localStorage.hidePronunciationGuide = hidePronunciationGuide;
    keyboard.setAttribute(
      "class",
      "keyboard " + (hidePronunciationGuide ? "ipaonly" : "")
    );
  });
    keyboard.setAttribute(
      "class",
      "keyboard " + (hidePronunciationGuide ? "ipaonly" : "")
    );

  return {
    on: (l) => keyListeners.add(l),
    off: (l) => keyListeners.delete(l),
    revealHint: (guess, hints) => {
      hints.forEach((hint, i) => {
        $(`[data-key="${guess[i]}"]`).classList.add("key--hint-" + hint);
      });
    },
  };
}

function scoreProbe(targetWord, probeWord) {
  const target = targetWord;
  const probe = probeWord;
  const response = "RRRRR".split("");

  const counter = target.reduce((acc, c) => {
    acc[c] = (acc[c] || 0) + 1;
    return acc;
  }, {});

  for (let i = 0; i < target.length; i++) {
    if (probe[i] === target[i]) {
      counter[probe[i]]--;
      response[i] = "G";
    }
  }

  for (let i = 0; i < target.length; i++) {
    if (response[i] == "R" && counter[probe[i]] > 0) {
      counter[probe[i]]--;
      response[i] = "Y";
    }
  }

  return response;
}
