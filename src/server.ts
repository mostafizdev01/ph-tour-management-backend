/* eslint-disable no-console */
import { Server } from "http";
import mongoose from "mongoose";
import app from "./app";
import { envVars } from "./app/config/env";
import { connectRedis } from "./app/config/redis.config";
import { seedSuperAdmin } from "./app/utils/seedSuperAdmin";

let server: Server;

const startServer = async () => {
    try {
        await mongoose.connect(envVars.DB_URL)

        console.log("Connected to DB!!");

        server = app.listen(envVars.PORT, () => {
            console.log(`Server is listening to port ${envVars.PORT}`);
        });
    } catch (error) {
        console.log(error);
    }
}

(async () => { // IIFE function ta bananor karon holo jano age server create hobe and tarpor super admin na thakle super admin function ta call hobe..
    await connectRedis()
    await startServer()  /// age startServer ta create hobe then superAdmin ta create hobe
    await seedSuperAdmin()
})() /// Created IIFE

process.on("SIGTERM", () => { // jara server ta maintain kore tara jodi server ta off kore taile ai function ta call hobe
    console.log("SIGTERM signal recieved... Server shutting down..");

    if (server) {
        server.close(() => {
            process.exit(1)
        });
    }

    process.exit(1)
})

process.on("SIGINT", () => {  //// jara server ta maintain kore tara jodi server ta off kore taile ai function ta call hobe
    console.log("SIGINT signal recieved... Server shutting down..");

    if (server) {
        server.close(() => {
            process.exit(1)
        });
    }

    process.exit(1)
})


process.on("unhandledRejection", (err) => { /// ekmn ekta promise ja amader try catch use kora usit silo. tokhon amader ai function ta call hobe
    console.log("Unhandled Rejecttion detected... Server shutting down..", err);

    if (server) {
        server.close(() => {  // jodi server on thake taile server ta close koro
            process.exit(1) // jode js er server ta close korbe
        });
    }

    process.exit(1)
})

process.on("uncaughtException", (err) => {  // server er local kono ekta problem hole ai function ta call hobe. any error hoilei function ta call hobe
    console.log("Uncaught Exception detected... Server shutting down..", err);

    if (server) {
        server.close(() => {
            process.exit(1)
        });
    }

    process.exit(1)
})

// Unhandler rejection error
// Promise.reject(new Error("I forgot to catch this promise"))

// Uncaught Exception Error
// throw new Error("I forgot to handle this local erro")


/**
 * unhandled rejection error
 * uncaught rejection error
 * signal termination sigterm
 */

