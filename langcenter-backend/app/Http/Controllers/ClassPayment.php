<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Class_;
use App\Http\Resources\ClassRessource;
use App\Models\Etudiant;
use stdClass;

class ClassPayment extends Controller
{
    public function getPayment(Request $request)
    {
        $etudiant = Etudiant::find($request->etudiantId);
        if (!$etudiant) {
            return response()->json(['message' => 'Etudiant not found'], 404);
        }
        $payment = $etudiant->inscrireClasses->where('class__id', $request->id)->first()->payments ?? null;
        $payment->negotiated_price = $etudiant->inscrireClasses->where('class__id', $request->id)->first()->negotiated_price ?? null;
        $payment->status = $etudiant->inscrireClasses->where('class__id', $request->id)->first()->payment_status ?? null;
        $payment->totalPaid = $etudiant->inscrireClasses->where('class__id', $request->id)->first()->payments->sum('amount') ?? null;
        //get negotiated price from one payment
        return response()->json(['payment' => $payment, 'negotiated_price' => $payment->negotiated_price, 'status' => $payment->status, 'total' => $payment->totalPaid], 200);
    }
}
