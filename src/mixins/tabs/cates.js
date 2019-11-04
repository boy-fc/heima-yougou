
import wepy from 'wepy'

export default class Home extends wepy.mixin {
    data = {
        cateList:[],
        secondCate:[],
        active:0
    }
    
    config = {
    }

    methods = {
        onChange(even){
            this.secondCate = this.cateList[even.detail].children
        }
    }
    async getCatesList(){
       const {data} = await wepy.get('/categories')
       if (data.meta.status != 200) {
           return wepy.baseToast()
       }
       this.cateList = data.message
       this.secondCate = this.cateList[0].children
       this.$apply()
    }
    onLoad(){
        this.getCatesList()
    }
}
