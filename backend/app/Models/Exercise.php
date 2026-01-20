<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
class Exercise extends Model
{
    use HasFactory;
    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */

    protected $fillable = [
        'name',
        'muscleGroup',
        'description',
        'user_id',
    ];

    protected $table = 'exercises';

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
