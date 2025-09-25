<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class NaTeam extends Model
{
    use HasFactory;

    protected $fillable = [
        'nama_afp',
        'margin',
    ];

    // opsi cast supaya margin jadi decimal 2 digit saat diambil
    protected $casts = [
        'margin' => 'decimal:2',
    ];
}
?>