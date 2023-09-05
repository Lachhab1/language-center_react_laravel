<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Payment;
use App\Models\Expenses;
use App\Models\TeacherSalary;
use Carbon\Carbon;
class Netprofit extends Controller
{
    public function  getProfit(Request $request)
    {
        //get 12 month data profit and expens and net earnings
        $Months = [
            1 => 'Janvier',
            2 => 'Février',
            3 => 'Mars',
            4 => 'Avril',
            5 => 'Mai',
            6 => 'Juin',
            7 => 'Juillet',
            8 => 'Août',
            9 => 'Septembre',
            10 => 'Octobre',
            11 => 'Novembre',
            12 => 'Décembre',
        ];
        $profit = [];
        $expanses = [];
        $expenses =[];
        $netEarnings = [];
        $year = Carbon::now()->year;
        $sal = [];

        //for each month get expanses and profit and net earning
        for ($i = 1; $i <= 12; $i++) {
            $profit[$i] = 0;
            $expanses[$i] = 0;

            $netEarnings[$i] = 0;
            $sal[$i] = 0;
            //get expanses for the current month and year
            $expanses_month = Expenses::whereMonth('created_at', $i)->whereYear('created_at', $year)->get();
            foreach ($expanses_month as $expanse) {
                $expanses[$i] += (float)$expanse->expense_amount;
            }
            //get profit for the current month
            $payments = Payment::whereMonth('created_at', $i)->whereYear('created_at', $year)->get();
            foreach ($payments as $payment) {
                $profit[$i] += (float)$payment->amount;
            }
            //get salary for the current month
            $salaries = TeacherSalary::where('month', $i)->where('year',$year)->get();
            foreach ($salaries as $salary) {
                $sal[$i] += (float)$salary->salary;
            }
            //total expense monthly
            $expenses[$i] = $expanses[$i] + $sal[$i];
            //get net earning for the current month
            $netEarnings[$i] = $profit[$i] - $expenses[$i];

        }
        $data = [];
        for ($i = 1; $i <= 12; $i++) {
            $data[$i] = [
                'month' => $Months[$i],
                'profit' => $profit[$i],
                'expense' => $expenses[$i]
            ];
        }
        return response()->json([
            'profit' => $profit,
            'expenses' => $expenses,
            'netEarnings' => $netEarnings,
            'months' => $Months,
        ]);
    }

}
