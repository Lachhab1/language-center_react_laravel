<?php

namespace App\Http\Controllers;

use App\Models\Tests;
use Illuminate\Http\Request;

class TestsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $tests = Tests::all();
        return response()->json($tests);
    }


    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Tests $tests)
    {
        //
    }


    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Tests $tests)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Tests $tests)
    {
        //
    }
}
