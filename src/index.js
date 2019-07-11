import Vue from 'vue'
import App from './app.vue'

// import './assets/styles/test.css'
// import './assets/images/bg.jpg'
// import './assets/styles/test.styl'
import './assets/styles/global.styl'
// import './assets/styles/footer.styl'

const root = document.createElement('div')
document.body.appendChild(root)

new Vue({
    render: (h) => h(App)
}).$mount(root)