import { Router } from "express";
import {
  addRush,
  addShahkot,
  addAdampur,
  addJalandharCantt,
  addJalandharCenter,
  addJalandharNorth,
  addJalandharWest,
  addKartarpur,
  addNakodar,
  addPhillaur,
} from "../middleware/addModelName.js";

import { Rush } from "../controller/rush.js";

const router = Router();

router.route("/Phillaur/:boothid").get(addPhillaur, addRush, Rush);
router.route("/Nakodar/:boothid").get(addNakodar, addRush, Rush);
router.route("/Kartarpur/:boothid").get(addKartarpur, addRush, Rush);
router.route("/Adampur/:boothid").get(addAdampur, addRush, Rush);
router.route("/Shahkot/:boothid").get(addShahkot, addRush, Rush);
router
  .route("/JalandharCenter/:boothid")
  .get(addJalandharCenter, addRush, Rush);
router.route("/JalandharNorth/:boothid").get(addJalandharNorth, addRush, Rush);
router.route("/JalandharCantt/:boothid").get(addJalandharCantt, addRush, Rush);
router.route("/JalandharWest/:boothid").get(addJalandharWest, addRush, Rush);

export default router;
