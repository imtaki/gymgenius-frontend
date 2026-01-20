<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\ExerciseRequest;
use App\Models\Exercise;
use App\Services\ExerciseService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Gate;

class ExerciseController extends Controller
{
    public function __construct(ExerciseService $exerciseService)
    {
        $this->exerciseService = $exerciseService;
    }

    
    public function index()
    {
        try {
            $userId = Auth::id();
            $exercises = $this->exerciseService->getExercisesByUser($userId);
            return response()->json($exercises, 200);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    
    public function show($exerciseId)
    {
        try {
            $exercise = $this->exerciseService->getExerciseById($exerciseId);
            Gate::authorize('view', $exercise);
            return response()->json($exercise, 200);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 404);
        }
    }

    
    public function store(ExerciseRequest $request)
    {
        try {
            Gate::authorize('create', Exercise::class);
            $userId = Auth::id();
            $exercise = $this->exerciseService->createExercise($userId, $request->validated());
            return response()->json([
                'message' => 'Exercise created successfully',
                'exercise' => $exercise,
            ], 201);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

   
    public function update(ExerciseRequest $request, $exerciseId)
    {
        try {
            $exercise = Exercise::findOrFail($exerciseId);
            Gate::authorize('update', $exercise);
            $updated = $this->exerciseService->updateExercise($exerciseId, $request->validated());
            return response()->json([
                'message' => 'Exercise updated successfully',
                'exercise' => $updated,
            ], 200);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function destroy($exerciseId)
    {
        try {
            $exercise = Exercise::findOrFail($exerciseId);
            Gate::authorize('delete', $exercise);
            $this->exerciseService->deleteExercise($exerciseId);
            return response()->json(['message' => 'Exercise deleted successfully'], 200);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }


    public function muscleGroups()
    {
        try {
            $userId = Auth::id();
            $muscleGroups = Exercise::where('user_id', $userId)
                ->select('muscleGroup')
                ->distinct()
                ->whereNotNull('muscleGroup')
                ->orderBy('muscleGroup')
                ->pluck('muscleGroup');
            return response()->json($muscleGroups, 200);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
}