export const getTime = (time: number) => {
  return {
    seconds: `00${Math.floor(time % 60)}`.slice(-2),
    minutes: `00${Math.floor(time / 60)}`.slice(-2),
  }
}
