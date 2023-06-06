<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Teacher;
use App\Models\Etudiant;
use App\Models\InscrireClass;
use App\Models\Parent_;
use App\Models\Payment;

class NumberController extends Controller
{
    function index()
    {
        $teachers = Teacher::all()->count();
        $etudiants = Etudiant::all()->count();
        $parents = Parent_::all()->count();
        $total_payment = 0;
        $payments = Payment::all();
        foreach ($payments as $payment) {
            $total_payment += $payment->amount;
        }
        return response()->json([
            'teachers' => $teachers,
            'etudiants' => $etudiants,
            'parents' => $parents,
            'total_payment' => $total_payment
        ]);
    }
}
