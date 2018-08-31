Component({
  /**
   * 组件的属性列表
   */
  properties: {
    
  },

  ready() {
    this.getPage();
  },


  methods: {
   
    _closeModalEvent(){     
      this.triggerEvent("closeModalEvent")
    },
   
    catchTouch() {
      return;
    },

    getPage() {
      var query = wx.createSelectorQuery()
      query.select('.container').boundingClientRect()
      query.selectViewport().scrollOffset()
      query.exec(function (res) {
        let page = res.filter(item => item)[0]
        page.class = "noscroll";
      })
    }
  }
})