import { createApp, App } from 'vue'
import './style.css'
import AppComponent from './App.vue'
import router from './router'
import { createPinia } from 'pinia'

import 'virtual:windi.css'

import { renderWithQiankun, QiankunProps } from 'vite-plugin-qiankun/dist/helper'
import { isUndefined } from 'lodash'

let instance: App

function render(props: QiankunProps) {
  const { container } = props
  instance = createApp(AppComponent)
  instance
    .use(createPinia())
    .use(router)
    .mount(!isUndefined(container) ? (container.querySelector('#app') as Element) : '#app')
}

renderWithQiankun({
  mount(props) {
    render(props)
  },
  bootstrap() {
    console.log('bootstrap')
  },
  unmount(props: any) {
    console.log('unmount')
    instance.unmount()
  },
  update: function (props: QiankunProps): void | Promise<void> {
    throw new Error('Function not implemented.')
  }
})

// 独立运行时
if (!(window.__POWERED_BY_QIANKUN__ ?? false)) {
  render({})
}
