<?php

namespace App\Http\Controllers;

use App\Models\InscrireClass;
use Illuminate\Http\Request;
use App\Http\Resources\InscrireClassRessource;
use App\Models\Etudiant;
use App\Models\Payment;
use App\Models\Class_;
use App\Models\LanguageLevel;


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
                'class_id' => 'integer',
                'negotiated_price' => 'required|integer',
            ]);
            $inscrireClass = new InscrireClass();
            $etudiant = Etudiant::findOrFail($request->etudiant_id);


            //check if the request has class
            if ($request->class_id) {
                $inscrireClass->etudiant()->associate($etudiant);
                $inscrireClass->class_()->associate($request->class_id);
                //store level
                $level = Class_::findOrFail($request->class_id)->level;
                $level_record = LanguageLevel::where('name', $level)->first();
                $etudiant->level_id = $level_record->id;
                $etudiant->save();
            } else {
                $inscrireClass->etudiant()->associate($etudiant);
            }
            $inscrireClass->inscription_date = now();
            $inscrireClass->negotiated_price = $request->negotiated_price;
            $inscrireClass->save();
            return response($inscrireClass, 201);
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
            'type' => 'string',
        ]);
        $paymentAmount = $request->payment_amount;
        $paymentDate = now();

        // Create a new payment record
        $payment = new Payment([
            'amount' => $paymentAmount,
            'payment_date' => $paymentDate,
            'type' => $request->type,
        ]);
        $inscrire->payment()->save($payment);
        $negotiatedPrice = $inscrire->negotiated_price;
        // Update the payment status based on the payment amount and negotiated price
        $totalPayment = $inscrire->payments->sum('amount');
        if ($totalPayment >= $negotiatedPrice) {
            $paymentStatus = 'Paid';
        } elseif ($totalPayment > 0) {
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
    public function updatePayment(Request $request, $id)
    {
        $payment = Payment::find($id);
        $inscrire = $payment->inscrireClass;
        $request->validate([
            'payment_amount' => 'required|integer',
            'type' => 'string',
            'negotiated_price' => 'required|integer',
        ]);
        $paymentAmount = $request->payment_amount;
        $paymentDate = now();

        // Retrieve the existing payment record 

        if (!$payment) {
            // If no payment record exists, create a new one
            $payment = new Payment();
        }
        // Update the payment record with the new amount and date
        $payment->amount = $paymentAmount;
        $payment->payment_date = $paymentDate;
        $payment->type = $request->type;
        $payment->save();
        $negotiatedPrice = $request->negotiated_price;
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
        $inscrire->negotiated_price = $negotiatedPrice;
        // Associate the payment with the inscription
        $inscrire->save();

        return response()->json([
            'message' => 'Payment updated successfully.',
            'inscrire' => $inscrire,
            'payment' => $payment,
        ]);
    }
    public function deletePayment($id)
    {
        $pay = Payment::find($id);
        $inscrire = $pay->inscrireClass;

        if (!$inscrire) {
            return response()->json(['message' => 'Inscrire not found.'], 404);
        }

        // Retrieve the associated payment record

        if (!$pay) {
            return response()->json(['message' => 'Payment not found.'], 404);
        }
        // Delete the payment record
        $pay->delete();
        // Update the payment status and negotiated price in the inscription
        $negotiatedPrice = 0;
        $negotiatedPrice = $inscrire->negotiated_price;
        $totalPayment = $inscrire->payments->sum('amount');
        if ($totalPayment >= $negotiatedPrice) {
            $inscrire->payment_status = 'Paid';
        } elseif ($totalPayment > 0) {
            $inscrire->payment_status = 'Partial Payment';
        } else {
            $inscrire->payment_status = 'Unpaid';
        }
        $inscrire->save();

        return response()->json(['message' => 'Payment deleted successfully.']);
    }
}
