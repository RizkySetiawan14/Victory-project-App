<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class InputSdm extends Model
{
    use HasFactory;

    // jika nama tabel bukan plural default, set $table
    // protected $table = 'input_sdms';

    protected $fillable = [
        'nama_sdm_direkrut',
        'mgm',
        'ro',
        'tanggal_masuk',
    ];

    protected $casts = [
        'mgm' => 'boolean',
        'ro' => 'boolean',
        'tanggal_masuk' => 'date',
    ];
}
