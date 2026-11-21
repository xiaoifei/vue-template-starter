<script setup lang="ts">
import { computed } from 'vue'
import { cn } from '@/lib/utils'

type ButtonVariant = 'default' | 'secondary' | 'outline' | 'ghost' | 'destructive'
const props = withDefaults(
  defineProps<{
    variant?: ButtonVariant
    size?: 'default' | 'sm' | 'lg' | 'icon'
    class?: string
  }>(),
  { variant: 'default', size: 'default', class: '' },
)
const classes = computed(() =>
  cn(
    'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50',
    {
      'bg-primary text-primary-foreground hover:opacity-90': props.variant === 'default',
      'bg-secondary text-secondary-foreground hover:opacity-80': props.variant === 'secondary',
      'border border-input bg-background hover:bg-secondary': props.variant === 'outline',
      'hover:bg-secondary': props.variant === 'ghost',
      'bg-destructive text-white hover:opacity-90': props.variant === 'destructive',
      'h-10 px-4 py-2': props.size === 'default',
      'h-9 rounded-md px-3': props.size === 'sm',
      'h-11 rounded-md px-8': props.size === 'lg',
      'h-10 w-10': props.size === 'icon',
    },
    props.class,
  ),
)
</script>
<template>
  <button :class="classes" v-bind="$attrs"><slot /></button>
</template>
