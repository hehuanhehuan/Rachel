$(function() {
  restoreSettings();

  $('#save').on('click', function() {
    saveSettings(function() {
      chrome.runtime.sendMessage({msg: 'reload_settings'}, function() {
        alert('保存成功');
      })
    })
  });

  $('#saveAndStart').on('click', function() {
    saveSettings(function() {
      chrome.storage.local.set({running: true}, function() {
        chrome.runtime.sendMessage({msg: 'reload_settings'}, function() {
          chrome.runtime.sendMessage({msg: 'start'});
        })
      })
    })
  })
});


function restoreSettings() {
  chrome.storage.local.get('settings', function(data) {
    if (data.settings) {

      $('#computer_name').val(data.settings.computer_name);

      document.getElementById("running").checked = data.settings.running ? true : false;

      $("#env").val(data.settings.env);

      $("#mode").val(data.settings.mode);
    }
  });
}

function saveSettings(callback) {
  var computer_name = $('#computer_name').val();
  var env = $('#env').val();
  var running = document.getElementById("running").checked ? true : false;
  var mode = $('#mode').val();
  var settings = {
    computer_name: computer_name,
    env: env,
    running: running,
    mode:mode
  };

  console.log(settings);

  chrome.storage.local.set({settings: settings}, function() {
    callback && callback();
  })
}