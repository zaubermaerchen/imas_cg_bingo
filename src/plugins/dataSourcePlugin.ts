import { type Plugin, type InjectionKey } from 'vue'
import type CardDataSource from '@/repositories/cardDataSource.ts'
import CardRepository from '@/repositories/cardRepository.ts'

export const CardDataSourceInjectKey = Symbol() as InjectionKey<CardDataSource>

export const dataSourcePlugin: Plugin = {
  install: (app) => {
    app.provide(CardDataSourceInjectKey, new CardRepository())
  },
}
