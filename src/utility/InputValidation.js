function isInputValidation(input){
    return input && input.replace(/\s/g, '').length
}

export default isInputValidation;