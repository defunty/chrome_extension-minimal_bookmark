chrome.storage.local.get(function(cfg) {
  if(typeof(cfg["key"]) !== 'undefined' && cfg["key"] instanceof Array) { 
    cfg["key"].push("value");
  } else {
    cfg["key"] = ["value"];
  }
  chrome.storage.local.set(cfg); 
  alert(cfg);
});
