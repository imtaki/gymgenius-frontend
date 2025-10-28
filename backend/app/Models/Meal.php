<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Meal extends Model
{
    protected $fillable = [
        'name',
        'calories',
        'protein',
        'carbs',
        'fats'
    ];

    protected $casts = [
        'name' => 'string',
        'calories' => 'integer',
        'carbs' => 'float',
        'fats' => 'float'
    ];

    public function users() {
        return $this->belongsToMany(User::class, 'meal_user');
    }
}
