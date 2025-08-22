import { Router } from "express";
import { multerUpload } from "../../config/multer.config";
import { checkAuth } from "../../middlewares/checkAuth";
import { validateRequest } from "../../middlewares/validateRequest";
import { Role } from "../user/user.interface";
import { DivisionController } from "./division.controller";
import {
    createDivisionSchema,
    updateDivisionSchema
} from "./division.validation";

const router = Router()
/*
 {  /// amara je from data pathabo seita dekhte jmn hobe

 file : Image // image gula file name a pathaibo
 data : body text data => req.body => req.body.data /// text gula data er mordhe pathaibe
 }
*/
// Form data -> body, file
router.post(
    "/create",    
    checkAuth(Role.ADMIN, Role.SUPER_ADMIN),
    multerUpload.single("file"),  // amra single ekta image upload korete chai. && amra ki name a file ta file name a pathaitesi
    validateRequest(createDivisionSchema),
    DivisionController.createDivision
);

// geting division
router.get("/", DivisionController.getAllDivisions);

// get single division
router.get("/:slug", DivisionController.getSingleDivision)

// update division
router.patch( // dynamic routes gula sob somoy niche rakhte hobe
    "/:id",
    checkAuth(Role.ADMIN, Role.SUPER_ADMIN),
    multerUpload.single("file"), // amra single ekta image upload korete chai. && amra ki name a file ta file name a pathaitesi
    validateRequest(updateDivisionSchema),
    DivisionController.updateDivision
);

// delete division
router.delete("/:id", checkAuth(Role.ADMIN, Role.SUPER_ADMIN), DivisionController.deleteDivision);

export const DivisionRoutes = router