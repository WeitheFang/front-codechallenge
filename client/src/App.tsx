import {HomePage} from './component/HomePage'
import {NavBar} from './component/NavBar'
import {useState} from 'react'
import {createTheme, ThemeProvider} from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import './App.css'

const lightTheme = createTheme({
    palette: {
        mode: 'light'
    }
})

const darkTheme = createTheme({
    palette: {
        mode: 'dark'
    }
})

function App() {
    const [isDarkMode, setIsDarkMode] = useState(false)

    const toggleDarkMode = () => {
        setIsDarkMode(!isDarkMode)
    }

    return (
        <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
            <CssBaseline />
            <div>
                <NavBar isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
                <HomePage />
            </div>
        </ThemeProvider>
    )
}

export default App
