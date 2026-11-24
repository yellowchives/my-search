import type { SearchEngine } from '../engines'

// 通用分类：不附加任何额外选项
export const generalEngines: SearchEngine[] = [
  {
    id: 'general-baidu',
    name: '百度',
    urlTemplate: 'https://www.baidu.com/s?wd={query}',
    options: [],
  },
  {
    id: 'general-bing',
    name: 'Bing',
    urlTemplate: 'https://www.bing.com/search?q={query}',
    options: [],
  },
  {
    id: 'general-google',
    name: 'Google',
    urlTemplate: 'https://www.google.com/search?q={query}',
    options: [],
  },
  {
    id: 'general-sogou',
    name: '搜狗',
    urlTemplate: 'https://www.sogou.com/web?query={query}',
    options: [],
  },
  {
    id: 'general-duckduckgo',
    name: 'DuckDuckGo',
    urlTemplate: 'https://duckduckgo.com/?q={query}',
    options: [],
  },
  {
    id: 'general-wechat',
    name: '微信',
    urlTemplate:
      'https://www.sogou.com/iweixin?tab=weixin_vertical&query={query}',
    options: [],
  },
]
