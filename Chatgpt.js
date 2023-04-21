async function getResponse(text) {
  const response = await fetch('https://api.openai.com/v1/engines/davinci-codex/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      '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': 'Bearer YOUR_API_KEY_HERE'
    },
    body: JSON.stringify({
      prompt: text,
      max_tokens: 50,
      temperature: 0.7,
      n: 1,
      stop: '\n'
    })
  });
  const data = await response.json();
  return data.choices[0].text.trim();
}

function sendReply(chatWindow, text) {
  const inputBox = chatWindow.querySelector('[contenteditable]');
  inputBox.innerHTML = text;
  const event = new InputEvent('input', { bubbles: true });
  inputBox.dispatchEvent(event);
  const sendButton = chatWindow.querySelector('span[data-testid="send"]');
  sendButton.click();
}
