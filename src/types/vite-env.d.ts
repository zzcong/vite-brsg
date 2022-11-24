/// <reference types="vite/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare module '*.less'

// declare module '*.tsx' {
//   import type { DefineComponent } from 'vue'
//   export default DefineComponent<any>
// }
