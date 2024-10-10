import { render } from '@testing-library/react'
import { Cog } from 'lucide-react'
import { describe, expect, it } from 'vitest'
import Empty from './Empty'

describe('Empty', () => {
  it('renders Empty component with Cog icon, hello message', () => {
    const r = render(<Empty Icon={Cog} message="Hello" />)
    expect(r).toMatchSnapshot()
  })
})
