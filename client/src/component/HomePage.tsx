import {useEffect, useState} from 'react'
import {
    Box,
    InputBase,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Button,
    TableContainer,
    CircularProgress,
    TextField,
    Select,
    MenuItem,
    SelectChangeEvent,
    TableFooter,
    TablePagination,
    FormControlLabel,
    Checkbox
} from '@mui/material'
import {fetchAllPlayers} from './actions/playerAction'
import {useAppDispatch, useAppSelector} from '../hooks'
import styles from './style/HomePage.module.scss'

export const HomePage = () => {
    const dispatch = useAppDispatch()
    const players = useAppSelector(state => state.player.players)
    const total = useAppSelector(state => state.player.total)

    const rows = ['Name', 'Team', 'GP', 'MIN', 'PTS', 'FGM', 'FGA', 'FGP', 'TPM', 'TPA', 'TPP', 'FTM', 'FTA', 'FTP']

    const [loading, setLoading] = useState(true)
    const [search, setSearch] = useState('')
    const [pageSize, setPageSize] = useState(10)
    const [page, setPage] = useState(1)
    const [sortField, setSortField] = useState('name')
    const [sortOrder, setSortOrder] = useState<'ASC' | 'DESC'>('ASC')
    const [selectedColumns, setSelectedColumns] = useState(rows)

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
        <Box>
            <Box display="flex" justifyContent="center" alignItems="center" mb={2}>
                <TextField
                    label="Search Players or Team"
                    variant="outlined"
                    value={search}
                    onChange={handleSearch}
                    className={styles.searchTextField}
                />
            </Box>
            <Box display="flex" justifyContent="flex-end" mb={2} flexWrap="wrap">
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
                        className={styles.columnSelect}
                    />
                ))}
            </Box>
            <TableContainer component={Paper}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        {selectedColumns.map(column => (
                            <TableCell key={column} onClick={() => handleSort(column)}>
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
                            players.map((player: any) => (
                                <TableRow key={player.id}>
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
            />
        </Box>
    )
}
