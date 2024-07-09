import {screen, fireEvent} from '@testing-library/react'
import {render} from '../test-utils'
import {NavBar} from '../component/NavBar'

const mockToggleDarkMode = jest.fn()

test('renders NavBar component', () => {
    render(<NavBar isDarkMode={false} toggleDarkMode={mockToggleDarkMode} />)
    const titleElement = screen.getByText(/Basketball League Player Stats/i)
    expect(titleElement).toBeInTheDocument()
})

test('toggles dark mode from NavBar', () => {
    render(<NavBar isDarkMode={false} toggleDarkMode={mockToggleDarkMode} />)
    const switchElement = screen.getByRole('checkbox')
    fireEvent.click(switchElement)
    expect(mockToggleDarkMode).toHaveBeenCalled()
})
