import wepy from 'wepy'
import Dialog from '../../components/vant/dialog/dialog';
export default class extends wepy.mixin {
    data = {
        value:'',
        suggestList:[],
        historyList:[]//历史记录
    }

    config = {
    }

    methods = {
        async onChange(e){
            // 获取输入框的最新值
            this.value = e.detail
            if (this.value.trim().length == 0) {
                return this.suggestList = []
            }
            const {data} = await wepy.get('/goods/qsearch',{
                query:this.value
            })
            if (data.meta.status != 200) {
                return wepy.baseToast()
            }
            this.suggestList = data.message
            this.$apply()
        },
        // 点击搜索按钮的时候触发
        onSearch(){
            if (this.value.trim().length == 0) {
                return
            }
            this.historyList.unshift(this.value)
            this.historyList = this.historyList.splice(0,10)
            wepy.setStorageSync('historyList',this.historyList)
            wepy.navigateTo({
                url:'/pages/goods_list?query='+this.value
            })
        },
        // 点击删除搜索历史记录
        deleteHistory(){
            Dialog.confirm({
                title: '提示',
                message: '您确定要删除所有搜索记录吗？'
              }).then(() => {
                this.historyList = []
                wepy.setStorageSync('historyList',this.historyList)
              }).catch(() => {
                return
              });
        }
    }
    onLoad(){
        this.historyList = wepy.getStorageSync('historyList') || []
    }
}

