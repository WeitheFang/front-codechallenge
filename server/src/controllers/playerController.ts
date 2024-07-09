import {Request, Response} from 'express'
import {PlayerDataEntity} from '../entities/playerData.entity'
import {AppDataSource} from '../data-source'
import {applySearchCriteria, isSortOrder} from '../helper/helper'

class PlayerController {
    static async fetchAllPlayers(request: Request, response: Response) {
        const search = (request.query.search as string) || null
        const limit = parseInt(request.query.limit as string) || 10
        const page = parseInt(request.query.page as string) || 1
        const sortField = (request.query.sortField as string) || 'name'
        const sortOrder = (request.query.sortOrder as string) || 'ASC'
        const selectedColumns = (request.query.selectedColumns as string[]) || [
            'Name',
            'Team',
            'GP',
            'MIN',
            'PTS',
            'FGM',
            'FGA',
            'FGP',
            'TPM',
            'TPA',
            'TPP',
            'FTM',
            'FTA',
            'FTP'
        ]

        try {
            let queryBuilder = AppDataSource.getRepository(PlayerDataEntity)
                .createQueryBuilder('player')
                .select(selectedColumns.map(column => `player.${column}`))
                .take(limit)
                .skip((page - 1) * limit)

            if (isSortOrder(sortOrder)) {
                queryBuilder = queryBuilder.orderBy(`player.${sortField}`, sortOrder)
            }

            const searchField = ['Name', 'Team']
            const searchCriteria = applySearchCriteria(search, searchField)

            if (searchCriteria) {
                queryBuilder.andWhere(searchCriteria, {search: `%${search}%`})
            }

            const [players, total] = await queryBuilder.getManyAndCount()

            return response.status(200).json({players: players, total, page, lastPage: Math.ceil(total / limit)})
        } catch (error) {
            return response.status(500).json({message: 'An error occurred while fetching players', error: error})
        }
    }
}

export default PlayerController
