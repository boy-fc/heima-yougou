import wepy from 'wepy'

export default class Home extends wepy.mixin {
    data = {
        query:'',
        cid:'',
        pagenum:1,
        pagesize:10,
        goodsList:[],
        total:0,
        isLoading:false,
        isMore:true
    }


    methods = {

    }
    // 获取商品列表的方法
    async getGoodsList(fn){
        this.isLoading = true
        const {data} = await wepy.get('/goods/search',{
            query:this.query,
            cid:this.cid,
            pagenum:this.pagenum,
            pagesize:this.pagesize
        })
         this.goodsList = [...this.goodsList,...data.message.goods]
         this.total = data.message.total
         this.isLoading = false
         fn && fn()
         this.$apply()
    }
    onLoad(options){
        // 获取商品列表参数的整理
        this.query = options.query || ''
        this.cid = options.cat_id || ''  
        // 数据方法的函数调用
        this.getGoodsList()
    }
    // 触底事件
    onReachBottom () {
        if (this.pagenum * this.pagesize >= this.total) return this.isMore = false
        if (this.isLoading ) return
        this.pagenum++
        this.getGoodsList()
      }
    //   下拉事件
    onPullDownRefresh(){
        this.pagenum =1
        this.total = 0
        this.goodsList=[]
        this.isMore = true
        this.getGoodsList(function () {
            wepy.stopPullDownRefresh()
        })  
      }
}

