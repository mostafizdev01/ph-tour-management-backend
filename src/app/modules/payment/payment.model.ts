import { model, Schema } from "mongoose";
import { IPayment, PAYMENT_STATUS } from "./payment.interface";


const paymentSchema = new Schema<IPayment>({
    booking: {
        type: Schema.Types.ObjectId, // payment a booking er id ta deuya thakbe. then onno gual o amon
        ref: "Booking", // not model variable name. only Booking model name User model er sate connect kora hoise tai ref=> Booking nam dauya hoise
        required: true,
        unique: true, // ekta booking er jonno ekta payment e hobe tai unic rakha hoise.
    },
    transactionId: {
        type: String,
        required: true,
        unique: true,
    },
    status: {
        type: String,
        enum: Object.values(PAYMENT_STATUS),
        default: PAYMENT_STATUS.UNPAID
    },
    amount: {
        type: Number,
        required: true,
    },
    paymentGatewayData: {
        type: Schema.Types.Mixed // Mixed er type ta mongoose theke astese. ata string hoile type hobe => string, boolean hoile type hobe boolean.
    },
    invoiceUrl: { /// ata ekta pdf create kora hobe
        type: String
    }
}, {
    timestamps: true
})

export const Payment = model<IPayment>("Payment", paymentSchema)