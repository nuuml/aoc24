import { readToArray } from '../util/util'

interface Rule {
    before : number[]
}
const ruleBook: { [key: number] : Rule } = {}
const data = readToArray()
const split = data.indexOf('') + 1
const rules = data.slice(0,split-1).map((line) => line.split('|').map((item) => parseInt(item)))
const books = data.slice(split).map((line) => line.split(',').map((item) => parseInt(item)))
let sumA = 0
let sumB = 0

const checkValidity = (book : number[]) => {
    let valid = true
    for (let p = 0; p < book.length - 1; p++) {
        rules.forEach((rule) => {
            if (rule[1] === book[p] && rule[0] === book[p+1]) {
                valid = false
            }
        })
    }
    return valid
}

const fixIt = (book: number[]) => {
    for (let p = 0; p < book.length - 1; p++) {
        rules.forEach((rule) => {
            if (rule[1] === book[p] && rule[0] === book[p+1]) {
                const keeper = book[p]
                book[p] = book[p+1]
                book[p+1] = keeper
                fixIt(book)
            }
        })
    }
    return book
}


for (let i = 0; i < books.length; i++) {
    if (checkValidity(books[i])) {
        sumA += books[i][Math.floor(books[i].length /2)]
    } else {
        fixIt(books[i])
        sumB += books[i][Math.floor(books[i].length /2)]
    }
}

console.log('Part A', sumA)
console.log('Part B', sumB)