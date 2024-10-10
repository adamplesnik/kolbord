import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import Heading from './Heading'

describe('Heading', () => {
  it('renders Heading 1', () => {
    const r = render(<Heading size={1}>h1</Heading>)
    expect(r).toMatchSnapshot()
  })
  it('renders Heading 1 with custom class name', () => {
    const r = render(
      <Heading size={1} className="custom">
        h1
      </Heading>
    )
    expect(r).toMatchSnapshot()
  })

  it('renders Heading 2', () => {
    const r = render(<Heading size={2}>h2</Heading>)
    expect(r).toMatchSnapshot()
  })
  it('renders Heading 2 with custom class name', () => {
    const r = render(
      <Heading size={2} className="custom">
        h2
      </Heading>
    )
    expect(r).toMatchSnapshot()
  })

  it('renders Heading 3', () => {
    const r = render(<Heading size={3}>h3</Heading>)
    expect(r).toMatchSnapshot()
  })
  it('renders Heading 3 with custom class name', () => {
    const r = render(
      <Heading size={3} className="custom">
        h3
      </Heading>
    )
    expect(r).toMatchSnapshot()
  })

  it('renders Heading 4', () => {
    const r = render(<Heading size={4}>h4</Heading>)
    expect(r).toMatchSnapshot()
  })
  it('renders Heading 4 with custom class name', () => {
    const r = render(
      <Heading size={4} className="custom">
        h1
      </Heading>
    )
    expect(r).toMatchSnapshot()
  })
})
