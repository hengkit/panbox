 function resetDefaultSuggestion() {
    chrome.omnibox.setDefaultSuggestion({
    description: 'pan: Open the admin dashboard for %s'
    });
  }
  resetDefaultSuggestion();

chrome.omnibox.onInputChanged.addListener(function(text, suggest) {
  // Suggestion code will end up here.
});

chrome.omnibox.onInputCancelled.addListener(function() {
  resetDefaultSuggestion();
});

function navigate(url) {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.update(tabs[0].id, {url: url});
  });
}

chrome.omnibox.onInputEntered.addListener(function(text) {
  if (text.match(/https:\/\/dashboard\.pantheon\.io/)){
    var adminUrl = text;
    navigate(adminUrl.replace("dashboard.pantheon.io", "admin.dashboard.pantheon.io"));
  } else if (text.match(/[a-z0-9]{8}\-/)){
    navigate("https://admin.dashboard.pantheon.io/sites/" + text);
  }
});
