<script setup lang="ts">
import {defineProps, computed, watch} from 'vue'
import { isDark } from '@slidev/client/logic/dark'
import { NConfigProvider, NSelect, darkTheme } from 'naive-ui'
import { fruit } from '../setup/naive-ui'

const props = defineProps({
  placeholder: String,
  useFruitPlaceholder: Boolean,
})

const fruitsTable: Record<string, string> = {
  'Pear': '梨',
  'Orange': '橘子',
  'Apple': '苹果',
}

const placeholder = computed(() => {
  return props.useFruitPlaceholder ? `我想吃${fruitsTable[options.find(it => it.value === fruit.value)!.value!]}` : props.placeholder
})

const value = null
const options = [
  {
    label: '🍐',
    value: 'Pear',
  },
  {
    label: '🍊',
    value: 'Orange',
  },
  {
    label: '🍎',
    value: 'Apple',
  },
]

</script>

<template>
  <NConfigProvider :theme="isDark ? darkTheme : undefined">
    <NSelect v-bind="$attrs" :placeholder="placeholder" clearable v-model="value" :options="options" />
  </NConfigProvider>
</template>
