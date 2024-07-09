import {screen, fireEvent, waitFor} from '@testing-library/react'
import {render} from '../test-utils'
import {HomePage} from '../component/HomePage'
import {ThemeProvider, createTheme} from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'

const lightTheme = createTheme({
    palette: {
        mode: 'light'
    }
})

test('renders HomePage component', async () => {
    render(
        <ThemeProvider theme={lightTheme}>
            <CssBaseline />
            <HomePage />
        </ThemeProvider>
    )
    const searchInput = screen.getByPlaceholderText(/Search a player or a team/i)
    expect(searchInput).toBeInTheDocument()

    const loadingSpinner = screen.getByRole('progressbar')
    expect(loadingSpinner).toBeInTheDocument()

    await waitFor(() => expect(loadingSpinner).not.toBeInTheDocument())
})
