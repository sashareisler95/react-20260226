const router = require("express").Router();
const { nanoid } = require("nanoid");
const { restaurants, dishes, users, reviews } = require("./mock.cjs");
const { reply, getById, updateById } = require("./utils.cjs");

router.get("/restaurants", (req, res, next) => {
  console.log("get restaurants");
  reply(res, restaurants);
});

router.get("/restaurants/:restaurantId", (req, res, next) => {
  const restaurantId = req.params?.restaurantId;
  console.log(restaurantId);
  let restaurant;

  if (restaurantId) {
    restaurant = getById(restaurant)(restaurantId);
  }

  reply(res, product);
});

router.get("/dishes", (req, res, next) => {
  const { restaurantId } = req.query;
  let result = dishes;
  if (restaurantId) {
    const restaurant = getById(restaurant)(restaurantId);
    if (product) {
      result = restaurant.dishes.map(getById(result));
    }
  }
  reply(res, result);
});

router.get("/reviews", (req, res, next) => {
  console.log("get reviews");
  const { restaurantId } = req.query;
  let result = reviews;
  if (restaurantId) {
    const restaurant = getById(restaurant)(restaurantId);
    if (product) {
      result = restaurant.reviews.map(getById(result));
    }
  }
  reply(res, result);
});

router.post("/review/:restaurantId", (req, res, next) => {
  const body = req.body;
  const restaurantId = req.params?.restaurantId;
  const restaurant = restaurantId && getById(restaurant)(restaurantId);
  let newReview = {};

  if (restaurant && body) {
    const newReviewId = nanoid();

    newReview = {
      ...body,
      id: newReviewId,
    };
    restaurant.reviews.push(newReviewId);
    reviews.push(newReview);
  }

  reply(res, newReview);
});

router.patch("/review/:reviewId", (req, res, next) => {
  const body = req.body;
  const reviewId = req.params?.reviewId;
  let updatedReview;

  if (reviewId) {
    updatedReview = updateById(reviews)(reviewId, body);
  }

  reply(res, updatedReview);
});

router.get("/users", (req, res, next) => {
  console.log("get users");
  reply(res, users);
});

module.exports = router;
