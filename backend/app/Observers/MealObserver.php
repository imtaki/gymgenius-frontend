<?php

namespace App\Observers;

use App\Models\Meal;
use Illuminate\Support\Facades\Cache;

class MealObserver
{
    /**
     * Handle the Meal "saved" event (covers created and updated).
     */
    public function saved(Meal $meal)
    {
        $this->clearCache($meal);
    }

    /**
     * Handle the Meal "deleted" event.
     */
    public function deleted(Meal $meal)
    {
        $this->clearCache($meal);
    }

    /**
     * Centralized cache busting logic
     */
    protected function clearCache(Meal $meal)
    {
        Cache::forget("meal_{$meal->id}");
        Cache::forget("user_{$meal->user_id}_meals");
    }
}