<script setup lang="ts">
import type { SearchCategory } from '@/config/engines'

defineProps<{ categories: SearchCategory[] }>()
const active = defineModel<string>({ required: true })
</script>

<template>
  <section class="block">
    <span class="block-title">1 · 搜索类型</span>
    <el-radio-group v-model="active">
      <el-radio-button v-for="item in categories" :key="item.id" :value="item.id">
        {{ item.label }}
      </el-radio-button>
    </el-radio-group>
  </section>
</template>
