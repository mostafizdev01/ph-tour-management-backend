import { Response } from "express";

interface TMeta {  // Tmeta ta ekta count rakhbe tar jonno use kora hoise
    page: number;
    limit: number;
    totalPage: number;
    total: number
}


interface TResponse<T> {  // T == jokhon j function ta k call korbo tar interface er type ta T er mordhe bose jabe
    statusCode: number;
    success: boolean;
    message: string;
    data: T;
    meta?: TMeta
}

export const sendResponse = <T>(res: Response, data: TResponse<T>) => { // jokhon j data call korbo tokhon tar type ta T er mordhe bose jabe
    res.status(data.statusCode).json({ /// jokhon sendResponse ta call korbo tokhon tar info gula datar mordhe bose jabe. then info gula bose jabe
        statusCode: data.statusCode,
        success: data.success,
        message: data.message,
        meta: data.meta,
        data: data.data
    })
}