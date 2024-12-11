import { readToArray } from '../util/util'

const data = readToArray()[0]

const processStone = (stone: string, cache: Map<string, string>): string => {
  let ret = ''
  if (cache.get(stone) !== undefined) {
    return cache.get(stone)!
  }
  if (parseInt(stone) === 0) {
    ret = '1'
  } else if (stone.length % 2 === 0) {
    ret = `${parseInt(stone.slice(0, stone.length / 2))} ${parseInt(
      stone.slice(stone.length / 2)
    )}`
  } else ret = `${parseInt(stone) * 2024}`
  cache.set(stone, ret)
  return ret
}

const blink = (lineOfStones: string, times: number) => {
  const holder = new Map<string, string>()
  let workingList = lineOfStones
  for (let i = 1; i <= times; i++) {
    workingList = workingList
      .split(' ')
      .map((stone) => processStone(stone, holder))
      .join(' ')
  }
  return workingList
}

console.log('Part A', blink(data, 25).split(' ').length)
console.log('Part B', blink(data, 75).split(' ').length)
