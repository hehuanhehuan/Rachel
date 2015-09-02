var last_watchdog_time = new Date().getTime();
var start_time = null;

var ip_get_count = 0;
var last_ip = null;

var api = null;

var task = {};
var settings = {};

var boot_page = {
  jd : 'http://www.jd.com/'
};

//var process = {mode:null,step:null,referer:null,next:null};

storageGet('settings',function(){
  if(settings && settings.running){
    api = new RemoteApi(settings);
    setTimeout(watchDog, 1000);
  }
});

/**
 * get task
 * @param callback
 */
function getTask(callback) {
  api = new RemoteApi(settings);
  api.getTask(function(data) {
    console.log(data);
    if (data.success == 1) {
      taskMode(function() {
        storageSet({step:codes.index,task:data.data,history:{}}, function () {
          start_time = new Date().getTime();
          task = data.data;
          console.log(task);
          callback && callback();
        })
      });

    } else {
      start_time = null;
      setTimeout(function(){
        last_watchdog_time = new Date().getTime();
        getTask(callback);
      }, 20000);
    }
  }, function() {
    console.log('½Ó¿ÚÇëÇóÊ§°Ü');
    start_time = null;
    setTimeout(function(){changeIpAndOpenWindow()}, 30000);
  });
}

/**
 * rand number between min and max
 * @param min
 * @param max
 * @returns {number}
 */
function rands(min,max){
  var str_radom = 0;
  do{
    str_radom = Math.floor(Math.random() * max) + min;
  }while(!(str_radom >= min && str_radom <= max));

  return str_radom;
}

/**
 * rand a mode to execute
 * @returns {*}
 */
function randMode(){
  var mode = null;
  switch (rands(1,3)){
    case 1:
      var operate = rands(1,3);
      if(operate == 1){
        mode = codes['guessyou'];
      } else if(operate == 2){
        mode = codes['specialbuy'];
      } else if(operate == 3){
        mode = codes['elevator'];
      } else{
        mode = codes['guessyou'];
      }
      break;
    case 2:
      mode = codes['focus'];
      break;
    case 3:
      mode = codes['todays'];
      break;
    default :
      mode = codes['guessyou'];
      break;
  }
  return mode;
}

function taskMode(callback){
  var mode = {};
  storageGet('settings',function(){
    var mode_code = settings.mode;
    if(mode_code == 'rand'){
      mode = randMode();
    }else{
      if(codes[mode_code]){
        mode = codes[mode_code];
      }else{
        mode = randMode();
      }
    }
    storageSet({mode:mode},function(){
      callback && callback();
    });
  });
}

function reportSuccess(){
  api.reportSuccess(task.id, function (data) {
    if(data.success == 1){
      changeIpAndOpenWindow();
    }else{
      setTimeout(function(){
        resetWatchDog();
        reportSuccess();
      },6000);
    }
  },function(){
    setTimeout(function(){
      resetWatchDog();
      reportSuccess();
    },6000);
  });
}

function reportDisable(message){
  chrome.storage.local.get(null, function(data) {
    task = data.task;
    api.reportDisable(task.username,task.slug,message,function(){
      api.reportFail(task.account_id,message,function(){
        changeIpAndOpenWindow();
      }, function(){
        setTimeout(function(){
          last_watchdog_time = new Date().getTime();
          reportDisable(message);
        },3000);
      });
    },function(){
      setTimeout(function(){
        last_watchdog_time = new Date().getTime();
        reportDisable(message);
      },3000);
    });
  });
}

