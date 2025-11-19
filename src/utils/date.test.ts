import { afterAll, beforeAll, describe, expect, vi, it } from 'vitest'
import { dateToLongFormat } from '@/utils/date'

describe('dateUtils', () => {
  beforeAll(() => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date('2020-02-02').getTime())
  })
  afterAll(() => {
    vi.useRealTimers()
  })

  describe('getLongDateFormat', () => {
    it('should return long date format', () => {
      const formatedDate = dateToLongFormat(new Date())

      expect(formatedDate).toBe('2.2.2020')
    })
  })
})
