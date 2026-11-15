import { describe, expect, it } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'
import { useCounterStore } from './counter'
describe('counter store', () => {
  it('increments and resets', () => {
    setActivePinia(createPinia())
    const counter = useCounterStore()
    counter.increment()
    expect(counter.count).toBe(1)
    counter.reset()
    expect(counter.count).toBe(0)
  })
})
