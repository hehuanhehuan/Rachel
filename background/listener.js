
chrome.webRequest.onResponseStarted.addListener(function(details){
    chromeResponseStarted && chromeResponseStarted(details);
},{urls:["*://*.jd.com/*"]});


chrome.webRequest.onCompleted.addListener(function(details){
    if(details.url.indexOf('passport.jd')!=-1 && details.url.indexOf('ervice')!=-1){
        //console.log('a');
        //console.log(details);
        //console.log('a');
    }
},{urls:["*://*.jd.com/*"]});

var chromeResponseStarted = function (details) {
    if(details.type == 'main_frame'){
        console.log(details.statusCode);
        console.log(details.url);
        storageGet('history',function(history){
            console.log(history);
            history['t'+new Date().getTime()] = {url:details.url};
            storageSet({history:history},function(){

            })
        })
    }
};

chrome.webRequest.onHeadersReceived.addListener(function(details){
    chromeHeaderReceived && chromeHeaderReceived(details);
},{urls:["*://*.jd.com/*"]});

var chromeHeaderReceived = function (details) {
    if(details.type == 'main_frame'){
        console.log(details);
        console.log(details.url);
        if(details.statusCode == 200){

        }
        else if(details.statusCode == 302){

        }
    }
};

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    chromeMessageListener && chromeMessageListener(request, sender);
    sendResponse && sendResponse();
});

var chromeMessageListener = function(request, sender){
    console.log('onMessage：',request);
    var msg = request.msg;
    if( ! msg){
        return false;
    }
    switch (msg){
        case 'reload_settings':
            storageGet('settings',function(){});
            break;
        case 'start':
            changeIpAndOpenWindow();
            break;
        case 'watchdog':
            last_watchdog_time = new Date().getTime();
            break;
        case 'success':
            reportSuccess();
            break;
        default :
            break;
    }
};
