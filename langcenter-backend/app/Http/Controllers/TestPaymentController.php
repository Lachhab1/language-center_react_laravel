<?php

namespace App\Http\Controllers;

use App\Http\Resources\TestPayResource;
use App\Models\TestPayment;
use Illuminate\Http\Request;
use App\Models\RegisterTest;

class TestPaymentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return TestPayResource::collection(TestPayment::all());
    }


    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $data = $request->validate([
            'register_id' => 'required',
            'amount' => 'required',
            'payment_method' => 'required',
        ]);
        //store a new test payment
        $testPayment = new TestPayment();
        $testPayment->register_id = $request->register_id;
        $testPayment->amount = $request->amount;
        $testPayment->payment_method = $request->payment_method;
        //get the total paid amount for the test
        $totalPaid = TestPayment::where('register_id', $request->register_id)->sum('amount');
        //get the total amount for the test
        $totalAmount = RegisterTest::find($request->register_id)->test->price;
        //check if the total paid amount is less than the total amount
        if ($totalPaid >= $totalAmount) {
            $testPayment->status = 'paid';
        } else {
            $testPayment->status = 'unpaid';
        }
        $testPayment->save();
        return response()->json($testPayment, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(TestPayment $testPayment)
    {
        return TestPayResource::make($testPayment);
    }


    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, TestPayment $testPayment)
    {
        //update the test payment
        $data = $request->validate([
            'register_id' => 'required',
            'amount' => 'required',
            'payment_method' => 'required',
        ]);
        $testPayment->register_id = $request->register_id;
        $testPayment->amount = $request->amount;
        $testPayment->payment_method = $request->payment_method;
        //get the total paid amount for the test
        $totalPaid = TestPayment::where('register_id', $request->register_id)->sum('amount');
        //get the total amount for the test
        $totalAmount = RegisterTest::find($request->register_id)->test->price;
        //check if the total paid amount is less than the total amount
        if ($totalPaid >= $totalAmount) {
            $testPayment->status = 'paid';
        } else {
            $testPayment->status = 'unpaid';
        }
        $testPayment->save();
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
