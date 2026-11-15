import { describe, expect, it } from 'vitest'
import { useCounter } from './useCounter'
describe('useCounter', () => {
  it('increments and resets to initial value', () => {
    const counter = useCounter(2)
    counter.increment()
    expect(counter.count.value).toBe(3)
    counter.reset()
    expect(counter.count.value).toBe(2)
  })
})
