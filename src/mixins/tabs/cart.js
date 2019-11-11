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
        },
        // 全选
        onFullChange(e){ 
            this.$parent.fullChange(e.detail)
            this.$parent.renderTabbarBadage()
        }
    }
    computed = {
        isEmpty() {
           return this.cart.length == 0 ? true:false
        },
        // 价格计算属性
        totalPrice(){
            let total = 0
            this.cart.forEach(item => {
                if (item.isCheck) {
                    total += item.count * item.price
                }
            })
            return total*100
        },
        // 全选
        isFullCheck(){
            return this.cart.every(item => item.isCheck)
        }
    }
    onLoad(){
        this.cart = this.$parent.globalData.cart
    }
    onShow(){
        this.$parent.renderTabbarBadage()
    }
}
