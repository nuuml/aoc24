import { readToArray } from "../util/util"

const safetyCheck = (arr: number[], allowBuffer: boolean = false): boolean => {
    const isSafe = (array: number[]): boolean => {
        let prev = array[0]
        let inc = array[1] > array[0] 
        for (let i = 1; i < array.length; i++) {
            const num = array[i]
            if (Math.abs(num - prev) < 1 || Math.abs(num - prev) > 3 || (inc && num < prev) || (!inc && num > prev)) {
                return false
            }
            prev = num
        }
        return true
    }

    if (isSafe(arr)) return true
    
    if (allowBuffer)
        for (let i = 0; i < arr.length; i++) {
            const reducedArray = arr.slice(0, i).concat(arr.slice(i + 1))
            if (isSafe(reducedArray)) {
                return true
            }
        }

    return false 
}


const lines = readToArray().map((line) => line.split(' ').map((num) => parseInt(num)))
let sum = 0
lines.forEach((line) => {
    if (safetyCheck(line)) 
        sum ++
})
console.log("Part A",sum)
sum = 0 
lines.forEach((line) => {
    if (safetyCheck(line, true)) 
        sum ++

})
console.log("Part B",sum)