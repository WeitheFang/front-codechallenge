import {actionTypes} from '../actions/playerAction'

interface Player {
    id: number
    name: string
    team: string
    GP: number
    MIN: number
    PTS: number
    FGM: number
    FGA: number
    FGP: number
    TPM: number
    TPA: number
    TPP: number
    FTM: number
    FTA: number
    FTP: number
}

interface PlayerState {
    players: Player[]
    total: number
}

const initState: PlayerState = {
    players: [],
    total: 0
}

export const playerReducer = (state = initState, action: any) => {
    switch (action.type) {
        case actionTypes.FETCH_ALL_PLAYERS:
            return {
                ...state,
                players: action.payload.players,
                total: action.payload.total
            }
        default:
            return state
    }
}
