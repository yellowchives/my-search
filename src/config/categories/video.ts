import type { SearchEngine } from '../engines'

// 视频分类：各站视频结果页
export const videoEngines: SearchEngine[] = [
  {
    id: 'video-bilibili',
    name: 'Bilibili',
    urlTemplate: 'https://search.bilibili.com/all?keyword={query}',
    options: [],
  },
  {
    id: 'video-douyin',
    name: '抖音',
    urlTemplate: 'https://www.douyin.com/search/{query}',
    options: [],
  },
  {
    id: 'video-youtube',
    name: 'YouTube',
    urlTemplate: 'https://www.youtube.com/results?search_query={query}',
    options: [],
  },
  {
    id: 'video-baidu',
    name: '百度',
    urlTemplate:
      'https://www.baidu.com/sf/vsearch?pd=video&tn=vsearch&ie=utf-8&rsv_spt=17&wd={query}',
    options: [],
  },
  {
    id: 'video-google',
    name: 'Google',
    urlTemplate: 'https://www.google.com/search?tbm=vid&q={query}',
    options: [],
  },
  {
    id: 'video-bing',
    name: 'Bing',
    urlTemplate: 'https://www.bing.com/videos/search?q={query}',
    options: [],
  },
  {
    id: 'video-duckduckgo',
    name: 'DuckDuckGo',
    urlTemplate: 'https://duckduckgo.com/?q={query}&iax=videos&ia=videos',
    options: [],
  },
]
