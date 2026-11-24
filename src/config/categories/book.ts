import type { EngineOption, EngineOptionValue, SearchEngine } from '../engines'

const filetypeValues: EngineOptionValue[] = [
  { label: '不限', value: '' },
  { label: 'PDF', value: 'pdf' },
  { label: 'EPUB', value: 'epub' },
]

const filetypeOption: EngineOption = {
  key: 'filetype',
  label: '文件类型',
  target: 'query',
  pattern: 'filetype:{v}',
  values: filetypeValues,
}

export const bookEngines: SearchEngine[] = [
  {
    id: 'book-zlibrary',
    name: 'Z-Library',
    urlTemplate: 'https://z-library.sk/s/{query}',
    options: [],
  },
  {
    id: 'book-douban',
    name: '豆瓣读书',
    urlTemplate: 'https://search.douban.com/book/subject_search?search_text={query}',
    options: [],
  },
  {
    id: 'book-archive',
    name: 'Archive.org',
    urlTemplate: 'https://archive.org/search?query={query}',
    options: [],
  },
  {
    id: 'book-bing',
    name: 'Bing',
    urlTemplate: 'https://www.bing.com/search?q={query}',
    options: [filetypeOption],
  },
  {
    id: 'book-google',
    name: 'Google',
    urlTemplate: 'https://www.google.com/search?q={query}',
    options: [filetypeOption],
  },
]
