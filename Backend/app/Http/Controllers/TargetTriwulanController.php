<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\TargetTriwulan;

class TargetTriwulanController extends Controller
{
    /**
     * GET: Ambil semua data target triwulan
     */
    public function index()
    {
        $targets = TargetTriwulan::all()->map(function($item) {
            // Hitung selisih (target 30,000 USD dikali 10,000 → jadi IDR 300 juta)
            $targetUSD = 30000;
            $item->selisih = $targetUSD - $item->total_nmi;
            return $item;
        });

        return response()->json($targets, 200);
    }

    /**
     * POST: Simpan data target triwulan baru
     */
    public function store(Request $request)
    {
        // Validasi input
        $validated = $request->validate([
            'nmi_per_bulan' => 'required|numeric',
            'total_nmi'     => 'required|numeric',
            'tanggal'       => 'required|date',
        ]);

        // Simpan data ke database
        $target = TargetTriwulan::create($validated);

        // Tambahin field selisih di response
        $targetUSD = 30000;
        $target->selisih = $targetUSD - $target->total_nmi;

        return response()->json([
            'message' => 'Data berhasil disimpan',
            'data'    => $target
        ], 201);
    }
}
