<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use App\Models\Meal;

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
        Meal::observe(\App\Observers\MealObserver::class);
    }
}
