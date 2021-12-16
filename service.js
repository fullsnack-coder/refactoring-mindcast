const { default: TrackPlayer } = require('react-native-track-player')

module.exports = async function () {
  TrackPlayer.addEventListener('remote-pause', () => TrackPlayer.pause())
  TrackPlayer.addEventListener('remote-play', () => TrackPlayer.play())
  TrackPlayer.addEventListener('remote-next', () => TrackPlayer.skipToNext())
  TrackPlayer.addEventListener('remote-previous', () =>
    TrackPlayer.skipToPrevious(),
  )
  TrackPlayer.addEventListener('remote-stop', () => TrackPlayer.stop())
  TrackPlayer.addEventListener('remote-seek', data =>
    TrackPlayer.seekTo(data.position),
  )
}
