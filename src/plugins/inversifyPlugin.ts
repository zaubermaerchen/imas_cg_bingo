import { type Plugin } from 'vue'
import { Container } from 'inversify'

export interface InversifyPluginOptions {
  container?: Container
}

const inversifyPlugin: Plugin = {
  install: (app, options?: InversifyPluginOptions) => {
    const container = options?.container ?? new Container()

    app.provide('diContainer', container)
  },
}

export default inversifyPlugin
