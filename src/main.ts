import { createApp } from 'vue'
import App from './App.vue'
import { Button, NavBar, Icon } from 'vant'
import 'vant/es/toast/style';
import routes from './config/route';
import { useRouter } from 'vue-router'
import { Toast, Form, Field, CellGroup } from 'vant';
import * as VueRouter from 'vue-router'
import './global.css'



const router = VueRouter.createRouter({
    //内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
    history: VueRouter.createWebHistory(),
    routes, // `routes: routes` 的缩写
})

const app = createApp(App)
app.use(Button)
app.use(Toast)
app.use(NavBar)
app.use(Icon)
app.use(router)
app.use(useRouter)
app.use(Form)
app.use(Field)
app.use(CellGroup)
app.mount('#app')
