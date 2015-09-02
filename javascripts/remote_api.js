function RemoteApi(settings) {
  settings.env = settings.env ? settings.env : 'pro';

  switch (settings.env){
    case 'pro':
          this.server_host = 'https://disi.se';
          break;
    case 'dev':
          this.server_host = 'http://192.168.3.68:91';
          break;
    case 'test':
          this.server_host = 'http://b22.poptop.cc';
          break;
    default :
          this.server_host = '';
          break;
  }

  this.request_data = {
    host_id: settings.computer_name ? settings.computer_name : null,
    version: chrome.runtime.getManifest().version,
    app_secret: 'F$~((kb~AjO*xgn~'
  };

  this.urls = {
    getTask : '/index.php/Admin/BusinessAccountApi/login_task',
    reportCookie : '/index.php/Admin/ClientApi/business_account_cookies_save',
    disableAccount : '/index.php/Admin/ClientApi/disabled_account',
    reportSuccess : '/index.php/Admin/BusinessAccountApi/login_task_success'
  }
}

RemoteApi.prototype = {

  ajax: function(params,done,fail){
    $.ajax(params).done(done && done()).fail(fail && fail());
  },

  get: function (url, params, done, fail) {
    $.getJSON(url,params,function(data,textStatus,jqXHR){
      done && done(data);
    }).fail(function(jqXHR, textStatus, errorThrown) {
      fail && fail();
    });
  },

  post: function (url, params, done, fail) {
    $.post(url, params, function(data) {
      done && done(data);
    },'Json').fail(function(jqXHR, textStatus, errorThrown) {
      fail && fail();
    });
  },

  getTask: function(done_callback, fail_callback) {
    var url = this.server_host + this.urls.getTask;

    this.get(url,this.request_data,done_callback,fail_callback);
  },

  reportDisable: function(account_name,slug,message,done_callback,fail_callback){
    var url = this.server_host + this.urls.disableAccount;
    var post_data = {
      host_id: this.client_id,
      app_secret: this.app_secret,
      version: chrome.runtime.getManifest().version,
      username: account_name,
      slug: slug,
      locked_type: 4,
      locked_remark: message
    };
    if(message){
      this.post(url,post_data,done_callback,fail_callback);
    }else{
      fail_callback && fail_callback();
    }

  },

  reportFail: function(){

  },

  reportSuccess: function(id, done_callback, fail_callback) {
    var url = this.server_host + this.urls.reportSuccess;

    var params = this.request_data;
    params.id = id;

    this.post(url,params,done_callback,fail_callback);
  },

  reportCookie:function(account_id,cookies,done_callback, fail_callback){
    var url = this.server_host + this.urls.reportCookie;

    var params = this.request_data;
    params.cookies = cookies;
    params.account_id = account_id;

    this.post(url,params,done_callback,fail_callback);
  }
	
};