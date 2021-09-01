import base64 from "../../utils/base64.js";
import {request} from "../../server/requset.js"
Page({
  data: {
    personImg64: "" //识别base64
  },
  async handleFaceCompare() {
    const userInfo = wx.getStorageSync('userInfo');
    const IDcard_64 = userInfo.IDcard_64;

    const access_token = wx.getStorageSync('access_token');
    let that = this;

    //1.创建摄像头上下文CameraContext（与页面内唯一的 camera 组件绑定）
    const ctx = wx.createCameraContext()
    base64.takePhoto(ctx).then((res) => {
      // console.log(res);
      let params = JSON.stringify([{
          "image": res,
          "image_type": "BASE64",
          "quality_control": "NORMAL",
          "liveness_control": "LOW"

        },
        {
          "image": IDcard_64,
          "image_type": "BASE64",
          "quality_control": "NORMAL",
        }
      ])
      wx.showLoading({
        title: '识别中...',
      })
      console.log(params);
      request({
          url: 'https://aip.baidubce.com/rest/2.0/face/v3/match?access_token=' + access_token,
          data: params,
          method: 'POST',
          header: {
            'content-type': 'application/json'
          }
        })
        .then((res) => {
          // console.log(res);
          // console.log(res.data.result.score);
          if (res.statusCode == 200 && res.data.error_code == 0) {
            wx.hideLoading()



            if (res.data.result.score >= 80) {
              let order_status = 1;
              that.updateOrder(order_status);
            } else {
              wx.showToast({
                title: "人脸识别失败，请重试",
                icon: 'none',
                mask: true,
                duration: 1000
              })
            }

          } else {
            wx.hideLoading()
              .then(
                wx.showToast({
                  title: res.data.error_msg,
                  icon: 'none',
                  mask: true,
                  duration: 4000
                })
              )

          }
        })


    })
  },
  async updateOrder(order_status){
    let {_id} = wx.getStorageSync('orderInfo');
    // console.log(_id);
    let updateOrderRes = await wx.cloud.callFunction({
      name:"updateOrder",
      data:{
        order_id: _id,
        order_status: order_status
      }
    })
    // console.log(updateOrderRes);
    // console.log(updateOrderRes.result.stats.updated);
    if(updateOrderRes.result.stats.updated == 0){
      wx.showToast({
        title: '识别成功',
        mask: true,
        duration: 2000
      })
      .then(
        setTimeout(function(){
          wx.reLaunch({
            url: '/pages/index/index',
          })
        },2000)
      )
    }
  },
    
    



  onShow: function () {
    //获取token
    this.requestToken();

  },

 

   requestToken() {
    wx.request({
      url: 'https://aip.baidubce.com/oauth/2.0/token',
      data: {
        grant_type: 'client_credentials',
        
        client_id: 'UYzTmQpim1pYXXVgHoPKwHvV', //应用的百度API Key
        client_secret: 'cLNVUxQjOMoI4vKI8DGNduIlOkZoOHoO' //应用的百度Secret Key
 
      },
      //header: {'content-type': 'application/json'},
      header: {'content-type': 'application/x-www-form-urlencoded'},
      success (res) {
        // console.log(res);
        if(res.statusCode == 200){
          // console.log(res.data.access_token);
          wx.setStorageSync("access_token", res.data.access_token);
        }
      }
    })

},
  chooseImage() {
    wx.chooseImage({
      success(res) {
        const tempFilePaths = res.tempFilePaths
        wx.uploadFile({
          url: 'https://example.weixin.qq.com/upload', //仅为示例demo，非真实的接口地址
          filePath: tempFilePaths[0],
          name: 'file',
          formData: {
            'user': 'test'
          },
          success(res) {
            const data = res.data
            //do something
          }
        })
      }
    })
  },
  onLoad: function () {

  },
})