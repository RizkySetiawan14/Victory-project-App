<?php
// database/migrations/2025_08_13_000000_create_nasabah_table.php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
        public function up(){
        Schema::create('nasabah', function (Blueprint $table) {
            $table->id();
            $table->string('nama_afp');
            $table->integer('new_data')->nullable();
            $table->integer('no')->nullable();
            $table->string('nama_nasabah');
            $table->string('status')->nullable();
            $table->date('tgl_tf_projection')->nullable();
            $table->decimal('top_up', 15, 2)->nullable();
            $table->text('progress_terakhir')->nullable();
            $table->text('strategi_closing')->nullable();
            $table->timestamps();
        });
}

    public function down()
    {
        Schema::dropIfExists('nasabah');
    }
};
?>