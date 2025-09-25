<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Nasabah extends Model
{
    use HasFactory;

    protected $table = 'nasabah'; // sesuai migration

    protected $fillable = [
        'nama_afp',
        'new_data',
        'no',
        'nama_nasabah',
        'status',
        'tgl_tf_projection',
        'top_up',
        'progress_terakhir',
        'strategi_closing',
    ];
}
?>