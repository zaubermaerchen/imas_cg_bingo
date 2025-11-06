import { type Plugin, type InjectionKey } from 'vue'
import type CardRepositoryInterface from '@/repositories/cardRepositoryInterface.ts'
import CardRepository from '@/repositories/cardRepository.ts'

export const CardRepositoryInjectKey = Symbol() as InjectionKey<CardRepositoryInterface>

export const dependencyProviderPlugin: Plugin = {
  install: (app) => {
    app.provide(CardRepositoryInjectKey, new CardRepository())
  },
}
