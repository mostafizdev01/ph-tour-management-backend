// User - Booking(Pending) -> pothome booking ta booking korle booking ta pendding thakbe. then payment ta korte hobe=>  Payment (Unpaid) -> SSLCommerz -> Booking update = confirm -> pendding booking ta update kore confirm kore dilam. then => Payment update = Paid => payment ta success hole amara payment ta updata kore pendding theke paid kore dibo.

import { Types } from "mongoose";


export enum BOOKING_STATUS {
    PENDING = "PENDING",
    CANCEL = "CANCEL",
    COMPLETE = "COMPLETE",
    FAILED = "FAILED"
}

export interface IBooking {
    user: Types.ObjectId,
    tour: Types.ObjectId,
    payment?: Types.ObjectId,
    guestCount: number,
    status: BOOKING_STATUS,
    createdAt?: Date
}