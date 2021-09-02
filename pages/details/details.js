Page({
  data: {
    title:'华山',
    imgUrls: [
      {
        url:'https://img0.baidu.com/it/u=948602605,1373898221&fm=26&fmt=auto&gp=0.jpg',
      },
      {
        url:'https://cwag-dingding-app.oss-cn-beijing.aliyuncs.com/huashan1.jpg',
      },
      {
        url:'https://cwag-dingding-app.oss-cn-beijing.aliyuncs.com/huashan.jpg'
      },
     
    ],
    indicatorDots: true,
    autoplay: true,
    interval: 3000,
    duration: 1000
  },
 
   //open地图
   openMapTap: function () {
    wx.navigateTo({
      url: '../map/map'
    })
  },
  // 获取视频
  onclick:function() {
    wx.switchTab({
      url: '/pages/cart/cart'
    })
  },
})