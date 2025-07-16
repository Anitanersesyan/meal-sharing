import express from "express";
import { StatusCodes } from "http-status-codes/build/cjs/index.js";
import db from "../db.js";

const router = express.Router();

// GET /api/reviews - Returns all reviews
router.get("/", async (req, res) => {
  try {
    const reviews = await db.select().from("review");
    res.status(StatusCodes.OK).json(reviews);
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: "Internal server error, failed to fetch reviews",
    });
  }
});

// GET /api/reviews/:mealId - Returns all reviews for a specific meal
router.get("/:mealId", async (req, res) => {
  try {
    const mealId = Number(req.params.mealId);
    if (isNaN(mealId)) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ error: "Invalid meal ID" });
    }
    const reviews = await db("review").where({ meal_id: mealId });
    res.status(StatusCodes.OK).json(reviews);
  } catch (error) {
    console.error(error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Internal server error" });
  }
});

// POST /api/reviews - Add a new review
router.post("/", async (req, res) => {
  try {
    const { title, description, stars, meal_id, created_date } = req.body;
    if (!title || !description || !stars || !meal_id) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ error: "Missing required fields" });
    }

    const [newReview] = await db("review")
      .insert({ title, description, stars, meal_id, created_date })
      .returning("*"); // returning inserted row(s)

    res.status(StatusCodes.CREATED).json(newReview);
  } catch (error) {
    console.error("Create review error:", error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: "Internal server error, failed to create review",
    });
  }
});

// PUT /api/reviews/:id - Update a review by id
router.put("/:id", async (req, res) => {
  try {
    const updatedCount = await db("review")
      .where({ id: req.params.id })
      .update(req.body);

    if (!updatedCount) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: "Review not found" });
    }

    res.status(StatusCodes.OK).json({ message: "Review updated successfully" });
  } catch (error) {
    console.error("Update review error:", error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: "Internal server error, failed to update review",
    });
  }
});

// DELETE /api/reviews/:id - Delete a review by id
router.delete("/:id", async (req, res) => {
  try {
    const deletedCount = await db("review").where({ id: req.params.id }).del();

    if (!deletedCount) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: "Review not found" });
    }

    res.status(StatusCodes.OK).json({ message: "Review deleted successfully" });
  } catch (error) {
    console.error("Delete review error:", error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: "Internal server error, failed to delete review",
    });
  }
});

export default router;
