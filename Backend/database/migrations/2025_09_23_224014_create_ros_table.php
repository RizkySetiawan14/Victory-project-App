<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(){
        {
            Schema::create('ros', function (Blueprint $table) {
                $table->id();
                // Recruitment detail
                $table->integer('lamaran_masuk')->default(0);
                $table->integer('interview')->default(0);
                $table->integer('training')->default(0);

                // Kolom lain
                $table->integer('masuk_team')->default(0);
                $table->integer('market_closing')->default(0);
                $table->integer('event')->default(0);

                $table->timestamps();
            });
        }

    }
    public function down()
    {
        Schema::dropIfExists('ros');
    }
};
