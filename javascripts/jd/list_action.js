
function orderDetail(){
    var receives = $('span:contains("确认收货")').parents('tr').prev('tr').find('a[name="orderIdLinks"]');
    if(receives.length > 0){
        var rand_receive_index = init.randMod(0,parseInt(parseInt(receives.length)-1));
        var receive = receives[rand_receive_index];
        goNext(receive);
    }else{
        next = codes['guessingliked'];
        guessingLiked();
    }
}

function guessingLiked(){
    var guessing_liked = $('#guessing-liked').find('.goods-list').find('a');
    if(guessing_liked.length > 0){
        var rand_guessing_like_index = init.randMod(0,parseInt(parseInt(guessing_liked.length)-1));
        console.log(rand_guessing_like_index);
        var link = guessing_liked[rand_guessing_like_index];
        console.log(link);
        goNext(link);
    }else{
        setTimeout(function(){
            init.watchDog();
            locationGuessingLiked();
        },3000)
    }
}

function locationGuessingLiked(){
    if(location.href.indexOf('guessing-liked')!=-1){
        guessingLiked();
    }else{
        location.href = location.href + "#guessing-liked";
        locationGuessingLiked();
    }
}
