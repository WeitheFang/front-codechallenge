import axios from 'axios'
import {Dispatch} from 'redux'

export const actionTypes = {
    FETCH_ALL_PLAYERS: 'FETCH_ALL_PLAYERS'
}

interface FetchAllPlayersAction {
    type: 'FETCH_ALL_PLAYERS'
    payload: any
}

export const fetchAllPlayers = (
    search: string,
    limit: number,
    page: number,
    sortField: string,
    sortOrder: 'ASC' | 'DESC',
    selectedColumns: string[]
) => {
    return async (dispatch: Dispatch<FetchAllPlayersAction>) => {
        try {
            const response = await axios.get(`http://localhost:3800/allPlayers`, {
                params: {search, limit, page, sortField, sortOrder, selectedColumns}
            })

            console.log(response)
            dispatch({
                type: 'FETCH_ALL_PLAYERS',
                payload: response.data
            })
        } catch (err) {
            console.error(err)
        }
    }
}
