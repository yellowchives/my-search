import type { SearchEngine } from '../engines'

// 地图分类
export const mapEngines: SearchEngine[] = [
  {
    id: 'map-amap',
    name: '高德地图',
    urlTemplate: 'https://www.amap.com/search?query={query}',
    options: [],
  },
  {
    id: 'map-baidu',
    name: '百度地图',
    urlTemplate: 'https://map.baidu.com/search/{query}',
    options: [],
  },
]
