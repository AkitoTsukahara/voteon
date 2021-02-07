  type ValueAction = {
    id: number
    title: string
    imgPath: string
  }

  export type ValueActionData = ValueAction & {
    point1: number
    point2: number
    point3: number
  }
  
  const VALUES_DATA: ValueAction[] = [
    {
        id: 1,
        title: 'コードが綺麗である',
        imgPath: require('~/assets/images/01.png')
    },
    {
        id: 2,
        title: '社外からの評価も高い',
        imgPath: require('~/assets/images/02.png')
    },
    {
        id: 3,
        title: '仕事が早い',
        imgPath: require('~/assets/images/03.png')
    },
    {
        id: 4,
        title: '新しいことに率先して挑戦する',
        imgPath: require('~/assets/images/04.png')
    },
  ]

  export const getValueActionData = (): ValueAction[] => {
    return VALUES_DATA.map((ValueAction) => {
      return {
        ...ValueAction,
        point1: 1,
        point2: 1,
        point3: 1,
      }
    })
  }
  
  