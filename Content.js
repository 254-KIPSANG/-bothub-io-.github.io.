document.querySelector('._13mgZ').addEventListener('input', function(e) {
    if (e.target.textContent.trim().length > 0) {
      chrome.runtime.sendMessage({ type: 'send_message', message: e.target.textContent });
      e.target.textContent = '';
    }
  });
  