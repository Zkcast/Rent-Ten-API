const { Router } = require("express");
const { House, User, Review, Booking } = require("../db");
const { extraHouses, extraReviews, extraBookings } = require("../../extra-db/extra-db");
const { SendMail_booking } = require("../controllers/SendMail_booking")

const mercadopago = require("mercadopago");
// mercadopago.configurations.setAccessToken(
//   "TEST-2830502347743015-111509-be7c4ad96f1ef7ac33cea5b0e3f8876d-244311163"
// );

const router = Router();

// --- GET METHODS ---
router.get("/", async (req, res) => {
  const allHouses = await House.findAll({ include: [User, Review, Booking] });
  const availableHouses = await allHouses.filter(h => h.deleted !== true)

  res.status(200).json(availableHouses);
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const house = await House.findByPk(id, { include: [User, Review, Booking] });
    if (house.deleted) { return res.status(404).json({ msg: `This place was deleted` }) }
    return res.status(200).json(house);
  } catch (error) {
    console.log(error);
  }
});

router.get("/order/:order", async (req, res) => {
  const { order } = req.params

  try {
    let allHouses = await House.findAll({ include: [User, Review] })

    if (order === "byqualityprice") {
      await allHouses.sort(function (a, b) { return a.price_quality_relation - b.price_quality_relation })
    }

    if (order === "rating") {
      await allHouses.sort(function (a, b) { return b.rating - a.rating })
    }

    res.status(200).json(allHouses)

  } catch (error) {
    console.log(error);
  }
});

router.get("/deletedhouses", async (req, res) => {

  try {

    let allHouses = await House.findAll()
    let filter = await allHouses.filter(house => house.deleted)
    res.status(200).json(filter)

  } catch (error) {
    console.log(error)
    res.status(400).json(error)
  }

})

// --- POST METHODS ---
router.post("/setowner", async (req, res) => {
  const { userId, houseId } = req.body;
  try {
    const house = await House.findByPk(houseId);
    await house.setUsers(userId);
    res.status(200).json(house);
  } catch (error) {
    console.log(error);
  }
});

router.post("/createhouse", async (req, res) => {
  const { city, country, rooms, bathrooms, maxpeople, allowpets, wifi, type } =
    req.body;
  const { userMail } = req.query;
  const { userId } = req.query;

  try {
    const newHouse = await House.create(req.body);
    if (userId) {
      newHouse.setUsers(userId);
    } else if (userMail) {
      const user = await User.findOne({ where: { mail: userMail } });
      newHouse.setUsers(user.id);
    }
    res.status(201).json(newHouse);
  } catch (error) {
    console.log(error);
  }
});


// --- PUT METHODS ---

router.put("/edithouse/:id", async (req, res) => {
  const houseId = req.params.id;
  const { userId } = req.query;
  const {
    city,
    country,
    picture,
    rooms,
    bathrooms,
    maxpeople,
    allowpets,
    wifi,
    type,
    bookings,
    deleted
  } = req.body;

  try {
    const user = await User.findByPk(userId)
    const house = await House.findByPk(houseId, { include: User });
    const owner = house.Users[0].id;

    if (user.admin || userId == owner) {
      await house.update(req.body);
      res.status(200).json(house);
    } else {
      res.status(200).json({
        msg: `The ID ${userId} is not the owner of the house with ID ${houseId}`,
      });

    }
  } catch (error) {
    console.log(error);
  }
});

// --- DELETE METHODS ---

router.delete("/deletehouse", async (req, res) => {
  const { houseId, userId } = req.body;

  try {
    const user = await User.findByPk(userId)
    const house = await House.findByPk(houseId, { include: User });
    const owner = house.Users[0].id;

    if (user.admin || userId == owner) {
      await house.update({ deleted: true })
      res.status(200).json({ msg: `House with ID ${houseId} destroyed.` });
    } else {
      res.status(400).json({
        msg: `The ID ${userId} cant delete the house with ID ${houseId}`,
      });
    }
  } catch (error) {
    console.log(error);
  }
});

//payment
router.post("/process_payment", (req, res) => {
  console.log("BODY DE LA LLAMADA", req.body);

  mercadopago.payment
    .save(req.body)
    .then(function (response) {
      const { status, status_detail, id } = response.body;
      console.log(status, status_detail, id);
      res.status(response.status).json({ status, status_detail, id });
    })
    .catch(function (error) {
      console.error(error);
    });
});

// --- EXTRA TO FULL DB ---

router.post("/fulldb", async (req, res) => {
  try {
    let testuser = await User.create({ lastname: "Of all houses", sub: 'owner', name: "Owner", mail: "owner@owner.com" })
    await User.create({ lastname: "Administrator", name: "Rent-Ten", mail: "rentten2022@gmail.com", sub: 'Administrator', verified: "verified", admin: true })

    extraHouses(50).forEach(async (house) => {

      let finder = await House.findOne({ where: house });
      const { scores, city, country, rooms, bathrooms, maxpeople, allowpets, wifi, type } =
        req.body;

      if (!finder) {
        let newHouse = await House.create(house);

        extraReviews(Math.floor(Math.random() * 8) + 1).forEach(async (newReview) => {
          let review = await Review.create(newReview)
          await review.setUser(testuser.id)
          await review.setHouse(newHouse.id)
          await newHouse.update({ scores: [...newHouse.scores, newReview.rating] })
        })

        extraBookings(Math.floor(Math.random() * 3) + 1).forEach(async (newBooking) => {
          let booking = await Booking.create(newBooking)
          await booking.setUser(testuser.id)
          await booking.setHouse(newHouse.id)

        })

        await newHouse.setUsers(testuser.id);

      }
    }
    );

    res.status(200).json({ msg: "Base de datos creada" });
  } catch (error) {
    res.status(400).json(error);
  }
});

module.exports = router;
