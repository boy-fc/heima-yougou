import wepy from 'wepy'

export default class Home extends wepy.mixin {
    data = {
        cart:[],
    }

    config = {
    }

    methods = {
        // 步进器改变事件
        countChange(e){
            this.$parent.updateCount(e.target.dataset.id,e.detail)
        },
        // 复选框发生变化
        checkboxChange(e){
            this.$parent.updateCheckbox(e.target.dataset.id,e.detail)   
        },
        // 侧滑删除事件
        deleteGoods(id){
            this.$parent.updateGoods(id)
        }
    }
    computed = {
        isEmpty() {
           return this.cart.length == 0 ? true:false
        }
    }
    onLoad(){
        this.cart = this.$parent.globalData.cart
    }
}
