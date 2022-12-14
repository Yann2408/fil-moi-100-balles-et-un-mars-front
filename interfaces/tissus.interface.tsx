import ITissuType from "./tissus-type.interface"

export default interface ITissu {
    id: number
    name: string
    material: string
    weight: number
    laize: number
    price: number
    stock: number
    by_on: string
    scrap: boolean
    pre_wash: boolean
    oekotex: boolean
    bio: boolean
    rating: number
    comment?: string
    user_id?: number
    tissu_type_id?: number
    tissu_type: ITissuType
  }