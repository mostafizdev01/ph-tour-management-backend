import cookieParser from "cookie-parser";
import cors from "cors";
import express, { Request, Response } from "express";
import expressSession from "express-session";
import passport from "passport";
import { envVars } from "./app/config/env";
import "./app/config/passport"; // passport js er joto kaj kora hoise sob kicu ekhane chole ashbe
import { globalErrorHandler } from "./app/middlewares/globalErrorHandler";
import notFound from "./app/middlewares/notFound";
import { router } from "./app/routes";

const app = express()


app.use(expressSession({ // passport js er expressSessin use kora hoise ekhane
    secret: envVars.EXPRESS_SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}))
app.use(passport.initialize()) // atr mane passport bujlo ai project a pasport js setup kora hoise
app.use(passport.session())  /// passport use kore passport tar nijer mordhe tar outhentication handle korbe.
app.use(cookieParser())
app.use(express.json())
app.set("trust proxy", 1); /// live link korar somoy lage
app.use(express.urlencoded({ extended: true }))  /// handle the from data
app.use(cors({
    origin: envVars.FRONTEND_URL,
    credentials: true
}))

app.use("/api/v1", router)

app.get("/", (req: Request, res: Response) => {
    res.status(200).json({
        message: "Welcome to Tour Management System Backend"
    })
})


app.use(globalErrorHandler)

app.use(notFound)

export default app