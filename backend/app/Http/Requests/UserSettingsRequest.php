<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use App\Enums\GoalType;
use Illuminate\Validation\Rules\Enum;

class UserSettingsRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true; 
    }

    public function rules(): array
    {
        return [
        'height' => 'required|numeric|min:0',
        'age' => 'required|integer|min:15',
        'caloric_goal' => 'required|integer|min:1000',
        'goal_type' => ['required', new Enum(GoalType::class)],
        'current_weight' => 'required|numeric|min:40', 
        'target_weight' => 'required|numeric|min:30', 
     ];
    }

    public function messages(): array
    {
        return [
           'height.min' => 'Height must be a positive number',
            'age.min' => 'Age must be at least 15 years',
            'caloric_goal.min' => 'Caloric goal must be at least 1000 calories',
            'current_weight.min' => 'Current weight must be at least 40 kg',
            'target_weight.min' => 'Target weight must be at least 30 kg',
        ];
    }
}