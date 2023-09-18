import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import fs from "fs";
import path from "path";

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.raw());
app.use(express.static("public"));
// Add headers before the routes are defined
app.use(function (req, res, next) {
  // Website you wish to allow to connect
  res.setHeader(
    "Access-Control-Allow-Origin",
    "https://juzt-test-client.vercel.app"
  );

  // Request methods you wish to allow
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );

  // Request headers you wish to allow
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader("Access-Control-Allow-Credentials", true);

  // Pass to next layer of middleware
  next();
});

const CARS_PER_PAGE = 10;

const dataPath = path.resolve("./public/db.json");
const PORT = 8000;

const { cars } = JSON.parse(fs.readFileSync(dataPath));

app.get("/cars", (req, res) => {
  let timeout;

  if (timeout) {
    clearInterval(timeout);
  }

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
      cars: filteredCars.slice(0, CARS_PER_PAGE * page),
      colors,
      brands,
      hasMore: filteredCars.length > page * CARS_PER_PAGE,
    });
  }, 300);
});

app.get("/cars/:id", (req, res) => {
  const carId = req.params.id;
  const car = cars.find((car) => car.id == carId);

  let timeout;

  if (timeout) {
    clearInterval(timeout);
  }

  timeout = setTimeout(() => {
    res.json(car);
  }, 300);
});

app.post("/cars", (req, res) => {
  const newCar = {
    ...req.body,
    id: String(cars.length + 1),
  };

  let timeout;

  if (timeout) {
    clearInterval(timeout);
  }

  timeout = setTimeout(() => {
    fs.writeFileSync(
      dataPath,
      JSON.stringify(
        {
          cars: [...cars, newCar],
        },
        null,
        2
      )
    );

    res.json(newCar);
  }, 300);
});

app.listen(PORT, () => {
  console.log(`Server started at port ${PORT}`);
});
