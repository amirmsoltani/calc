import { ApiHandler, withApiHandler } from '~/lib'

class operatorHandler extends ApiHandler {

  async put () {
    const body = this.req.body
    const operatorId = this.req.query.id as string

    const update = await this.prisma.oprators.update(
      {
        where: { id: +operatorId },
        data: {
          firstValue: body.firstValue,
          secondValue: body.secondValue,
          value: body.value
        }
      })
    this.res.status(200).json(update)
    this.res.end()
  }

  async delete(){
    const operatorId = this.req.query.id as string;
    await this.prisma.oprators.delete({where:{id:+operatorId}});
    this.res.status(200).json({isDelete:true});
  }
}

export default withApiHandler(operatorHandler)
