<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateNaTeamsTable extends Migration
{
    public function up()
    {
        Schema::create('na_teams', function (Blueprint $table) {
            $table->id();
            $table->string('nama_afp');               // nama AFP
            $table->decimal('margin', 15, 2)->default(0); // margin (nilai uang)
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('na_teams');
    }
}
?>