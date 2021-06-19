<script setup lang="ts">
import {defineProps, computed, watch} from 'vue'
import { isDark } from '@slidev/client/logic/dark'
import { NConfigProvider, NButtonGroup, NButton, NCheckboxGroup, NCheckbox, NTag, darkTheme } from 'naive-ui'
import Draggable from "vue3-draggable"

const props = defineProps({
})

const value = null
const words = [
  {
    label: '花伞',
    value: '花伞',
    checked: true,
    type: "info",
    color: '#70c0e8'
  },
  {
    label: '我',
    value: '我',
    checked: true,
    type: "success",
    color: '#63e2b7'
  },
  {
    label: '一把',
    value: '一把',
    checked: true,
    type: "warning",
    color: '#f2c97d'
  },
  {
    label: '有',
    value: '有',
    checked: true,
    type: "error",
    color: '#e88080'
  },
]

const selected: string[] = []

</script>

<template>
  <NConfigProvider :theme="isDark ? darkTheme : undefined">
    <Draggable 
      v-model="words" 
      group="words"
      style="display: flex;"
      item-key="value">
      <template v-slot:item="{item}">
        <NTag class="mr-1" :type="item.type"><NCheckbox v-model:checked="item.checked">{{ item.label }}</NCheckbox></NTag>
      </template>
    </Draggable>
    <!-- <NButton>充值</NButton> -->
  </NConfigProvider>
</template>

<style></style>
