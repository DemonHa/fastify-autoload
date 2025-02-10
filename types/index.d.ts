import { FastifyPluginCallback, FastifyPluginAsync } from 'fastify'

type FastifyAutoloadPlugin = FastifyPluginCallback<NonNullable<fastifyAutoload.AutoloadPluginOptions>>

declare namespace fastifyAutoload {
  type RewritePrefix = (folderParent: string, folderName: string) => string | boolean
  type Filter = string | RegExp | ((path: string) => boolean)

  export interface AutoloadPluginOptions {
    dir: string
    dirNameRoutePrefix?: boolean | RewritePrefix
    ignoreFilter?: Filter
    matchFilter?: Filter
    ignorePattern?: RegExp
    scriptPattern?: RegExp
    indexPattern?: RegExp
    options?: FastifyPluginOptions
    maxDepth?: number
    forceESM?: boolean
    encapsulate?: boolean
    autoHooks?: boolean
    autoHooksPattern?: RegExp
    cascadeHooks?: boolean
    overwriteHooks?: boolean
    routeParams?: boolean
  }

  export const fastifyAutoload: FastifyAutoloadPlugin
  export { fastifyAutoload as default }

  type GetSixthGenericOfFasityInstance<Instance> = Instance extends FastifyInstance<any, any, any, any, any, infer U> ? U : never
  type GetFirstParameter<T> = T extends (...args: infer P) => any ? P[0] : never
  type GetFastifyDecorators<Plugins extends (FastifyPluginCallback<any, any, any, any, any> | FastifyPluginAsync<any, any, any, any, any>)[]> = GetSixthGenericOfFasityInstance<GetFirstParameter<Plugins[number]>>

  export function plugin<Dependencies extends (FastifyPluginCallback<any, any, any, any, any> | FastifyPluginAsync<any, any, any, any, any>)[]> (fn: FastifyPluginCallback<any, any, any, any, GetFastifyDecorators<Dependencies>> | FastifyPluginAsync<any, any, any, any, GetFastifyDecorators<Dependencies>>, opts: { dependencies?: Dependencies }): FastifyPluginCallback | FastifyPluginAsync
}

declare function fastifyAutoload (
  ...params: Parameters<FastifyAutoloadPlugin>
): ReturnType<FastifyAutoloadPlugin>

export = fastifyAutoload
