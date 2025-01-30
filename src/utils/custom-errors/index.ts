const createErrorFactory = (name: string) => {
  return class BusinessError extends Error {
    statusCode: number

    constructor(message: string, statusCode: number) {
      super(message)
      this.name = name
      this.statusCode = statusCode
    }
  }
}

export const GetAllCryptosError = createErrorFactory('GetAllCryptosError')
