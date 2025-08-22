// ********* cludinary te image upload korar jonno multer ta use kora hoitese ************

import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import { cloudinaryUpload } from "./cloudinary.config";


const storage = new CloudinaryStorage({  // image rakhar jonno cludinary te stroge create korbe
    cloudinary: cloudinaryUpload,  // cludinary info gula ekhane astese. ==> example:- secret, api KEY etc.
    params: {
        public_id: (req, file) => { // public_id: => unic pulic id
            // My Special.Image#!@.png => 4545adsfsadf-45324263452-my-image.png
            // My Special.Image#!@.png => [My Special, Image#!@, png]

            const fileName = file.originalname // originalname ta file theke astese
                .toLowerCase()
                .replace(/\s+/g, "-") // empty space remove replace with dash
                .replace(/\./g, "-")
                // eslint-disable-next-line no-useless-escape
                .replace(/[^a-z0-9\-\.]/g, "") // non alpha numeric - !@#$  ==>

            const extension = file.originalname.split(".").pop() // ses er ongsho ta cut kore retur kore dibe => exp:- .png

            // binary -> 0,1 hexa decimal -> 0-9 A-F base 36 -> 0-9 a-z
            // 0.2312345121 -> "0.hedfa674338sasfamx" -> 
            //452384772534
            const uniqueFileName = Math.random().toString(36).substring(2) + "-" + Date.now() + "-" + fileName + "." + extension // create unic image name

            return uniqueFileName
        }
    }
})

export const multerUpload = multer({ storage: storage }) // multer theke cludinary stroge create kore image upload kkorbe