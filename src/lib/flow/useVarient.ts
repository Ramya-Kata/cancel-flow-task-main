'use client'
import { useEffect, useState } from 'react'
const KEY = 'mm_cancel_variant'
export function useVariant(): 'A' | 'B' {
  const [variant, setVariant] = useState<'A' | 'B'>('A')
  useEffect(() => {
    const stored = localStorage.getItem(KEY)
    if (stored === 'A' || stored === 'B') { setVariant(stored); return }
    const buf = new Uint32Array(1)
    crypto.getRandomValues(buf)
    const v: 'A' | 'B' = (buf[0] & 1) === 0 ? 'A' : 'B'
    localStorage.setItem(KEY, v)
    setVariant(v)
  }, [])
  return variant
}