declare const __DEV__: boolean
declare const __PATH_SEP__: string

declare interface NodeModule {
  hot: any
}

declare interface NodeRequire {
  context: any
}

declare module '*.json' {
  const value: any
  export default value
}