import passwordGenerator from 'generate-password';

export const generatePassword = () => {
    return passwordGenerator.generate({ 
        length: 10,
        numbers: true,
        lowercase: true,
        uppercase: true,
        symbols: true,
    })
}