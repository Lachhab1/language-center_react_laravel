<?php

namespace App\Http\Controllers;

use App\Models\InscrireClass;
use Illuminate\Http\Request;
use App\Http\Resources\InscrireClassRessource;
use App\Models\Etudiant;
use App\Models\Payment;


class InscrireClassController extends Controller
{
    public function index()
    {
        $inscrireClasses = InscrireClass::orderBy('id', 'desc')->paginate(10);
        return InscrireClassRessource::collection($inscrireClasses);
    }
    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        try {
            $data = $request->validate([
                'etudiant_id' => 'required|integer',
                'class_id' => 'required|integer',
                'negotiated_price' => 'required|integer',
            ]);
            $inscrireClass = new InscrireClass();
            $etudiant = Etudiant::findOrFail($request->etudiant_id);
            $inscrireClass->etudiant()->associate($etudiant);
            $inscrireClass->class_()->associate($request->class_id);
            $inscrireClass->inscription_date = now();
            $inscrireClass->negotiated_price = $request->negotiated_price;
            $inscrireClass->save();
            return response(new InscrireClassRessource($inscrireClass), 201);
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()], 500);
        }
    }
    /**
     * Display the specified resource.
     */
    public function show(InscrireClass $inscrireClass)
    {
        return new InscrireClassRessource($inscrireClass);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, InscrireClass $inscrireClass)
    {
        try {
            $data = $request->validate([
                'negotiated_price' => 'required|integer',
            ]);
            $inscrireClass->negotiated_price = $request->negotiated_price;
            $inscrireClass->save();
            return response(new InscrireClassRessource($inscrireClass), 201);
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(InscrireClass $inscrireClass)
    {
        $inscrireClass->delete();
        return response()->json(['message' => 'InscrireClass deleted successfully'], 200);
    }

    public function registerPayment(Request $request, $id)
    {
        $inscrire = InscrireClass::find($id);
        $request->validate([
            'payment_amount' => 'required|integer',
        ]);
        $paymentAmount = $request->payment_amount;
        $paymentDate = now();

        // Create a new payment record
        $payment = new Payment([
            'amount' => $paymentAmount,
            'payment_date' => $paymentDate,
        ]);
        $inscrire->payment()->save($payment);
        $negotiatedPrice = $inscrire->negotiated_price;

        // Update the payment status based on the payment amount and negotiated price
        if ($paymentAmount >= $negotiatedPrice) {
            $paymentStatus = 'Paid';
        } elseif ($paymentAmount > 0) {
            $paymentStatus = 'Partial Payment';
        } else {
            $paymentStatus = 'Unpaid';
        }

        // Update the payment status and negotiated price in the inscription
        $inscrire->payment_status = $paymentStatus;
        // Associate the payment with the inscription
        $inscrire->save();

        return response()->json([
            'message' => 'Payment registered successfully.',
            'inscrire' => $inscrire,
            'payment' => $payment,
        ]);
    }
}
