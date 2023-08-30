<?php

namespace App\Http\Controllers;

use App\Http\Resources\TeacherSalaryResource;
use App\Models\TeacherSalary;
use Illuminate\Http\Request;

class TeacherSalaryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //return TeacherSalary::all();
        $teachers = TeacherSalary::all();
        return TeacherSalaryResource::collection($teachers);
    }


    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //store teacher salary
        $request->validate([
            'teacher_id' => 'required|integer',
            'salary' => 'required|integer',
            'month' => 'required|integer',
            'year' => 'required|integer',
        ]);
        $teacherSalary = TeacherSalary::create($request->all());
        return response()->json([
            'message' => 'Teacher salary created successfully',
            'teacherSalary' => $teacherSalary
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(TeacherSalary $salary)
    {
        //show teacher salary
        return new TeacherSalaryResource($salary);
    }


    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, TeacherSalary $salary)
    {
        //update teacher salary
        $request->validate([
            'teacher_id' => 'required|integer',
            'salary' => 'required|integer',
            'month' => 'required|integer',
            'year' => 'required|integer',
        ]);
        $salary->update($request->all());
        return response()->json([
            'message' => 'Teacher salary updated successfully',
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(TeacherSalary $salary)
    {
        //delete teacher salary
        $salary->delete();
        return response()->json([
            'message' => 'Teacher salary deleted successfully'
        ]);
    }
}
