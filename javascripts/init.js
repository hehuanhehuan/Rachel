function Init() {
  //chrome.extension.sendMessage({msg: 'watchdog'});
  this.watchDog();
}

Init.prototype = {
  watchDog: function() {
    chrome.extension.sendMessage({msg: 'watchdog'});
  },

  sendMessage: function(type) {
    chrome.extension.sendMessage({msg: type});
  },

  messageListener: function() {

  },

  loginCheck:function(){
    var url = 'http://passport.jd.com/new/helloService.ashx';
    $.get(url,{},function(data,textStatus,jqXHR){
      console.log(data);
    }).fail(function(jqXHR, textStatus, errorThrown) {
      console.log('login check request fail');
    });
  },

  randMod: function (min,max) {
    var str_radom = 0;
    do{
      str_radom = Math.floor(Math.random() * max) + min;
    }while(!(str_radom >= min && str_radom <= max));

    return str_radom;
  },

  randSelect: function(max){
    var str_radom = this.randMod(0, max);
    str_radom = str_radom>=max ? parseInt(parseInt(max)-1) : str_radom;
    str_radom = str_radom<0 ? 0 : str_radom;

    return str_radom;
  },

  findProduct: function(){
    var links = $('a[href^="http://item.jd.com"]');
    if(links.length>0){
      goNext(links[this.randSelect(links.length)]);
    }else{
      location.href = 'http://www.jd.com/';
    }
  },

  goCat:function(){
    var links = $('.breadcrumb').find('a[href^="http://list.jd.com/list.html?cat"]');
    if(links.length>0){
      scrollPage(function(){
        goNext(links.eq(0))
      });
    }else{
      var links = $('a[href^="http://item.jd.com"]');
      if(links.length>0){
        links[this.randSelect(links.length)].click();
      }else{
        location.href = 'http://www.jd.com/';
      }
    }
  },

  goSearch:function(){
    var plist = $('#plist').find('.p-name').find('em');
    if(plist.length > 0){
      var pname = plist[0].innerText;
      if(pname.length>2){
        var search_keywords = pname.substr(-2);
        $('#key').val(search_keywords);
        goNext($('#key').next('input[type="button"]')[0]);
      }else{

      }
    }else{
      init.goCat();
    }
  },

  accountDisable: function(callback) {
    callback && callback();
  },

  indexAction: function(){
    var type = next.code;
    if(type == 'guessyou'){
      console.log('猜你喜欢');
      guessLike();
    }else if(type == 'specialbuy'){
      console.log('京东特色购');
      specialBuy();
    }else if(type == 'elevator'){
      console.log('左侧滚动条2F');
      elevatorFloor();
    }else if(type == 'orderlist'){
      console.log('我的订单');
      orderList();
    }else if(type == 'focus'){
      console.log('首页轮播');
      sliderFocus();
    }else if(type == 'todays'){
      console.log('今日推荐');
      todayRecommend();
    }
  },

  userInfo: function() {
    var my_jd_safe = $('#_MYJD_safe a');
    if(my_jd_safe.length > 0){
      my_jd_safe[0].click();
    }else{
      window.location.href = 'http://safe.jd.com/user/paymentpassword/safetyCenter.action';
    }
  },

  nextAction: function() {
    if(step.code == 'index'){
      if(location.href.indexOf('www.jd.com')!=-1){
        this.watchDog();
        this.indexAction();
      }else{
        window.location.href = 'http://www.jd.com/';
      }
    }else if(step.code == 'guessyou'){
      scrollPage(function () {
        goNext($('a:contains("我的订单")')[0]);
      });
    }else if(step.code == 'specialbuy'){
      scrollPage(function () {
        goNext($('a:contains("我的订单")')[0]);
      });
    }else if(step.code == 'elevator'){
      scrollPage(function () {
        goNext($('a:contains("我的订单")')[0]);
      });
    }else if(step.code == 'orderlist'){
      if($('h3:contains("我的订单")').length > 0){
        orderDetail();
      }else{
        setTimeout(function(){
          init.watchDog();
          window.location.href = 'http://order.jd.com/center/list.action';
        },3000);
      }
    }else if(step.code == 'orderdetail'){
      if(location.href.indexOf('order.jd.com/center/list.action')){
        guessingLiked();
      }else{
        scrollPage(function () {
          window.location.href = 'http://order.jd.com/center/list.action';
        });
      }

    }else if(step.code == 'guessingliked'){
      if($('#product-intro').length == 0){
        scrollPage(function () {
          //success
          init.sendMessage('success');
        });
      }else{
        var rand_num = init.randMod(10,50);
        if(rand_num<20){
          scrollPage(function () {
            //success
            init.sendMessage('success');
          });
        }else if(rand_num<40){
          productComment(function () {
            scrollPage(function(){
              //success
              init.sendMessage('success');
            });
          });
        }else if(rand_num<50){
          scrollPage(function(){
            goShop();
          })
        }
      }
    }else if(step.code == 'mall'){
      scrollPage(function () {
        //success
        init.sendMessage('success');
      });
    }

    else if(step.code == 'focus'){
      scrollPage(function () {
        init.findProduct();
      });
    }else if(step.code == 'randpage1'){
      var rand = this.randMod(1,3);
      scrollPage(function(){
        if(rand==1){
          //success
          init.sendMessage('success');
        }else{
          init.findProduct();
        }
      });
    }else if(step.code == 'randpage2'){
      var rand = this.randMod(1,3);
      scrollPage(function(){
        if(rand==2){
          //success
          init.sendMessage('success');
        }else{
          init.findProduct();
        }
      });
    }else if(step.code == 'randpage3'){
      scrollPage(function(){
        //success
        init.sendMessage('success');
      });
    }

    else if(step.code == 'todays'){
      if(location.href.indexOf('tuijian') != -1){
        scrollPage(function(){
          init.findProduct();
        });
      }else{
        window.location.href = 'http://tuijian.jd.com/';
      }
    }else if(step.code == 'recommendpage1'){
      if(location.href.indexOf('item.jd.com')!=-1 && location.href.indexOf('html')!=-1){
        var rand = this.randMod(1,2);
        scrollPage(function(){
          if(rand==1){
            next = codes['itemlist'];
            //cat
            init.goCat();
          }else{
            init.findProduct();
          }
        });
      }else{
        scrollPage(function(){
          init.findProduct();
        });
      }
    }else if(step.code == 'recommendpage2'){
      scrollPage(function(){
        init.goCat();
      });
    }else if(step.code == 'itemlist'){
      if(location.href.indexOf('cat')!=-1 && location.href.indexOf('list.jd.com')!=-1){
        //search
        init.goSearch();
      }else{
        //cat
        init.goCat();
      }
    }else if(step.code == 'itemsearch'){
      if(location.href.indexOf('search.jd.com')!=-1){
        var plist = $('#plist').find('.p-name a[href^="http://item.jd.com"]');
        if(plist.length > 0){
          if(plist.length > 8){
            scrollPage(function(){
              goNext(plist[init.randSelect(8)]);
            });
          }else{
            scrollPage(function(){
              goNext(plist[init.randSelect(plist.length)]);
            });
          }
        }else{

        }
      }else{

      }
    }else if(step.code == 'listranditem'){
      scrollPage(function(){
        //success
        init.sendMessage('success');
      })
    }
  }
};
