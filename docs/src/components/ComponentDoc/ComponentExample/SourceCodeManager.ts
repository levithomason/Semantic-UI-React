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
  setCodeForType: (codeType: SourceCodeType, code: string) => void
  getCodeForType: (codeType: SourceCodeType) => string
  getPathForType: (codeType: SourceCodeType) => string
  originalCodeHasChanged: (codeType: SourceCodeType) => boolean
  resetToOriginalCode: (codeType: SourceCodeType) => void
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

  constructor(private sourceCodePath: string) {
     [SourceCodeType.normal, SourceCodeType.shorthand].forEach(sourceCodeType => {
      this.setDataForCodeType(sourceCodeType)
    })
  }

  public setCodeForType(codeType: SourceCodeType, code: string): void {
    this.getCodeData(codeType).code = code
  }

  public getCodeForType(codeType: SourceCodeType): string {
    return this.getCodeData(codeType).code
  }

  public getPathForType(codeType: SourceCodeType): string {
    return this.getCodeData(codeType).path
  }

  public originalCodeHasChanged(codeType: SourceCodeType): boolean {
    const codeData = this.getCodeData(codeType)
    return codeData.code !== codeData.originalCode
  }

  public resetToOriginalCode(codeType: SourceCodeType): void {
    const codeData = this.getCodeData(codeType)
    codeData.code = codeData.originalCode
  }

  private getCodeData(codeType: SourceCodeType): ISourceCodeData {
    return this.data[codeType]
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
