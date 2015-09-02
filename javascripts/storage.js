function reloadSettings(success) {
  chrome.storage.local.get(null, function(data) {
    settings = data.settings ? data.settings : settings;
    console.log(settings);
    if(settings && settings.running){
      api = new RemoteApi(settings);
      success && success();
    }
  });
}

function storageSet(Obj,callback){
  chrome.storage.local.set(Obj, function() {
    callback && callback();
  });
}

function storageGet(res,callback){
  chrome.storage.local.get(null, function(data) {
    switch (res) {
      case 'task':
        task = data.task;
        break;
      case 'settings':
        settings = data.settings;
        break;
      case 'process':
        process = data.process;
        break;
      default :
        break;
    }
    if( ! data[res]){
      data[res] = {};
    }
    callback && callback(data[res]);
  });
}