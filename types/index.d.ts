import { FastifyPluginCallback, FastifyPluginAsync } from 'fastify'

type FastifyAutoloadPlugin = FastifyPluginCallback<NonNullable<fastifyAutoload.AutoloadPluginOptions>>

type GetSixthGenericOfFasityInstance<Instance> = Instance extends FastifyInstance<any, any, any, any, any, infer U> ? U : never
type GetFirstParameter<T> = T extends (...args: infer P) => any ? P[0] : void
type GetFastifyDecorators<Plugins extends (FastifyPluginCallback<any, any, any, any, any> | FastifyPluginAsync<any, any, any, any, any>)[]> = GetSixthGenericOfFasityInstance<GetFirstParameter<Plugins[number]>>

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

  export function plugin<Dependencies extends (FastifyPluginCallback | FastifyPluginAsync)[]> (fn: FastifyPluginCallback<any, any, any, any, GetFastifyDecorators<Dependencies>> | FastifyPluginAsync<any, any, any, any, GetFastifyDecorators<Dependencies>>, opts: { dependencies?: Dependencies }): FastifyPluginCallback
}

declare function fastifyAutoload (
  ...params: Parameters<FastifyAutoloadPlugin>
): ReturnType<FastifyAutoloadPlugin>

export = fastifyAutoload
