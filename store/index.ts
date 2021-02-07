import { getAccessorType } from 'typed-vuex'

import * as login from './login'
import * as votes from './votes'

export type RootState = ReturnType<
  typeof votes.state | typeof login.state
>

export const accessorType = getAccessorType({
  modules: {
    login,
    votes,
  },
})
