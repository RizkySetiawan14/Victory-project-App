<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateRecruitmentsTable extends Migration
{
    public function up()
    {
        Schema::create('recruitments', function (Blueprint $table) {
            $table->id();
            $table->integer('lamaran');
            $table->integer('interview');
            $table->integer('training');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('recruitments');
    }
}
