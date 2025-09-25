<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Nasabah;

class NasabahController extends Controller
{
    public function index()
    {
        return response()->json(Nasabah::all(), 200);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'nama_afp'          => 'required|string|max:255',
            'new_data'          => 'nullable|numeric',
            'no'                => 'nullable|numeric',
            'nama_nasabah'      => 'required|string|max:255',
            'status'            => 'required|string|max:100',
            'tgl_tf_projection' => 'nullable|date',
            'top_up'            => 'nullable|numeric',
            'progress_terakhir' => 'nullable|string',
            'strategi_closing'  => 'nullable|string',
        ]);

        $nasabah = Nasabah::create($validated);

        return response()->json([
            'message' => 'Data nasabah berhasil ditambahkan',
            'data'    => $nasabah
        ], 201);
    }

    public function show($id)
    {
        $nasabah = Nasabah::find($id);
        if (!$nasabah) return response()->json(['message' => 'Data tidak ditemukan'], 404);
        return response()->json($nasabah, 200);
    }

    public function update(Request $request, $id)
    {
        $nasabah = Nasabah::find($id);
        if (!$nasabah) return response()->json(['message' => 'Data tidak ditemukan'], 404);

        $validated = $request->validate([
            'nama_afp'          => 'required|string|max:255',
            'new_data'          => 'nullable|numeric',
            'no'                => 'nullable|numeric',
            'nama_nasabah'      => 'required|string|max:255',
            'status'            => 'required|string|max:100',
            'tgl_tf_projection' => 'nullable|date',
            'top_up'            => 'nullable|numeric',
            'progress_terakhir' => 'nullable|string',
            'strategi_closing'  => 'nullable|string',
        ]);

        $nasabah->update($validated);

        return response()->json([
            'message' => 'Data nasabah berhasil diupdate',
            'data'    => $nasabah
        ], 200);
    }

    public function destroy($id)
    {
        $nasabah = Nasabah::find($id);
        if (!$nasabah) return response()->json(['message' => 'Data tidak ditemukan'], 404);

        $nasabah->delete();

        return response()->json(['message' => 'Data nasabah berhasil dihapus'], 200);
    }
}
