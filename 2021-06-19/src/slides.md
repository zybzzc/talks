# 编写高质量组件

理解数据驱动，
编写高质量可复用的 Vue 组件

<div class="abs-tr !mx-5 !my-8 flex flex-col">
  <img src="/xiaojing0.svg" class="w-32 m-auto">
</div>

<div class="abs-bl !mx-14 my-12 flex flex-col">
  <div class="mb-3 uppercase tracking-widest font-500">
  @Hint
  </div>
  <div class="text-md opacity-50">Xiaojing0, 2021.6</div>
</div>

<style>
p {
  @apply text-xl;
}
</style>


---
layout: intro
---

# Hint

<div class="leading-8 opacity-80">
研发中心 - 前端研发组<br>
<a href="http://www.catb.org/~esr/jargon/html/Y/yak-shaving.html">Yak Shaving</a> 中度患者<br>
</div>

<img src="/avatar.png" class="rounded-full w-40 abs-tr mt-16 mr-12"/>


---
layout: center
class: text-center
---

# Vue 与 MVVM 

Vue 与 Model-View-ViewModel

---

# 什么是 Vue 和 Vue 组件？

Vue 一套用于构建用户界面的框架，它可以通过使用小型、独立和通常可复用的组件构建大型应用<br/>
Vue 组件是带有名称的可复用 Vue 实例，几乎任意类型的应用界面都可以抽象为一个组件树

<div class="grid grid-cols-2 items-center gap-x-4 mt-12">

  - 维护一个对应视图的状态
  - 将状态与外部提供的属性合并后通过一个幂等的函数转换为视图结构
  - 响应用户在界面上的交互
  - 针对用户的交互调用业务的逻辑，进而更新状态以达到视图变化的目的
  
  <img src="https://v3.cn.vuejs.org/images/components.png" class="m-auto"/>

</div>

<!-- 组件的职能 -->
---

# Vue 与 MVVM

MVVM 即 Model-View-ViewModel，是一种通过操控数据来操控视图的用户界面框架模型

<div class="grid grid-cols-2 items-center gap-x-4 mt-12">

  - Model: 域模型，用于持久化
  - View: 作为视图模板存在
  - ViewModel: 作为视图的模型，为视图服务

  <img src="https://book.vue.tw/assets/img/1-1-mvvm.22bc0dc7.png" class="m-auto"/>

</div>

<div class="text-sm leading-6 antialiased mt-12 bg-green-800 p-4 rounded">
为什么要提到 MVVM 呢？因为 Vue 没有完全遵循 MVVM 模型，在 MVVM 模型中，视图 View 的更改只能通过 ViewModel 的变更来触发。
Vue 则提供了一些逃生仓（ref、$el等)，使用它们时会破坏掉 MVVM 模型。
但是如果我们编码的时候完全遵循 MVVM 模型来写我们的组件，会使我们的组件变得非常的可控和易用
</div>

---

# 一个典型的 Vue 组件

水果选择器 FruitSelect

<div class="grid grid-cols-[2fr,1fr] gap-x-4">

```tsx {all|2-7|11-15|12|14|all}
<script setup lang="ts">
  const value = null
  const options = [
    { label: '🍐', value: 'Pear' },
    { label: '🍊', value: 'Orange' },
    { label: '🍎', value: 'Apple' },
  ]
</script>

<template>
  <Select
    :placeholder="props.placeholder" // <-- 外部传入的参数
    clearable
    v-model="value" // <-- 会处把 value 赋值成用户选择的值
    :options="options" />
</template>
```

  <div class="grid">

  <div>
  <div v-click class="w-1/1">

  ```tsx
  <FruitSelect placeholder="我请你吃..." />
  ```

  </div>

  <FruitSelect v-click class="w-40" placeholder="我请你吃..." />
  </div>

  <div>
  <div v-click class="w-1/1">

  ```tsx
  <FruitSelect placeholder="你请我吃..." />
  ```

  </div>

  <FruitSelect v-click class="w-40" placeholder="你请我吃..." />
  </div>

</div>
</div>

<!--
可以看到组件实际配置的状态并没有完全体现视图所表现出来的所有状态，比如：下拉菜单是否打开、选择框是否高亮、尾部图标展示等
这里就体现的就是组件的组合特性，这些状态都存在与组件内，不过是在 Select 组件中（某些状态甚至在 组成 Select 组件的子组件中）
当然具体有哪些组件取决于你对 Select 的实现
-->

---
layout: center
class: text-center
---

# 模式和技巧

编写可复用，可组合的高质量 Vue 组件

---

- 最少数据变动原则
- 最小数据原则
- 数据单一职能
- 区分业务数据和视图数据
- 消除副作用

---

# 最少数据变动原则

当事件要触发数据变动时，只改变必要的最少量的数据

<div class="flex-row gap-x-4">

  <div class="grid grid-flow-col items-center">
  <div>
    <FruitButtons />
    <FruitSelect class="w-40 mt-1" useFruitPlaceholder />
  </div>

  <v-clicks>

  ```tsx
  <FruitButtons :value="fruit" @input="onChange" />
  <FruitSelect :placeholder="placeholder" />
  ```
  </v-clicks>
  </div>

  <div class="grid grid-cols-2 gap-x-4 mt-4">

  <v-clicks>

```tsx {all|12|all}
const fruitsTable = {
  'Pear': '梨',
  'Orange': '橘子',
  'Apple': '苹果',
}

const fruit = 'Apple'
const placeholder = '我想吃苹果'

function onChange(val) {
  fruit = val
  placeholder = '我想吃' + fruitsTable[val] // <--
}
```
  </v-clicks>


<v-clicks>

```tsx {all|13|8-11|all}
const fruitsTable = {
  'Pear': '梨',
  'Orange': '橘子',
  'Apple': '苹果',
}

const fruit = 'Apple'
const placeholder = computed(
  () => '我想吃' + fruitsTable[val]
)

function onChange(val) {
  fruit = val
}
```

</v-clicks>

</div>

</div>

<!--
1.数据操控视图的部分是自动的，因为视图是主动依赖数据，绑定器会在数据更新的时候去更新视图
2.接着刚刚水果选择器的例子，假如我们现在在使用的时候需要根据用户选中的某个值来改变占位文本，我们可以这样做
3.当用户在点击水果按钮组的时候，真正必须改变的值只有按钮组本身的值即 fruit，而对另一个组件 placeholder 的修改是因为当前我们有这样的业务需求
4.所以我们这里在用户点击水果按钮组时需要做的仅仅是改变 fruit 的值，至于 placeholder，需要在另一个地方显示定义出它与 fruit 存在的这种依赖关系，在 Vue 中我们可以使用计算属性
-->
---

# 最小数据原则

组件 ViewModel 中的用户可变数据必须具有原子性

<div class="flex-row gap-x-4">

  <div class="grid grid-flow-col items-center">
  <div>
    <WordsPuzzle />
  </div>
  </div>

  <div class="grid grid-cols-2 gap-x-2 mt-4">

  <v-clicks>

```tsx {all|1-6,14|8-9,15-16|all}
const words = [
  {key: 'umbrella', name: '花伞'},
  {key: 'I', name: '我'},
  {key: 'a', name: '一把'},
  {key: 'have', name: '有'},
]

const sortedWords = [...words] // <--
const selectedWords = [...words] // <--

function toggleWord(wordKey) {/* ... */}

<WordsPuzzle
  :words="words"
  :sortedWords="sortedWords"
  :selectedWords="selectedWords"
  @sort="words => sortedWords = words"
  @select="wordKey => toggleWord(wordKey)"
/>
```
  </v-clicks>

  <v-clicks>

```tsx {all|1-6,12|all}
const words = [
  {key: 'umbrella', name: '花伞', checked: true, order: 0},
  {key: 'I', name: '我', checked: true, order: 1},
  {key: 'a', name: '一把', checked: true, order: 2},
  {key: 'have', name: '有', checked: true, order: 3},
]

function resort(workKey, newIdx) {/* ... */}
function toggleWord(wordKey) {/* ... */}

<WordsPuzzle
  :words="words"
  @sort="(wordKey, newIdx) => resort(wordKey, newIdx)"
  @select="wordKey => toggleWord(wordKey)"
/>
```
  </v-clicks>

</div>

</div>

<!--
1.原子性只该数据所携带的信息具有不可替代性, 无法从其它数据中计算得来
2.浅拷贝的初始化存在引用陷阱, 当顶层属性是引用类型时对它们的后续操作可能会存在一些不易察觉的bug
3.但是这样当我们的组件功能越来越多时,就会往 words 中添加越来越多的属性用于不同的功能, 这会导致后期对 words 的维护变得异常困难,每次开发局部功能的时候都要面对大量的无关属性
并且这种直接添加字段方式也使得所有功能的数据都只能采取同一种结构, 表达能力也收到限制, 比如这里的 checked 不能直接体现所有已选中的词, order 也不能直接表示出顺序, 如果要拿到不同功能对应的完整表达数据的话势必又要建立相应的计算属性, 这也是成本
-->
---

# 数据单一职能

组件 ViewModel 中的一份数据只承载一个对应的职能<br/>领域模型数据作为 `源数据` 的功能

```tsx {all|8-9,15-16|all}
const words = [
  {key: 'I', name: '我'},
  {key: 'a', name: '一把'},
  {key: 'have', name: '有'},
  {key: 'umbrella', name: '花伞'},
]

const sortedWordKeys = words.map(word => word.key) // <--
const selectedWordKeys = words.map(word => word.key) // <--

function resort(workKey, newIdx) {/* ... */}
function toggleWord(wordKey) {/* ... */}

<WordsPuzzle
  :words="words"
  :sortedWordKeys="sortedWordKeys"
  :selectedWordKeys="selectedWordKeys"
  @sort="(wordKey, newIdx) => resort(wordKey, newIdx)"
  @select="wordKey => toggleWord(wordKey)"
/>
```

<!-- 这种模式下 sortedWordKeys 和 selectedWordKeys 既满足了 最小数据原则 也满足了 单一职责, 可以直接按照最合适的数据结构来定义不同功能对应的数据, 当要同时访问功能数据和源数据时则可以借助 compute 属性功能 或 某个组件内部的数据访问函数 -->
---

# 区分业务数据和视图数据

大多数情况一份数据同时作为业务数据和视图数据使用没有太大的问题，<br/>但极少数情况下这会给我的编码带来不必要的复杂度

<div class="grid grid-cols-2 gap-x-2 mt-4">

  <div>
  <Pinyin character="雨" answer="yu"/>

<v-clicks>

```tsx {all|4|all}
const pinyin = ''

function onInput(val) {
  if (!isValid(val)) return
  pinyin = val
}

function submit() {
  submitToServer(pinyin)
}

```
</v-clicks>

<v-clicks>

```tsx {2|all}
function submit() {
  if (!isValid(pinyin)) return
  submitToServer(pinyin)
}

```
</v-clicks>

  </div>

  <div>
  <Pinyin v-click character="晴" answer="qing" showStatus free />

<v-clicks>

```tsx {all|1,5|all}
const value = ''

function submit() {
  if (!isValid(value)) return
  const pinyin = convert(value)
  submitToServer(pinyin)
}

```
</v-clicks>

<div v-click class="text-sm leading-6 antialiased bg-green-800 p-4 rounded">真正冲突最明显的是类似金额输入的地方，输入框的值是字符串，业务的值是数字，如果它们用同一个变量来驱动的话，
数字转字符串可以直接转，但字符串却不是一定能转成正确的数字的，这种情况如果要在输入的过程中不停的校验输入数据并将其转换成业务数据，极大的提升了组件逻辑复杂度</div>
</div>

</div>

<!--
1.有一个输入汉字拼音的组件，我们分析一下它的状态..
-->

----

# 消除副作用

写没有副总用的数据访问函数，保持原子数据的写路径唯一


```ts {all|5|all}
function getSortedWords() {
  const sortedWords = []
  sortedWordKeys.forEach(key => {
    const word = words.find(it => it.key === key)
    word.isSorted = true // <-- 修改了外部 words 中的数据
    sortedWords.push(word)
  })
  return sortedWords
}

```

<div class="text-sm leading-6 antialiased mt-12 bg-green-800 p-4 rounded">
所谓函数副作用是指，当调用函数时，被调用函数除了返回函数值之外，还对主调用函数产生附加的影响。
</div>


<!--
到目前为止我们已经将不同功能的数据独立开来并且通过原子性消除了数据间可能存在的操作副作用, 保证了所有数据 写 的入口唯一, 但是因为每一份数据都不是完整的, 所以我们会需要 computed 属性 或者 某些数据访问函数 来读取一些组合信息
所以我们也要保证这些 读 数据的地方不会去写数据
computed 中出现副总用是 Vue 会发出警告
-->
---

# 快速回顾

- 最少数据变动原则
- 最小数据原则
- 数据单一职能
  - 区分业务数据和视图数据
- 消除副作用

<!--
多个组件间数据如何共享或流转，怎么避免产生影子数据（明明是同一份数据，但是却存在于两个地方，它们可能数据结构是一样的也可能是不一样的，当它们的数据结构开始不一样时，也就是噩梦的开端）
-->
---
layout: center
class: 'text-center pb-5 :'
---

# 谢谢！

幻灯片可以访问 [这里](http://10.0.1.225:8080) 查看
