import express from "express";
import { StatusCodes } from "http-status-codes";
import db from "../db.js";

const router = express.Router();

// /api/meals - GET	Returns all meals
router.get("/", async (req, res) => {
  try {
    const meals = await db.select().from("meal");
    res.status(StatusCodes.OK).json(meals);
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: "Internal server error, failed to fetch meals",
    });
  }
});

// /api/meals - POST Adds a new meal to the database
router.post("/", async (req, res) => {
  try {
    await db.insert(req.body).into("meal");
    res.status(StatusCodes.CREATED).json({});
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: "Internal server error, failed to add meal",
    });
  }
});

// /api/meals/:id- GET Returns the meal by id
router.get("/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) {
      return res.status(StatusCodes.BAD_REQUEST).json({ error: "Invalid ID" });
    }

    const meal = await db("meal").where({ id });

    if (meal.length === 0) {
      return res.status(StatusCodes.NOT_FOUND).json({
        error: "Meal not found",
      });
    }

    res.status(StatusCodes.OK).json(meal[0]);
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: "Internal server error, failed to fetch meal",
    });
  }
});

// /api/meals/:id	PUT	Updates the meal by id
router.put("/:id", async (req, res) => {
  try {
    const updatedCount = await db("meal")
      .where({ id: req.params.id })
      .update(req.body);

    if (!updatedCount) {
      return res.status(StatusCodes.NOT_FOUND).json({
        error: "Meal not found",
      });
    }
    res.status(StatusCodes.OK).json({ message: "Meal updated successfully" });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: "Internal server error, failed to update meal",
    });
  }
});

// /api/meals/:id- DELETE Deletes the meal by id
router.delete("/:id", async (req, res) => {
  try {
    const deletedCount = await db("meal").where({ id: req.params.id }).del();

    if (!deletedCount) {
      return res.status(StatusCodes.NOT_FOUND).json({
        error: "Meal not found",
      });
    }
    res.status(StatusCodes.OK).json({ message: "Meal deleted successfully" });
  } catch (error) {
    console.error("Delete meal error:", error.stack || error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: "Internal server error, failed to delete meal",
    });
  }
});

export default router;
