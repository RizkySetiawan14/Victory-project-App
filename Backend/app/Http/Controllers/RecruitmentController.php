<?php

namespace App\Http\Controllers;

use App\Models\Recruitment;
use Illuminate\Http\Request;

class RecruitmentController extends Controller
{
    public function index()
    {
        // Ambil data terbaru dulu
        return Recruitment::orderBy('id', 'asc')->get();
        return response()->json($data, 200, [], JSON_PRETTY_PRINT);
    }

    public function store(Request $request)
    {
        // Validasi input
        $validated = $request->validate([
            'lamaran' => 'required|integer|min:1',
            'interview' => 'required|integer|min:1',
            'training' => 'required|integer|min:1',
        ]);

        // Simpan data
        $recruitment = Recruitment::create($validated);

        return response()->json([
            'message' => 'Data recruitment berhasil disimpan',
            'data' => $recruitment,
        ], 201);
    }
}
