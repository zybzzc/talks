<script setup lang="ts">
import { fruit } from '../setup/naive-ui'
import { isDark } from '@slidev/client/logic/dark'
import { NConfigProvider, NRadioGroup, NRadioButton, darkTheme } from 'naive-ui'

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

function handleInput(e: any) {
  fruit.value = e.target.value
}

</script>

<template>
  <NConfigProvider :theme="isDark ? darkTheme : undefined">
    <NRadioGroup :value="fruit" @input="handleInput">
      <NRadioButton v-for="it in options" :key="it.value" :value="it.value">{{ it.label }}</NRadioButton>
    </NRadioGroup>
  </NConfigProvider>
</template>
