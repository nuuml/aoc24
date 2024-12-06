import { readToArray } from "../util/util"
let sum = 0
let mullist:RegExpExecArray[] = []
const data = readToArray()
const pattern = /mul\((\d+),(\d+)\)/g

const findMuls = (line:string) : RegExpExecArray[] => [...line.matchAll(pattern)]

const removeDonts = (line:string) : string => {
    let result = line
    while (result.includes("don't()")){
        const dontStart = result.indexOf("don't()")
        const nextDo = result.indexOf("do()", dontStart)
        if (nextDo === -1) {
            result = result.slice(0, dontStart)
            break
        }
        result = result.slice(0, dontStart) + result.slice(nextDo + "do()".length)
    }

    return result
}

data.forEach((line) => mullist = [...mullist, ...findMuls(line)])

mullist.forEach((mul) => sum += parseInt(mul[1]) * parseInt(mul[2]))

console.log('Part A', sum)

sum = 0

const onlyDos = data.map((line) => removeDonts(line))

let minimizedMullist:RegExpExecArray[] = []

onlyDos.forEach((line) => minimizedMullist = [...minimizedMullist, ...findMuls(line)])

minimizedMullist.forEach((mul) => sum += parseInt(mul[1]) * parseInt(mul[2]))

console.log('Part B', sum)