// components/mezhuanlan/mezhuanlan.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    myVideo:[
      {
        url:'https://baikevideo.cdn.bcebos.com/media/mda-XcHMVGwqTr85eado/d19e7d544bb406a4dcb88470a3ac717c.mp4'
      },
      {
        url:'https://vd2.bdstatic.com/mda-mhqs5ckmvfjyepca/sc/cae_h264/1629916211823714622/mda-mhqs5ckmvfjyepca.mp4?v_from_s=hkapp-haokan-nanjing&auth_key=1629963045-0-0-60e6b4c1ae72ac8f1edad8688dee6694&bcevod_channel=searchbox_feed&pd=1&pt=3&abtest='
      }
     
    ]
  },

  /**
   * 组件的方法列表
   */
  methods: {
    all(){
     wx.showToast({
       title: '暂无数据',
       icon:"none"
     })
    }
  }
})
