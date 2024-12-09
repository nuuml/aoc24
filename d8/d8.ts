import { readToArray } from '../util/util'

interface Node {
  row: number
  column: number
}

interface NodeMap {
  [key: string]: Node[]
}

const isInBounds = (
  node: Node,
  rowLimit: number,
  columnLimit: number
): boolean =>
  node.row >= 0 &&
  node.column >= 0 &&
  node.column < columnLimit &&
  node.row < rowLimit
const getTheAntiNodes = (
  antennae: Node[],
  rowLimit: number,
  columnLimit: number
): Set<string> => {
  let sum: Set<string> = new Set()
  for (let i = 0; i < antennae.length - 1; i++) {
    for (let j = i + 1; j < antennae.length; j++) {
      const rowDifference = antennae[j].row - antennae[i].row
      const columnDifference = antennae[j].column - antennae[i].column
      if (
        isInBounds(
          {
            row: antennae[i].row - rowDifference,
            column: antennae[i].column - columnDifference,
          },
          rowLimit,
          columnLimit
        )
      )
        sum.add(
          `${antennae[i].row - rowDifference},${
            antennae[i].column - columnDifference
          }`
        )
      if (
        isInBounds(
          {
            row: antennae[j].row + rowDifference,
            column: antennae[j].column + columnDifference,
          },
          rowLimit,
          columnLimit
        )
      )
        sum.add(
          `${antennae[j].row + rowDifference},${
            antennae[j].column + columnDifference
          }`
        )
    }
  }
  console.log(`${sum} are valid`)
  return sum
}
const getTheMoreAntiNodes = (
  antennae: Node[],
  rowLimit: number,
  columnLimit: number
): Set<string> => {
  let sum: Set<string> = new Set()
  for (let i = 0; i < antennae.length - 1; i++) {
    for (let j = i + 1; j < antennae.length; j++) {
      const rowDifference = antennae[j].row - antennae[i].row
      const columnDifference = antennae[j].column - antennae[i].column
      let r = antennae[i].row
      let c = antennae[i].column
      while (isInBounds({ row: r, column: c }, rowLimit, columnLimit)) {
        sum.add(`${r},${c}`)
        r -= rowDifference
        c -= columnDifference
      }
      r = antennae[j].row
      c = antennae[j].column
      while (isInBounds({ row: r, column: c }, rowLimit, columnLimit)) {
        sum.add(`${r},${c}`)
        r += rowDifference
        c += columnDifference
      }
    }
  }
  return sum
}
const data = readToArray()

const nodes: NodeMap = {}

for (let i = 0; i < data.length; i++) {
  for (let j = 0; j < data[i].length; j++) {
    if (data[i][j] !== '.') {
      if (nodes[data[i][j]]) {
        nodes[data[i][j]].push({
          row: i,
          column: j,
        })
      } else {
        nodes[data[i][j]] = [
          {
            row: i,
            column: j,
          },
        ]
      }
    }
  }
}
let sumA: Set<string> = new Set()
let sumB: Set<string> = new Set()
Object.keys(nodes).forEach((key) => {
  getTheAntiNodes(nodes[key], data.length, data[0].length).forEach((node) =>
    sumA.add(node)
  )
  getTheMoreAntiNodes(nodes[key], data.length, data[0].length).forEach((node) =>
    sumB.add(node)
  )
})

console.log('Part A', sumA.size)
console.log('Part B', sumB.size)
