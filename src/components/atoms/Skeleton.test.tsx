import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import Skeleton from './Skeleton'

describe('Skeleton', () => {
  it('renders Skeleton component', () => {
    const r = render(<Skeleton />)
    expect(r).toMatchSnapshot()
  })
  it('renders Skeleton component with custom width', () => {
    const { getByTestId } = render(<Skeleton width="100px" />)
    const element = getByTestId('skeleton')
    const style = window.getComputedStyle(element)
    expect(style.width).toBe('100px')
  })
})
