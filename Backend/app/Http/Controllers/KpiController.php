<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;
use Carbon\Carbon;

class KpiController extends Controller
{
    public function getKpi(Request $request)
    {
        $role = $request->query('role');
        $startInput = $request->query('start_date');
        $endInput = $request->query('end_date');

        // default kalau tidak diset: bulan berjalan
        try {
            if ($startInput && $endInput) {
                $start = Carbon::parse($startInput)->startOfDay();
                $end   = Carbon::parse($endInput)->endOfDay();
            } else {
                $start = Carbon::now()->startOfMonth();
                $end   = Carbon::now()->endOfDay();
            }
        } catch (\Exception $e) {
            return response()->json(['error' => 'Format tanggal tidak valid. Pakai YYYY-MM-DD'], 400);
        }

        if (!in_array($role, ['mm', 'asman', 'cmm'])) {
            return response()->json(['error' => 'Role tidak valid. Gunakan role=mm|asman|cmm'], 400);
        }

        // panggil fungsi sesuai role
        switch ($role) {
            case 'mm':
                $data = $this->getMmKpi($start, $end);
                break;
            case 'asman':
                $data = $this->getAsmanKpi($start, $end);
                break;
            case 'cmm':
                $data = $this->getCmmKpi($start, $end);
                break;
        }

        return response()->json([
            'role' => $role,
            'periode' => [$start->toDateString(), $end->toDateString()],
            'data' => $data
        ]);
    }

    /**
     * Hitung KPI MM (sesuaikan nama tabel/kolom kalau beda di DBmu)
     */
    private function getMmKpi($start, $end)
    {
        // Ambil data aman: cek dulu apakah table ada, kalau tidak ada set 0
        $lamaran = Schema::hasTable('mm_recruitment')
            ? (float) DB::table('mm_recruitment')->whereBetween('created_at', [$start, $end])->sum('lamaran')
            : 0;

        $interview = Schema::hasTable('mm_recruitment')
            ? (float) DB::table('mm_recruitment')->whereBetween('created_at', [$start, $end])->sum('interview')
            : 0;

        $training = Schema::hasTable('mm_recruitment')
            ? (float) DB::table('mm_recruitment')->whereBetween('created_at', [$start, $end])->sum('training')
            : 0;

        $totalSdm = Schema::hasTable('input_sdm_mm')
            ? (int) DB::table('input_sdm_mm')->whereBetween('created_at', [$start, $end])->count()
            : 0;

        $newData = Schema::hasTable('mm_new_data')
            ? (int) DB::table('mm_new_data')->whereBetween('created_at', [$start, $end])->count()
            : 0;

        $hotProspek = Schema::hasTable('mm_hot_prospects')
            ? (int) DB::table('mm_hot_prospects')->whereBetween('created_at', [$start, $end])->count()
            : 0;

        $projections = Schema::hasTable('mm_projections')
            ? (int) DB::table('mm_projections')->whereBetween('created_at', [$start, $end])->count()
            : 0;

        // NMI: asumsi ada tabel mm_nmi_transactions dengan kolom 'amount' (nilai dalam juta atau sesuai DB)
        $nmi = Schema::hasTable('mm_nmi_transactions')
            ? (float) DB::table('mm_nmi_transactions')->whereBetween('created_at', [$start, $end])->sum('amount')
            : 0;

        // Disiplin kerja: contoh asumsi tabel mm_attendance dengan kolom days_in_week per user atau catatan presensi
        // Jika tabel tidak ada, nilai 0 — kamu bisa ganti logic ini sesuai struktur DB presensi kamu.
        $disiplin = 0;
        if (Schema::hasTable('mm_attendance')) {
            // contoh: hitung rata-rata hari hadir per user dalam periode
            try {
                $attendance = DB::table('mm_attendance')
                    ->selectRaw('user_id, COUNT(DISTINCT DATE(att_date)) as hari_hadir')
                    ->whereBetween('att_date', [$start->toDateString(), $end->toDateString()])
                    ->groupBy('user_id')
                    ->get();
                $countUsers = $attendance->count();
                $sumHari = $attendance->sum('hari_hadir');
                $disiplin = $countUsers ? round($sumHari / $countUsers, 2) : 0;
            } catch (\Exception $e) {
                $disiplin = 0;
            }
        }

        // Definisi row KPI sesuai sheet MM (sesuaikan target & bobot jika beda)
        $rowsConfig = [
            ['no' => 1, 'area' => 'DISIPLIN KERJA', 'poin' => 'hari masuk kerja dalam 1 minggu', 'bobot' => 5,  'target' => 5,  'satuan' => 'HARI', 'hasil' => $disiplin],
            ['no' => 2, 'area' => 'SDM',              'poin' => 'penambahan sdm team per minggu baik dari RO maupun MGM', 'bobot' => 10, 'target' => 2,  'satuan' => 'ORANG', 'hasil' => $totalSdm],
            ['no' => 3, 'area' => 'DATABASE NASABAH','poin' => 'jumlah new database nasabah per minggu', 'bobot' => 10, 'target' => 25, 'satuan' => 'ORANG', 'hasil' => $newData],
            ['no' => 4, 'area' => 'NEW HOT PROSPEK','poin' => 'jumlah new hot prospek yang muncul dalam 1 minggu', 'bobot' => 10, 'target' => 5,  'satuan' => 'ORANG', 'hasil' => $hotProspek],
            ['no' => 5, 'area' => 'NEW PROJECTION', 'poin' => 'jumlah new projection yang muncul dari hot prospek minggu sebelumnya', 'bobot' => 25, 'target' => 1,  'satuan' => 'ORANG', 'hasil' => $projections],
            ['no' => 6, 'area' => 'NMI',            'poin' => 'jumlah margin in plus inject dikurangi WD', 'bobot' => 40, 'target' => 25, 'satuan' => 'JUTA', 'hasil' => $nmi],
        ];

        // hitung skor & skor akhir
        $rows = [];
        $totalSkorAkhir = 0;
        foreach ($rowsConfig as $r) {
            $skor = $this->calcSkor($r['hasil'], $r['target']);
            $skorAkhir = $this->calcSkorAkhir($skor, $r['bobot']);
            $totalSkorAkhir += $skorAkhir;

            $rows[] = array_merge($r, [
                'skor' => $skor,
                'skor_akhir' => $skorAkhir,
            ]);
        }

        return [
            'items' => $rows,
            'total_skor' => round($totalSkorAkhir, 2)
        ];
    }

    /**
     * Contoh sederhana Asman KPI (sesuaikan query & mapping sesuai sheet Asman)
     */
    private function getAsmanKpi($start, $end)
    {
        $newData = Schema::hasTable('asman_new_data')
            ? (int) DB::table('asman_new_data')->whereBetween('created_at', [$start, $end])->count()
            : 0;

        $nasabahDitemui = Schema::hasTable('asman_nasabah')
            ? (int) DB::table('asman_nasabah')->whereBetween('created_at', [$start, $end])->count()
            : 0;

        // simple response, kamu bisa ubah jadi rows sama seperti MM
        return [
            'items' => [
                ['no' => 1, 'area' => 'NEW DATA', 'hasil' => $newData],
                ['no' => 2, 'area' => 'NASABAH DITEMUI', 'hasil' => $nasabahDitemui],
            ]
        ];
    }

    /**
     * Contoh sederhana CMM KPI (sesuaikan query & mapping sesuai sheet CMM)
     */
    private function getCmmKpi($start, $end)
    {
        $progressMm = Schema::hasTable('mm_progress')
            ? (int) DB::table('mm_progress')->whereBetween('created_at', [$start, $end])->count()
            : 0;

        $targetTriwulan = Schema::hasTable('cmm_targets')
            ? (float) DB::table('cmm_targets')->whereBetween('created_at', [$start, $end])->sum('target_amount')
            : 0;

        return [
            'items' => [
                ['no' => 1, 'area' => 'PROGRESS MM', 'hasil' => $progressMm],
                ['no' => 2, 'area' => 'TARGET TRIWULAN', 'hasil' => $targetTriwulan],
            ]
        ];
    }

    private function calcSkor($hasil, $target)
    {
        if ($target <= 0) return 0.0;
        $val = ($hasil / $target) * 100;
        if ($val > 100) $val = 100;
        return round($val, 2);
    }

    private function calcSkorAkhir($skor, $bobot)
    {
        return round(($skor * $bobot) / 100, 2);
    }
}
