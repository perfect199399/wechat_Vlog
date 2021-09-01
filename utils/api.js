//域名地址
//var prefix = 'http://192.168.50.32:8888/xai';
var prefix = '';
//小程序账号编码(自己定义，后端项目中对应weixin_account表中的account_code)
var account_code = "";
/** 接口地址 */
//轮播图片地址
const rotary_url = prefix +'/rest/lite/config/index/slide'
//刷新内容地址
const copywrite_url = prefix + '/rest/lite/config/v1/random_text'
//授权数据解密
const userinfo_url = prefix + '/rest/wxlite/v1/decrypt'
//微信login
const wxlogin_url = prefix + '/rest/wxlite/v1/wx_login'
//面相(五官)分析
const faceorgans_url = prefix + '/rest/face_organs/detect'
//用户首次访问累计天数
const userdays_url = prefix + '/rest/wxlite/v1/days'
//垃圾分类
const garbage_url = prefix + '/rest/garbage/search'
//图像识别
const icr_url = prefix + '/rest/icr/detect'
//图像处理
const icrhandle_url = prefix + '/rest/icr/handle'
//人脸融合
const facemerge_url = prefix + '/rest/face_merge/merge';
//虚拟换妆
const facetransfer_url = prefix + '/rest/face_merge/transfer';
//皱纹检测
const facewrinkle_url = prefix + '/rest/face/wrinkle';
//黑眼圈眼袋检测
const eyesattr_url = prefix + '/rest/face/eyes_attr';
//肤色分析接口
const faceSkinColor_url = prefix + '/rest/face/skin_color';
//皮肤光滑度检测接口
const faceSkinsmooth_url = prefix + '/rest/face/skin_smooth';
//痘斑痣检测接口
const faceAcnespotmole_url = prefix + '/rest/face/detect_acnespotmole';
//中草药识别接口
const chinese_herbal_medicine_url = prefix + '/rest/easydl/chinese_herbal_medicine';
//背景色修改接口
const idphoto_url = prefix + '/rest/idphoto/replace';
//图片转字符画接口
const ascii_url = prefix + '/rest/ias/image2ascii';
//人脸检测接口
const facedetect_url = prefix + '/rest/face/detect';
//小表帝识别接口
const watch_url = prefix + '/rest/easydl/little_watchemperor';
//手相分析接口
const palm_url = prefix + '/rest/palm/detect_palm';
//穿衣搭配接口
const clothing_url = prefix + '/rest/jdai/clothing_match';
//颜色识别接口
const color_url = prefix + '/rest/jdai/detect_color';
//闲聊接口
const chat_url = prefix + '/rest/text_chat/dialog';
//小红花接口
const faceflower_url = prefix + '/rest/face/flower';
//发际线编辑接口
const hairlineedit_url = prefix + '/rest/face/hair_line_edit';

//人脸驱动接口
const drive_url = prefix + '/rest/face/drive';
//虚拟主播接口
const virtual_human_url = prefix + '/rest/face/virtual_human';
//数据列表接口
const face_dynamic_url = prefix + '/rest/face_dynamic/list';

/**
 * 人脸驱动接口
 * @param file 图片
 * @param userId 用户ID
 * @param subtitle_text 模式
 */
let driveRequest = (file,userId, callback) => {
  //发送接口请求
  wx.uploadFile({
    url: drive_url,
    filePath: file,
    header: {
      'content-type': 'multipart/form-data'
    },
    name: 'file',
    formData: {
      'version':'2',
      'userId': userId
    },
    method: 'POST',
    success: function (res) {
      callback.success(res.data)
    },
    fail: function (res) {
      if (callback.fail)
        callback.fail()
    }
  })
}

/**
 * 虚拟主播接口
 * @param file 图片
 * @param userId 用户ID
 * @param subtitle_text 模式
 */
let virtualHumanRequest = (file,userId,subtitle_text, callback) => {
  //发送接口请求
  wx.uploadFile({
    url: virtual_human_url,
    filePath: file,
    header: {
      'content-type': 'multipart/form-data'
    },
    name: 'file',
    formData: {
      'version':'2',
      'userId': userId,
      'account_code': account_code,
      'subtitle_text':subtitle_text
    },
    method: 'POST',
    success: function (res) {
      callback.success(res.data)
    },
    fail: function (res) {
      if (callback.fail)
        callback.fail()
    }
  })
}

/**
 * 数据列表接口
 * @param userId 用户ID
 */
let faceDynamicListRequest = (userId,logType,callback) => {
  var param = '';
  if(null==logType){
      param = '?userId='+userId+'&pageNo=1&pageSize=20'
  }else{
    param = '?userId='+userId+'&apiType='+logType+'&pageNo=1&pageSize=20'
  }
  //发送接口请求
  wx.request({
    url: face_dynamic_url+param,
    method:'GET',
    success: function (res) {
      callback.success(res.data)
    },
    fail: function (res) {
      if (callback.fail)
        callback.fail()
    }
  })
}

/**
 * 发际线编辑接口
 * @param file 图片
 * @param userId 用户ID
 * @param mode 模式
 */
let hairLineEditRequest = (file,userId,mode, callback) => {
  //发送接口请求
  wx.uploadFile({
    url: hairlineedit_url,
    filePath: file,
    header: {
      'content-type': 'multipart/form-data'
    },
    name: 'file',
    formData: {
      'version':'2',
      'userId': userId,
      'account_code': account_code,
      'mode':mode,
      'degree':1
    },
    method: 'POST',
    success: function (res) {
      callback.success(res.data)
    },
    fail: function (res) {
      if (callback.fail)
        callback.fail()
    }
  })
}

/**
 * 小红花接口
 * @param file 图片
 * @param userId 用户ID
 * @param direction 左右方向
 */
let faceFlowerRequest = (file, userId,direction, callback) => {
  //发送接口请求
  wx.uploadFile({
    url: faceflower_url,
    filePath: file,
    header: {
      'content-type': 'multipart/form-data'
    },
    name: 'file',
    formData: {
      'version':'2',
      'userId': userId,
      'account_code': account_code,
      'direction':direction
    },
    method: 'POST',
    success: function (res) {
      callback.success(res.data)
    },
    fail: function (res) {
      if (callback.fail)
        callback.fail()
    }
  })
}

/**
 * 聊天方法
 * @param text 文本内容
 * @param userId 用户ID
 * @param language 对话语言模型
 */
let chatRequest = (text,userId,callback) => {
  //发送接口请求
  wx.request({
    url: chat_url,
    method:'POST',
    header: {
      'content-type': 'application/x-www-form-urlencoded'
    },
    data: {
      'version': '2',
      'userId': userId,
      'account_code': account_code,
      'text': text
    },
    success: function (res) {
      callback.success(res.data)
    },
    fail: function (res) {
      if (callback.fail)
        callback.fail()
    }
  })
}
/**
 * 图片背景色修改
 * @param file 图片
 * @param userId 用户ID
 * @param color 颜色
 */
let idphotoRequest = (file, userId, color, callback) => {
  //发送接口请求
  wx.uploadFile({
    url: idphoto_url,
    filePath: file,
    header: {
      'content-type': 'multipart/form-data'
    },
    name: 'file',
    formData: {
      'version': '2',
      'userId': userId,
      'account_code': account_code,
      'color': color
    },
    method: 'POST',
    success: function (res) {
      callback.success(res.data)
    },
    fail: function (res) {
      if (callback.fail)
        callback.fail()
    }
  })
}
/**
 * 虚拟换妆
 * @param file 图片
 * @param userId 用户ID
 * @param templateId 模板ID
 * @param style 风格
 */
let transferRequest = (file, userId, templateId,style,callback) => {
  //发送接口请求
  wx.uploadFile({
    url: facetransfer_url,
    filePath: file,
    header: {
      'content-type': 'multipart/form-data'
    },
    name: 'file',
    formData: {
      'version': '2',
      'userId': userId,
      'account_code': account_code,
      'templateId': templateId,
      'style': style
    },
    method: 'POST',
    success: function (res) {
      callback.success(res.data)
    },
    fail: function (res) {
      if (callback.fail)
        callback.fail()
    }
  })
}
/**
 * 人脸融合
 * @param file 图片
 * @param userId 用户ID
 * @param templateId 模板ID
 */
let mergeRequest = (file, userId, templateId, callback) => {
  //发送接口请求
  wx.uploadFile({
    url: facemerge_url,
    filePath: file,
    header: {
      'content-type': 'multipart/form-data'
    },
    name: 'file',
    formData: {
      'version': '2',
      'userId': userId,
      'account_code': account_code,
      'templateId': templateId
    },
    method: 'POST',
    success: function (res) {
      callback.success(res.data)
    },
    fail: function (res) {
      if (callback.fail)
        callback.fail()
    }
  })
}
/**
 * 通用识别
 * @param file 图片
 * @param userId 用户ID
 * @param apiurl 接口地址
 */
let generalRequest = (file, userId, apiurl, callback) => {
  //发送接口请求
  wx.uploadFile({
    url: apiurl,
    filePath: file,
    header: {
      'content-type': 'multipart/form-data'
    },
    name: 'file',
    formData: {
      'version': '2',
      'userId': userId,
      'account_code': account_code
    },
    method: 'POST',
    success: function (res) {
      callback.success(res.data)
    },
    fail: function (res) {
      if (callback.fail)
        callback.fail()
    }
  })
}
/**
 * 图像识别
 * @param file 图片
 * @param userId 用户ID
 * @param apiType 接口类型
 */
let icrRequest = (file, userId, apiType, callback) => {
  //发送接口请求
  wx.uploadFile({
    url: icr_url,
    filePath: file,
    header: {
      'content-type': 'multipart/form-data'
    },
    name: 'file',
    formData: {
      'version': '2',
      'userId': userId,
      'account_code': account_code,
      'apiType': apiType
    },
    method: 'POST',
    success: function (res) {
      callback.success(res.data)
    },
    fail: function (res) {
      if (callback.fail)
        callback.fail()
    }
  })
}
/**
 * 图像处理
 * @param file 图片
 * @param userId 用户ID
 * @param apiType 接口类型
 */
let icrHandleRequest = (file, userId, apiType, callback) => {
  //发送接口请求
  wx.uploadFile({
    url: icrhandle_url,
    filePath: file,
    header: {
      'content-type': 'multipart/form-data'
    },
    name: 'file',
    formData: {
      'version': '2',
      'userId': userId,
      'account_code': account_code,
      'apiType': apiType
    },
    method: 'POST',
    success: function (res) {
      callback.success(res.data)
    },
    fail: function (res) {
      if (callback.fail)
        callback.fail()
    }
  })
}
/**
 * 垃圾分类
 * @param file 图片
 * @param userId 用户ID
 */
let garbageRequest = (file, userId,cityId, callback) => {
  //发送接口请求
  wx.uploadFile({
    url: garbage_url,
    filePath: file,
    header: {
      'content-type': 'multipart/form-data'
    },
    name: 'file',
    formData: {
      'version':'2',
      'userId': userId,
      'account_code': account_code,
      'cityId': cityId
    },
    method: 'POST',
    success: function (res) {
      callback.success(res.data)
    },
    fail: function (res) {
      if (callback.fail)
        callback.fail()
    }
  })
}

/**
 * 用户首次访问累计天数
 * @param userId 用户ID
 * @param openid 微信用户openid
 */
let userDaysRequest = (userId,openid,callback) => {
  //发送接口请求
  wx.request({
    url: userdays_url,
    method: 'GET',
    data: {
      'userId': userId,
      'openid': openid
    },
    success: function (res) {
      callback.success(res.data)
    },
    fail: function (res) {
      if (callback.fail)
        callback.fail()
    }
  })
}

/**
 * 面相(五官)分析
 * @param file 图片
 * @param userId 用户ID
 */
let faceOrgansRequest = (file, userId, callback) => {
  //发送接口请求
  wx.uploadFile({
    url: faceorgans_url,
    filePath: file,
    header: {
      'content-type': 'multipart/form-data'
    },
    name: 'file',
    formData: {
      'userId': userId,
      'account_code': account_code
    },
    method: 'POST',
    success: function (res) {
      callback.success(res.data)
    },
    fail: function (res) {
      if (callback.fail)
        callback.fail()
    }
  })
}
/** 暴露出去 */
module.exports={
  rotary_url: rotary_url,
  copywrite_url: copywrite_url,
  userinfo_url: userinfo_url,
  wxlogin_url: wxlogin_url,
  account_code: account_code,
  facemerge_url: facemerge_url,
  facetransfer_url: facetransfer_url,
  facewrinkle_url: facewrinkle_url,
  eyesattr_url: eyesattr_url,
  faceSkinColor_url: faceSkinColor_url,
  faceSkinsmooth_url: faceSkinsmooth_url,
  faceAcnespotmole_url: faceAcnespotmole_url,
  ascii_url: ascii_url,
  facedetect_url: facedetect_url,
  watch_url: watch_url,
  palm_url:palm_url,
  clothing_url: clothing_url,
  color_url: color_url,
  faceflower_url:faceflower_url,
  /** 暴露出去方法 */
  faceOrgansRequest: faceOrgansRequest,
  userDaysRequest: userDaysRequest,
  garbageRequest: garbageRequest,
  icrRequest: icrRequest,
  generalRequest: generalRequest,
  icrHandleRequest: icrHandleRequest,
  transferRequest: transferRequest,
  mergeRequest: mergeRequest,
  idphotoRequest: idphotoRequest,
  chatRequest: chatRequest,
  faceFlowerRequest:faceFlowerRequest,
  hairLineEditRequest:hairLineEditRequest,
  driveRequest:driveRequest,
  virtualHumanRequest:virtualHumanRequest,
  faceDynamicListRequest:faceDynamicListRequest
}
