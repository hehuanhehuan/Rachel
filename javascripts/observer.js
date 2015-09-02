
var init = new Init();
var targetListener = null;
var messageListener = null;

var is_login = false;
var process = null;

var mode = null;
var step = null;
var next = null;




var observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
        if(mutation.type === 'childList'){
            if (mutation.target.id == 'ttbar-login' || mutation.target.id == 'loginbar') {
                console.log(mutation);
                console.log(mutation.target);
                if (mutation.addedNodes.length > 0) {
                    if (mutation.target.innerHTML.indexOf('退出') != -1) {
                        console.log('用户已登录');
                        is_login = true;
                        storageGet('mode', function (storage_mode) {
                            mode = storage_mode;
                            storageGet('step',function(storage_step){
                                step = storage_step.code ? storage_step : 'index' ;
                                next = step.code =='index' ? mode: codes[step.next];
                                init.nextAction();
                            });
                        });

                    } else if (mutation.target.innerHTML.indexOf('请登录') != -1) {
                        is_login = false;
                        console.log('用户未登录');
                        var nodes = mutation.target.childNodes;
                        if (nodes.length > 0) {
                            for (var i in nodes) {
                                var node = nodes[i];
                                console.log(node);
                                if (node.innerHTML.indexOf('请登录') == -1) {
                                    continue;
                                }
                                setTimeout(function(){
                                    init.watchDog();
                                    node.click();
                                },500);

                                break;
                            }
                        }
                    }
                }
            }
            targetListener && targetListener(mutation);
        }
        if(mutation.type === 'attributes'){
            targetListener && targetListener(mutation)
        }
    })
});

observer.observe(document.body, {
    attributes: true,
    childList: true,
    characterData: true,
    subtree: true,
    attributeOldValue: true
});

chrome.runtime.onMessage.addListener(function(message, sender, sendResponse){
    messageListener && messageListener(message);
});


function stayOut(time){
    setTimeout(function () {
     //tabRemove();
    },time);
}
function scrollPage(callback){
    console.log(document.body.scrollTop);
    document.body.scrollTop += parseInt(parseInt(screen.height)/3);
    if(document.body.scrollTop + parseInt(parseInt(screen.height)/2) >= document.body.scrollHeight){
        console.log('bottom');
        setTimeout(function () {
            init.watchDog();
            callback && callback();
        },5000);
    }else{
        setTimeout(function(){
            init.watchDog();
            scrollPage(callback);
        },2000);
    }
}

function goNext(obj,callback){
    if(obj){
        console.log(obj);
        storageSet({step:next},function(){
            obj.click();
        })
    }else{
        callback && callback();
    }
}
