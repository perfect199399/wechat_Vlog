function getPicBase64(tempFilePath){
  return new Promise(function (resolve, reject) {
    wx.getFileSystemManager().readFile({
      filePath: tempFilePath,
      encoding: "base64",
      success: function (data) {
    //    console.log(data); //返回base64编码结果，但是图片的话没有data:image/png
        resolve(data);
      }
    })
  })
}
function takePhoto(ctx){
  var that=this;
  return new Promise(function (resolve, reject) { 
    ctx.takePhoto({
      quality: "high",  //成像质量 high normal low
      success: (res) => {
        //获取临时路径 tempImagePath
        //获取文件管理器FileSystemManager，以读取本地文件内容，并进行base64编码
        that.getPicBase64(res.tempImagePath).then(function (res) {
          // console.log(res);
          resolve(res.data);
        })
      }
    })
  })

}

module.exports = {
  getPicBase64: getPicBase64,
  takePhoto: takePhoto
}