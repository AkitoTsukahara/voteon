export type VoteTypes = {
    title: string
    targetValue: number
  }

  export const VOTE_TYPES: VoteTypes[] = [
    {
      title: '優秀なエンジニアの特徴はどれか？',
      targetValue: 1,
    },
    {
      title: 'エンジニアとして仕事する中で嬉しいことはどれか？',
      targetValue: 2,
    }
  ]

  type ValueAction = {
    id: number
    title: string
    imgPath: string
    targetValues: number
  }

  type ValueDataBase = {
    id: number
    valueAction: ValueAction
  }

  export type ValueActionData = ValueDataBase & {
    point1: number
    point2: number
    point3: number
  }
  
  const VALUES_DATA: ValueDataBase[] = [
    {
        id: 1,
        valueAction: {
            id: 1,
            title: 'コードが綺麗である',
            imgPath: require('~/assets/images/01.png'),
            targetValues: 1
        },
    },
    {
        id: 2,
        valueAction: {
            id: 1,
            title: '社外からの評価も高い',
            imgPath: require('~/assets/images/02.png'),
            targetValues: 1
        },
    },
    {
        id: 3,
        valueAction: {
            id: 1,
            title: '仕事が早い',
            imgPath: require('~/assets/images/03.png'),
            targetValues: 1
        },
    },
    {
        id: 4,
        valueAction: {
            id: 1,
            title: '新しいことに率先して挑戦する',
        imgPath: require('~/assets/images/04.png'),
            targetValues: 1
        },
    },
  ]

  export const getValueActionData = (): ValueActionData[] => {
    return VALUES_DATA.map((ValueActionData) => {
      return {
        ...ValueActionData,
        point1: 1,
        point2: 1,
        point3: 1,
      }
    })
  }
  
  