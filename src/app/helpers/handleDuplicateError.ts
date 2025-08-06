import { TGenericErrorResponse } from "../interfaces/error.types"

/* eslint-disable @typescript-eslint/no-explicit-any */
export const handlerDuplicateError = (err: any): TGenericErrorResponse => {
    const matchedArray = err.message.match(/"([^"]*)"/) // duplicate error ta catch korar rejex create kora hoise.

    return {
        statusCode: 400,
        message: `${matchedArray[1]} already exists!!` // ki karone error ta hoitese seita matchArray[1] number diye select kora hoise
    }
}