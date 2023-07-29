<?php

namespace App\Http\Controllers;

use App\Models\Class_;
use Illuminate\Http\Request;
use App\Models\Teacher;
use App\Models\Etudiant;
use App\Models\InscrireClass;
use App\Models\Parent_;
use App\Models\Payment;
use App\Models\Classroom;
use App\Models\Tests;
use App\Models\Cours;

class NumberController extends Controller
{
    function index()
    {
        $teachers = Teacher::all()->count();
        $etudiants = Etudiant::all()->count();
        $parents = Parent_::all()->count();
        $total_payment = 0;
        $payments = Payment::all();
        $femaleCount = Etudiant::where('sexe', 'female')->count();
        $maleCount = $etudiants - $femaleCount;
        $totalClasses = Class_::all()->count();
        $totalClassrooms = Classroom::all()->count();
        $totalTests = Tests::all()->count();
        $totalCourses = Cours::all()->count();

        foreach ($payments as $payment) {
            $total_payment += (float)$payment->amount;
        }
        return response()->json([
            'teachers' => (int) $teachers,
            'etudiants' => (int) $etudiants,
            'parents' => (int) $parents,
            'total_payment' => (float) $total_payment,
            'femaleCount' => (int) $femaleCount,
            'maleCount' => (int) $maleCount,
            'totalClasses' => (int) $totalClasses,
            'totalClassrooms' => (int) $totalClassrooms,
            'totalTests' => (int) $totalTests,
            'totalCourses' => (int) $totalCourses,
        ]);
    }
}
