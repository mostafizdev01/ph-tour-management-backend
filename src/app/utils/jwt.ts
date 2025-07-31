import jwt, { JwtPayload, SignOptions } from "jsonwebtoken"

export const generateToken = (payload: JwtPayload, secret: string, expiresIn: string) => {
    const token = jwt.sign(payload, secret, { /// ekhane token ta create kora hoise jwt.sign diye..
        expiresIn
    } as SignOptions) ///// SignOptions ta JWT theke neuya hoise

    return token
}

export const verifyToken = (token: string, secret: string) => {

    const verifiedToken = jwt.verify(token, secret);

    return verifiedToken
}