// ==UserScript==
// @name         devrant-markdown
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  devRant markdown supports
// @author       devTeaa
// @match        https://devrant.com/*
// @grant        none
// ==/UserScript==

(function() {
  "use strict";
  let elementToWatch = ["div.rantlist-title-text", "div.rantlist-title", "h1.rantlist-content", "div.related-rant-text"];

  let boldReg = `(\\*\\*|__)`;
  let italicReg = `(\\*|_)`;

  elementToWatch.forEach(element => {
    document.querySelectorAll(element).forEach(el => {
      let detectedWords = [];

      // Bold words
      detectedWords = el.innerHTML.match(new RegExp(`${boldReg}.+${boldReg}`, "g"));
      if (detectedWords) {
        detectedWords.forEach(x => {
          el.innerHTML = el.innerHTML.replace(x, `<b>${x.replace(new RegExp(`${boldReg}`, "g"), "")}</b>`);
        });
      }

      // Italic words
      detectedWords = el.innerHTML.match(new RegExp(`${italicReg}.+${italicReg}`, "g"));
      if (detectedWords) {
        detectedWords.forEach(x => {
          el.innerHTML = el.innerHTML.replace(x, `<i>${x.replace(new RegExp(`${italicReg}`, "g"), "")}</i>`);
        });
      }
    });
  });
})();
