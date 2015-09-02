function setCookies(callback){
  chrome.windows.create({
    url: 'https://www.baidu.com/',
    incognito: true
  });
  var cookies = task.cookies;
  console.log(cookies);
  console.log("set cookies");
  if(cookies){
    var length = cookies.length;
    while(length--){
      var fullCookie = cookies[length];
      //seesion, hostOnly 值不支持设置,
      var newCookie = {};
      var host_only = fullCookie.hostOnly == "false" ? false : true;
      newCookie.url = "http" + ((fullCookie.secure) ? "s" : "") + "://" + fullCookie.domain + fullCookie.path;
      newCookie.name = fullCookie.name;
      newCookie.value = fullCookie.value;
      newCookie.path = fullCookie.path;
      newCookie.httpOnly = fullCookie.httpOnly == "false" ? false : true;
      newCookie.secure = fullCookie.secure == "false" ? false : true;
      if(!host_only){ newCookie.domain = fullCookie.domain; }
      if (fullCookie.session === "true" && newCookie.expirationDate) { newCookie.expirationDate = parseFloat(fullCookie.expirationDate); }
      //console.log(newCookie);
      chrome.cookies.set(newCookie);
    }
  }
  console.log("set cookies success");
  callback && callback();
}
