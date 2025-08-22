import { JwtPayload } from "jsonwebtoken";


declare global { // global type declare kora hoise
    namespace Express { // amara express er jonno type declare korte chaitesi
        interface Request { // request theke ashbe 
            user: JwtPayload  // ekta json verify kora hobe tar jonno user ta JwtPayload kora hoise
        }
    }
}