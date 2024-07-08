import {Brackets} from 'typeorm'

export const applySearchCriteria = <Entity>(search: string | null, fields: Array<keyof Entity>): Brackets | null => {
    if (!search) return null

    return new Brackets(qb => {
        fields.forEach((field, index) => {
            const method = index === 0 ? 'where' : 'orWhere'
            qb[method](`player.${field as string} LIKE :search`, {
                search: `%${search}%`
            })
        })
    })
}

export function isSortOrder(order: string): order is 'ASC' | 'DESC' {
    return order === 'ASC' || order === 'DESC'
}
