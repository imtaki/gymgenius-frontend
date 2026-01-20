<?php

namespace App\Services;

use App\Models\Exercise;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class ExerciseService
{
    /**
     * Get all exercises for a user
     */
    public function getExercisesByUser($userId)
    {
        try {
            return Exercise::where('user_id', $userId)->get();
        } catch (\Exception $e) {
            throw new \Exception("Failed to retrieve exercises: {$e->getMessage()}");
        }
    }

    /**
     * Get exercise by ID
     */
    public function getExerciseById($id)
    {
        try {
            return Exercise::findOrFail($id);
        } catch (ModelNotFoundException $e) {
            throw new ModelNotFoundException("Exercise not found with ID: {$id}");
        }
    }

    /**
     * Create a new exercise for a user
     */
    public function createExercise($userId, $data): Exercise
    {
        try {
            $data['user_id'] = $userId;
            return Exercise::create($data);
        } catch (\Exception $e) {
            throw new \Exception("Failed to create exercise: {$e->getMessage()}");
        }
    }

    /**
     * Update an exercise
     */
    public function updateExercise($exerciseId, $data)
    {
        try {
            $exercise = Exercise::findOrFail($exerciseId);
            $exercise->update($data);
            return $exercise;
        } catch (ModelNotFoundException $e) {
            throw new ModelNotFoundException("Exercise not found with ID: {$exerciseId}");
        } catch (\Exception $e) {
            throw new \Exception("Failed to update exercise: {$e->getMessage()}");
        }
    }

    /**
     * Delete an exercise
     */
    public function deleteExercise($exerciseId)
    {
        try {
            $exercise = Exercise::findOrFail($exerciseId);
            return $exercise->delete();
        } catch (ModelNotFoundException $e) {
            throw new ModelNotFoundException("Exercise not found with ID: {$exerciseId}");
        } catch (\Exception $e) {
            throw new \Exception("Failed to delete exercise: {$e->getMessage()}");
        }
    }
}