// https://vitepress.dev/guide/custom-theme
import DefaultTheme from 'vitepress/theme'
import type { Theme } from 'vitepress'
import PaginatedScriptsTable from './components/PaginatedScriptsTable.vue'
import './custom.css'

const theme: Theme = {
  ...DefaultTheme,
  enhanceApp(ctx) {
    DefaultTheme.enhanceApp?.(ctx)
    ctx.app.component('PaginatedScriptsTable', PaginatedScriptsTable)
  },
}

export default theme
