import { Container } from 'inversify'
import type CardRepositoryInterface from '@/repositories/cardRepositoryInterface.ts'
import CardRepository from '@/repositories/cardRepository.ts'

const container = new Container()
container.bind<CardRepositoryInterface>('CardRepository').to(CardRepository)

export default container
