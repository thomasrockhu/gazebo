import { render, screen } from '@testing-library/react'
import CommitPage from './CommitPage'
import { MemoryRouter } from 'react-router-dom'

describe('HomePage', () => {
  function setup() {
    render(<CommitPage />, {
      wrapper: MemoryRouter,
    })
  }

  describe('renders', () => {
    beforeEach(() => {
      setup()
    })

    it('renders the Uploads', () => {
      expect(screen.getByText(/Uploads/)).toBeInTheDocument()
    })

    it('renders the Coverage report', () => {
      expect(screen.getByText(/Coverage report/)).toBeInTheDocument()
    })

    it('renders the Impacted files', () => {
      expect(screen.getByText(/Impacted files/)).toBeInTheDocument()
    })
  })
})
