export type LibraryOption = {
  label: string
  iconName: string
  route: any
}

export function getLibraryOptions(): LibraryOption[] {
  return [
    { label: 'Playlist', iconName: 'playlist-play', route: 'playlistsStack' },
    // { label: 'Your Podcasts', iconName: 'podcast', route: 'your-podcasts' }, // TODO: make the real use case to implement this option
    {
      label: 'Downloads',
      iconName: 'cloud-download-outline',
      route: 'downloads',
    },
    {
      label: 'Recently Played',
      iconName: 'clock-time-four-outline',
      route: 'recently-played',
    },
    { label: 'Interests', iconName: 'playlist-check', route: 'your-interests' },
  ]
}
