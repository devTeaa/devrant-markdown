// ==UserScript==
// @name         devrant-markdown
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  devRant markdown supports
// @author       devTeaa
// @match        https://devrant.com/*
// @grant        none
// ==/UserScript==

(function() {
  "use strict";
  let elementToWatch = [
    "div.rantlist-title-text",
    "h1.rantlist-content",
    "li.reply-row div.rantlist-title",
    "div.rantlist-title :not(.rant-image)",
    "div.rantlist-content",
    "h1.rantlist-content"
  ];

  let boldReg = `(\\*\\*)`;
  let italicReg = `(\\*|_)`;
  let underlineReg = `(__)`;
  let strikethroughReg = `(~~)`;

  elementToWatch.forEach(element => {
    document.querySelectorAll(element).forEach(el => {
      let detectedWords = [];

      // Bold words
      detectedWords = el.innerHTML.match(new RegExp(`${boldReg}.+${boldReg}`, "g"));
      if (detectedWords) {
        detectedWords.forEach(x => {
          el.innerHTML = el.innerHTML.replace(x, `<strong>${x.replace(new RegExp(`${boldReg}`, "g"), "")}</strong>`);
        });
      }

      // Underlined words
      detectedWords = el.innerHTML.match(new RegExp(`${underlineReg}.+${underlineReg}`, "g"));
      if (detectedWords) {
        detectedWords.forEach(x => {
          el.innerHTML = el.innerHTML.replace(
            x,
            `<span style="text-decoration: underline">${x.replace(new RegExp(`${underlineReg}`, "g"), "")}</span>`
          );
        });
      }

      // Italic words
      detectedWords = el.innerHTML.match(new RegExp(`${italicReg}.+${italicReg}`, "g"));
      if (detectedWords) {
        detectedWords.forEach(x => {
          el.innerHTML = el.innerHTML.replace(x, `<em>${x.replace(new RegExp(`${italicReg}`, "g"), "")}</em>`);
        });
      }

      // Strikethrough words
      detectedWords = el.innerHTML.match(new RegExp(`${strikethroughReg}.+${strikethroughReg}`, "g"));
      if (detectedWords) {
        detectedWords.forEach(x => {
          el.innerHTML = el.innerHTML.replace(x, `<strike>${x.replace(new RegExp(`${strikethroughReg}`, "g"), "")}</strike>`);
        });
      }
    });
  });
})();
