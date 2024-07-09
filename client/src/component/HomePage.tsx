import {useEffect, useState} from 'react'
import {
    Box,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    TableContainer,
    CircularProgress,
    TablePagination,
    FormControlLabel,
    Checkbox,
    styled,
    Switch,
    FormControl,
    InputAdornment,
    OutlinedInput,
    Checkbox as MuiCheckbox,
    useTheme,
    useMediaQuery,
    Button
} from '@mui/material'
import {fetchAllPlayers} from './actions/playerAction'
import {useAppDispatch, useAppSelector} from '../hooks'
import styles from './style/HomePage.module.scss'
import SearchIcon from '@mui/icons-material/Search'
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import {SvgIconComponent} from '@mui/icons-material'

interface HomePageProps {
    isDarkMode: boolean
    toggleDarkMode: () => void
}

export const HomePage: React.FC<HomePageProps> = ({isDarkMode, toggleDarkMode}) => {
    const dispatch = useAppDispatch()
    const players = useAppSelector(state => state.player.players)
    const total = useAppSelector(state => state.player.total)
    const theme = useTheme()
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'))

    const rows = ['Name', 'Team', 'GP', 'MIN', 'PTS', 'FGM', 'FGA', 'FGP', 'TPM', 'TPA', 'TPP', 'FTM', 'FTA', 'FTP']

    const [loading, setLoading] = useState(true)
    const [search, setSearch] = useState('')
    const [pageSize, setPageSize] = useState(10)
    const [page, setPage] = useState(1)
    const [sortField, setSortField] = useState('name')
    const [sortOrder, setSortOrder] = useState<'ASC' | 'DESC'>('ASC')
    const [selectedColumns, setSelectedColumns] = useState(rows)
    const [showFilters, setShowFilters] = useState(false)

    const toggleFilters = () => {
        setShowFilters(prevState => !prevState)
    }

    const MaterialUISwitch = styled(Switch)(({theme}) => ({
        width: 62,
        height: 34,
        padding: 7,
        '& .MuiSwitch-switchBase': {
            margin: 1,
            padding: 0,
            transform: 'translateX(6px)',
            '&.Mui-checked': {
                color: '#fff',
                transform: 'translateX(22px)',
                '& .MuiSwitch-thumb:before': {
                    backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
                        '#fff'
                    )}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`
                },
                '& + .MuiSwitch-track': {
                    opacity: 1,
                    backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be'
                }
            }
        },
        '& .MuiSwitch-thumb': {
            backgroundColor: theme.palette.mode === 'dark' ? '#003892' : '#001e3c',
            width: 32,
            height: 32,
            '&::before': {
                content: "''",
                position: 'absolute',
                width: '100%',
                height: '100%',
                left: 0,
                top: 0,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
                    '#fff'
                )}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`
            }
        },
        '& .MuiSwitch-track': {
            opacity: 1,
            backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
            borderRadius: 20 / 2
        }
    }))

    useEffect(() => {
        const fetchData = async () => {
            await dispatch(fetchAllPlayers(search, pageSize, page, sortField, sortOrder, selectedColumns))
            setLoading(false)
        }
        fetchData()
    }, [dispatch, search, pageSize, page, sortField, sortOrder, selectedColumns])

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(event.target.value)
        setPage(1)
    }

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage + 1)
    }

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPageSize(+event.target.value)
        setPage(1)
    }

    const handleSort = (column: string) => {
        const newSortOrder = sortOrder === 'ASC' ? 'DESC' : 'ASC'
        setSortField(column)
        setSortOrder(newSortOrder)
    }

    const handleColumnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {name, checked} = event.target
        setSelectedColumns(prev => {
            const newSelected = checked ? [...prev, name] : prev.filter(column => column !== name)
            return sortColumns(newSelected)
        })
    }

    const sortColumns = (columns: string[]) => {
        return columns.sort((a, b) => rows.indexOf(a) - rows.indexOf(b))
    }

    return (
        <Box style={{overflowX: 'hidden', margin: '2rem'}}>
            <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                mb={2}
                flexDirection={isSmallScreen ? 'column' : 'row'}
            >
                <FormControl
                    sx={{m: 1, width: isSmallScreen ? '100%' : '60ch'}}
                    variant="outlined"
                    onChange={handleSearch}
                >
                    <OutlinedInput
                        style={{borderRadius: '50px', boxShadow: '0 3px 5px rgba(0, 0, 0, 0.2)'}}
                        id="outlined-adornment-weight"
                        endAdornment={<InputAdornment position="end">Search</InputAdornment>}
                        aria-describedby="outlined-weight-helper-text"
                        inputProps={{
                            'aria-label': 'weight'
                        }}
                        placeholder="Search a player or a team"
                    />
                </FormControl>
                {/* <FormControlLabel
                    control={<MaterialUISwitch sx={{m: 1}} onChange={toggleDarkMode} checked={isDarkMode} />}
                    label=""
                /> */}
            </Box>
            <Box position="relative">
                <Box display={{xs: 'block', md: 'none'}} mb={2}>
                    <Button variant="contained" color="primary" onClick={toggleFilters}>
                        Advanced Filter
                    </Button>
                    {showFilters && (
                        <Box
                            mt={2}
                            display="flex"
                            justifyContent="flex-start"
                            flexWrap="wrap"
                            position="absolute"
                            top="100%"
                            left="0"
                            width="100%"
                            bgcolor={theme.palette.background.paper}
                            zIndex={10}
                            p={2}
                            boxShadow="0 4px 6px rgba(0, 0, 0, 0.1)"
                        >
                            {rows.map(column => (
                                <FormControlLabel
                                    key={column}
                                    control={
                                        <Checkbox
                                            checked={selectedColumns.includes(column)}
                                            onChange={handleColumnChange}
                                            name={column}
                                            color="primary"
                                        />
                                    }
                                    label={column}
                                    sx={{
                                        paddingRight: '0.2rem',

                                        // backgroundColor: theme.palette.mode === 'dark' ? '#555' : '#fff',
                                        color: theme.palette.mode === 'dark' ? '#fff' : '#000'
                                    }}
                                />
                            ))}
                        </Box>
                    )}
                </Box>
                <Box display={{xs: 'none', md: 'flex'}} justifyContent="flex-start" mb={2} flexWrap="wrap">
                    {rows.map(column => (
                        <FormControlLabel
                            key={column}
                            control={
                                <Checkbox
                                    checked={selectedColumns.includes(column)}
                                    onChange={handleColumnChange}
                                    name={column}
                                    color="primary"
                                />
                            }
                            label={column}
                            sx={{
                                margin: '1rem',
                                padding: '0.5rem 1rem',
                                borderRadius: '50px',
                                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                                backgroundColor: theme.palette.mode === 'dark' ? '#555' : '#fff',
                                color: theme.palette.mode === 'dark' ? '#fff' : '#000'
                            }}
                        />
                    ))}
                </Box>
            </Box>
            <TableContainer component={Paper} className={styles.tableContainer}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        {selectedColumns.map(column => (
                            <TableCell
                                key={column}
                                onClick={() => handleSort(column)}
                                sx={{
                                    backgroundColor: theme.palette.mode === 'dark' ? '#111' : '#9ca2c3b1',
                                    color: theme.palette.mode === 'dark' ? '#fff' : '#000',
                                    fontWeight: 'bold',
                                    cursor: 'pointer'
                                }}
                            >
                                {column} {sortField === column ? (sortOrder === 'ASC' ? '▲' : '▼') : ''}
                            </TableCell>
                        ))}
                    </TableHead>
                    <TableBody>
                        {loading ? (
                            <TableRow>
                                <TableCell colSpan={rows.length} align="center">
                                    <CircularProgress />
                                </TableCell>
                            </TableRow>
                        ) : players && players.length > 0 ? (
                            players.map((player: any, index: number) => (
                                <TableRow
                                    sx={{
                                        backgroundColor:
                                            index % 2 === 0
                                                ? theme.palette.mode === 'dark'
                                                    ? '#444'
                                                    : '#f3f5f6'
                                                : 'inherit'
                                    }}
                                    key={player.id}
                                >
                                    {selectedColumns.includes('Name') && <TableCell>{player.Name}</TableCell>}
                                    {selectedColumns.includes('Team') && <TableCell>{player.Team}</TableCell>}
                                    {selectedColumns.includes('GP') && <TableCell>{player.GP}</TableCell>}
                                    {selectedColumns.includes('MIN') && <TableCell>{player.MIN}</TableCell>}
                                    {selectedColumns.includes('PTS') && <TableCell>{player.PTS}</TableCell>}
                                    {selectedColumns.includes('FGM') && <TableCell>{player.FGM}</TableCell>}
                                    {selectedColumns.includes('FGA') && <TableCell>{player.FGA}</TableCell>}
                                    {selectedColumns.includes('FGP') && <TableCell>{player.FGP}</TableCell>}
                                    {selectedColumns.includes('TPM') && <TableCell>{player.TPM}</TableCell>}
                                    {selectedColumns.includes('TPA') && <TableCell>{player.TPA}</TableCell>}
                                    {selectedColumns.includes('TPP') && <TableCell>{player.TPP}</TableCell>}
                                    {selectedColumns.includes('FTM') && <TableCell>{player.FTM}</TableCell>}
                                    {selectedColumns.includes('FTA') && <TableCell>{player.FTA}</TableCell>}
                                    {selectedColumns.includes('FTP') && <TableCell>{player.FTP}</TableCell>}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={rows.length} align="center">
                                    No data available
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
            <Box display="flex" justifyContent="flex-end">
                <TablePagination
                    rowsPerPageOptions={[10, 15, 20, 25, {label: 'All', value: total}]}
                    colSpan={3}
                    count={total}
                    rowsPerPage={pageSize}
                    page={page - 1}
                    slotProps={{
                        select: {
                            inputProps: {
                                'aria-label': 'rows per page'
                            },
                            native: true
                        }
                    }}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    style={{borderBottom: 'none'}}
                />
            </Box>
        </Box>
    )
}
