import {Router} from 'express'
import PlayerController from '../controllers/playerController'

const playersRoute = Router()

playersRoute.get('/allPlayers', PlayerController.fetchAllPlayers)

export default playersRoute
