export enum SourceCodeType {
  normal = 'normal',
  shorthand = 'shorthand',
}

interface ISourceCodeData {
  path: string
  code: string
  originalCode: string
}

export interface ISourceCodeManager {
  currentCode: string
  currentPath: string
  codeType: SourceCodeType
  originalCodeHasChanged: boolean
  resetToOriginalCode: () => void
}

export const examplePathPatterns: { [key in SourceCodeType]: string } = {
  normal: '',
  shorthand: '.shorthand',
}

class SourceCodeManager implements ISourceCodeManager {
  private readonly data: { [key in SourceCodeType]: ISourceCodeData } = {
    normal: null,
    shorthand: null,
  }

  public codeType: SourceCodeType = SourceCodeType.shorthand // by default we show shorthand first

  constructor(private sourceCodePath: string) {
     [SourceCodeType.normal, SourceCodeType.shorthand].forEach(sourceCodeType => {
      this.setDataForCodeType(sourceCodeType)
    })
  }

  public set currentCode(currentCode: string) {
    this.currentCodeData.code = currentCode
  }

  public get currentCode(): string {
    return this.currentCodeData.code || this.currentCodeData.originalCode
  }

  public get currentPath(): string {
    return this.currentCodeData.path
  }

  public get originalCodeHasChanged(): boolean {
    return this.currentCodeData.code !== this.currentCodeData.originalCode
  }

  public resetToOriginalCode(): void {
    this.currentCodeData.code = this.currentCodeData.originalCode
  }

  private get currentCodeData(): ISourceCodeData {
    return this.data[this.codeType]
  }

  private set currentCodeData(codeData: ISourceCodeData) {
    this.data[this.codeType] = codeData
  }

  private setDataForCodeType(sourceCodeType: SourceCodeType): void {
    const path = this.sourceCodePath + examplePathPatterns[sourceCodeType]
    const code = this.safeRequire(path)

    this.data[sourceCodeType] = {
      path,
      code,
      originalCode: code,
    }
  }

  private safeRequire = (path: string): string => {
    try {
      return require(`!raw-loader!../../../examples/${path}`)
    } catch (e) {
      return ''
    }
  }
}

export default (path: string): ISourceCodeManager => new SourceCodeManager(path)
