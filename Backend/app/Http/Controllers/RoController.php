<?php

namespace App\Http\Controllers;

use App\Models\Ro;
use Illuminate\Http\Request;

class RoController extends Controller
{
    public function index()
    {
        return response()->json(Ro::all());
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'lamaran_masuk' => 'required|integer',
            'interview' => 'required|integer',
            'training' => 'required|integer',
            'masuk_team' => 'required|integer',
            'market_closing' => 'required|integer',
            'event' => 'required|integer',
        ]);

        $ro = Ro::create($validated);
        return response()->json($ro, 201);
    }

    public function show($id)
    {
        return response()->json(Ro::findOrFail($id));
    }

    public function update(Request $request, $id)
    {
        $ro = Ro::findOrFail($id);
        $ro->update($request->all());
        return response()->json($ro);
    }

    public function destroy($id)
    {
        $ro = Ro::findOrFail($id);
        $ro->delete();
        return response()->json(null, 204);
    }
}
