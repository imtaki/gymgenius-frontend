"use client";

import { useEffect, useState } from "react";
import { getExercises } from "../../api/exerciseService";

export default function ExercisesPage() {
  const [exercises, setExercises] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  async function fetchExercises() {
    try {
      setLoading(true);
      const res = await getExercises();
      console.log("Response from getExercises:", res);
      setExercises(res);
    } catch (error) {
      console.error("Error fetching exercises:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchExercises();
  }, []);

  // Filter exercises
  const filteredExercises = exercises.filter(exercise =>
    exercise.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold  mb-2">
            Exercises
          </h1>
          <p className="text-gray-500">
            {exercises.length} total exercises
          </p>
        </div>

        {/* Search */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search exercises..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full max-w-md px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="text-center py-12">
            <p className="text-gray-500">Loading...</p>
          </div>
        ) : filteredExercises.length === 0 ? (
          /* Empty State */
          <div className="text-center py-12">
            <p className="text-gray-500">No exercises found</p>
          </div>
        ) : (
          /* Exercise Grid */
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {filteredExercises.map((exercise) => (
              <div
                key={exercise.id}
                className="bg-white border border-gray-200 rounded-lg p-4 hover:border-gray-300 hover:shadow-sm transition-all cursor-pointer"
              >
                <h3 className="font-semibold text-sm  mb-1 line-clamp-2">
                  {exercise.name}
                </h3>
                <p className="text-xs text-gray-500">
                  {exercise.muscleGroup || "General"}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}