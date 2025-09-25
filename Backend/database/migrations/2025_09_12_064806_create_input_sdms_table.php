<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('input_sdms', function (Blueprint $table) {
            $table->id();
            $table->string('nama_sdm_direkrut'); 
            $table->boolean('mgm')->default(false);
            $table->boolean('ro')->default(false);
            $table->date('tanggal_masuk'); 
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('input_sdms');
    }
};
?>