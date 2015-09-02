function tabCreate(tab,response){
  chrome.tabs.create(tab, function(){
    response && response();
  });
}

function tabRemove(callback){

}
