import { StoreAction } from '@application/types'
import downloadEpisodesReducer, {
  State as EpisodesState,
  initialState as episodesInitialState,
  actionTypes as EpisodesActionTypes,
} from './episodes'

export * from './episodes'

type State = {
  episodes: EpisodesState
}

const initialState = {
  episodes: episodesInitialState,
}

const downloadsReducer = (state = initialState, action: StoreAction): State => {
  switch (action.type) {
    case EpisodesActionTypes.DOWNLOAD_EPISODES_LOAD_ALL:
    case EpisodesActionTypes.DOWNLOAD_EPISODES_SET_ALL:
    case EpisodesActionTypes.DOWNLOAD_EPISODES_REQUEST:
    case EpisodesActionTypes.DOWNLOAD_EPISODES_SUCCESS:
    case EpisodesActionTypes.DOWNLOAD_EPISODES_FAILURE:
    case EpisodesActionTypes.DOWNLOAD_EPISODES_REMOVE_REQUEST:
    case EpisodesActionTypes.DOWNLOAD_EPISODES_REMOVE_SUCCESS:
    case EpisodesActionTypes.DOWNLOAD_EPISODES_REMOVE_FAILURE:
      return {
        ...state,
        episodes: downloadEpisodesReducer(state.episodes, action as any),
      }
    default:
      return state
  }
}

export default downloadsReducer
