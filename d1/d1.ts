import { readToArray } from "../util/util"

const lines: string[] = readToArray()
const columnA: number[] = []
const columnB: number[] = []
let sum = 0
let counter = 0
lines.forEach((line:string) =>  {
    columnA.push(parseInt(line.split('  ')[0]))
    columnB.push(parseInt(line.split('  ')[1]))
})

columnA.sort((a, b) => a - b)
columnB.sort((a, b) => a - b)

for ( let i = 0; i < columnA.length; i++ ){
    sum += Math.abs(columnA[i] - columnB[i])
}

console.log("Part A", sum)
sum = 0

columnA.forEach((num:number) => {
    let cont = true
    while( cont ) {
        const x = columnB.indexOf(num)
        if (x > -1) {
            columnB.splice(x, 1)
            counter ++
        } else {
            sum += counter * num
            counter = 0
            cont = false
        }
    }
})

console.log("Part B", sum)