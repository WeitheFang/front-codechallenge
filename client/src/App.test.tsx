import React from 'react'
import {render, screen, fireEvent} from '@testing-library/react'
import App from './App'

test('renders App component with light mode by default', () => {
    render(<App />)
    const bannerTitle = screen.getByText(/Basketball League Player Stats/i)
    expect(bannerTitle).toBeInTheDocument()
})

test('toggles dark mode on switch click', () => {
    render(<App />)
    const toggleSwitch = screen.getByRole('checkbox')

    fireEvent.click(toggleSwitch)
    const body = document.body
    expect(body).toHaveClass('dark-mode')

    fireEvent.click(toggleSwitch)
    expect(body).toHaveClass('light-mode')
})
