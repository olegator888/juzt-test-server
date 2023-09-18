import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import fs from "fs";
import path from "path";
import mongoose from "mongoose";
import CarModel from "./car-model.js";

const decode = function (s) {
  for (
    var a,
      b,
      i = -1,
      l = (s = s.split("")).length,
      o = String.fromCharCode,
      c = "charCodeAt";
    ++i < l;
    (a = s[i][c](0)) & 0x80 &&
    ((s[i] =
      (a & 0xfc) == 0xc0 && ((b = s[i + 1][c](0)) & 0xc0) == 0x80
        ? o(((a & 0x03) << 6) + (b & 0x3f))
        : o(128)),
    (s[++i] = ""))
  );
  return s.join("");
};

mongoose
  .connect("mongodb+srv://user:user@cluster0.l9dyuvl.mongodb.net/test")
  .then(() => console.log("DB OK"))
  .catch((error) => console.log("DB ERROR", error));

const app = express();
app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.raw());
app.use(express.static("tmp"));

const CARS_PER_PAGE = 10;

const dataPath = path.resolve("./tmp/db.json");
const PORT = 8000;

const { cars } = JSON.parse(fs.readFileSync(dataPath));

app.get("/cars", async (req, res) => {
  let timeout;

  if (timeout) {
    clearInterval(timeout);
  }

  const data = await CarModel.find();

  const cars = JSON.parse(JSON.stringify(data, "utf-8")).map((car) => ({
    ...car,
    color: decodeURIComponent(car.color),
  }));

  const colors = [];
  const includedColors = [];

  cars.forEach((car) => {
    if (includedColors.includes(car.color)) {
      return;
    }

    colors.push({
      color: car.color,
      colorUrl: car.colorUrl,
    });

    includedColors.push(car.color);
  });

  const brands = Array.from(new Set(cars.map((car) => car.brand)));

  const page = req.query.page;
  const brandsQuery = req.query.brand;
  const colorsQuery = req.query.color;

  let filteredCars = [...cars];

  if (brandsQuery) {
    if (Array.isArray(brandsQuery)) {
      filteredCars = filteredCars.filter((car) =>
        brandsQuery.includes(car.brand)
      );
    } else {
      filteredCars = filteredCars.filter((car) => brandsQuery === car.brand);
    }
  }

  if (colorsQuery) {
    if (Array.isArray(colorsQuery)) {
      filteredCars = filteredCars.filter((car) =>
        colorsQuery.includes(car.colorUrl)
      );
    } else {
      filteredCars = filteredCars.filter((car) => colorsQuery === car.colorUrl);
    }
  }

  const sortBy = req.query.sortBy;
  const sortMethod = req.query.sortMethod;

  if (sortBy) {
    if (sortMethod) {
      if (sortBy === "price") {
        switch (sortMethod) {
          case "asc":
            filteredCars = [...filteredCars].sort(
              (a, b) => +a.price - +b.price
            );
            break;
          case "desc":
            filteredCars = [...filteredCars].sort(
              (a, b) => +b.price - +a.price
            );
            break;
        }
      }

      if (sortBy === "year") {
        switch (sortMethod) {
          case "asc":
            filteredCars = [...filteredCars].sort((a, b) => +a.year - +b.year);
            break;
          case "desc":
            filteredCars = [...filteredCars].sort((a, b) => +b.year - +a.year);
            break;
        }
      }
    }
  }

  timeout = setTimeout(() => {
    res.json({
      cars: filteredCars
        .slice(0, CARS_PER_PAGE * page)
        .map((car) => ({ ...car, color: decode(car.color) })),
      colors,
      brands,
      hasMore: filteredCars.length > page * CARS_PER_PAGE,
      test: "test3",
    });
  }, 300);
});

app.get("/cars/:id", async (req, res) => {
  // const carId = req.params.id;
  // const car = cars.find((car) => car.id == carId);

  // let timeout;

  // if (timeout) {
  //   clearInterval(timeout);
  // }

  // timeout = setTimeout(() => {
  //   res.json(car);
  // }, 300);
  const car = await CarModel.findById(req.params.id);
  res.json(car);
});

app.post("/cars", async (req, res) => {
  const doc = new CarModel(req.body);
  const car = await doc.save();
  res.json(car);
});

app.listen(PORT, () => {
  console.log(`Server started at port ${PORT}`);
});
