

class AppError extends Error {  // ekhane ami ekta class banaisi tar nam disi AppError and eta extend kore Javascript er Error class ta k
    public statusCode: number;

    constructor(statusCode: number, message: string, stack = '') {
        super(message) // throw new Error("Something went wrong")
        this.statusCode = statusCode

        if (stack) {
            this.stack = stack
        } else {
            Error.captureStackTrace(this, this.constructor) /// jodi amader kono stack ta thake taile aita call hohe
        }
    }
}

export default AppError