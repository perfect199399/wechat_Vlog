Page({
  data: {
    title:'华山',
    imgUrls: [
      {
        url:'https://img0.baidu.com/it/u=948602605,1373898221&fm=26&fmt=auto&gp=0.jpg',
      },
      {
        url:'https://ss0.baidu.com/-Po3dSag_xI4khGko9WTAnF6hhy/zhidao/wh%3D680%2C800/sign=b9b90b4b5c2c11dfde84b7255b174ee8/5366d0160924ab184c4b2d9f3efae6cd7b890b3d.jpg'
      },
      {
        url:'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg8.zol.com.cn%2Fbbs%2Fupload%2F19824%2F19823826.jpg&refer=http%3A%2F%2Fimg8.zol.com.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1632553581&t=112d3077d9728670bab0fc6c6e62a3ab',
      }
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