Page({
  data: {
    title:'华山',
    imgUrls: [
      {
        url:'https://ss0.baidu.com/-Po3dSag_xI4khGko9WTAnF6hhy/zhidao/wh%3D680%2C800/sign=b9b90b4b5c2c11dfde84b7255b174ee8/5366d0160924ab184c4b2d9f3efae6cd7b890b3d.jpg'
      },
      {
        url:'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fyouimg1.c-ctrip.com%2Ftarget%2Ffd%2Ftg%2Fg4%2FM06%2F7D%2F7B%2FCggYHVaB9T2AOuf0AAFvUukdcs8190_R_671_10000_Q90.jpg&refer=http%3A%2F%2Fyouimg1.c-ctrip.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1632554666&t=187cc932682e47a1a0aa57533d10616a'
      },
    ],
    getList:[
      {
        image:'https://img0.baidu.com/it/u=607507856,3841653179&fm=26&fmt=auto&gp=0.jpg',
      },
      {
        image:'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fb4-q.mafengwo.net%2Fs8%2FM00%2FC1%2F6D%2FwKgBpVYSRe6AedqoAAiPNaoGG8831.jpeg%3FimageView2%2F2%2Fw%2F680%2Fq%2F90&refer=http%3A%2F%2Fb4-q.mafengwo.net&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1632554666&t=601af28b306fa9c290662ab902627e96',
      },
      {
        image:'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fyouimg1.c-ctrip.com%2Ftarget%2Ffd%2Ftg%2Fg4%2FM06%2F7D%2F7B%2FCggYHVaB9T2AOuf0AAFvUukdcs8190_R_671_10000_Q90.jpg&refer=http%3A%2F%2Fyouimg1.c-ctrip.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1632554666&t=187cc932682e47a1a0aa57533d10616a',
      },
    ],
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 800
  },
 
   //跳转☞地图
   openMapTap: function () {
    wx.navigateTo({
      url: '../map/map'
    })
  },
  // 跳转☞游玩攻略
  openStrategy:function(){
    wx.navigateTo({
      url: '/pages/strategy/strategy'
    })
    // wx.showToast({
    //   title: '暂无数据',
    //   image:'/img/none.png'

    // })
  },
  // 跳转☞详情
  onclick:function() {
    wx.navigateTo({
      url: '/pages/details/details'
    })
  },
})