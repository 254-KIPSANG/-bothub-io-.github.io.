chrome.runtime.onInstalled.addListener(function() {
  chrome.storage.sync.set({autoResponder: true}, function() {
    console.log("Auto-responder is on.");
  });
});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.command == "getAutoResponderStatus") {
    chrome.storage.sync.get("autoResponder", function(result) {
      sendResponse({autoResponder: result.autoResponder});
    });
    return true;
  }

  if (request.command == "setAutoResponderStatus") {
    chrome.storage.sync.set({autoResponder: request.status}, function() {
      sendResponse({autoResponder: request.status});
    });
    return true;
  }

  if (request.command == "sendMessage") {
    const apiKey = "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";
    const message = request.message;
    const url = `https://api.openai.com/v1/engines/davinci-codex/completions?prompt=${message}&max_tokens=100`;
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`
      }
    })
    .then(response => response.json())
    .then(data => {
      const reply = data.choices[0].text;
      sendResponse({reply: reply});
    })
    .catch(error => console.error(error));
    return true;
  }
});
