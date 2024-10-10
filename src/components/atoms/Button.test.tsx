import { render } from '@testing-library/react'
import { Cog } from 'lucide-react'
import { describe, expect, it } from 'vitest'
import Button from './Button'

describe('Button primary', () => {
  it('with text', () => {
    const r = render(<Button buttonType="primary">text</Button>)
    expect(r).toMatchSnapshot()
  })
  it('with text and icon', () => {
    const r = render(
      <Button buttonType="primary" Icon={Cog}>
        text
      </Button>
    )
    expect(r).toMatchSnapshot()
  })
  it('icon only', () => {
    const r = render(<Button buttonType="primary" Icon={Cog} />)
    expect(r).toMatchSnapshot()
  })
})

describe('Button secondary', () => {
  it('with text', () => {
    const r = render(<Button>text</Button>)
    expect(r).toMatchSnapshot()
  })
  it('with text and icon', () => {
    const r = render(<Button Icon={Cog}>text</Button>)
    expect(r).toMatchSnapshot()
  })
  it('icon only', () => {
    const r = render(<Button Icon={Cog} />)
    expect(r).toMatchSnapshot()
  })
})

describe('Button danger', () => {
  it('with text', () => {
    const r = render(<Button buttonType="danger">text</Button>)
    expect(r).toMatchSnapshot()
  })
  it('with text and icon', () => {
    const r = render(
      <Button buttonType="danger" Icon={Cog}>
        text
      </Button>
    )
    expect(r).toMatchSnapshot()
  })
  it('icon only', () => {
    const r = render(<Button buttonType="danger" Icon={Cog} />)
    expect(r).toMatchSnapshot()
  })
})

describe('Button menu', () => {
  it('with text', () => {
    const r = render(<Button buttonType="menu">text</Button>)
    expect(r).toMatchSnapshot()
  })
  it('with text and icon', () => {
    const r = render(
      <Button buttonType="menu" Icon={Cog}>
        text
      </Button>
    )
    expect(r).toMatchSnapshot()
  })
  it('icon only', () => {
    const r = render(<Button buttonType="menu" Icon={Cog} />)
    expect(r).toMatchSnapshot()
  })
})

describe('Button disabled', () => {
  it('disabled', () => {
    const r = render(<Button disabled>test</Button>)
    expect(r).toMatchSnapshot()
  })
})
