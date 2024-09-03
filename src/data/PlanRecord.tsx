export type PlanRecord = {
  id?: number
  attributes: {
    name?: string
    svg?: string
    company?: {
      data: {
        attributes: {
          uuid: string
        }
      }
    }
  }
}
