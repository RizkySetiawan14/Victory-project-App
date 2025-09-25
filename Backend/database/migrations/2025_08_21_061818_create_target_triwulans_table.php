<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('target_triwulans', function (Blueprint $table) {
            $table->id();
            // angka dari form (USD)
            $table->decimal('nmi_per_bulan', 15, 2);
            $table->decimal('total_nmi', 15, 2);

            // parameter perhitungan (bisa override dari FE, default sesuai FE-mu)
            $table->decimal('kurs_usd_idr', 15, 2)->default(10000);
            $table->decimal('target_triwulan_idr', 18, 2)->default(300000000);

            // nilai hasil (disimpan biar cepat dipakai kembali)
            $table->decimal('target_usd', 18, 2)->nullable();        // = target_triwulan_idr / kurs_usd_idr
            $table->decimal('kurang_target_usd', 18, 2)->nullable(); // = target_usd - total_nmi

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('target_triwulans');
    }
};
?>