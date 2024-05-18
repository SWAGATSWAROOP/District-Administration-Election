import { Router } from "express";

import { location } from "../controller/location.js";

import {
  addAdampur,
  addJalandharCantt,
  addJalandharNorth,
  addJalandharCenter,
  addJalandharWest,
  addKartarpur,
  addNakodar,
  addPhillaur,
  addShahkot,
} from "../middleware/addModelName.js";

const router = Router();

router.route("/Phillaur").post(addPhillaur, location);
router.route("/Nakodar").post(addNakodar, location);
router.route("/Kartarpur").post(addKartarpur, location);
router.route("/Adampur").post(addAdampur, location);
router.route("/Shahkot").post(addShahkot, location);
router.route("/JalandharCenter").post(addJalandharCenter, location);
router.route("/JalandharNorth").post(addJalandharNorth, location);
router.route("/JalandharCantt").post(addJalandharCantt, location);
router.route("/JalandharWest").post(addJalandharWest, location);

export default router;
