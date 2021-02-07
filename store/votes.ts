import { getterTree, mutationTree, actionTree } from 'typed-vuex'
import { firestore } from '@/plugins/firebase'
import { VoteTypes,ValueActionData } from '~/data/data'
  
type ActionLists = ValueActionData[]
  
type VoteSections = VoteTypes & {
    actionLists: ActionLists
  }
  
type VoteContent = {
    actionId: number
    point1: number
    point2: number
    point3: number
}
  
type VoteContents = VoteContent[];
  
  export const state = () => ({
    voteTypes: [] as VoteTypes[],
    voteSections: [] as VoteSections[],
    actionLists: [] as ValueActionData[],
    votedDataId: '',
    results: [] as VoteContents,
  })
  
  export const getters = getterTree(state, {
    ActionLists: (state) => state.actionLists,
    voteSections: (state) => state.voteSections,
    getPointedActionLists: (state) => {
      return state.voteSections.reduce(
        (accumulator: ValueActionData[], currentValue) => {
          const pointedActionInfo: ValueActionData[] = [...currentValue.actionLists]
          accumulator.push(...pointedActionInfo)
  
          return accumulator
        },
        []
      )
    },
  
  })
  
  export const mutations = mutationTree(state, {
    setVoteTypes(state, voteTypes: VoteTypes[]) {
        state.voteTypes = voteTypes
      },
    setActionLists(state, {actionLists, useVotedData}: {actionLists: ActionLists,
      useVotedData?: boolean}) {
      const defaultPoints = {
        point1: 1,
        point2: 1,
        point3: 1
      }
      const points = useVotedData ? {} : defaultPoints
  
      state.actionLists = actionLists.map((actionInfo) => ({
        ...actionInfo,
        ...points
      }))

      state.voteSections = state.voteTypes.map((voteType:VoteTypes) => {
        const actionLists = state.actionLists.reduce(
          (accumulator: ValueActionData[], currentValue) => {
            const actionList: ValueActionData = JSON.parse(
              JSON.stringify(currentValue)
            )
  
            // targetValueが同一だったらactionListに追加する
            if(voteType.targetValue === currentValue.valueAction.targetValues){
              accumulator.push(currentValue)
            }
            return accumulator
          },
          []
        )
        return {
          ...voteType,
          actionLists,
        }
      })
    },
    setVotedDataId(state, votedDataId: string) {
      state.votedDataId = votedDataId
    },
    setRange(state, range:VoteContent) {
      state.voteSections = state.voteSections.map((voteSection) => {
        const actionLists = voteSection.actionLists.map((action) => {
          const {
            point1,
            point2, 
            point3
          } = range
          const pointResult = action.id !== range.actionId ? {} : {
            point1,
            point2, 
            point3
          }
          return {
            ...action,
            ...pointResult
          } 
        })
        return {
          ...voteSection,
          actionLists
        }
        
      })
    }
  })
  
  export const actions = actionTree(
    { state, getters, mutations },
    {
      async getVotedData(): Promise<void> {
        const votedData = await firestore
          .collection('votes')
          .where('uid', '==', this.app.$accessor.login.userInfo.uid)
          .get()
        if (!votedData.empty) {
          const rawActionLists = votedData.docs[0].data()
          delete rawActionLists.uid
          let actionLists = [] as ActionLists
          for (let index = 0; index < Object.keys(rawActionLists).length; index++) {
            actionLists.push(rawActionLists[index]) 
          }
          console.log(actionLists)
  
          this.app.$accessor.votes.setActionLists({actionLists, useVotedData:true})
          this.app.$accessor.votes.setVotedDataId(votedData.docs[0].id)
        }
      },
      async getResult(): Promise<void> {
        const votedData = await firestore.collection('votes').get()
        const results = votedData.docs.reduce(
          (accumulater: any, currentValueBase: any) => {
            const currentValue = currentValueBase.data()
            delete currentValue.uid
            Object.keys(currentValue).forEach((key) => {
              if (!accumulater[key]) {
                accumulater[key] = [
                  {
                    memberId: currentValue[key],
                    count: 1,
                  },
                ]
              } else {
                let isMarged = false
                accumulater[key] = accumulater[key].reduce(
                  (acc: any, cur: any, i: number) => {
                    let { count } = cur
                    if (cur.memberId === currentValue[key]) {
                      count++
                      isMarged = true
                    }
                    acc.push({
                      ...cur,
                      count,
                    })
                    if (i + 1 === accumulater[key].length && !isMarged) {
                      acc.push({
                        memberId: currentValue[key],
                        count: 1,
                      })
                    }
                    // 降順でsort
                    acc.sort((a: any, b: any) => {
                      const aCount = a.count
                      const bCount = b.count
  
                      let comparison = 0
                      if (aCount < bCount) {
                        comparison = 1
                      } else if (aCount > bCount) {
                        comparison = -1
                      }
                      return comparison
                    })
                    return acc
                  },
                  []
                )
              }
            })
            return accumulater
          },
          {}
        )
  
        this.app.$accessor.votes.setResults(results)
      },
      /**
       * 獲得点数をまとめて投票結果を返す
       */
      async getActionsResult(): Promise<void> {
        const votedData = await firestore.collection('votes').get()
        // 全ての票を合算していく
        const results = votedData.docs.reduce(
          (accumulater: any, currentValueBase: any, int: number) => {
            const currentValue = currentValueBase.data()
            delete currentValue.uid
            
            // 全てのバリューアクションをそれぞれ合算していく
            Object.keys(currentValue).forEach((key) => {
              if(int === 0){
                accumulater[key] = 
                  {
                    actionId: currentValue[key].id,
                    title: currentValue[key].valueAction.title,
                    members: currentValue[key].members,
                    totalPoint: currentValue[key].point1 + 
                                currentValue[key].point2 + 
                                currentValue[key].point3 
                  }
              }else{
                accumulater[key].totalPoint = accumulater[key].totalPoint + currentValue[key].point1 + currentValue[key].point2 + currentValue[key].point3 
              }
            })
            return accumulater
          },
          {}
        )
  
        // 昇順でソート
        let sortResultsArray = Object.entries(results)
        // FIXME もっとやり方があるはず
        sortResultsArray.sort((a: any, b: any) => {
          const aTotalPoint = a[1].totalPoint
          const bTotalPoint = b[1].totalPoint
  
          let comparison = 0
          if (aTotalPoint < bTotalPoint) {
            comparison = 1
          } else if (aTotalPoint > bTotalPoint) {
            comparison = -1
          }
          return comparison
        })
  
        const sortResults = sortResultsArray.reduce((result, current, index) => {
          //@ts-ignore
          result[index] = current[1];
          return result;
        }, {});
        
        this.app.$accessor.votes.setResults2(sortResults)
      },
    }
  )
  