<script setup lang="ts">
import type { EngineOption, SearchEngine } from '@/config/engines'

defineProps<{
  engine: SearchEngine
  checked: boolean
  values: Record<string, string>
  options: EngineOption[]
}>()

const emit = defineEmits<{
  'update:checked': [value: boolean]
  'update:option': [key: string, value: string]
}>()
</script>

<template>
  <div class="engine-card" :class="{ 'is-off': !checked }" @click="emit('update:checked', !checked)">
    <div class="card-head">
      <el-checkbox
        :model-value="checked"
        @click.stop
        @update:model-value="emit('update:checked', Boolean($event))"
      />
      <span class="name">{{ engine.name }}</span>
    </div>

    <div v-if="options.length" class="card-options" @click.stop>
      <div v-for="option in options" :key="option.key" class="option-row">
        <span class="option-label">{{ option.label }}</span>
        <el-select
          :model-value="values[option.key] ?? ''"
          size="small"
          @update:model-value="emit('update:option', option.key, String($event))"
        >
          <el-option
            v-for="item in option.values"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </div>
    </div>
    <div v-else class="card-none">无额外选项</div>
  </div>
</template>

<style scoped>
.engine-card {
  border: 1px solid #ebeef5;
  border-radius: 10px;
  padding: 12px 14px;
  background: #fff;
  cursor: pointer;
  min-width: 0;
  transition: border-color 0.15s, opacity 0.15s;
}

.engine-card:hover {
  border-color: #409eff;
}

.engine-card.is-off {
  opacity: 0.55;
}

.card-head {
  display: flex;
  align-items: center;
  gap: 8px;
}

.name {
  font-size: 14px;
  font-weight: 500;
  color: #303133;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.card-options {
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.option-row {
  display: flex;
  align-items: center;
  gap: 8px;
}

.option-label {
  font-size: 12px;
  color: #909399;
  width: 56px;
  flex: none;
}

.option-row .el-select {
  flex: 1;
  min-width: 0;
}

.card-none {
  margin-top: 10px;
  font-size: 12px;
  color: #c0c4cc;
}
</style>
