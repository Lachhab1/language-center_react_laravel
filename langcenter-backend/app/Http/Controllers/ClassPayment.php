<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Class_;
use App\Http\Resources\ClassRessource;
use App\Models\Etudiant;

class ClassPayment extends Controller
{
    public function getPayment(Request $request)
    {
        //return for etudiant and specific class payment

        $etudiant = Etudiant::find($request->etudiantId);
        if (!$etudiant) {
            return response()->json(['message' => 'Etudiant not found'], 404);
        }
        $payment = $etudiant->inscrireClasses->where('class__id', $request->id)->first()->payment ?? null;
        $payment->negotiated_price = $etudiant->inscrireClasses->where('class__id', $request->id)->first()->negotiated_price ?? null;
        $payment->status = $etudiant->inscrireClasses->where('class__id', $request->id)->first()->payment_status ?? null;
        return response()->json($payment, 200);
    }
}
