import { readToArray } from '../util/util'

interface Phile {
  value: number | string
  startingPosition: number
  length: number
}

const input = readToArray()[0].split('')
//const input = '2333133121414131402'
let visualization: string[] = []
let even = true
let cursor = 0
let gaps: Phile[] = []
let files: Phile[] = []
let prevWasGap = false
for (let i = 0; i < input.length; i++) {
  const len = parseInt(input[i])
  if (even) {
    if (len > 0)
      files.push({
        value: cursor,
        startingPosition: visualization.length,
        length: len,
      })
    visualization.push(...Array(len).fill(String(cursor)))
    cursor++
    prevWasGap = false
  } else {
    if (prevWasGap) {
      gaps[gaps.length - 1].length += len
    } else {
      if (len > 0)
        gaps.push({
          value: '.',
          startingPosition: visualization.length,
          length: len,
        })
    }
    visualization.push(...Array(len).fill('.'))
    prevWasGap = true
  }
  even = !even
}

let leftP = 0
let rightP = visualization.length - 1

while (leftP < rightP) {
  while (rightP >= 0 && visualization[rightP] === '.') {
    rightP--
  }
  while (leftP < visualization.length && visualization[leftP] !== '.') {
    leftP++
  }
  if (leftP < rightP) {
    visualization[leftP] = visualization[rightP]
    visualization[rightP] = '.'
  }
}

const checkForContinuousGaps = (ep: number) => {
  for (let p = 0; p < gaps.length; p++) {
    if (gaps[p].startingPosition === ep + 1) {
      return p
    }
  }
  return 0
}

for (let i = files.length - 1; i >= 0; i--) {
  let j = 0

  while (j < gaps.length) {
    if (gaps[j].startingPosition < files[i].startingPosition) {
      if (files[i].length === gaps[j].length) {
        let keep = files[i].startingPosition
        files[i].startingPosition = gaps[j].startingPosition
        gaps[j].startingPosition = keep
        let nextCheck = checkForContinuousGaps(
          gaps[j].startingPosition + gaps[j].length
        )
        while (nextCheck !== 0) {
          gaps[j].length = gaps[j].length + gaps[nextCheck].length
          gaps.splice(nextCheck, 1)
          nextCheck = checkForContinuousGaps(
            gaps[j].startingPosition + gaps[j].length
          )
        }
        j = gaps.length
      } else if (files[i].length < gaps[j].length) {
        let keep = files[i].startingPosition
        files[i].startingPosition = gaps[j].startingPosition
        gaps[j].length = gaps[j].length - files[i].length
        gaps[j].startingPosition = gaps[j].startingPosition + files[i].length
        gaps.push({
          startingPosition: keep,
          length: files[i].length,
          value: '.',
        })
        let nextCheck = checkForContinuousGaps(
          gaps[j].startingPosition + gaps[j].length
        )
        while (nextCheck !== 0) {
          gaps[j].length = gaps[j].length + gaps[nextCheck].length
          gaps.splice(nextCheck, 1)
          nextCheck = checkForContinuousGaps(
            gaps[j].startingPosition + gaps[j].length
          )
        }
        j = gaps.length
      }
    }
    j++
  }
}

let defragged = [...gaps, ...files].sort(
  (a, b) => a.startingPosition - b.startingPosition
)
let newVisualization: string[] = []

defragged.forEach((section) => {
  newVisualization.push(...Array(section.length).fill(String(section.value)))
})

let sum = 0
for (let i = 0; i < visualization.length; i++) {
  if (visualization[i] !== '.') sum += i * parseInt(visualization[i])
}
console.log('Part A', sum)
sum = 0
for (let i = 0; i < newVisualization.length; i++) {
  if (newVisualization[i] !== '.') sum += i * parseInt(newVisualization[i])
}

console.log('Part B', sum)
