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
    FormControl,
    InputAdornment,
    OutlinedInput,
    useTheme,
    useMediaQuery,
    Button
} from '@mui/material'
import {fetchAllPlayers} from './actions/playerAction'
import {useAppDispatch, useAppSelector} from '../hooks'
import styles from './style/HomePage.module.scss'

export const HomePage = () => {
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
