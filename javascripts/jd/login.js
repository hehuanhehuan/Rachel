var task = null;
var settings = null;
storageGet('settings',function(){
    storageGet('task', function () {
        setTimeout(function () {
            init.watchDog();
            login();
        },3000);
    })
});
function login(){
    var $loginname = $('#loginname');
    var $loginpwd = $('#nloginpwd');
    var $loginsubmit = $('#loginsubmit');
    //var $authcode = $('#autocode');
    if($loginname.length > 0 && $loginpwd.length > 0 && $loginsubmit.length > 0){
        $loginname.val(task.username);
        setTimeout(function(){
            init.watchDog();
            $loginpwd.val(task.password);
            setTimeout(function() {
                init.watchDog();
                $loginsubmit[0].click();
            }, 3000);
        },3000);
    }else{
        console.log("页面无 登陆 用户框 密码框 //刷新页面");
        setTimeout(function(){
            init.watchDog();
            window.location.reload(true);
        },3000);
    }
}

messageListener = function(message){
    console.log(message);
};

targetListener = function (mutation) {
    if(mutation.type === 'childList') {
        if (mutation.addedNodes.length > 0 && mutation.target.className == 'msg-wrap') {
            console.log(mutation);
            if (mutation.target.innerText.indexOf('账户名与密码不匹配，请重新输入') != -1) {
                console.log(mutation.target.innerText);
                chrome.extension.sendMessage({msg: 'disable', message: mutation.target.innerText});
            }
            if (mutation.target.innerText.indexOf('公共场所不建议自动登录，以防账号丢失') != -1) {
                console.log(mutation.target.innerText);
            }
            if (mutation.target.innerText.indexOf('请输入验证码') != -1) {
                console.log(mutation.target.innerText);
            }
            if (mutation.target.innerText.indexOf('你的账号因安全原因被暂时封锁，请将账号和联系方式发送到shensu@jd.com，等待处理') != -1) {
                console.log(mutation.target.innerText);
                chrome.extension.sendMessage({msg: 'disable', message: mutation.target.innerText});
            }
        }
    }
};