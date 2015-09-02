var codes = {
  index:{code:'index', name:'京东首页', url:'http://www.jd.com/', next:''},

  guessyou:{code:'guessyou', name:'猜你喜欢', url:null, next:'orderlist'},
  specialbuy:{code:'specialbuy', name:'京东特色购', url:null, next:'orderlist'},
  elevator:{code:'elevator', name:'左侧滚动条2F', url:null, next:'orderlist'},
  orderlist:{code:'orderlist', name:'我的订单', url:null, next:'orderdetail'},
  orderdetail:{code:'orderdetail',name:'订单详情', url:null, next:'guessingliked'},
  guessingliked:{code:'guessingliked',name:'根据浏览猜你喜欢', url:null, next:'mall'},
  mall:{code:'mall',name:'店铺', page:'mall.index', url:null, next:null},

  focus:{code:'focus', name:'轮播页', url:null, next:'randpage1'},
  randpage1:{code:'randpage1', name:'轮播随机页', url:null, next:'randpage2'},
  randpage2:{code:'randpage1', name:'轮播随机页', url:null, next:'randpage3'},
  randpage3:{code:'randpage3', name:'轮播随机页', url:null, next:null},

  todays:{code:'todays', name:'今日推荐页', url:null, next:'recommendpage1'},
  recommendpage1:{code:'recommendpage1', name:'推荐随机页', url:null, next:'recommendpage2'},
  recommendpage2:{code:'recommendpage2', name:'推荐随机页', url:null, next:'itemlist'},
  itemlist:{code:'itemlist', name:'类目页', url:null, next:'itemsearch'},
  itemsearch:{code:'itemsearch', name:'搜索页', url:null, next:'listranditem'},
  listranditem:{code:'listranditem', name:'随机商品详情页', url:null, next:null}
};
