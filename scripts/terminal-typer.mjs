// scripts/terminal-typer.mjs
import { performance } from 'node:perf_hooks';
import readline from 'node:readline';

const sequence = [
  { text: 'I wanna da', duration: 0.9 },
  { text: 'I wanna dance in the lights', duration: 2 },
  { text: 'I wanna ro-', duration: 1.6 },
  { text: 'I wanna rock your body', duration: 2.3 },
  { text: 'I wanna go', duration: 1.1 },
  { text: 'I wanna go for a ride', duration: 2.1 },
  { text: 'Hop in the music and', duration: 2.2 },
  { text: 'Rock your body', duration: 2 },
  { text: 'Rock that body', duration: 1 },
  { text: 'come on,', duration: 0.4 },
  { text: 'come on, come on', duration: 0.4 },
  { text: 'Rock that body', duration: 1.1 },
  { text: '(Rock your body)', duration: 1.3 },
  { text: 'Rock that body', duration: 1.3 },
  { text: 'come on, come on', duration: 1 },
  { text: 'Rock that body', duration: 2 }
];

const total = sequence.reduce((s, x) => s + x.duration, 0);

let running = true;
let time = 0;
let tick = null;
let lastTs = 0;
let currentIndex = -1;
let typingInterval = null;

function clearLine() {
  readline.cursorTo(process.stdout, 0);
  readline.clearLine(process.stdout, 0);
}

function printLine(str) {
  clearLine();
  process.stdout.write(str);
}

function typeOut(text, done) {
  if (typingInterval) clearInterval(typingInterval);
  let i = 0;
  typingInterval = setInterval(() => {
    printLine(text.slice(0, i + 1));
    i++;
    if (i === text.length) {
      clearInterval(typingInterval);
      typingInterval = null;
      done && done();
    }
  }, 75); // typing speed (ms per char)
}

function start() {
  if (tick) return;
  lastTs = performance.now();
  tick = setInterval(() => {
    if (!running) {
      lastTs = performance.now();
      return;
    }

    const now = performance.now();
    const delta = (now - lastTs) / 1000;
    lastTs = now;
    time += delta;

    if (time >= total) {
      time = total;
      running = false;

      if (typingInterval) {
        clearInterval(typingInterval);
        typingInterval = null;
      }
      // move to new line, show end message
      clearLine();
      process.stdout.write('\nAgain?\n');
      clearInterval(tick);
      tick = null;
      return;
    }

    // find the current item by accumulated duration
    let acc = 0;
    let idx = 0;
    for (let i = 0; i < sequence.length; i++) {
      acc += sequence[i].duration;
      if (time < acc) {
        idx = i;
        break;
      }
    }

    if (idx !== currentIndex) {
      currentIndex = idx;
      const text = sequence[currentIndex].text;
      typeOut(text);
    }
  }, 100);
}

function stop() {
  if (tick) {
    clearInterval(tick);
    tick = null;
  }
  if (typingInterval) {
    clearInterval(typingInterval);
    typingInterval = null;
  }
  process.stdout.write('\nStopped.\n');
}

// Optional: space to pause/resume, q to quit
readline.emitKeypressEvents(process.stdin);
if (process.stdin.isTTY) process.stdin.setRawMode(true);
process.stdin.on('keypress', (str, key) => {
  if (key.name === 'space') {
    running = !running;
    if (running) lastTs = performance.now();
  } else if (key.name === 'q' || (key.ctrl && key.name === 'c')) {
    stop();
    process.exit(0);
  }
});

start();
