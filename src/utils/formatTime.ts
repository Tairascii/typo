export const formatTime = (minute: number, second: number): string => {
  let formattedTime = ''
  if (minute && minute.toString().length === 1) {
    formattedTime += `0${minute} : `
  } else if (minute) {
    formattedTime += `${minute} : `
  }

  if (second.toString().length === 1 && minute) {
    formattedTime += `0${second}`
  } else {
    formattedTime += `${second}`
  }

  return formattedTime
}
