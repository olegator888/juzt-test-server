import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import fs from "fs";

const CARS_PER_PAGE = 10;

const dataPath = "./db.json";
const PORT = 8000;

// const { cars } = JSON.parse(fs.readFileSync(dataPath));

let cars = [
  {
    id: "1",
    imageUrl:
      "https://mediaservice.audi.com/media/fast/H4sIAAAAAAAAAFvzloG1tIiBOTrayfuvpGh6-m1zJgaGigIGBgZGoDhTtNOaz-I_2DhCHsCElzEwF-SlMwJZKUycmbmJ6an6QD4_I3taTmV-aUkxO0grj5eHtccF31_KMRG3N0rmlvLsX25VzsAK1MUkCSSYNwAJvmlAguMxA5gEmQcSZGgC8ZksmRkYWCuAjEgGEBDUMCASCLO7uIY4evoEAwBqwxYY2QAAAA?wid=850",
    brand: "Audi",
    model: "R8",
    color: "Белый",
    colorUrl: "white",
    price: 1,
    year: 2010,
    engineType: "gasoline",
    transmission: "auto",
    powerReserve: null,
  },
  {
    id: "2",
    imageUrl:
      "https://images.unsplash.com/photo-1617195920950-1145bf9a9c72?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8YXVkaSUyMGNhcnxlbnwwfHwwfHx8MA%3D%3D&w=1000&q=80",
    brand: "Audi",
    model: "TT",
    color: "Белый",
    colorUrl: "white",
    price: 2,
    year: 2012,
    engineType: "diesel",
    transmission: "manual",
    powerReserve: null,
  },
  {
    id: "3",
    imageUrl:
      "https://www.carscoops.com/wp-content/uploads/2021/07/2022-Audi-E-Tron-GT-1024x555.jpg",
    brand: "Audi",
    model: "A5",
    color: "Серый",
    colorUrl: "gray",
    price: 3,
    year: 2015,
    engineType: "electric",
    transmission: null,
    powerReserve: 3000,
  },
  {
    id: "4",
    imageUrl:
      "https://mediaservice.audi.com/media/live/50900/fly1400x601n1/f4b/2022.png?wid=850",
    brand: "Audi",
    model: "A3",
    color: "Серебристый",
    colorUrl: "silver",
    price: 4,
    year: 2018,
    engineType: "diesel",
    transmission: "robotic",
    powerReserve: null,
  },
  {
    id: "5",
    imageUrl:
      "https://imgd.aeplcdn.com/0x0/n/cw/ec/51378/s5-sportback-exterior-right-front-three-quarter-5.jpeg?q=75",
    brand: "Audi",
    model: "RS6",
    color: "Синий",
    colorUrl: "blue",
    price: 5,
    year: 2020,
    engineType: "gasoline",
    transmission: "auto",
    powerReserve: null,
  },
  {
    id: "6",
    imageUrl:
      "https://www.motability.co.uk/-/media/images/vehicles/manufacturers/audi/audi-linker-image.gif?format=normal&rev=58ae3a7c68e543eea4c4472e25fddcf3&hash=4BC4ABC5721A6B3AC4D62EC86951749C&width=1128&quality=80",
    brand: "Audi",
    model: "RS2",
    color: "Красный",
    colorUrl: "red",
    price: 6,
    year: 2014,
    engineType: "electric",
    transmission: null,
    powerReserve: 10000,
  },
  {
    id: "7",
    imageUrl:
      "https://www.motorbiscuit.com/wp-content/uploads/2023/01/Front-angle-view-of-2023-Audi-A3-cheapest-new-Audi-and-one-of-best-small-luxury-cars-Car-and-Driver.jpg?w=1200",
    brand: "Audi",
    model: "RS1",
    color: "Черный",
    colorUrl: "black",
    price: 7,
    year: 2018,
    engineType: "gasoline",
    transmission: "manual",
    powerReserve: null,
  },
  {
    id: "8",
    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQt_uQ9OwStPbAJ9URXIAoOnOUxJ3y7F8ZMhw&usqp=CAU",
    brand: "Audi",
    model: "XP8",
    color: "Белый",
    colorUrl: "white",
    price: 8,
    year: 2019,
    engineType: "diesel",
    transmission: "auto",
    powerReserve: null,
  },
  {
    id: "9",
    imageUrl:
      "https://www.motability.co.uk/-/media/images/vehicles/manufacturers/audi/audi-image-hero.jpg?format=normal&rev=9e2fc3272597493293fa42d1e6cdadee&hash=77A455E958AED2B0353C5A49DDFE5D6F&width=1600&quality=80",
    brand: "Audi",
    model: "MP5",
    color: "Серебристый",
    colorUrl: "silver",
    price: 9,
    year: 2022,
    engineType: "diesel",
    transmission: "manual",
    powerReserve: null,
  },
  {
    id: "10",
    imageUrl:
      "https://www.supercars.net/blog/wp-content/uploads/2020/01/2020-Audi-RS7-Sportback-V1-1080.jpg",
    brand: "Audi",
    model: "GT5",
    color: "Красный",
    colorUrl: "red",
    price: 10,
    year: 2023,
    engineType: "electric",
    transmission: null,
    powerReserve: 20000,
  },
  {
    id: "11",
    imageUrl:
      "https://hips.hearstapps.com/hmg-prod/images/2021-bmw-m440i-xdrive-coupe-106-1602004316.jpg?crop=0.564xw:0.423xh;0.230xw,0.379xh&resize=1200:*",
    brand: "BMW",
    model: "X1",
    color: "Черный",
    colorUrl: "black",
    price: 11,
    year: 2010,
    engineType: "gasoline",
    transmission: "auto",
    powerReserve: null,
  },
  {
    id: "12",
    imageUrl: "https://cdn2.buyacar.co.uk/sites/buyacar/files/bmw-z468-2.jpg",
    brand: "BMW",
    model: "X2",
    color: "Красный",
    colorUrl: "red",
    price: 12,
    year: 2012,
    engineType: "diesel",
    transmission: "manual",
    powerReserve: null,
  },
  {
    id: "13",
    imageUrl:
      "https://purepng.com/public/uploads/large/purepng.com-bmw-carcarsbmw-961524670123dgp13.png",
    brand: "BMW",
    model: "X3",
    color: "Серебристый",
    colorUrl: "silver",
    price: 13,
    year: 2015,
    engineType: "electric",
    transmission: null,
    powerReserve: 3000,
  },
  {
    id: "14",
    imageUrl:
      "https://img-ik.cars.co.za/news-site-za/images/2023/05/m3-cs-1.jpg",
    brand: "BMW",
    model: "X4",
    color: "Зеленый",
    colorUrl: "green",
    price: 14,
    year: 2018,
    engineType: "diesel",
    transmission: "robotic",
    powerReserve: null,
  },
  {
    id: "15",
    imageUrl:
      "https://images.hindustantimes.com/auto/img/2022/04/10/600x338/image.1624369648649_1649592750013_1649592755410.jpg",
    brand: "BMW",
    model: "X5",
    color: "Синий",
    colorUrl: "blue",
    price: 15,
    year: 2020,
    engineType: "gasoline",
    transmission: "auto",
    powerReserve: null,
  },
  {
    id: "16",
    imageUrl: "https://www.drivespark.com/images/2022-06/2022-bmw-x1-8.jpg",
    brand: "BMW",
    model: "X6",
    color: "Коричневый",
    colorUrl: "brown",
    price: 16,
    year: 2014,
    engineType: "electric",
    transmission: null,
    powerReserve: 10000,
  },
  {
    id: "17",
    imageUrl:
      "https://www.lloydmotorgroup.com/ImageLibrary/images/BMW/Retail/Master/New%20Cars/M%20Cars/M4%20Coupe%20Gallery/BMW-G82-M4-Sao-Paulo-Yellow-thumb.png?mode=max&upscale=true&width=640",
    brand: "BMW",
    model: "X7",
    color: "Желтый",
    colorUrl: "yellow",
    price: 17,
    year: 2018,
    engineType: "gasoline",
    transmission: "manual",
    powerReserve: null,
  },
  {
    id: "18",
    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRUUaGNGjx9DPKU7WImIUlhrfSathfsvJ3Vtw&usqp=CAU",
    brand: "BMW",
    model: "X8",
    color: "Черный",
    colorUrl: "black",
    price: 18,
    year: 2019,
    engineType: "diesel",
    transmission: "auto",
    powerReserve: null,
  },
  {
    id: "19",
    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQCLPNnYBNEFn3xu4AeSNk7C6PgH72jIlHoCg&usqp=CAU",
    brand: "BMW",
    model: "X9",
    color: "Серебристый",
    colorUrl: "silver",
    price: 19,
    year: 2022,
    engineType: "diesel",
    transmission: "manual",
    powerReserve: null,
  },
  {
    id: "20",
    imageUrl:
      "https://imgd-ct.aeplcdn.com/664x374/n/cw/ec/140585/ix1-exterior-right-front-three-quarter.jpeg?isig=0&q=80",
    brand: "BMW",
    model: "X10",
    color: "Белый",
    colorUrl: "white",
    price: 20,
    year: 2023,
    engineType: "electric",
    transmission: null,
    powerReserve: 20000,
  },
  {
    id: "21",
    imageUrl:
      "https://purepng.com/public/uploads/large/purepng.com-yellow-mercedes-benz-amg-gt-carcarvehicletransportmercedes-benz-961524659841unlca.png",
    brand: "Mercedes",
    model: "benz1",
    color: "Желтый",
    colorUrl: "yellow",
    price: 21,
    year: 2010,
    engineType: "gasoline",
    transmission: "auto",
    powerReserve: null,
  },
  {
    id: "22",
    imageUrl:
      "https://media.zigcdn.com/media/model/2021/Oct/s-class_360x240.jpg",
    brand: "Mercedes",
    model: "benz2",
    color: "Черный",
    colorUrl: "black",
    price: 22,
    year: 2012,
    engineType: "diesel",
    transmission: "manual",
    powerReserve: null,
  },
  {
    id: "23",
    imageUrl:
      "https://hips.hearstapps.com/hmg-prod/images/2024-mercedes-benz-gla-103-64130fa2909a4.jpg?crop=0.770xw:0.577xh;0.143xw,0.232xh&resize=1200:*",
    brand: "Mercedes",
    model: "benz3",
    color: "Белый",
    colorUrl: "white",
    price: 23,
    year: 2015,
    engineType: "electric",
    transmission: null,
    powerReserve: 3000,
  },
  {
    id: "24",
    imageUrl:
      "https://cars.usnews.com/static/images/Auto/custom/15194/2023_Mercedes-Benz_EQB_Angular_Front_1.jpg",
    brand: "Mercedes",
    model: "benz4",
    color: "Черный",
    colorUrl: "black",
    price: 24,
    year: 2018,
    engineType: "diesel",
    transmission: "robotic",
    powerReserve: null,
  },
  {
    id: "25",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c4/Mercedes-Benz_W213_E_350_4_matic_AMG_Line_white_%28cropped2%29.jpg/1200px-Mercedes-Benz_W213_E_350_4_matic_AMG_Line_white_%28cropped2%29.jpg",
    brand: "Mercedes",
    model: "benz5",
    color: "Белый",
    colorUrl: "white",
    price: 25,
    year: 2020,
    engineType: "gasoline",
    transmission: "auto",
    powerReserve: null,
  },
  {
    id: "26",
    imageUrl:
      "https://assets-eu-01.kc-usercontent.com/3b3d460e-c5ae-0195-6b86-3ac7fb9d52db/0525ac5c-4683-4d39-8765-df876751b168/Mercedes%20A-Class%20%281%29.jpg",
    brand: "Mercedes",
    model: "benz6",
    color: "Желтый",
    colorUrl: "yellow",
    price: 26,
    year: 2014,
    engineType: "electric",
    transmission: null,
    powerReserve: 10000,
  },
  {
    id: "27",
    imageUrl:
      "https://www.stratstone.com/-/media/stratstone/mercedes-benz/new-cars/gle/mercedes-benz-gle-front-720x405px.ashx",
    brand: "Mercedes",
    model: "benz7",
    color: "Серебристый",
    colorUrl: "silver",
    price: 27,
    year: 2018,
    engineType: "gasoline",
    transmission: "manual",
    powerReserve: null,
  },
  {
    id: "28",
    imageUrl:
      "https://media.gq-magazine.co.uk/photos/648ae7e8b0c390be7c4343f0/master/pass/Mercedes-concept-Vision-One-Eleven-hp.jpeg",
    brand: "Mercedes",
    model: "benz8",
    color: "Оранжевый",
    colorUrl: "orange",
    price: 28,
    year: 2019,
    engineType: "diesel",
    transmission: "auto",
    powerReserve: null,
  },
  {
    id: "29",
    imageUrl:
      "https://hips.hearstapps.com/hmg-prod/images/rt-mercedes-benz-cpo-1-1531414981.jpg?crop=0.886xw:1xh;center,top&resize=1200:*",
    brand: "Mercedes",
    model: "benz9",
    color: "Серый",
    colorUrl: "gray",
    price: 29,
    year: 2022,
    engineType: "diesel",
    transmission: "manual",
    powerReserve: null,
  },
  {
    id: "30",
    imageUrl:
      "https://cdn.motor1.com/images/mgl/GMz1J/s3/baby-mercedes-amg-mid-engined-sports-car-rendering.jpg",
    brand: "Mercedes",
    model: "benz10",
    color: "Красный",
    colorUrl: "red",
    price: 30,
    year: 2023,
    engineType: "electric",
    transmission: null,
    powerReserve: 20000,
  },
  {
    imageUrl:
      "https://cdni.autocarindia.com/Utils/ImageResizer.ashx?n=https://cdni.autocarindia.com/ExtraImages/20220804053944_Huracan%205.jpg",
    brand: "lamba",
    model: "xs8",
    color: "Зеленый",
    colorUrl: "green",
    price: "31",
    year: "2020",
    engineType: "gasoline",
    transmission: "auto",
    id: "31",
  },
];

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.raw());

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
  }, 500);
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
  }, 500);
});

app.post("/cars", (req, res) => {
  const newCar = {
    ...req.body,
    id: String(cars.length + 1),
  };

  cars.push(newCar);

  let timeout;

  if (timeout) {
    clearInterval(timeout);
  }

  timeout = setTimeout(() => {
    // fs.writeFileSync(
    //   dataPath,
    //   JSON.stringify(
    //     {
    //       cars: newCars,
    //     },
    //     null,
    //     2
    //   )
    // );

    res.json(cars);
  }, 500);
});

app.listen(PORT, () => {
  console.log(`Server started at port ${PORT}`);
});
