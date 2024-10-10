import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import Paragraph from './Paragraph'

describe('Paragraph', () => {
  it('renders Paragraph component', () => {
    const r = render(<Paragraph>test</Paragraph>)
    expect(r).toMatchSnapshot()
  })

  it('renders Paragraph component with custom class name', () => {
    const r = render(<Paragraph className="custom">test</Paragraph>)
    expect(r).toMatchSnapshot()
  })
})
