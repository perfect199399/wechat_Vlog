//获取应用实例
const app = getApp()
var api = require('../../utils/api.js');
Page({
  data: {
    starCount: 0,
    forksCount: 0,
    visitTotal: 0,
    userInfo: {},
    session_key: null,
    openid: null,
    account_code:null,
    userId:null,
    hasUserInfo: false,
    //canIUse: wx.canIUse('button.open-type.getUserInfo'),
    canIUse: true
  },
  //事件处理函数
  // bindViewTap: function () {
  //   wx.navigateTo({
  //     url: '../logs/logs'
  //   })
  // },
  getUserProfile(e){
    var that = this;
    wx.getUserProfile({
      desc: '用于完善会员资料',
      lang:'zh_CN',
      complete: (res) => {
        console.info(res)
        that.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        });
        if (res.errMsg =='getUserProfile:ok'){
          wx.request({
            url: api.userinfo_url,
            method: 'POST',
            header: { 'Content-Type': 'application/x-www-form-urlencoded' },
            data: {
              encryptedData: res.encryptedData,
              iv: res.iv,
              signature: res.signature,
              rawData: res.rawData,
              hasUserInfo: true,
              openid: app.globalData.openid,
              account_code: api.account_code,
              userType:'LITE'
            }
          })
          wx.setStorage({
            key: 'userInfo',
            data: res.userInfo,
          })
          //保存授权标识
          wx.setStorage({
            key: 'hasUserInfo',
            data: true,
          })
          that.getDays();
        }
      }
    })
  },
  //我的作品
  myRecord:function(){
    wx.navigateTo({
      url: '/components/myVideo/myVideo',
    })
  },
  //关注+点赞
  showQrcode() {
    wx.previewImage({
      urls: ['https://z3.ax1x.com/2021/08/31/hUO7fe.jpg'],
      current: 'https://z3.ax1x.com/2021/08/31/hUO7fe.jpg' // 当前显示图片的http链接
    })
  },
  //第一次进页面加载
  onLoad: function () {
    var that = this;
    wx.getStorage({
      key: 'hasUserInfo',
      success: function(res) {
        if(res.data==true){
          that.setData({
            hasUserInfo: true
          });
          wx.getStorage({
            key: 'userInfo',
            success: function(res) {
              that.setData({
                userInfo: res.data
              });
            },
          })
          wx.getStorage({
            key: 'userLogin',
            success: function (res) {
              console.info(res)
              that.setData({
                openid: res.data.openid,
                account_code: res.data.account_code,
                userId: res.data.userId
              })
            },
            fail: function (res) {
              that.wxLogin();
            }
          })
        }else{
          that.wxLogin();
        }
      },
      fail:function(res){
        that.wxLogin();
        that.setData({
          hasUserInfo: false
        });
      }
    })
    that.getDays();
  },
  //微信登录
  wxLogin(){
    var that = this;
    // 登录
    wx.login({
      success: res => {
        //发送 res.code 到后台换取 openId, sessionKey, unionId
        wx.request({
          url: api.wxlogin_url,
          data: {
            code: res.code,
            account_code: api.account_code
          },
          success: function (res) {
            console.info(res.data.data)
            that.setData({
              openid: res.data.openid,
              account_code: res.data.account_code,
              userId: res.data.userId
            })
            app.globalData.openid = res.data.data.openid,
            app.globalData.account_code = api.account_code
            app.globalData.userId = res.data.data.userId
            wx.setStorage({
              key: 'userLogin',
              data: res.data.data,
            })
          },
        })
      }
    })
  },
  //获取用户信息
  getUserInfo: function (e) {
    var that = this;
    if (e.detail.errMsg =='getUserInfo:ok'){
      wx.request({
        url: api.userinfo_url,
        method: 'POST',
        header: { 'Content-Type': 'application/x-www-form-urlencoded' },
        data: {
          encryptedData: e.detail.encryptedData,
          iv: e.detail.iv,
          signature: e.detail.signature,
          rawData: e.detail.rawData,
          hasUserInfo: true,
          openid: app.globalData.openid,
          account_code: api.account_code,
          userType:'LITE'
        }
      })
      wx.setStorage({
        key: 'userInfo',
        data: e.detail.userInfo,
      })
      that.setData({
        userInfo: e.detail.userInfo,
        hasUserInfo: true
      });
      //保存授权标识
      wx.setStorage({
        key: 'hasUserInfo',
        data: true,
      })
      that.getDays();
    }
  },
  //获取用户首访累计天数
  getDays(){
    var that = this;
    var userId = app.globalData.userId;
    var openid = app.globalData.openid;
    api.userDaysRequest(userId,openid,{
      success(result) {
        if (result.code == 200) {
          that.setData({
            visitTotal: result.data.days
          })
        }else{
          that.setData({
            visitTotal: 0
          })
        }
      }
    })
  },
  coutNum(e) {
    if (e > 1000 && e < 10000) {
      e = (e / 1000).toFixed(1) + 'k'
    }
    if (e > 10000) {
      e = (e / 10000).toFixed(1) + 'W'
    }
    return e
  },

  showModal(e) {
    this.setData({
      modalName: e.currentTarget.dataset.target
    })
  },
  hideModal(e) {
    this.setData({
      modalName: null
    })
  },
  attached() {
    console.log("success")
    let that = this;
    wx.showLoading({
      title: '数据加载中',
      mask: true,
    })
    let i = 0;
    numDH();
    function numDH() {
      if (i < 20) {
        setTimeout(function () {
          that.setData({
            starCount: i,
            forksCount: i,
            visitTotal: i
          })
          i++
          numDH();
        }, 20)
      } else {
        that.setData({
          starCount: that.coutNum(3000),
          forksCount: that.coutNum(484),
          visitTotal: that.coutNum(24000)
        })
      }
    }
    wx.hideLoading()
  },
})
