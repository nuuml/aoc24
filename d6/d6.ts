import { readToArray } from '../util/util'

const data = readToArray()

const findOurGirl = () : number[] => {
    let ourGirl: number[] | null = null
    for ( let i = 0; i < data.length; i++ ) {
        for ( let j = 0; j < data[i].length; j++ ){
            if (data[i][j] === '^') {
                ourGirl = [i, j]
                break
            }
            if (ourGirl) break
        }
        if (ourGirl) break
    }
    return ourGirl ?? []
}

const goAmblin = (i: number, j: number, inField: string[][]) => {
    let field = inField.map(row => [...row])
    let directions = {
        'V': [ 1,  0, '<'],
        '<': [ 0, -1, '^'],
        '^': [-1,  0, '>'],
        '>': [ 0,  1, 'V']
    }
    const isNewPosLegal = (newI: number, newJ: number) => newI >= 0 && newI < field.length && newJ >= 0 && newJ < field[i].length

    let currentDirection = field[i][j]
    field[i][j] = 'X'
    let sum = [[i,j]]
    while (i >= 0 && j >= 0 && i < field.length && j < field[i].length) {
        let potentialI = i + directions[currentDirection][0]
        let potentialJ = j + directions[currentDirection][1]
        if (isNewPosLegal(potentialI, potentialJ)){
            if (field[i][j] === '.') {
                field[i][j] = 'X'
                sum.push([i,j])
            }
            while (isNewPosLegal(potentialI, potentialJ) && field[potentialI][potentialJ] === '#') {
                currentDirection = directions[currentDirection][2]
                potentialI = i + directions[currentDirection][0]
                potentialJ = j + directions[currentDirection][1]
            }
        } else {
            if (field[i][j] !== 'X') {
                field[i][j] = 'X'
                sum.push([i,j])
            }
        }
        i = potentialI
        j = potentialJ
    }
    return sum
}

const isSlice = (subset: number[][], superset: number[][]) => {
    for (let i = 0; i <= superset.length - subset.length; i++) {
        if (subset.every((val, idx) => val === superset[i + idx])) {
            return true
        }
    }
    return false
}

const goAmblinWithLoops = (i: number, j: number, inField: string[][], print = false) => {
    let field = inField.map(row => [...row])
    let foundLoop = false

    const directions = {
        'V': [1, 0, '<'],
        '<': [0, -1, '^'],
        '^': [-1, 0, '>'],
        '>': [0, 1, 'V'],
    }

    const isNewPosLegal = (newI: number, newJ: number) =>
        newI >= 0 && newI < field.length && newJ >= 0 && newJ < field[0].length

    let currentDirection = field[i][j];
    field[i][j] = 'X'

    const visitedStates = new Set<string>()
    visitedStates.add(`${i},${j},${currentDirection}`)

    while (i >= 0 && j >= 0 && i < field.length && j < field[0].length) {
        let potentialI = i + directions[currentDirection][0]
        let potentialJ = j + directions[currentDirection][1]

        if (isNewPosLegal(potentialI, potentialJ)) {
            if (field[potentialI][potentialJ] === '#') {
                currentDirection = directions[currentDirection][2]
                continue
            }

            if (field[potentialI][potentialJ] === '.') {
                field[potentialI][potentialJ] = 'X'
            }
        }

        const newState = `${potentialI},${potentialJ},${currentDirection}`
        if (visitedStates.has(newState)) {
            foundLoop = true
            break
        }

        visitedStates.add(newState)

        i = potentialI
        j = potentialJ
    }
    if (print) console.log(visitedStates)
    return foundLoop
}



const startingPoint = findOurGirl()
const originalPath = goAmblin(startingPoint[0], startingPoint[1], [...data])
console.log('Part A', originalPath.length)

const dayta:string[][] = []
data.forEach((row) => dayta.push([...row]))
let sum = 0
let printCoordsBad = []
let printCoordsGood = []
for (let y = 1; y < originalPath.length; y++){
    dayta[originalPath[y][0]][originalPath[y][1]] = '#'
    if (goAmblinWithLoops(startingPoint[0], startingPoint[1], [...dayta])) sum ++
    dayta[originalPath[y][0]][originalPath[y][1]] = data[originalPath[y][0]][originalPath[y][1]]
}
console.log('Part B', sum)
