import type { EngineSelection, SearchEngine } from '@/config/engines'

/**
 * 把关键词与高级条件拼成完整搜索 URL。
 * query 型条件追加到搜索词，param 型条件追加到 URL 参数。
 */
export function buildUrl(
  engine: SearchEngine,
  keyword: string,
  selection: EngineSelection,
): string {
  const queryParts: string[] = [encodeURIComponent(keyword.trim())]
  const params: string[] = []

  for (const option of engine.options) {
    const value = selection.options[option.key]
    if (!value) continue

    if (option.target === 'query' && option.pattern) {
      queryParts.push(option.pattern.replace('{v}', encodeURIComponent(value)))
    } else if (option.target === 'param' && option.param) {
      params.push(`${option.param}=${encodeURIComponent(value)}`)
    }
  }

  let url = engine.urlTemplate.replace('{query}', queryParts.join('+'))
  if (params.length > 0) {
    url += `${url.includes('?') ? '&' : '?'}${params.join('&')}`
  }
  return url
}
