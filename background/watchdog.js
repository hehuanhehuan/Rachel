function watchDog() {
  console.log("entrance watchdog");
  if (settings.running) {
    var time = new Date().getTime();
    console.log(parseInt((time - last_watchdog_time)/1000) +"秒");
    if (time - last_watchdog_time > 60000) {

      if(time - last_watchdog_time > 250000){
        console.log("250 seconds unactive");
        changeIpAndOpenWindow();
      }

      if(start_time && (time - start_time > 600000)){
        changeIpAndOpenWindow();
      }

      chrome.tabs.query({active: true, highlighted: true}, function(tabs) {
        if (tabs.length > 0) {
          var current_url = tabs[0].url;
          console.log(current_url);
          last_watchdog_time = time;
          if (current_url.indexOf('yhd.com/') >=0 || current_url.indexOf('jd.com/') >=0) {
            console.log("reload " + current_url);
            chrome.tabs.reload(tabs[0].id, function() {

            });
          }

        }
      });

    }
  }

  setTimeout(watchDog, 1000);
}

function resetWatchDog(callback){
  last_watchdog_time = new Date().getTime();
  callback && callback();
}