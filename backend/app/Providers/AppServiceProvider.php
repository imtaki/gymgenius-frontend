<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use App\Models\Meal;
use App\Models\UserSettings;
use App\Observers\MealObserver;
use App\Observers\UserSettingsObserver;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Meal::observe(MealObserver::class);
        UserSettings::observe(UserSettingsObserver::class);

    }
}
