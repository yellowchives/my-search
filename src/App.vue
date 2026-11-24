<script setup lang="ts">
import { computed, reactive, ref, watch } from 'vue'
import { ElMessage } from 'element-plus'
import CategoryBar from '@/components/CategoryBar.vue'
import EngineCard from '@/components/EngineCard.vue'
import SearchBar from '@/components/SearchBar.vue'
import {
  categories,
  enginesByCategory,
  type EngineSelection,
  type SearchEngine,
} from '@/config/engines'
import { buildUrl } from '@/utils/buildUrl'

const STORAGE_KEY = 'my-search:state-v1'
const TIP_KEY = 'my-search:popup-tip'

const activeCategory = ref<string>(categories[0]?.id ?? 'general')
const keyword = ref('')
const state = reactive<Record<string, EngineSelection>>({})

function loadState(): void {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return
    const saved = JSON.parse(raw) as Record<string, EngineSelection>
    for (const [id, value] of Object.entries(saved)) {
      if (value && typeof value.checked === 'boolean' && value.options) {
        state[id] = { checked: value.checked, options: { ...value.options } }
      }
    }
  } catch {
    // 本地数据损坏时忽略，使用默认状态
  }
}

function getFlag(key: string): string | null {
  try {
    return localStorage.getItem(key)
  } catch {
    return null
  }
}

function setFlag(key: string): void {
  try {
    localStorage.setItem(key, '1')
  } catch {
    // 存储不可用时忽略
  }
}

loadState()

const visibleEngines = computed<SearchEngine[]>(
  () => enginesByCategory[activeCategory.value] ?? [],
)

// 新出现的引擎默认全选、选项留空；切换分类不清缓存
watch(
  visibleEngines,
  (list) => {
    for (const engine of list) {
      if (!state[engine.id]) {
        const options: Record<string, string> = {}
        for (const option of engine.options) options[option.key] = ''
        state[engine.id] = { checked: true, options }
      }
    }
  },
  { immediate: true },
)

watch(
  state,
  () => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
    } catch {
      // 存储不可用时忽略
    }
  },
  { deep: true },
)

const selectedEngines = computed<SearchEngine[]>(() =>
  visibleEngines.value.filter((engine) => state[engine.id]?.checked ?? true),
)

const canSearch = computed(
  () => keyword.value.trim().length > 0 && selectedEngines.value.length > 0,
)

function setChecked(id: string, checked: boolean): void {
  const item = state[id]
  if (item) item.checked = checked
}

function setOption(id: string, key: string, value: string): void {
  const item = state[id]
  if (item) item.options[key] = value
}

function setAll(checked: boolean): void {
  for (const engine of visibleEngines.value) setChecked(engine.id, checked)
}

function handleSearch(): void {
  const query = keyword.value.trim()
  if (!query) {
    ElMessage.warning('请输入关键词')
    return
  }
  const list = selectedEngines.value
  if (list.length === 0) {
    ElMessage.warning('请至少选择一个搜索引擎')
    return
  }

  if (list.length > 1 && !getFlag(TIP_KEY)) {
    ElMessage.info({
      message: `即将打开 ${list.length} 个标签页；若浏览器拦截，请在地址栏右侧允许弹出式窗口`,
      duration: 6000,
    })
    setFlag(TIP_KEY)
  }

  // window.open 必须在点击回调的同步调用栈内执行，先 await 会被浏览器拦截。
  // 连续打开时浏览器常把后开的标签页插到更靠近当前页的位置，导致标签页从左到右
  // 的顺序与列表相反；这里倒序打开来抵消，使标签页顺序与配置列表一致。
  for (const engine of [...list].reverse()) {
    const selection = state[engine.id] ?? { checked: true, options: {} }
    window.open(buildUrl(engine, query, selection), '_blank', 'noopener,noreferrer')
  }
}
</script>

<template>
  <main class="page">
    <header class="page-head">
      <h1>聚合搜索</h1>
      <p>选类型 → 选引擎 → 输入关键词，一次打开多个结果页</p>
    </header>

    <CategoryBar v-model="activeCategory" :categories="categories" />

    <section class="block">
      <div class="block-head">
        <span class="section-title">2 · 搜索引擎</span>
        <div class="block-tools">
          <span class="counter">已选 {{ selectedEngines.length }} / {{ visibleEngines.length }}</span>
          <el-button link type="primary" @click="setAll(true)">全选</el-button>
          <el-button link type="primary" @click="setAll(false)">清空</el-button>
        </div>
      </div>

      <div v-if="visibleEngines.length" class="engine-grid">
        <EngineCard
          v-for="engine in visibleEngines"
          :key="engine.id"
          :engine="engine"
          :checked="state[engine.id]?.checked ?? true"
          :values="state[engine.id]?.options ?? {}"
          :options="engine.options"
          @update:checked="setChecked(engine.id, $event)"
          @update:option="(key, value) => setOption(engine.id, key, value)"
        />
      </div>
      <el-empty v-else description="该分类暂未配置搜索引擎" :image-size="80" />
    </section>

    <SearchBar
      v-model="keyword"
      :count="selectedEngines.length"
      :disabled="!canSearch"
      @search="handleSearch"
    />
  </main>
</template>

<style scoped>
.page {
  max-width: 1080px;
  margin: 0 auto;
  padding: 40px 20px 64px;
}

.page-head {
  margin-bottom: 24px;
}

.page-head h1 {
  font-size: 24px;
  font-weight: 600;
  margin: 0 0 6px;
}

.page-head p {
  margin: 0;
  font-size: 13px;
  color: #909399;
}

.block-head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 14px;
  gap: 12px;
}

.section-title {
  font-size: 13px;
  font-weight: 600;
  color: #606266;
}

.block-tools {
  display: flex;
  align-items: center;
  gap: 6px;
}

.counter {
  font-size: 12px;
  color: #909399;
  margin-right: 6px;
}

.engine-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 12px;
}
</style>
