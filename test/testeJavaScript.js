// RegEx Placa de carro -------------------------------------------------------

// const regex = /^[A-Za-z]{3}([0-9]{1}[A-Za-z]{1}[0-9]{2}|[0-9]{4}$)/

// const plate = 'NTW49080'

// console.log(regex.test(plate))

// -----------------------------------------------------------------------------
const text = 'Ramon Oliveira;[;][~[~[~~[[~--/-*+-+-*-/-/]]]]] dos Santos'
const regex = /[^A-Z a-z0-9]/gi

console.log(text.replace(regexAllTexts, ''))