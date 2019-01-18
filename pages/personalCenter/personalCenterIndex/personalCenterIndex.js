// pages/personalCenter/personalCenter.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    headImg:"",
    showSuccess:false,
    showMarket:false,
    showNum:"",
    showText:"",
    loginIsRegisterHidden:true,
    phoneHidden:true,
    loginIsRegister: "",
    SignIn: '签到',
    phone: '',
    list: [
      {
        src: "/img/mineIntegral.png",
        name: "我的积分",
        id: "0"
      },
      {
        src: "/img/myCards.png",
        name: "我的卡劵",
        id: "1"
      },
      {
        src: "/img/Complaint.png",
        name: "投诉建议",
        id: "2"
      },
      {
        src: "/img/Collection.png",
        name: "我的收藏",
        id: "3"
      }
    ],
    new_list: [
      {
        src: "/img/orders.png",
        name: "我的订单",
        id: "0"
      },
      {
        src: "/img/builds.png",
        name: "约看楼盘",
        id: "1"
      }
    ],
    rent_list: [
      {
        src: "/img/showHouse.png",
        name: "约看房间",
        id: "0"
      },
      {
        src: "/img/contract.png",
        name: "房租合同",
        id: "1"
      },
      {
        src: "/img/Entrust1.png",
        name: "业主委托",
        id: "2"
      },
      {
        src: "/img/tenancy.png",
        name: "我的租约",
        id: "3"
      }
    ],
    service_list:[
      {
        src: "https://img.guoanfamily.com/myCleaning.png",
        name: "我的保洁",
        id: "0"
      },
      {
        src: "https://img.guoanfamily.com/myRepair.png",
        name: "我的维修",
        id: "1"
      },
    ],
    Btn_bottom: [
      {
        src: "/img/tenancy.png",
        name: "关于我们",
        id: "1"
      },
      {
        src: "/img/tenancy.png",
        name: "退出登录",
        id: "2"
      }
    ],
    show: 1,
    token:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   
  },
  callPhone() {
    wx.makePhoneCall({
      phoneNumber: '4009002225' //仅为示例，并非真实的电话号码
    })
  },
  loginSuccess() {
    this.setData({
      show: 1
    })
  },
  closeLogin() {
    this.setData({
      show: 1
    })
  },
  loginIsRegister() {
    if (!wx.getStorageSync("token")) {
      wx.navigateTo({
        url: '/pages/login/login',
      })
    }
  },
  Btn_bottom_goListLi(e){
    let $id = e.currentTarget.dataset.id;
    let _this = this;
    switch($id){
        case "1"://关于我们
          wx.navigateTo({
            url: '/pages/personalCenter/AboutUs/AboutUs',
          })
        break;
        case "2"://退出
        wx.showModal({ 
          content: '您确定清除缓存并退出？',
          success(res) {
            if (res.confirm) {
               _this.setData({
                loginIsRegisterHidden: true,
                phoneHidden: true
              })
              wx.clearStorageSync();
            } else if (res.cancel) {
            }
          }
        })
        break;
    }

  },
  //签到方法
  SignIn() {
    if(!wx.getStorageSync("token")){
        wx.navigateTo({
          url: '/pages/login/login',
        })
    }else{
      app.globalData.$post("commonPoint/pointDailySign/userPointDailySing",{
          userid: "",
          agenttype: "1"
      }, "integral").then(
          response => {
            if (response.code == 2002) {
              this.setData({
                showSuccess: true,
                showMarket: true,
                showNum: "+3",
                showText: "签到成功，获取积分"
              })
            } else {
              this.setData({
                showSuccess: true,
                showMarket: true,
                showNum: "已签到",
                showText: ""
              })


            }
          },
          response => {
          }
        );
    }
    
  },
  // 跳转我的积分
  qdBtnClick(){
      wx.navigateTo({
        url:"/pages/personalCenter/Myintegral/Myintegral",
      })
  },
  marketHide(){
      this.setData({
        showMarket:false
      })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    // headImg
    let headImg = wx.getStorageSync("headImg");
    if (!headImg){
      headImg=""
    }
    let phoneN = wx.getStorageSync("phoneNum");
    this.setData({
      token: wx.getStorageSync("token"),
      headImg
    })

    if (this.data.token != "") {

      let loginIsRegister = wx.getStorageSync("realName")
      if (loginIsRegister==null){
        loginIsRegister="客官"
      }
      this.setData({
        loginIsRegisterHidden: false,
        phoneHidden: false,
        loginIsRegister,
        phone: phoneN.substring(0, 3) + "*****" + phoneN.substring(8, 11)

      })
    } else {
      this.setData({
        loginIsRegisterHidden: true,
        phoneHidden: true,

      })

    }
  },
  goListLi(e){
    let $id = e.currentTarget.dataset.id;

    if (!wx.getStorageSync("token")) {
      wx.navigateTo({
        url: '/pages/login/login'
      })
    }else{
      switch ($id) {
        case "0":
          wx.navigateTo({
            url: '/pages/personalCenter/Myintegral/Myintegral',
          })
          break;
        case "1":
          wx.navigateTo({
            url: '/pages/personalCenter/Mycard/Mycard',
          })
          break;
        case "2":
          wx.navigateTo({
            url: '/pages/personalCenter/suggestion/suggestion',
          })

          break;
        case "3":
          wx.navigateTo({
            url: '/pages/personalCenter/MyCollection/MyCollection',
          })
          break;
      }
    }

  
  },
  new_goListLi(e) {
    let $id = e.currentTarget.dataset.id;
    if (!wx.getStorageSync("token")) {
      wx.navigateTo({
        url: '/pages/login/login'
      })
    }else{
      switch ($id) {
        case "0":
          wx.navigateTo({
            url: '/pages/personalCenter/Myorder/Myorder',
          })
          break;
        case "1":
          wx.navigateTo({
            url: '/pages/personalCenter/InvitedBuild/InvitedBuild',
          })
          break;
        case "2":
          break;
        case "3":
          break;
      }
    }
  
  },
  service_goListLi(e){
    let $id = e.currentTarget.dataset.id;
    if (!wx.getStorageSync("token")) {
      wx.navigateTo({
        url: '/pages/login/login'
      })
    } else {
      switch ($id) {
        case "0":
          wx.navigateTo({
            url: '/pages/personalCenter/myCleaning/myCleaning',
          })
          break;
        case "1":
          wx.navigateTo({
            url: '/pages/personalCenter/Maintenancelist/Maintenancelist',
          })
          break;
      }
    }
  },
  rent_goListLi(e){
    let $id = e.currentTarget.dataset.id;
    if (!wx.getStorageSync("token")) {
      wx.navigateTo({
        url: "/pages/login/login",
      })
    } else {
      switch ($id) {
        case "0":
          wx.navigateTo({
            url: '/pages/personalCenter/LookAtTheRoom/LookAtTheRoom',
          })
          break;
        case "1":
          wx.navigateTo({
            url: '/pages/personalCenter/contract/contract',
          })
          break;
        case "2":
          wx.navigateTo({
            url: "/pages/personalCenter/Entrust/Entrust",
          })
          break;
        case "3":
          wx.navigateTo({
            url: "/pages/personalCenter/myLease/myLease",
          })
          break;
      }
    }
   
  },
  setUp(){
    if (!wx.getStorageSync("token")) {
      wx.navigateTo({
        url: "/pages/login/login",
      })
    }else{
      wx.navigateTo({
        url: "/pages/personalCenter/setUp/setUp"
      })
    }
  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage(options) {
    var that = this;
    　　var shareObj = {
           title: "【国安家】为每个家的梦想全力以赴",
           path: `/pages/index/index`, 
        imageUrl: "https://img.guoanfamily.com/311324861370865436.jpg",  
            success: function (res) {
              wx.showModal({
                title: "温馨提示：",
                content: '分享成功',
              })
            }　　
  　　}
  　　// 来自页面内的按钮的转发
    if (options.from == 'text'){
  　　　　var eData = options.target.dataset;
  　　　　// 此处可以修改 shareObj 中的内容
          shareObj.path = `/pages/index/index`;
          shareObj.imageUrl ="https://img.guoanfamily.com/311324861370865436.jpg";
　　}
　　// 返回shareObj
　　return shareObj;
  }
})