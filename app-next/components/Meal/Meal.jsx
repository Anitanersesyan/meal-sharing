import React from "react";
import styles from "../MealsList/MealsList.module.css";

const Meal = ({ meal }) => {
  return (
    <div className={styles.mealCard}>
      <h3 className={styles.mealTitle}>{meal.title}</h3>
      <p className={styles.mealDescription}>{meal.description}</p>
      <p className={styles.mealPrice}>
        Price: ${meal?.price ? Number(meal.price).toFixed(2) : "N/A"}
      </p>
    </div>
  );
};

export default Meal;
