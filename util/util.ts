import * as fs from 'fs'

export const readToArray = ( input:string = 'input.txt') => fs.readFileSync(input).toString().split('\n')
