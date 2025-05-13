/* 
Routes
Route Description
/future-meals	Respond with all meals in the future (relative to the when datetime)
/past-meals	Respond with all meals in the past (relative to the when datetime)
/all-meals	Respond with all meals sorted by ID
/first-meal	Respond with the first meal (meaning with the minimum id)
/last-meal	Respond with the last meal (meaning with the maximum id)

Responses
All the specified routes should respond with JSON with the available columns from the meal table.

Multiple meals: /future-meals, /past-meals and /all-meals are expected to respond with a collection of meals, meaning an array of objects.

Single meal: The other 2 routes, /first-meal and /last-meal, are expected to respond with a single meal, meaning an object.

What if there are no meals?: /first-meal and /last-meal should in that case return a 404 response with an explanation that there are no meals. The other routes should in that case just return an empty array.
*/

import express from "express";
import { getMeals } from "./models.js";

const app = express();
const PORT = process.env.PORT;

const error404 = "There are no meal for your request";

/* Function that checks whether the meals array is empty*/
const mealError = (meals, res) => {
  if (meals.length === 0) {
    res.status(404).send(error404);
  } else {
    res.json(meals);
  }
};

app.get("/", (req, res) => {
  res.send("Welcome to Meal Sharing");
});

app.get("/all-meals", async (req, res) => {
  const meals = await getMeals("ORDER BY id");
  mealError(meals, res);
});

app.get("/future-meals", async (req, res) => {
  const meals = await getMeals("WHERE when_time > NOW()");
  mealError(meals, res);
});

app.get("/past-meals", async (req, res) => {
  const meals = await getMeals("WHERE when_time < NOW()");
  mealError(meals, res);
});

app.get("/first-meal", async (req, res) => {
  const meals = await getMeals("WHERE id = (SELECT MIN(id) FROM meal)");
});

app.get("/last-meal", async (req, res) => {
  const meals = await getMeals("WHERE id = (SELECT MAX(id) FROM meal)");
  mealError(meals, res);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
