<?php

namespace App\Http\Controllers;

use App\Models\days;
use App\Http\Controllers\Controller;
use App\Http\Resources\DaysResource;
use Illuminate\Http\Request;

class DaysController extends Controller
{
    /**
     * Display a listing of the resource.
     */

     
     public function index(Request $request)
     {
         if ($request->has('days_id')) {
             $dayId = $request->input('days_id');
             $day = days::where('id', $dayId)->select('name')->first();
     
             if ($day) {
                 return $day;
             } else {
                 return response()->json(['error' => 'Day not found'], 404);
             }
         } else {
             $days = days::select('name')->get();
             return $days;
         }
     }
     
    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        //
        $daysRes = days::findOrFail($id);
        return response()->json([
            'day' => $daysRes
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(days $days)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, days $days)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(days $days)
    {
        //
    }
}
