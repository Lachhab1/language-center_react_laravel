<?php

namespace App\Http\Controllers;

use App\Models\classroom;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use Illuminate\Support\Facades\Storage;
use Carbon\Carbon;


class ClassroomController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        return classroom::select('id','name','capacity')->get();
    }

 
    /**
     * Show the form for creating a new resource.
     */
//public function create()
  //  {
        //
    //}

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {//store
        $request->validate([ 
            'name'=> 'required',
            'capacity' => 'required',
        ]);

        classroom::create($request->post());
        return response()->json([
            'message'=>'Classroom added successfully'
        ]);
    }
    /**
     * Display the specified resource.
     */
    public function show(classroom $classroom)
    {
        return response()->json([
            'classroom' => $classroom 
        ]);

        //
    }

    /**
     * Show the form for editing the specified resource.
     */
  //  public function edit(classroom $classroom)
  //  {
        //
  //  }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, classroom $classroom)
    {
        $request->validate([ 
            'name'=> 'required',
            'capacity'=>'required',
        ]);

        $classroom->fill($request->post())->update();
        $classroom -> save();
        return response()->json([
            'message'=>'Classroom updated successfully'
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(classroom $classroom)
    {
        $classroom->delete();
        return response()->json([
            'message'=>'Classroom deleted successfully'
        ]);
    }
}
