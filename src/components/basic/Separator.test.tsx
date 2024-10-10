import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import Separator from './Separator'

describe('Separator', () => {
  it('renders Separator horizontal component', () => {
    const r = render(<Separator />)
    expect(r).toMatchSnapshot()
  })
  it('renders Separator vertical component with h-4 height', () => {
    const r = render(<Separator vertical className="h-4" />)
    expect(r).toMatchSnapshot()
  })
})
