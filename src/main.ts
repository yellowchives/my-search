import { createApp } from 'vue'
import {
  ElButton,
  ElCheckbox,
  ElEmpty,
  ElInput,
  ElOption,
  ElRadioButton,
  ElRadioGroup,
  ElSelect,
} from 'element-plus'
import 'element-plus/dist/index.css'
import './assets/main.css'
import App from './App.vue'

const app = createApp(App)

// 只注册用到的组件，避免全量引入把整个 Element Plus 打进产物
const components = [
  ['ElButton', ElButton],
  ['ElCheckbox', ElCheckbox],
  ['ElEmpty', ElEmpty],
  ['ElInput', ElInput],
  ['ElOption', ElOption],
  ['ElRadioButton', ElRadioButton],
  ['ElRadioGroup', ElRadioGroup],
  ['ElSelect', ElSelect],
] as const

for (const [name, component] of components) {
  app.component(name, component)
}

app.mount('#app')
