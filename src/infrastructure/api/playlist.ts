import { Playlist } from '@application/types'
import { playlists as mockedPlaylists } from '../mock/apiData'

export const getPlaylists = async (userId: string): Promise<Playlist[]> => {
  const playlists = await Promise.resolve(mockedPlaylists)
  return playlists
}

export const getPlaylist = async (playlistId: string): Promise<Playlist> => {
  const playlist = await Promise.resolve(mockedPlaylists[0])
  return playlist
}

export type CreatePlaylist = Omit<Playlist, 'id' | 'createdAt' | 'podcasts'>

export const createPlaylist = async (
  playlist: CreatePlaylist,
): Promise<Playlist> => {
  const createdPlaylist = await Promise.resolve(mockedPlaylists[0])
  return createdPlaylist
}

export type UpdatePlaylist = Omit<
  Playlist,
  'id' | 'createdAt' | 'podcasts' | 'ownerId'
>

export const updatePlaylist = async (
  playlist: UpdatePlaylist,
): Promise<Playlist> => {
  const updatedPlaylist = await Promise.resolve(mockedPlaylists[0])
  return updatedPlaylist
}

export const deletePlaylist = async (playlistId: string): Promise<void> => {
  return Promise.resolve()
}
