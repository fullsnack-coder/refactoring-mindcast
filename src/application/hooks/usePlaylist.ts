import { useAppSelector } from '@application/hooks/store'
import { Playlist } from '@application/types'
import { getPlaylist } from '@infrastructure/api/playlist'
import { useEffect, useState } from 'react'

type Opts = {
  playlistId: string
}

const usePlaylist = ({ playlistId }: Opts) => {
  const [playlist, setPlaylist] = useState<Playlist | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [storedPlaylist] = useAppSelector(state => {
    return state.playlists.playlists.filter(plst => plst.id === playlistId)
  })

  useEffect(() => {
    if (storedPlaylist) {
      setPlaylist(storedPlaylist)
    } else {
      setIsLoading(true)
      getPlaylist(playlistId)
        .then(playlist => {
          setPlaylist(playlist)
          setIsLoading(false)
        })
        .catch(reason => {
          setError(reason)
          setIsLoading(false)
        })
    }
  }, [storedPlaylist, playlistId])

  return {
    playlist,
    isLoading,
    error,
  }
}

export default usePlaylist
