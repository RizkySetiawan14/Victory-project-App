<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TargetTriwulan extends Model
{
    use HasFactory;

    protected $table = 'target_triwulan'; // nama tabel di DB

    protected $fillable = [
        'nmi_per_bulan',
        'total_nmi',
        'tanggal',
    ];
}
