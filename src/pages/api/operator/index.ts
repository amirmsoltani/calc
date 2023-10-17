import { ApiHandler, withApiHandler } from '~/lib'

class operatorHandler extends ApiHandler {

  async post () {
    const body = this.req.body
    const operators = await this.prisma.oprators.create(
      {
        data: {
          userKey: this.userKey,
          title: body.title,
          firstValue:body.firstValue,
          secondValue:body.secondValue,
          value:body.value,
        }
      })
    this.res.status(200).json(operators)
    this.res.end()
  }

  async get () {
    const operators = await this.prisma.oprators.findMany(
      {
        where: {
          userKey: { contains: this.userKey }
        }
      })
    this.res.status(200).json(operators)
    this.res.end()
  }
}

export default withApiHandler(operatorHandler)
