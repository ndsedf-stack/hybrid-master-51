// ==================================
// DOM HELPERS
// ==================================

export function createEl(tag, classes = [], text = "") {
  const el = document.createElement(tag);
  if (Array.isArray(classes)) el.classList.add(...classes);
  else if (classes) el.classList.add(classes);
  if (text) el.textContent = text;
  return el;
}

export function clearEl(el) {
  while (el.firstChild) el.removeChild(el.firstChild);
}

export function qs(selector) {
  return document.querySelector(selector);
}

export function qsa(selector) {
  return Array.from(document.querySelectorAll(selector));
}
