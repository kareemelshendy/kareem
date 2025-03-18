export const formatTime = (seconds: number) => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  if (hours > 0) {
    return [hours, minutes, secs]
      .map((v) => `0${v}`.slice(-2))
      .join(":");
  } else {
    return [minutes, secs]
      .map((v) => `0${v}`.slice(-2))
      .join(":");
  }
}
