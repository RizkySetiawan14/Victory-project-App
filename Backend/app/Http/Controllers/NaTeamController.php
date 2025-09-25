<?php

namespace App\Http\Controllers;

use App\Models\NaTeam;
use Illuminate\Http\Request;

class NaTeamController extends Controller
{
    // GET /api/na-teams
    public function index()
    {
        // ubah order sesuai kebutuhan: 'desc' / 'asc'
        return NaTeam::orderBy('id', 'asc')->get();
        return response()->json($data, 200, [], JSON_PRETTY_PRINT);
    }

    // POST /api/na-teams
    public function store(Request $request)
    {
        $validated = $request->validate([
            'nama_afp' => 'required|string|max:255',
            'margin'   => 'required|numeric|min:0',
        ]);

        $nateam = NaTeam::create($validated);

        return response()->json([
            'message' => 'Data NA Team berhasil disimpan',
            'data' => $nateam,
        ], 201);
    }

    // Optional: show single
    public function show($id)
    {
        $item = NaTeam::find($id);
        if (!$item) return response()->json(['message' => 'Not found'], 404);
        return $item;
    }

    // Optional: update
    public function update(Request $request, $id)
    {
        $validated = $request->validate([
            'nama_afp' => 'sometimes|required|string|max:255',
            'margin'   => 'sometimes|required|numeric|min:0',
        ]);

        $item = NaTeam::find($id);
        if (!$item) return response()->json(['message' => 'Not found'], 404);

        $item->update($validated);

        return response()->json([
            'message' => 'Data NA Team berhasil diperbarui',
            'data' => $item,
        ]);
    }

    // Optional: delete
    public function destroy($id)
    {
        $item = NaTeam::find($id);
        if (!$item) return response()->json(['message' => 'Not found'], 404);

        $item->delete();

        return response()->json(['message' => 'Data NA Team dihapus']);
    }
}
?>