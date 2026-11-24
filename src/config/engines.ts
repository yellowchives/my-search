// 搜索引擎配置入口：类型定义 + 分类清单 + 各分类配置的汇总
// 具体搜索引擎写在 categories/ 目录下，一个分类一个文件
import { generalEngines } from './categories/general'
import { imageEngines } from './categories/image'
import { videoEngines } from './categories/video'
import { mapEngines } from './categories/map'
import { bookEngines } from './categories/book'

export interface SearchCategory {
  id: string
  label: string
}

export type OptionTarget = 'query' | 'param'

export interface EngineOptionValue {
  label: string
  value: string
}

export interface EngineOption {
  key: string
  label: string
  /** query: 拼进搜索词；param: 拼进 URL 查询参数 */
  target: OptionTarget
  /** target=query 时使用，{v} 为选中值占位符，如 filetype:{v} */
  pattern?: string
  /** target=param 时使用，URL 参数名 */
  param?: string
  values: EngineOptionValue[]
}

export interface SearchEngine {
  /** 全局唯一，建议「分类-名称」形式；改了会丢失该引擎的本地勾选状态 */
  id: string
  name: string
  /** 只含 {query} 占位符，直接写该分类要跳转的结果页 */
  urlTemplate: string
  /** 空数组表示该引擎无额外选项 */
  options: EngineOption[]
}

export interface EngineSelection {
  checked: boolean
  options: Record<string, string>
}

export const categories: SearchCategory[] = [
  { id: 'general', label: '通用' },
  { id: 'image', label: '图片' },
  { id: 'video', label: '视频' },
  { id: 'map', label: '地图' },
  { id: 'book', label: '图书' },
]

/** key 为分类 id，值为该分类下可用的搜索引擎 */
export const enginesByCategory: Record<string, SearchEngine[]> = {
  general: generalEngines,
  image: imageEngines,
  video: videoEngines,
  map: mapEngines,
  book: bookEngines,
}
