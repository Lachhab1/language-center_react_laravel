<?php

namespace App\Http\Controllers;

use App\Models\studentsAttendance;

use App\Http\Controllers\Controller;
use App\Models\Etudiant;
use App\Models\InscrireClass;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Date;
use App\Http\Resources\studentsAttendanceResource;

class StudentsAttendanceController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $data = studentsAttendance::all();
        return studentsAttendanceResource::collection($data);
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
    public function store($class_id, $date)
{
    $students = InscrireClass::where('class__id', $class_id)->pluck('etudiant_id');
    
    $studentsAttendance = [];
    
    foreach ($students as $student_id) {
        $attendance = studentsAttendance::create([
            'date' => $date,
            'student_id' => $student_id,
            'isAbsent' => '0',
            'reason' => '',
        ]);
        
        $studentsAttendance[] = $attendance;
    }
    
    return response()->json(['studentsAttendance' => $studentsAttendance], 201);
}


    /**
     * Display the specified resource.
     */


    //public function show(studentsAttendance $studentsAttendance)
    public function show($class_id, $date)
    {
        $result = studentsAttendance::join('inscrire_classes', 'students_attendances.student_id', '=', 'inscrire_classes.etudiant_id')
            ->where('inscrire_classes.class__id', $class_id)
            ->where('students_attendances.date', $date)
            ->get();
    
        return studentsAttendanceResource::collection($result);
    }
    

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(studentsAttendance $studentsAttendance)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */

     public function update(Request $request, $class_id, $date)
{
    $data = json_decode($request->getContent(), true);

    // Extract the student IDs from the request data
    $studentIds = array_column($data, 'id');

    // Retrieve the attendance records
    $attendances = studentsAttendance::whereIn('student_id', $studentIds)
        ->where('date', $date)
        ->get();

    // Update each attendance record
    foreach ($attendances as $attendance) {
        $studentId = $attendance['student_id'];
        $studentData = collect($data)->firstWhere('id', $studentId);

        // Update the attendance record with new values from the request
        $attendance->isAbsent = $studentData['absent'];
        $attendance->reason = $studentData['reason'];
        $attendance->save();
    }

    return response()->json(['message' => 'Liste de présence mise à jour avec succès', 'attendances' => $attendances]);
}

     

     
     

     
     
    /**
     * Remove the specified resource from storage.
     */
    public function destroy(studentsAttendance $studentsAttendance)
    {
        //
    }
}
