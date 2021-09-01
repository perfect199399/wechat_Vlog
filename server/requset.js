export const  request=(params)=>{
  
  return new Promise((resolve,reject)=>{
    wx.request({
      ...params,
      url:params.url,
      success:(result)=>{
        resolve(result);
      },
      fail:(err)=>{
        reject(err);
      }
    })
  })
}
