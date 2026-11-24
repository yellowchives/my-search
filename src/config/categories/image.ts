import type { SearchEngine } from '../engines'

// 图片分类：直接写图片结果页地址，不用再区分分类
export const imageEngines: SearchEngine[] = [
  {
    id: 'image-baidu',
    name: '百度',
    urlTemplate: 'https://image.baidu.com/search/index?tn=baiduimage&word={query}',
    options: [],
  },
  {
    id: 'image-google',
    name: 'Google',
    urlTemplate: 'https://www.google.com/search?tbm=isch&q={query}',
    options: [],
  },
  {
    id: 'image-bing',
    name: 'Bing',
    urlTemplate: 'https://www.bing.com/images/search?q={query}',
    options: [],
  },
  {
    id: 'image-duckduckgo',
    name: 'DuckDuckGo',
    urlTemplate: 'https://duckduckgo.com/?q={query}&iax=images&ia=images',
    options: [],
  },
  {
    id: 'image-sogou',
    name: '搜狗',
    urlTemplate: 'https://pic.sogou.com/pics?query={query}',
    options: [],
  },
]
