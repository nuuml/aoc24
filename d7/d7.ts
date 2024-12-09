import { readToArray } from '../util/util'

const data: string[] = readToArray()

const womboCombo = (left: number, right: number): number =>
  parseInt(`${left}${right}`)

const checkValidityA = (
  goal: number,
  nums: number[],
  current: number
): number => {
  if (nums.length == 0) {
    return current === goal ? current : 0
  }
  if (current > goal) {
    return 0
  }
  if (current == 0) {
    return checkValidityA(goal, nums.slice(1), nums[0])
  }
  return checkValidityA(goal, nums.slice(1), current + nums[0]) == goal ||
    checkValidityA(goal, nums.slice(1), current * nums[0]) == goal
    ? goal
    : 0
}

const checkValidityB = (
  goal: number,
  nums: number[],
  current: number
): number => {
  if (nums.length == 0) {
    return current === goal ? current : 0
  }
  if (current > goal) {
    return 0
  }
  if (current == 0) {
    return checkValidityB(goal, nums.slice(1), nums[0])
  }
  return checkValidityB(goal, nums.slice(1), current + nums[0]) == goal ||
    checkValidityB(goal, nums.slice(1), current * nums[0]) == goal ||
    checkValidityB(goal, nums.slice(1), womboCombo(current, nums[0])) == goal
    ? goal
    : 0
}

let sumA = 0
let sumB = 0
data.forEach((row) => {
  const unjoined = row.split(':')
  const goal = parseInt(unjoined[0])
  const tools = unjoined[1]
    .split(' ')
    .slice(1)
    .map((num) => parseInt(num))
  sumA += checkValidityA(goal, tools, 0)
  sumB += checkValidityB(goal, tools, 0)
})
console.log('Part A', sumA)
console.log('Part B', sumB)
