/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from "http-status-codes";
import AppError from "../../errorHelpers/AppError";
import { getTransactionId } from "../../utils/getTransactionId";
import { PAYMENT_STATUS } from "../payment/payment.interface";
import { Payment } from "../payment/payment.model";
import { ISSLCommerz } from "../sslCommerz/sslCommerz.interface";
import { SSLService } from "../sslCommerz/sslCommerz.service";
import { Tour } from "../tour/tour.model";
import { User } from "../user/user.model";
import { BOOKING_STATUS, IBooking } from "./booking.interface";
import { Booking } from "./booking.model";



/** Understanding the transition rollback
 * Duplicate DB Collections / replica
 * 
 * Relica DB -> [ Create Booking -> Create Payment ->  Update Booking -> Error] -> Real DB // error hoile real data base a kono kicu create hobe na.
 * Booking create, payment Create, booking Update korar somoy jodi kono ekta te kono problem hoi taile pura booking | kaj tai close kore dibe. kono kicui create hobe na. atai => transition rollback
 */

const createBooking = async (payload: Partial<IBooking>, userId: string) => {
    const transactionId = getTransactionId() // getTransactionId function ta call kora ekta transition id create kora hoise

    const session = await Booking.startSession(); // booking er upor ekta virtual send box create kora holo // transition Rollback create kora hoise.

    session.startTransaction() // ekhane trasition ta start kora hoise

    try { // amader logic gula try er mordhe kakhbo. and kono error hoile catch er mordhe jabe tokhon transition rollback ta kaj korbe. && data base a jodi kono essue hoile amra handle korte perbo tai ekhane try-catch use korsi
        const user = await User.findById(userId);

        if (!user?.phone || !user.address) {
            throw new AppError(httpStatus.BAD_REQUEST, "Please Update Your Profile to Book a Tour.")
        }

        const tour = await Tour.findById(payload.tour).select("costFrom") // tour theke tour er cost ber kora hoise

        if (!tour?.costFrom) {
            throw new AppError(httpStatus.BAD_REQUEST, "No Tour Cost Found!")
        }

        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const amount = Number(tour.costFrom) * Number(payload.guestCount!) /// tour er total amount create kora hoise. ** ! => amra payload.guestCount ta k sure kore dilam data ta ashbei

        const booking = await Booking.create([{
            user: userId,
            status: BOOKING_STATUS.PENDING,
            ...payload
        }], { session }) // transition rollback er jonno session ta ekhabe add kora hoise

        const payment = await Payment.create([{ // transition rollback user korle. create || update er somoy amader _id ta amra akta array er mordhe rakhte hoy. ata mongoose er rolus
            booking: booking[0]._id, //  _id ta [0] number index a pabo
            status: PAYMENT_STATUS.UNPAID,
            transactionId: transactionId,
            amount: amount
        }], { session }) // transition rollback er jonno session ta ekhabe add kora hoise

        const updatedBooking = await Booking  // booking ta kore payment ta confirm hoise amra booking ta update kore ditesi
            .findByIdAndUpdate(
                booking[0]._id,
                { payment: payment[0]._id },
                { new: true, runValidators: true, session } // transition rollback er jonno session ta ekhabe add kora hoise
            )
            .populate("user", "name email phone address") // booking model a user er id neuya hoise. populate diye amara user model er info gula niye ashte chai. booking model a user er j nam disi ekhane o same nam dite hobe. user er sob info theke ami sudu=> name, phone, email, address gula dekhte chaisi seita bole disi
            .populate("tour", "title costFrom") /// ager tar motoi korsi
            .populate("payment"); // ekhane payment er sob info gula show korbe.

        const userAddress = (updatedBooking?.user as any).address // first braket na dile amara address gula access korte partesi na // ai info gula sslInit a pathnor jonno ready korlam.
        const userEmail = (updatedBooking?.user as any).email
        const userPhoneNumber = (updatedBooking?.user as any).phone
        const userName = (updatedBooking?.user as any).name

        const sslPayload: ISSLCommerz = {  // create ssl payload data
            address: userAddress,
            email: userEmail,
            phoneNumber: userPhoneNumber,
            name: userName,
            amount: amount,
            transactionId: transactionId
        }

        const sslPayment = await SSLService.sslPaymentInit(sslPayload) // call sslPaymentInit

        // console.log(sslPayment);

        await session.commitTransaction(); //transaction
        session.endSession() // amader sob gual process complete hoise then transition rollback ta k bole dilam amader sob kaj complete hoise. ekhon transition rollback ta close korlam.
        return {
            paymentUrl: sslPayment.GatewayPageURL, //// GatewayPageURL => payment popup. j link thke amara payment ta korbo
            booking: updatedBooking
        }
    } catch (error) {
        await session.abortTransaction(); // rollback => kono ekta jaigai problem hoise sob kicu close hoye jabe. kono kicu create hobe na
        session.endSession()
        // throw new AppError(httpStatus.BAD_REQUEST, error) ❌❌
        throw error // mongoose theke error ta show korbe
    }
};

// Frontend(localhost:5173) - User - Tour - Booking (Pending) - Payment(Unpaid) -> SSLCommerz Page -> Payment Complete -> Backend(localhost:5000/api/v1/payment/success) -> Update Payment(PAID) & Booking(CONFIRM) -> redirect to frontend -> Frontend(localhost:5173/payment/success)

// Frontend(localhost:5173) - User - Tour - Booking (Pending) - Payment(Unpaid) -> SSLCommerz Page -> Payment Fail / Cancel -> Backend(localhost:5000) -> Update Payment(FAIL / CANCEL) & Booking(FAIL / CANCEL) -> redirect to frontend -> Frontend(localhost:5173/payment/cancel or localhost:5173/payment/fail)

const getUserBookings = async () => {

    return {}
};

const getBookingById = async () => {
    return {}
};

const updateBookingStatus = async (

) => {

    return {}
};

const getAllBookings = async () => {

    return {}
};

export const BookingService = {
    createBooking,
    getUserBookings,
    getBookingById,
    updateBookingStatus,
    getAllBookings,
};
