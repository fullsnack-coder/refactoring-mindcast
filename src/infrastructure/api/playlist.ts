import { Playlist, Podcast } from '@application/types'
import { playlists as mockedPlaylists, podcasts } from '../mock/apiData'

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
  const createdPlaylist = await Promise.resolve({
    ...mockedPlaylists[0],
    id: mockedPlaylists[0].id + 1,
    name: playlist.name,
    podcasts: [],
  })
  return createdPlaylist
}

export type UpdatePlaylist = Omit<
  Playlist,
  'createdAt' | 'podcasts' | 'ownerId'
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

export const addPodcastToPlaylist = async (
  playlistId: Playlist['id'],
  podcastId: string,
): Promise<Podcast> => {
  const addedPodcast = await Promise.resolve(podcasts[0])
  return addedPodcast
}

export const removePodcastFromPlaylist = async (
  playlistId: Playlist['id'],
  podcastId: string,
): Promise<Podcast> => {
  const removedPodcast = await Promise.resolve(podcasts[0])
  return removedPodcast
}
