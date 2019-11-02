import wepy from 'wepy'
// import '../../utils/api.js'
export default class Home extends wepy.mixin {
    data = {
        swiperData:[],//轮播图数据
        catesData:[],//分类数据
        floorData:[]//楼层数据
      }
    
      config = {
      }
    
      methods = {
      }
      // 获取轮播图接口数据
      async getSwiperData(){
        const {data:res} =await wepy.get('/home/swiperdata')
        if (res.meta.status != 200) {
          return wepy.baseToast()
        }
        this.swiperData = res.message
        this.$apply()
      }
      // 获取分类接口数据
      async getCatesData(){
        const {data:res} =await wepy.get('/home/catitems')
        if (res.meta.status != 200) {
          return wepy.baseToast()
        }
        this.catesData = res.message
        this.$apply()
      }
      // 获取楼层接口数据
      async getFloorData(){
        const {data:res} = await wepy.get('/home/floordata')
        if (res.meta.status != 200) {
          return wepy.baseToast()
        }
        this.floorData = res.message
        this.$apply()
      }
      // 商品跳转事件
      goGoodsDetail (url) {
        wepy.navigateTo({
          url
        })
      }
      onLoad(){
        this.getSwiperData()
        this.getCatesData()
        this.getFloorData()
      }
}
