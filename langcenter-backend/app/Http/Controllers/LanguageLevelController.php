<?php

namespace App\Http\Controllers;

use App\Models\LanguageLevel;
use Illuminate\Http\Request;

class LanguageLevelController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $levels = LanguageLevel::all();
        return response()->json($levels);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => 'required|string'
        ]);
        $level = LanguageLevel::create($data);
        return response()->json($level);
    }

    /**
     * Display the specified resource.
     */
    public function show(LanguageLevel $languageLevel)
    {
        return response($languageLevel);
    }


    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, LanguageLevel $languageLevel)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(LanguageLevel $languageLevel)
    {
        //
    }
}
