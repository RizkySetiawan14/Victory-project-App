<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\InputSdm;

class InputSdmController extends Controller
{
    // Simpan data SDM baru
    public function store(Request $request)
    {
        $nama_sdm_direkrut = $request->input('nama_sdm_direkrut');
        $mgm = filter_var($request->input('mgm'), FILTER_VALIDATE_BOOLEAN);
        $ro = filter_var($request->input('ro'), FILTER_VALIDATE_BOOLEAN);
        $tanggal_masuk = $request->input('tanggal_masuk'); // <-- Tambahan

        // Validasi
        $validated = validator([
            'nama_sdm_direkrut' => $nama_sdm_direkrut,
            'mgm' => $mgm,
            'ro' => $ro,
            'tanggal_masuk' => $tanggal_masuk
        ], [
            'nama_sdm_direkrut' => 'required|string|max:255',
            'mgm' => 'nullable|boolean',
            'ro' => 'nullable|boolean',
            'tanggal_masuk' => 'required|date' // <-- Tambahan validasi
        ])->validate();

        // Simpan data
        $data = new InputSdm();
        $data->nama_sdm_direkrut = $nama_sdm_direkrut;
        $data->mgm = $mgm;
        $data->ro = $ro;
        $data->tanggal_masuk = $tanggal_masuk; // <-- Tambahan
        $data->save();

        return response()->json([
            'message' => 'Data SDM berhasil disimpan',
            'data' => $data
        ], 201);
    }

    // Menampilkan semua data
    public function index()
    {
        $data = InputSdm::all();
        return response()->json($data, 200, [], JSON_PRETTY_PRINT);

    }

    // Untuk detail 1 data
    public function show($id)
    {
        $data = InputSdm::findOrFail($id);
        return response()->json($data);
    }

    // Update
    public function update(Request $request, $id)
    {
        $data = InputSdm::findOrFail($id);

        $nama_sdm_direkrut = $request->input('nama_sdm_direkrut', $data->nama_sdm_direkrut);
        $mgm = filter_var($request->input('mgm', $data->mgm), FILTER_VALIDATE_BOOLEAN);
        $ro  = filter_var($request->input('ro', $data->ro), FILTER_VALIDATE_BOOLEAN);
        $tanggal_masuk = $request->input('tanggal_masuk', $data->tanggal_masuk); // <-- Tambahan

        $validated = validator([
            'nama_sdm_direkrut' => $nama_sdm_direkrut,
            'mgm' => $mgm,
            'ro'  => $ro,
            'tanggal_masuk' => $tanggal_masuk
        ], [
            'nama_sdm_direkrut' => 'required|string|max:255',
            'mgm' => 'nullable|boolean',
            'ro'  => 'nullable|boolean',
            'tanggal_masuk' => 'required|date' // <-- Tambahan validasi
        ])->validate();

        $data->nama_sdm_direkrut = $nama_sdm_direkrut;
        $data->mgm = $mgm;
        $data->ro = $ro;
        $data->tanggal_masuk = $tanggal_masuk; // <-- Tambahan
        $data->save();

        return response()->json([
            'message' => 'Data berhasil diperbarui',
            'data' => $data
        ]);
    }

    // Delete
    public function destroy($id)
    {
        $data = InputSdm::findOrFail($id);
        $data->delete();

        return response()->json(['message' => 'Data berhasil dihapus']);
    }
}
