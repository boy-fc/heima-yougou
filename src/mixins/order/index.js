import wepy from 'wepy'

export default class Home extends wepy.mixin {
    data = {
        addressInfo:null
    }

    config = {
    }

    methods = {
        // 选择收货地址
        async chooseAddress(){
            const res = await wepy.chooseAddress().catch(err=>err)
            if (res.errMag !== 'chooseAddress:ok') {
                return wepy.baseToast('请填写收货地址')
            }
            wepy.baseToast('已选择收货地址')
            this.addressInfo = res 
            wepy.setStorageSync('addressInfo',res)
            this.$apply()
        }
    }
    computed = {
        isShowAddress () {
            if(this.addressInfo === null) {
              return true
            }
            return false
          },    
        //   收货地址展示
        addressStr () {
            if(this.addressInfo === null) {
              return null
            }
            const {provinceName,cityName,countyName,detailInfo} = this.addressInfo
            return provinceName+cityName+countyName+detailInfo
          }
          
    }
    onLoad () {
        // data中需要定义addressInfo
        this.addressInfo = wepy.getStorageSync('addressInfo') || null
      }
      
}
