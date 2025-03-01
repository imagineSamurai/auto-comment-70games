// ==UserScript==
// @name         Random Number Submitter with Delayed Auto Refresh
// @namespace    http://tampermonkey.net/
// @version      1.2
// @description  Type random numbers, submit the form, and refresh the page with delay
// @author       Nawaf
// @match        *://70games.net/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Create dialog immediately when script runs
    const dialog = document.createElement('div');
    dialog.style.cssText = `
        position: fixed;
        top: 10px;
        right: 10px;
        background: white;
        padding: 10px;
        border: 2px solid #ccc;
        border-radius: 4px;
        z-index: 99999;
    `;

    dialog.innerHTML = `
        <p style="margin: 0 0 10px 0;">Start auto-submit?</p>
        <button id="yesBtn" style="background: green; color: white; border: none; padding: 5px 10px; margin-right: 5px;">Yes</button>
        <button id="noBtn" style="background: red; color: white; border: none; padding: 5px 10px;">No</button>
    `;

    document.body.appendChild(dialog);

    // Add button click handlers
    document.getElementById('yesBtn').onclick = function() {
        dialog.remove();
        runScript();
    };

    document.getElementById('noBtn').onclick = function() {
        dialog.remove();
    };

    function runScript() {
        // Generate random numbers
        let numbers = [];
        for(let i = 1; i <= 10; i++) {
            numbers.push(i);
        }
        numbers.sort(() => Math.random() - 0.5);
        
        // Find the correct textarea using the specific ID
        let textarea = document.querySelector('#message');
        if(textarea) {
            textarea.value = numbers.join(', ');
            
            // Find the submit button using the specific ID
            let submitBtn = document.querySelector('button#submit');
            if(submitBtn) {
                submitBtn.click();
                // Refresh after 0.5 seconds
                setTimeout(() => location.reload(), 500);
            } else {
                console.error('Submit button not found');
                setTimeout(() => location.reload(), 500);
            }
        } else {
            console.error('Textarea not found');
            setTimeout(() => location.reload(), 500);
        }
    }
})(); 
