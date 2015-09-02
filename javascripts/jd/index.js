
var guess_you = false;
var special_buy = false;
var elevator_floor = false;
var slider_panel =false;
var today_recommend = false;

function guessLike(){
    console.log('猜你喜欢');
    if(guess_you){
        var guess_like = $('#guessyou').find('a[target="_blank"]');
        if(guess_like.length > 0){
            console.log(guess_like);
            var rand = init.randMod(0,parseInt(parseInt(guess_like.length)-1));
            console.log(rand);
            var link = guess_like[rand];
            console.log(link);
            goNext(link);
        }else{

        }
    }else{
        if(location.href.indexOf('lazy-guess-like')!=-1){
            setTimeout(function () {
                init.watchDog();
                guessLike();
            },2000);
        }else{
            setTimeout(function () {
                init.watchDog();
                window.location.href = 'http://www.jd.com/' + '#lazy-guess-like';
            },2000);
        }
    }
}

function specialBuy(){
    console.log('京东特色购');
    if(special_buy){
        var buys = $('#lazy-special-buy-v2').find('a');
        if(buys.length > 0){
            var rand = init.randMod(0,parseInt(parseInt(buys.length)-1));
            var buy = buys[rand];
            goNext(buy);
        }else{

        }
    }else{
        if(location.href.indexOf('lazy-special-buy-v2')!=-1){
            setTimeout(function () {
                init.watchDog();
                specialBuy();
            },2000);
        }else{
            setTimeout(function () {
                init.watchDog();
                window.location.href = 'http://www.jd.com/' + '#lazy-special-buy-v2';
            },2000);
        }
    }
}

function elevatorFloor(){
    console.log('左侧滚动条2F');
    if(elevator_floor) {
        var items = $('#cosmetics .mc .main-selected').find('a[target="_blank"]');
        if (items.length > 0) {
            var rand = init.randMod(0, parseInt(parseInt(items.length) - 1));
            var item = items[rand];
            goNext(item);
        } else {

        }
    }else{
        if(location.href.indexOf('lazy-cosmetics')!=-1){
            setTimeout(function () {
                init.watchDog();
                elevatorFloor();
            },2000);
        }else{
            setTimeout(function () {
                init.watchDog();
                window.location.href = 'http://www.jd.com/' + '#lazy-cosmetics';
            },2000);
        }
    }
}

function sliderFocus(){
    console.log('首页轮播');
    if(slider_panel) {
        var slider = $('#focus .slider .slider-main li.slider-panel-selected .inner a');
        console.log(slider);
        if (slider.length > 0) {
            goNext(slider[0]);
        } else {

        }
    }else{
        setTimeout(function () {
            init.watchDog();
            window.location.href = 'http://www.jd.com/' + '#focus';
        },2000);
    }
}

function todayRecommend(){
    console.log('今日推荐');
    if(today_recommend){
        var today = $('#todays .mt');
        if(today.length > 0){
            //$('#today').html('<a href="">');
            console.log(today);
            goNext(today[0]);
        }else{

        }
    }else{
        setTimeout(function () {
            init.watchDog();
            window.location.href = 'http://www.jd.com/' + '#lazy-todays';
        },2000);
    }
}


function orderList(){
    var order_list = $('li.fore2 dt a:contains("我的订单")');
    if(order_list.length > 0){
        storageGet('process',function(){
            process.next = {url:order_list[0].href};
            storageSet({process:process},function(){
                order_list[0].click();
            })
        })
    }else{
        storageGet('process',function(){
            process.next = {url:'http://order.jd.com/center/list.action'};
            storageSet({process:process},function(){
                window.open('http://order.jd.com/center/list.action');
            })
        })
    }
}

messageListener = function(message){
    console.log(message);
};

targetListener = function (mutation) {

    if(mutation.type == 'childList') {

        if (mutation.target.tagName == 'UL' && mutation.target.parentNode.parentNode.id == 'guessyou') {
            console.log(mutation);
            console.log(mutation.target);
            guess_you = true;
        }

        if(mutation.target.id == 'lazy-special-buy-v2' && mutation.removedNodes.length > 0){
            console.log(mutation);
            console.log(mutation.target);
            special_buy = true;
        }

        if (mutation.target.className == 'slider' && mutation.target.parentNode.id == 'focus') {
            console.log(mutation);
            console.log(mutation.target);
            slider_panel = true;
        }

        if (mutation.target.id == 'todays') {
            console.log(mutation);
            console.log(mutation.target);
            today_recommend = true;
        }

        if(mutation.target.id == 'lazy-cosmetics'){
            console.log(mutation);
            console.log(mutation.target);
            console.log($('#elevator'));
            elevator_floor = true;
        }

        if(mutation.target.id == 'elevator'){
            console.log(mutation);
            console.log(mutation.target);

        }

    }
};
