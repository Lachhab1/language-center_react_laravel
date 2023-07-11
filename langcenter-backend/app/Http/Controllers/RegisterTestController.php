<?php

namespace App\Http\Controllers;

use App\Models\RegisterTest;
use Illuminate\Http\Request;

class RegisterTestController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //show all register tests
        $registerTests = RegisterTest::all();
        return response()->json($registerTests, 200);
    }


    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //store a new register test
        $registerTest = RegisterTest::create($request->all());
        return response()->json($registerTest, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(RegisterTest $register)
    {
        //show a register test
        return response()->json($register, 200);
    }


    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, RegisterTest $register)
    {
        //edit a register test
        $register->update($request->all());
        return response()->json($register, 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(RegisterTest $register)
    {
        //delete a register test
        $register->delete();
        return response()->json(null, 204);
    }
}
