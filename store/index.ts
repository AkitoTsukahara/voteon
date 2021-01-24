import { getAccessorType } from 'typed-vuex'

//import * as detailViewer from './detailViewer' // ファイル名で`modules`に登録されてるようなので、ファイル名も(キモいけど)キャメルケースのほうがよさそう
import * as login from './login'
//import * as votes from './votes'

// export type RootState = ReturnType<
//   typeof votes.state | typeof detailViewer.state | typeof login.state
// >

export const accessorType = getAccessorType({
  modules: {
    //detailViewer,
    login,
    //votes,
  },
})
