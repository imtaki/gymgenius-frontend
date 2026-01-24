<?php

namespace App\Observers;

use App\Models\UserSettings;

class UserSettingsObserver
{
   /**
     * Handle the Meal "saved" event (covers created and updated).
     */
    public function saved(UserSettings $settings)
    {
        $this->clearCache($settings);
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
    protected function clearCache(UserSettings $settings)
    {
        Cache::forget("setting_{$settings->id}");
        Cache::forget("user_{$settings->user_id}_settings");
    }
}
