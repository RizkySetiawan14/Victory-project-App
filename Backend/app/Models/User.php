<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    use Notifiable;

    protected $fillable = [
        'username',   // tambahin ini
        'password',
        'role',
        'parent_id',
        'team_id'
    ];

    protected $hidden = [
        'password',
    ];
}