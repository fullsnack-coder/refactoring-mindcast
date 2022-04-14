import { StoreAction } from '@application/types'
import recenltyPlayedReducer, {
  State as RecentlyPlayedState,
  actionTypes,
  initialState as RecentlyInitialState,
  Payload as RecentlyPayloads,
} from './recently-played'

type EpisodesState = {
  recentlyPlayed: RecentlyPlayedState
}

const initialState: EpisodesState = {
  recentlyPlayed: RecentlyInitialState,
}

const episodesReducer = (
  state = initialState,
  action: StoreAction,
): EpisodesState => {
  switch (action.type) {
    case actionTypes.RECENTLY_PLAYED_ADD_EPISODE_START:
    case actionTypes.RECENTLY_PLAYED_ADD_EPISODE_START:
    case actionTypes.RECENTLY_PLAYED_ADD_EPISODE_SUCCESS:
    case actionTypes.RECENTLY_PLAYED_LOAD_LIST_COMPLETE:
    case actionTypes.RECENTLY_PLAYED_LOAD_LIST_ERROR:
    case actionTypes.RECENTLY_PLAYED_ADD_EPISODE_FAILURE:
      return {
        ...state,
        recentlyPlayed: recenltyPlayedReducer(
          state.recentlyPlayed,
          action as StoreAction<RecentlyPayloads>,
        ),
      }
    default:
      return state
  }
}

export default episodesReducer
