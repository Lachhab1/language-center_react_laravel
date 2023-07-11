<?php

namespace App\Http\Controllers;

use App\Models\TestPayment;
use Illuminate\Http\Request;

class TestPaymentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return response()->json(TestPayment::all(), 200);
    }


    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //store a new test payment
        $testPayment = TestPayment::create($request->all());
        return response()->json($testPayment, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(TestPayment $testPayment)
    {
        return response()->json($testPayment, 200);
    }


    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, TestPayment $testPayment)
    {
        $testPayment->update($request->all());
        return response()->json($testPayment, 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(TestPayment $testPayment)
    {
        $testPayment->delete();
        return response()->json(null, 204);
    }
}
