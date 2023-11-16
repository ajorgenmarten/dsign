import readline from 'readline-sync'
import { genKeysInterface, homeInterface, signDocInterface } from './libs/ui'

const main = () => {
    homeInterface()
    console.log('Que desea hacer: ')
    const option = parseInt( readline.prompt() )
    switch ( option ) {
        case 1:
            genKeysInterface()
        case 2:
            signDocInterface()
        default:
            console.log('valor incorrecto')
            process.exit() 
    }
}

main()