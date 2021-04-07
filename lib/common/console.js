// https://en.wikipedia.org/wiki/ANSI_escape_code

// control characters
const ESC = "\x1b"; // escape

// fe escape sequences
const CSI = `${ESC}[`; // control sequence introducer

// csi sequences
const SGR = (n) => `${CSI}${n}m`; // select graphic rendition

// sgr sequences
const RESET = SGR(0);
const BRIGHT = SGR(1); // eslint-disable-line no-unused-vars
const DIM = SGR(2); // eslint-disable-line no-unused-vars
const ITALIC = SGR(3); // eslint-disable-line no-unused-vars
const UNDERLINE = SGR(4); // eslint-disable-line no-unused-vars
const FG = ([r, g, b]) => SGR(`38;2;${r};${g};${b}`);
const BG = ([r, g, b]) => SGR(`48;2;${r};${g};${b}`); // eslint-disable-line no-unused-vars

// colors
const yellow = [0xff, 0xff, 0];
const red = [0xff, 0, 0];

const warn = (s) => `${FG(yellow)}${s}${RESET}`;
const error = (s) => `${FG(red)}${s}${RESET}`;

module.exports = {
  log: (...args) => console.log(...args),
  warn: (s) => console.warn(warn(s)),
  error: (s) => console.error(error(s)),
};
