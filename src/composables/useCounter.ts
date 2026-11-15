import { ref } from 'vue'

export function useCounter(initialValue = 0) {
  const count = ref(initialValue)
  const increment = () => {
    count.value += 1
  }
  const reset = () => {
    count.value = initialValue
  }
  return { count, increment, reset }
}
