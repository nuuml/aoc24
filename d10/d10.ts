import { readToArray } from '../util/util'

const data = readToArray()

const traverseA = (
  currentLocation: number[],
  field: string[][],
  visited: boolean[][]
): number => {
  const [x, y] = currentLocation
  if (!field[x][y] || visited[x][y]) {
    return 0
  }

  visited[x][y] = true

  const currentHeight = parseInt(field[x][y])
  if (currentHeight === 9) {
    return 1
  }

  const goal = currentHeight + 1
  const neighbors = [
    [x - 1, y],
    [x + 1, y],
    [x, y - 1],
    [x, y + 1],
  ]

  let score = 0
  for (const [nx, ny] of neighbors) {
    if (
      nx >= 0 &&
      nx < field.length &&
      ny >= 0 &&
      ny < field[0].length &&
      parseInt(field[nx][ny]) === goal
    ) {
      score += traverseA([nx, ny], field, visited)
    }
  }

  visited[x][y] = false
  return score
}

const traverseB = (currentLocation: number[], field: string[][]): number => {
  if (!field[currentLocation[0]][currentLocation[1]]) {
    return 0
  }

  const goal = parseInt(field[currentLocation[0]][currentLocation[1]]) + 1
  const uLegal = currentLocation[0] - 1 >= 0
  const u = [
    uLegal ? parseInt(field[currentLocation[0] - 1][currentLocation[1]]) : -1,
    currentLocation[0] - 1,
    currentLocation[1],
  ]
  const dLegal = currentLocation[0] + 1 < field.length
  const d = [
    dLegal ? parseInt(field[currentLocation[0] + 1][currentLocation[1]]) : -1,
    currentLocation[0] + 1,
    currentLocation[1],
  ]
  const lLegal = currentLocation[1] - 1 >= 0
  const l = [
    lLegal ? parseInt(field[currentLocation[0]][currentLocation[1] - 1]) : -1,
    currentLocation[0],
    currentLocation[1] - 1,
  ]
  const rLegal = currentLocation[1] + 1 < field[0].length
  const r = [
    rLegal ? parseInt(field[currentLocation[0]][currentLocation[1] + 1]) : -1,
    currentLocation[0],
    currentLocation[1] + 1,
  ]
  if (field[currentLocation[0]][currentLocation[1]] === '9') {
    return 1
  }
  return (
    (u[0] === goal ? traverseB([u[1], u[2]], field) : 0) +
    (d[0] === goal ? traverseB([d[1], d[2]], field) : 0) +
    (l[0] === goal ? traverseB([l[1], l[2]], field) : 0) +
    (r[0] === goal ? traverseB([r[1], r[2]], field) : 0)
  )
}

const trailHeads: number[][] = []
for (let i = 0; i < data.length; i++) {
  for (let j = 0; j < data[i].length; j++) {
    if (data[i][j] === '0') trailHeads.push([i, j])
  }
}

let sumA = 0
let sumB = 0

trailHeads.forEach((start) => {
  const visited = Array.from({ length: data.length }, () =>
    Array(data[0].length).fill(false)
  )
  sumA += traverseA(start, data, visited)
  sumB += traverseB(start, data)
})

console.log('Part A', sumA)
console.log('Part B', sumB)
