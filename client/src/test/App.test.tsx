import React from 'react'
import {render, screen, fireEvent} from '../test-utils'
import App from '../App'

test('renders App component with light mode by default', () => {
    render(<App />)
    const bannerTitle = screen.getByText(/Basketball League Player Stats/i)
    expect(bannerTitle).toBeInTheDocument()
})
