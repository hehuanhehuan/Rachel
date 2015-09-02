function changeIpAndOpenWindow() {
  resetWatchDog(function(){
    closeAllWindows(function() {
      setTimeout(function() {
        adlsWindow();
      }, 5000);
    });
  });
}

function adlsWindow(){
  chrome.windows.create({
    url: 'adsl:adsl'
  }, function(window) {
    setTimeout(openWindow, 8000);
  });
}

function openWindow() {
  //resetWatchDog(function(){
  //  api.ajax({url: 'http://b1.poptop.cc/remote_addr?'+new Date().getTime(), timeout: 3000},function(data) {
  //
  //    ip_get_count = 0;
  //    if (isValidIpv4Addr(data)) {
        //if (data == last_ip) {
        //  console.log('当前IP和最后使用IP一样，重新执行更换IP');
        //  setTimeout(changeIpAndOpenWindow, 20000);
        //} else {
        //  last_ip = data;
          getTask(function() {
            closeAllWindows(function() {
              setTimeout(function() {
                setCookies(function(){
                  setTimeout(function(){
                    tabCreate({
                      url: boot_page[task.slug],
                      selected:true
                    },function(){

                    });
                  },3000);
                });
              }, 10000);
            });
          });
        //}
  //    }else{
  //      changeIpAndOpenWindow();
  //    }
  //  },function(){
  //    if(ip_get_count > 3 ){
  //      setTimeout(function(){
  //        ip_get_count = 0;
  //        changeIpAndOpenWindow();
  //      },3000);
  //    }else{
  //      ip_get_count++;
  //      setTimeout(openWindow,10000);
  //    }
  //  });
  //});

}


function closeAllWindows(callback) {
  console.log('run closeAllWindows');

  chrome.windows.getAll(function (windows) {
    console.log('chrome.windows.getAll');
    var length = windows.length;
    var i = 0, index = 0;
    for (; i < length; i++) {
      if (windows[i].type === 'popup') {
        index++;
        if (index == length) {
          callback && callback();
        }
      }
      else {
        chrome.windows.remove(windows[i].id, function () {
          index++;
          if (index == length) {
            callback && callback();
          }
        });
      }
    }
  });
}

function isValidIpv4Addr(ip) {
  return /^(?=\d+\.\d+\.\d+\.\d+$)(?:(?:25[0-9]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]|[0-9])\.?){4}$/.test(ip);
}