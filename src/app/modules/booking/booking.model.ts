import { model, Schema } from "mongoose";
import { BOOKING_STATUS, IBooking } from "./booking.interface";


const bookingSchema = new Schema<IBooking>({
    user: { /// ai sob onno model er data tai avabe rakha hoise
        type: Schema.Types.ObjectId, // booking a user er id ta deuya thakbe. then onno gual o amon
        ref: "User", // not model variable name. only user model name User model er sate connect kora hoise tai ref=> User nam dauya hoise
        required: true,
    },
    tour: {
        type: Schema.Types.ObjectId,
        ref: "Tour",
        required: true,
    },
    payment: {
        type: Schema.Types.ObjectId,
        ref: "Payment"
    },
    status: {
        type: String,
        enum: Object.values(BOOKING_STATUS),  /// dynamic enum ta bosbe
        default: BOOKING_STATUS.PENDING
    },
    guestCount: {
        type: Number,
        required: true
    }
}, {
    timestamps: true
})

export const Booking = model<IBooking>("Booking", bookingSchema)