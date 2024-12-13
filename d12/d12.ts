import { readToArray } from '../util/util'

let field = readToArray().map((row) => row.split(''))
let sumA = 0
let sumB = 0

const plotRegion = (i: number, j: number): number => {
  const initial = countChar('-')
  let visited: string[] = []
  let queue = [[i, j]]
  let mark = field[i][j]
  field[i][j] = '-'

  let edgeCount = 0
  while (queue.length > 0) {
    let current = queue.pop()!
    if (!current) break
    if (!visited.includes(`${current[0]},${current[1]}`)) {
      if (current[0] > 0) {
        let up = field[current[0] - 1][current[1]]
        if (up === mark) {
          queue.push([current[0] - 1, current[1]])
        } else if (!visited.includes(`${current[0] - 1},${current[1]}`)) {
          edgeCount++
        }
      } else {
        edgeCount++
      }
      if (current[0] < field.length - 1) {
        let down = field[current[0] + 1][current[1]]
        if (down === mark) {
          queue.push([current[0] + 1, current[1]])
        } else if (!visited.includes(`${current[0] + 1},${current[1]}`)) {
          edgeCount++
        }
      } else {
        edgeCount++
      }
      if (current[1] > 0) {
        let left = field[current[0]][current[1] - 1]
        if (left === mark) {
          queue.push([current[0], current[1] - 1])
        } else if (!visited.includes(`${current[0]},${current[1] - 1}`)) {
          edgeCount++
        }
      } else {
        edgeCount++
      }
      if (current[1] < field[0].length - 1) {
        let right = field[current[0]][current[1] + 1]
        if (right === mark) {
          queue.push([current[0], current[1] + 1])
        } else if (!visited.includes(`${current[0]},${current[1] + 1}`)) {
          edgeCount++
        }
      } else {
        edgeCount++
      }
      field[current[0]][current[1]] = '-'
      visited.push(`${current[0]},${current[1]}`)
    }
  }
  let area = countChar('-') - initial

  return edgeCount * area
}
const checkDiags = (loc: number[], visited: string[]): number => {
  const i = loc[0]
  const j = loc[1]
  let resp = 0
  if (i > 0 && j > 0) {
    if (
      field[i][j] !== field[i - 1][j - 1] &&
      (field[i][j] === field[i][j - 1] || visited.includes(`${i},${j - 1}`)) &&
      (field[i][j] === field[i - 1][j] || visited.includes(`${i - 1},${j}`)) &&
      !visited.includes(`${i - 1},${j - 1}`)
    )
      resp++
  }
  if (i > 0 && j < field[0].length - 1) {
    if (
      field[i][j] !== field[i - 1][j + 1] &&
      (field[i][j] === field[i][j + 1] || visited.includes(`${i},${j + 1}`)) &&
      (field[i][j] === field[i - 1][j] || visited.includes(`${i - 1},${j}`)) &&
      !visited.includes(`${i - 1},${j + 1}`)
    )
      resp++
  }
  if (i < field.length - 1 && j > 0) {
    if (
      field[i][j] !== field[i + 1][j - 1] &&
      (field[i][j] === field[i][j - 1] || visited.includes(`${i},${j - 1}`)) &&
      (field[i][j] === field[i + 1][j] || visited.includes(`${i + 1},${j}`)) &&
      !visited.includes(`${i + 1},${j - 1}`)
    )
      resp++
  }
  if (i < field.length - 1 && j < field[0].length - 1) {
    if (
      field[i][j] !== field[i + 1][j + 1] &&
      (field[i][j] === field[i][j + 1] || visited.includes(`${i},${j + 1}`)) &&
      (field[i][j] === field[i + 1][j] || visited.includes(`${i + 1},${j}`)) &&
      !visited.includes(`${i + 1},${j + 1}`)
    )
      resp++
  }
  return resp
}
const plotRegionB = (i: number, j: number): number => {
  const initial = countChar('-')
  let visited: string[] = []
  let corners = 0
  let queue = [[i, j]]
  let mark = field[i][j]
  field[i][j] = '-'

  while (queue.length > 0) {
    let edgeCount = 0

    let lEdge = false
    let rEdge = false
    let uEdge = false
    let dEdge = false
    let current = queue.pop()!
    if (!current) break
    if (!visited.includes(`${current[0]},${current[1]}`)) {
      if (current[0] > 0) {
        let up = field[current[0] - 1][current[1]]
        if (up === mark) {
          queue.push([current[0] - 1, current[1]])
        } else if (!visited.includes(`${current[0] - 1},${current[1]}`)) {
          edgeCount++
          uEdge = true
        }
      } else {
        uEdge = true
        edgeCount++
      }
      if (current[0] < field.length - 1) {
        let down = field[current[0] + 1][current[1]]
        if (down === mark) {
          queue.push([current[0] + 1, current[1]])
        } else if (!visited.includes(`${current[0] + 1},${current[1]}`)) {
          edgeCount++
          dEdge = true
        }
      } else {
        dEdge = true
        edgeCount++
      }
      if (current[1] > 0) {
        let left = field[current[0]][current[1] - 1]
        if (left === mark) {
          queue.push([current[0], current[1] - 1])
        } else if (!visited.includes(`${current[0]},${current[1] - 1}`)) {
          edgeCount++
          lEdge = true
        }
      } else {
        lEdge = true
        edgeCount++
      }
      if (current[1] < field[0].length - 1) {
        let right = field[current[0]][current[1] + 1]
        if (right === mark) {
          queue.push([current[0], current[1] + 1])
        } else if (!visited.includes(`${current[0]},${current[1] + 1}`)) {
          edgeCount++
          rEdge = true
        }
      } else {
        edgeCount++
        rEdge = true
      }
      let newChar = '-'
      if (lEdge && rEdge && uEdge && dEdge) {
        corners += 4
      } else if (lEdge && rEdge && uEdge) {
        corners += 2
      } else if (lEdge && rEdge && dEdge) {
        corners += 2
      } else if (lEdge && dEdge && uEdge) {
        corners += 2
      } else if (dEdge && rEdge && uEdge) {
        corners += 2
      } else if (lEdge && uEdge) {
        corners++
      } else if (lEdge && dEdge) {
        corners++
      } else if (uEdge && rEdge) {
        corners++
      } else if (dEdge && rEdge) {
        corners++
      }
      let diags = checkDiags(current, visited)
      corners += diags
      if (diags > 0) console.log('diagonals')

      console.log(mark, current[0], current[1], 'new corners total', corners)
      field[current[0]][current[1]] = newChar
      visited.push(`${current[0]},${current[1]}`)
    }
  }

  let area = countChar('-') - initial

  return corners * area
}

const countChar = (goal): number =>
  field.reduce(
    (acc, arr) =>
      acc + arr.reduce((cumul, char) => (char === goal ? cumul + 1 : cumul), 0),
    0
  )
for (let i = 0; i < field.length; i++) {
  for (let j = 0; j < field[i].length; j++) {
    if (field[i][j] !== '-') {
      sumA += plotRegion(i, j)
    }
  }
}
field = readToArray().map((row) => row.split(''))
for (let i = 0; i < field.length; i++) {
  for (let j = 0; j < field[i].length; j++) {
    if (field[i][j] !== '-') {
      sumB += plotRegionB(i, j)
    }
  }
}
console.log('Part A', sumA)

console.log('Part B', sumB)
