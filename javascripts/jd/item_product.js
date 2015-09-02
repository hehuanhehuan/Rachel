
function goShop(){
    var seller_info = $('#extInfo .seller-infor a');
    if(seller_info.length > 0){
        var show_more = seller_info.next();
        if(show_more.length > 0){
            if(show_more[0].innerHTML == '京东自营'){
                //success
                init.sendMessage('success');
            }else{
                goNext(show_more[0]);
            }
        }else{

        }
    }else{

    }
}

function productComment(callback){
    var detail_tab_comm = $('#detail-tab-comm a');
    if(detail_tab_comm.length > 0){
        detail_tab_comm[0].click();
        setTimeout(function () {
            init.watchDog();
            callback && callback();
        },2000);
    }else{

    }
}
