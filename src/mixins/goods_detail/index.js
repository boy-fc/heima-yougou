import wepy from 'wepy'

export default class Home extends wepy.mixin {
    data = {
        goods_id:0,
        goods_detail:[],
        addressInfo:null
    }

    config = {
    }

    methods = {
        // 图片预览
        previewImg(current){
            const urls = this.goods_detail.pics.map(item=>{
                return item.pics_big_url
            })
            wepy.previewImage({
                urls,
                current
            })
        },
         // 点击收获地址
        async chooseAddress(){
            const res = await wepy.chooseAddress().catch(err=>err)
            if(res.errMsg !== 'chooseAddress:ok') {
                return wepy.baseToast('获取收货地址失败')
              }
            wepy.baseToast('已选择收获地址')
            this.addressInfo = res
            wepy.setStorageSync('addressInfo',res)
            this.$apply()
        },
        addTocart(){
            // console.log(this.goods_detail);
            // this.$parent.globalData.cart.push()
            this.$parent.addTocart(this.goods_detail)
            wepy.baseToast('已加入购物车','success')
        }
    }
    computed ={
        formatAddressInfo(){
            if (this.addressInfo == null) {
                return '请选择收获地址'
            }else{
                const {provinceName,cityName,countyName,detailInfo} = this.addressInfo
                return provinceName+cityName+countyName+detailInfo
            }
           
        }
    }
    // 获取商品列表
    async getGoodsDetail(){
        const {data} = await wepy.get('/goods/detail',{
            goods_id:this.goods_id
        })
        if (data.meta.status !==200) {
            return wepy.baseToast()
        }
        this.goods_detail = data.message
        this.$apply()
    }
   
    onLoad(options){
        this.goods_id = options.goods_id
        this.addressInfo = wepy.getStorageSync('addressInfo') || null
        this.getGoodsDetail()
    }
}
