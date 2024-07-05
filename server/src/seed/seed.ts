import {AppDataSource} from '../data-source'
import {PlayerDataEntity} from '../entities/playerData.entity'
import {faker} from '@faker-js/faker'

const seedData = async () => {
    await AppDataSource.initialize()

    const numberOfPlayers = 100
    const teams = ['Alpha', 'Bravo', 'Charlie', 'Delta', 'Echo', 'Foxtrot', 'Golf', 'Hotel', 'India', 'Juliet']

    const players = []

    for (let i = 0; i < numberOfPlayers; i++) {
        const playerEntity = new PlayerDataEntity()
        playerEntity.name = faker.person.fullName({sex: 'male'})
        playerEntity.team = faker.helpers.arrayElement(teams)
        playerEntity.GP = faker.number.int({min: 1, max: 82})
        playerEntity.MIN = parseFloat(faker.number.float({min: 10, max: 40, multipleOf: 0.1}).toFixed(1))
        playerEntity.PTS = parseFloat(faker.number.float({min: 0, max: 30, multipleOf: 0.1}).toFixed(1))
        playerEntity.FGM = parseFloat(faker.number.float({min: 0, max: 10, multipleOf: 0.1}).toFixed(1))
        playerEntity.FGA = parseFloat(faker.number.float({min: 0, max: 20, multipleOf: 0.1}).toFixed(1))
        playerEntity.FGP =
            playerEntity.FGA > 0 ? parseFloat(((playerEntity.FGM / playerEntity.FGA) * 100).toFixed(2)) : 0
        playerEntity.TPM = parseFloat(faker.number.float({min: 0, max: 5, multipleOf: 0.1}).toFixed(1))
        playerEntity.TPA = parseFloat(faker.number.float({min: 0, max: 10, multipleOf: 0.1}).toFixed(1))
        playerEntity.TPP =
            playerEntity.TPA > 0 ? parseFloat(((playerEntity.TPM / playerEntity.TPA) * 100).toFixed(2)) : 0
        playerEntity.FTM = parseFloat(faker.number.float({min: 0, max: 10, multipleOf: 0.1}).toFixed(1))
        playerEntity.FTA = parseFloat(faker.number.float({min: 0, max: 15, multipleOf: 0.1}).toFixed(1))
        playerEntity.FTP =
            playerEntity.FTA > 0 ? parseFloat(((playerEntity.FTM / playerEntity.FTA) * 100).toFixed(2)) : 0

        playerEntity.FGP = playerEntity.FGP < 0 ? 0 : playerEntity.FGP > 100 ? 100 : playerEntity.FGP
        playerEntity.TPP = playerEntity.TPP < 0 ? 0 : playerEntity.TPP > 100 ? 100 : playerEntity.TPP
        playerEntity.FTP = playerEntity.FTP < 0 ? 0 : playerEntity.FTP > 100 ? 100 : playerEntity.FTP

        players.push(playerEntity)
    }

    await PlayerDataEntity.save(players)

    console.log('Seeding completed')
    await AppDataSource.destroy()
}

seedData().catch(error => console.log(error))
