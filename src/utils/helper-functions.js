/**
 * Created by Drita Shujaku on 21/11/2019
 */

export const truncate = (string = '', length) => {
  return string.length > length ? string.substr(0, length).trim() + '...' : string
}

export const capitalize = (text) => {
  let [first, ...rest] = text
  return first.toUpperCase() + rest.join("")
}

export const isArrayEqual = (a, b) => {
  if (a.length !== b.length) {
    return false
  } else if (JSON.stringify(a) !== JSON.stringify(b)) {
    return false
  }
  return true
}