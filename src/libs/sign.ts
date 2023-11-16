import crypto from 'node:crypto';
import fs from 'node:fs'

export const genKeys = (eyName: string) => {
    const { privateKey, publicKey } = crypto.generateKeyPairSync("rsa", {
        modulusLength: 2048,
        publicKeyEncoding: {
            type: 'spki',
            format: 'pem'
        },
        privateKeyEncoding: {
            type: 'pkcs8',
            format: 'pem',
        },
    })
    fs.writeFileSync(`./keys/public_${eyName}.pem`, publicKey)
    fs.writeFileSync(`./keys/private_${eyName}.pem`, privateKey)
}

export const encrypt = (data: string, key: string) => {
    const encrypted = crypto.privateEncrypt(key, Buffer.from(data, 'utf-8'))
    return encrypted.toString('base64')
}

export const decrypt = (data: string, key: string) => {
    const decrypted = crypto.publicDecrypt(key, Buffer.from(data, 'utf-8'))
    return decrypted.toString('base64')
}

/**
 * Guarda en un docuemnto el valor de la firma del documento
 * @param sign Hash encriptado del docuemnto (firma)
 * @param author Nombre de la llave del author de la firma
 * @param doc Nombre del docuemnto firmado
 */
export const saveSign = (sign: string, author: string, doc: string) => {
    const filename = `${author}-${doc}.txt`
    const path = `./secure/${filename}`
    fs.writeFileSync(path, sign)
    return path
}