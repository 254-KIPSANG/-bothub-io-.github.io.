document.addEventListener('DOMContentLoaded', function() {
    const chatWindow = document.querySelector('div[tabindex="-1"]');
    const observer = new MutationObserver(function() {
      const lastMessage = chatWindow.querySelector('span.selectable-text:last-child');
      if (lastMessage && lastMessage.dataset.testid === 'outgoing-message') {
        const text = lastMessage.textContent.trim();
        getResponse(text).then(function(response) {
          sendReply(chatWindow, response);
        });
      }
    });
    observer.observe(chatWindow, { childList: true, subtree: true });
  });
  