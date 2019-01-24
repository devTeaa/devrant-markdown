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
  let h1Reg = `(#)`;
  let h2Reg = `(##)`;
  let h3Reg = `(###)`;

  elementToWatch.forEach(element => {
    document.querySelectorAll(element).forEach(el => {
      let detectedWords = [];

      // Headings 3;
      detectedWords = el.innerHTML.match(new RegExp(`${h3Reg}.+(<br>)`, "g"));
      if (detectedWords) {
        detectedWords.forEach(x => {
          el.innerHTML = el.innerHTML.replace(x, `<h3>${x.replace(new RegExp(`${h3Reg}`, "g"), "").replace(new RegExp(`(<br>)`), "</h3><br>")}`);
        });
      }

      // Headings 2;
      detectedWords = el.innerHTML.match(new RegExp(`${h2Reg}.+(<br>)`, "g"));
      if (detectedWords) {
        detectedWords.forEach(x => {
          el.innerHTML = el.innerHTML.replace(x, `<h2>${x.replace(new RegExp(`${h2Reg}`, "g"), "").replace(new RegExp(`(<br>)`), "</h2><br>")}`);
        });
      }

      // Headings 1;
      detectedWords = el.innerHTML.match(new RegExp(`${h1Reg}.+(<br>)`, "g"));
      if (detectedWords) {
        detectedWords.forEach(x => {
          el.innerHTML = el.innerHTML.replace(x, `<h1>${x.replace(new RegExp(`${h1Reg}`, "g"), "").replace(new RegExp(`(<br>)`), "</h1><br>")}`);
        });
      }

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
