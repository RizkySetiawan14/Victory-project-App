<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;

class DataController extends Controller
{
    public function progress(Request $request)
    {
        $user = User::find($request->user_id);

        if (!$user) {
            return response()->json(['message' => 'User tidak ditemukan'], 404);
        }

        // === HRD: Bisa lihat semua data ===
        if ($user->role === 'hrd') {
            $data = User::all();
        }
        // === CMM: Bisa lihat semua dalam satu tim ===
        elseif ($user->role === 'cmm') {
            $data = User::where('team_id', $user->team_id)->get();
        }
        // === MM: Hanya lihat asman yang parent_id = id MM ===
        elseif ($user->role === 'mm') {
            $data = User::where('parent_id', $user->id)->get();
        }
        // === Manajemen & Asman: hanya dirinya sendiri ===
        elseif (in_array($user->role, ['manajemen', 'asman'])) {
            $data = [$user];
        }
        // === Default ===
        else {
            $data = [];
        }

        return response()->json($data);
    }
}
