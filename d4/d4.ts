import { readToArray } from "../util/util"

const data = readToArray()

const findXMAS = (i: number, j: number) => {
    let result = 0
    let goLeft = (j - 3 >= 0)
    let goRight = (j + 3 < data[i].length)
    let goUp = (i - 3 >= 0) 
    let goDown = (i + 3 < data.length) 
    if (goLeft) {
        if (data[i][j-1] === 'M' && data[i][j-2] === 'A' && data[i][j-3] === 'S') result ++
        if (goUp){
            if (data[i-1][j-1] === 'M' && data[i-2][j-2] === 'A' && data[i-3][j-3] === 'S') result ++
        }
        if (goDown) {
            if (data[i+1][j-1] === 'M' && data[i+2][j-2] === 'A' && data[i+3][j-3] === 'S') result ++
        }
    }
    if (goRight) {
        if (data[i][j+1] === 'M' && data[i][j+2] === 'A' && data[i][j+3] === 'S') result ++
        if (goUp){
            if (data[i-1][j+1] === 'M' && data[i-2][j+2] === 'A' && data[i-3][j+3] === 'S') result ++
        }
        if (goDown) {
            if (data[i+1][j+1] === 'M' && data[i+2][j+2] === 'A' && data[i+3][j+3] === 'S') result ++
        }
    }
    if (goUp){
        if (data[i-1][j] === 'M' && data[i-2][j] === 'A' && data[i-3][j] === 'S') result ++
    }
    if (goDown){
        if (data[i+1][j] === 'M' && data[i+2][j] === 'A' && data[i+3][j] === 'S') result ++
    }
    return result
}

const findX_MAS = (i: number, j: number) => {
    let result = 0
    let canCheck = (i - 1 >= 0 && i + 1 < data.length && j - 1 >= 0 && j +1 < data[i].length)
    if (canCheck) {
        const ul = data[i-1][j-1]
        const ur = data[i-1][j+1]
        const dl = data[i+1][j-1]
        const dr = data[i+1][j+1]

        if ((ul === ur && dl === dr && ur !== dl && ((ur === 'M' && dr === 'S') || (ur === 'S' && dr === 'M'))) || (ul === dl && ur === dr && ur !== ul) && ((ul ==='M' && ur ==='S') || ( ul === 'S' && ur === 'M'))) result++
    }
    return result
}

let sumA = 0
let sumB = 0
for (let i = 0; i < data.length; i++) {
    for (let j = 0; j < data[i].length; j++) {
        if (data[i][j] === 'X') {
            sumA += findXMAS(i, j)
        } else if (data[i][j] === 'A') {
            sumB += findX_MAS(i, j)
        }
    }
}


console.log('Part A', sumA)

console.log('Part B', sumB)