<script setup lang="ts">
defineProps<{ count: number; disabled: boolean }>()
const emit = defineEmits<{ search: [] }>()
const keyword = defineModel<string>({ required: true })
</script>

<template>
  <section class="block">
    <span class="block-title">3 · 关键词</span>
    <div class="search-row">
      <el-input
        v-model="keyword"
        size="large"
        clearable
        placeholder="输入关键词，回车即可搜索"
        @keyup.enter="emit('search')"
      />
      <el-button type="primary" size="large" :disabled="disabled" @click="emit('search')">
        搜索 {{ count }} 个站点
      </el-button>
    </div>
    <p class="tip">浏览器可能拦截多个标签页；首次使用请在地址栏右侧允许弹出式窗口。</p>
  </section>
</template>

<style scoped>
.search-row {
  display: flex;
  gap: 10px;
}

.search-row .el-input {
  flex: 1;
  min-width: 0;
}

.tip {
  margin: 12px 0 0;
  font-size: 12px;
  color: #909399;
}

@media (max-width: 600px) {
  .search-row {
    flex-direction: column;
  }
}
</style>
