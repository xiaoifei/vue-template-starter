<script setup lang="ts">
import { ref } from 'vue'
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import { Button } from '@/components/ui/button'

const ready = ref(false)
</script>
<template>
  <DefaultLayout>
    <section class="w-full max-w-xl rounded-xl border bg-card p-8 text-card-foreground shadow-sm">
      <p class="text-sm font-medium text-muted-foreground">SI Comic Studio</p>
      <h1 class="mt-2 text-2xl font-semibold tracking-tight">企业级前端开发工作台</h1>
      <p class="mt-3 text-sm text-muted-foreground">
        Vue 3、TypeScript、Tailwind CSS 与 shadcn-vue 已就绪。
      </p>
      <Button class="mt-6" @click="ready = !ready">{{
        ready ? '开发环境已就绪 ✓' : '开始开发'
      }}</Button>
    </section>
  </DefaultLayout>
</template>
