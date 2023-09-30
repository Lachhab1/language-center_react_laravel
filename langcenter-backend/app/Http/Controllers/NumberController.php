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
use App\Models\Expenses;
use App\Models\TeacherSalary;

class NumberController extends Controller
{
    function index()
    {
        $teachers = Teacher::all()->count();
        $etudiants = Etudiant::all()->count();
        $parents = Parent_::all()->count();
        $total_payment = 0;
        $payments = Payment::all();
        $payment_month = Payment::whereMonth('created_at', date('m'))->get();
        $femaleCount = Etudiant::where('sexe', 'female')->count();
        $maleCount = $etudiants - $femaleCount;
        $totalClasses = Class_::all()->count();
        $totalClassrooms = Classroom::all()->count();
        $totalTests = Tests::all()->count();
        $totalCourses = Cours::all()->count();
        //get expanses for the current month
        $expanses_month = Expenses::whereMonth('created_at', date('m'))->get();
        $total_expanses_month = 0;
        $total_expanses = 0;
        $total_payment_month = 0;
        $total_salary = 0;
        $salaries = 0;
        foreach ($expanses_month as $expanse) {
            $total_expanses_month += (float)$expanse->expense_amount;
        }
        foreach (Expenses::all() as $expanse) {
            $total_expanses += (float)$expanse->expense_amount;
        }
        //teacher salary
        foreach (TeacherSalary::all() as $salary) {
            $total_salary += (float)$salary->salary;
        }
        //salary month
        foreach (TeacherSalary::whereMonth('created_at', date('m'))->get() as $salary) {
            $salaries += (float)$salary->salary;
        }
        foreach ($payments as $payment) {
            $total_payment += (float)$payment->amount;
        }
        //payment month
        foreach ($payment_month as $payment) {
            $total_payment_month += (float)$payment->amount;
        }
        //due payment
        $due_payment = 0;
        $inscrire = InscrireClass::all();
        foreach ($inscrire as $inscrire) {
            $due_payment += (float)$inscrire->negotiated_price - (float)$inscrire->payment()->sum('amount');
        }
        return response()->json([
            'teachers' => (int) $teachers,
            'etudiants' => (int) $etudiants,
            'parents' => (int) $parents,
            'total_payment' => (float) $total_payment,
            'total_payment_month' => (float) $total_payment_month,
            'femaleCount' => (int) $femaleCount,
            'maleCount' => (int) $maleCount,
            'totalClasses' => (int) $totalClasses,
            'totalClassrooms' => (int) $totalClassrooms,
            'totalTests' => (int) $totalTests,
            'totalCourses' => (int) $totalCourses,
            'total_expanses' => (float) $total_expanses,
            'total_expanses_month' => (float) $total_expanses_month,
            'due_payment' => (float) $due_payment,
            'total_salary' => (float) $total_salary,
            'salary_month' => (float) $salaries,
            'month' => date('m')
        ]);
    }
}
