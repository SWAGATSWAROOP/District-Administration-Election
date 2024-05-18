import {
  Phillaur,
  Nakodar,
  Adampur,
  Kartarpur,
  JalandharCantt,
  JalandharCenter,
  JalandharWest,
  JalandharNorth,
  Shahkot,
} from "../models/locationschema.js";
import { RushCheck } from "../models/rushcheckschema.js";

export const addPhillaur = (req, _, next) => {
  req.model = Phillaur;
  req.name = "Phillaur";
  next();
};

export const addAdampur = (req, _, next) => {
  req.model = Adampur;
  req.name = "Adampur";
  next();
};

export const addNakodar = (req, _, next) => {
  req.model = Nakodar;
  req.name = "Nakodar";
  next();
};

export const addJalandharCantt = (req, _, next) => {
  req.model = JalandharCantt;
  req.name = "JalandharCantt";
  next();
};

export const addJalandharNorth = (req, _, next) => {
  req.model = JalandharNorth;
  req.name = "JalandharNorth";
  next();
};

export const addJalandharWest = (req, _, next) => {
  req.model = JalandharWest;
  req.name = "JalandharWest";
  next();
};

export const addJalandharCenter = (req, _, next) => {
  req.model = JalandharCenter;
  req.name = "JalandharCenter";
  next();
};

export const addKartarpur = (req, _, next) => {
  req.model = Kartarpur;
  req.name = "Kartarpur";
  next();
};

export const addShahkot = (req, _, next) => {
  req.model = Shahkot;
  req.name = "Shahkot";
  next();
};

export const addRush = (req, _, next) => {
  req.model = RushCheck;
  next();
};
