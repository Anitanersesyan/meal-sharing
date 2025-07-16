"use client";

import React, { useEffect, useState } from "react";
import styles from "./MealsList.module.css";
import Meal from "../Meal/Meal";
import api from "../../utils/api";

const MealsList = () => {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMeals = async () => {
      try {
        const response = await fetch(api("/meals"), {
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(`Server responded with ${response.status}`);
        }

        const data = await response.json();
        setMeals(data);
      } catch (error) {
        setError(
          "Error loading meals: server unavailable. Please try again later."
        );
        console.error("Error fetching meals:", error);
      }
      setIsLoading(false);
    };

    fetchMeals();
  }, []);

  if (isLoading) {
    return <p className={styles.loading}>Loading meals...</p>;
  }

  if (error) {
    return <p className={styles.error}>{error}</p>;
  }

  if (meals.length === 0) {
    return <p className={styles.empty}>No meals available</p>;
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>All Available Meals</h2>{" "}
      <div className={styles.mealsList}>
        {meals.map((meal) => (
          <Meal key={meal.id} meal={meal} />
        ))}
      </div>
    </div>
  );
};

export default MealsList;
