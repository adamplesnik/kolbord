import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import Loading from './Loading'

describe('Loading', () => {
  it('renders Loading component', () => {
    const r = render(<Loading />)
    expect(r).toMatchSnapshot()
  })
})
