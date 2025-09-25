<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Ro extends Model
{
    use HasFactory;

    protected $fillable = [
        'lamaran_masuk',
        'interview',
        'training',
        'masuk_team',
        'market_closing',
        'event',
    ];
}

