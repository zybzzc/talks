import {ref} from 'vue'
import { defineAppSetup } from '@slidev/types'
import naive from 'naive-ui'

defineAppSetup((context) => {
    context.app.use(naive)
})

export const fruit = ref('Apple')