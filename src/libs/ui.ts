import readline from 'readline-sync'
import fs from 'node:fs'
import { encrypt, genKeys, saveSign } from './sign'
import { hashDoc } from './hash'

export const homeInterface = () => {
    console.log("Escribe el numero de lo que desea hacer")
    console.log("1 - generar tus keys")
    console.log("2 - firmar docuemnto")
    console.log("3 - verificar docuemnto")
}

export const genKeysInterface = () => {
    console.log("Teclee un nombre para la key: ");

    const keyName = readline.prompt()
    genKeys(keyName)
    
    console.log('Keys generadas, para usarlas cuando se le soliciten ponga el nombre que ha puesto ahora.')
    
    process.exit()
}

export const signDocInterface = () => {
    console.log('Teclee su key: ')
    const keyName = readline.prompt()

    // generar hash del docuemnto
    console.log('Introduzca el nombre del docuemnto: ')
    const docName = readline.prompt()
    const hash = hashDoc(`./docs/${docName}`)

    // obtener key privada
    const key = fs.readFileSync(`./keys/private_${keyName}.pem`).toString('utf-8')

    // encriptar el hash
    const sign = encrypt(hash, key)
    
    // guardar la firma en un documento
    console.log('Firma del docuemnto guardada en: '+ saveSign(sign, keyName, docName))
    process.exit()
}

export const verifyDoc = () => {
    console.log('Teclee el nombre del documento: ')
    const docName = readline.prompt()
}