import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import legacy from '@vitejs/plugin-legacy'
import WindiCSS from 'vite-plugin-windicss'
import checker from 'vite-plugin-checker'

import path from 'path'
import { name } from './package.json'
import chalk from 'chalk'

// path resolve
const resolve = (...rest: string[]) => path.resolve(__dirname, ...rest)
// 图片格式
const imageType = 'jpg,jpeg,png,gif,webp,svg'.split(',')
// 构建日志输出
const log = (...rest: string[]) => console.log(chalk.white.bgBlue([...rest, '\n'].join(' ')))

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  // env 路径
  const envPath = resolve('env')
  const { VITE_BASE_URL } = loadEnv(mode, envPath)
  log('当前构建环境', mode)

  // build prefix or out dir
  const buildPrefix = `${VITE_BASE_URL}${name}/`
  log('输出目录', buildPrefix)

  //

  return {
    envDir: resolve('env'),
    base: mode === 'development' ? VITE_BASE_URL : buildPrefix,
    plugins: [
      vue(),
      vueJsx(),
      legacy({
        targets: ['defaults', 'not IE 11']
      }),
      WindiCSS(),
      checker({
        typescript: true,
        eslint: {
          lintCommand: 'eslint "./src/**/*.{ts,tsx}"' // for example, lint .ts & .tsx
        }
      })
    ],
    resolve: {
      alias: {
        '@': resolve('./src')
      },
      extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json']
    },
    // 开发服务器配置
    server: {
      open: true,
      port: 3000,
      headers: {
        'Access-Control-Allow-Origin': '*'
      },
      proxy: {
        '/api/meos': {
          changeOrigin: true,
          target: 'https://gapmdev.persagy.com/'
        }
      }
    },
    build: {
      outDir: name,
      cssCodeSplit: true,
      sourcemap: false,
      target: 'modules',
      chunkSizeWarningLimit: 1024,
      assetsInlineLimit: 5120,
      manifest: false,
      minify: 'terser',
      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: false
        }
      },
      rollupOptions: {
        input: {
          main: resolve('index.html')
        },
        output: {
          chunkFileNames: 'static/js/[name]-[hash].js',
          entryFileNames: 'static/js/[name]-[hash].js',
          assetFileNames: assetInfo => {
            const name = assetInfo.name as string
            const ext = (name.match(/\.([a-zA-z]+)$/) as RegExpMatchArray)[1].toLowerCase()
            if (ext === 'css') {
              return 'static/css/[name]-[hash].[ext]'
            } else if (imageType.includes(ext)) {
              return 'static/images/[name]-[hash].[ext]'
            }
            return 'static/other/[name]-[hash].[ext]'
          }
        }
      }
    }
  }
})
