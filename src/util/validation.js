
export const nameValidator = (input) => {
    console.log((/\b([A-ZÀ-ÿ][-,a-z. ']+[ ]*)+/).test(input))
    return (/\b([A-ZÀ-ÿ][-,a-z. ']+[ ]*)+/).test(input)
}

export const passwordValidator = (input) => {
    console.log((/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/).test(input))
    return (/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/).test(input)
}

export const emailValidator = (input) => {
    console.log((/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/).test(input))
    return (/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(input))
}