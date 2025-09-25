<?php

namespace App\Http\Controllers;

use App\Models\Nasabah;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;

class ProgressAfpController extends Controller
{
    /**
     * GET /api/progress-afp
     * Ambil semua nasabah, dikelompokkan berdasarkan AFP.
     */
    public function review()
    {
        $grouped = Nasabah::orderBy('nama_afp')
            ->orderBy('no')
            ->get()
            ->groupBy('nama_afp')
            ->map(function ($items, $afp) {
                return [
                    'nama_afp'       => $afp,
                    'total_nasabah'  => $items->count(),
                    'total_topup'    => $items->sum('top_up'),
                    'nasabah'        => $items->values()
                ];
            })
            ->values();

        return response()->json($grouped, 200, [], JSON_PRETTY_PRINT);
    }

    public function summary()
   {
    $totalNewData = (int) Nasabah::whereNotNull('new_data')->sum('new_data');
    $nasabahDitemui = (int) Nasabah::whereNotNull('nama_nasabah')
        ->where(DB::raw("TRIM(nama_nasabah)"), '!=', '')
        ->count();

    return response()->json([
        'total_new_data'   => $totalNewData,
        'nasabah_ditemui'  => $nasabahDitemui,
    ]);
}
    
    public function byAfp($nama_afp)
    {
        $nasabah = Nasabah::where('nama_afp', $nama_afp)
            ->orderBy('no')
            ->get();

        return response()->json([
            'nama_afp'       => $nama_afp,
            'total_nasabah'  => $nasabah->count(),
            'total_topup'    => $nasabah->sum('top_up'),
            'nasabah'        => $nasabah
        ]);
    }

    /**
     * PUT /api/progress-afp/{id}
     * Update data nasabah (langsung dari menu review AFP).
     */
    public function update(Request $request, $id)
    {
        $nasabah = Nasabah::findOrFail($id);

        $validated = $request->validate([
            'status'            => 'nullable|string|max:100',
            'tgl_tf_projection' => 'nullable|date',
            'top_up'            => 'nullable|numeric|min:0',
            'progress_terakhir' => 'nullable|string',
            'strategi_closing'  => 'nullable|string',
        ]);

        $nasabah->update($validated);

        return response()->json([
            'message' => 'Progress nasabah berhasil diupdate',
            'data'    => $nasabah,
        ]);
    }

    /**
     * DELETE /api/progress-afp/{id}
     * Hapus nasabah dari menu review AFP.
     */
    public function destroy($id)
    {
        $nasabah = Nasabah::findOrFail($id);
        $nasabah->delete();

        return response()->json([
            'message' => 'Nasabah berhasil dihapus dari Progress AFP',
        ]);
    }


}
