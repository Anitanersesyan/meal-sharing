"use client";

import React, { Suspense } from "react";
import MealsList from "../../components/MealsList/MealsList";

export const dynamic = "force-dynamic";

export default function MealsPage() {
  return (
    <main>
      <Suspense fallback={<p>Loading meals...</p>}>
        <MealsList />
      </Suspense>
    </main>
  );
}
