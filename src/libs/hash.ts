import fs from 'node:fs'
import crypto from 'node:crypto'

export const hashDoc = (path: string) => {
    const input = fs.readFileSync(path, 'utf-8')
    const hash = crypto.createHash('sha256').update(input).digest('hex')
    return hash
}