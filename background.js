chrome.storage.sync.set({"config":{"url":null,"list":new Array()}});
chrome.webNavigation.onCommitted.addListener(function(details) {
    chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function (tabs) {
        var url = tabs[0].url;
        chrome.storage.sync.get("config", function(obj) {
            let config = obj.config;
            if(config==null||obj==undefined){
                config = {url,"list":new Array()};
            }else{
                config.url = url;
            }
            chrome.storage.sync.set({config});
            //chrome.storage.sync.set({"config":null});
        })
    });
})
  