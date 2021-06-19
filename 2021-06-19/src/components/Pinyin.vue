<script setup lang="ts">
import {defineProps, computed, ref, getCurrentInstance, onMounted} from 'vue'
import { isDark } from '@slidev/client/logic/dark'
import { NConfigProvider, NInputGroup, NButton, NInput, darkTheme } from 'naive-ui'
import {isValidPinyin} from '../utils/pinyin'


const toast = ref<HTMLDivElement | null>(null)

function isMustTwoDecimal(str: string) {
    return /^([1-9]\d*|0)(\.\d{1,2})?$/.test(str)
}

const props = defineProps({
  character: String,
  showStatus: Boolean,
  answer: String,
  free: Boolean,
})

const inputChar = ref("")

const pinyin = ref("")

const timer = ref()

const status = computed(() => {
  if (!pinyin.value) {
    return ''
  } else {
    if (props.answer === pinyin.value) return '😄'
    return props.answer?.startsWith(pinyin.value) ? '🤔' : '🙁'
  }
})

function handleKeydown(e: any) {
  const key = e.key.toUpperCase()
  if (!/^[A-Z]{1}$/.test(key)) return
  if (timer.value) clearTimeout(timer.value)
  inputChar.value = key
  toast.value!.classList.remove('hidden')
  timer.value = setTimeout(() => {
    inputChar.value = ''
    toast.value!.classList.add('hidden')
    timer.value = null
  }, 700)
}

function handleInput(newPinyin: string) {
  if (props.answer?.startsWith(newPinyin) || props.free) {
    pinyin.value = newPinyin
  }
}

</script>

<template>
  <NConfigProvider :theme="isDark ? darkTheme : undefined">
    <NInputGroup class="w-42">
      <NButton type="primary">{{ props.character }}</NButton>
      <NInput placeholder="" :value="pinyin" @input="handleInput" @keydown="handleKeydown" />
    </NInputGroup>
    <span v-show="showStatus" class="ml-2" style="display: inline-block; line-height: 34px;">{{ status }}</span>
    <div ref="toast" class="toast absolute hidden">{{ inputChar }}</div>
  </NConfigProvider>
</template>

<style>
  .toast {
    width: 20vh;
    height: 20vh;
    left: 50%;
    bottom: 15%;
    transform: translateX(-10vh);
    color: #c0c0c0;
    font-size: 13vh;
    background-color: #33333399;
    border-radius: 2vh;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .toast.hidden {
    opacity: 0;
    transition: all .3s;
  }
</style>
