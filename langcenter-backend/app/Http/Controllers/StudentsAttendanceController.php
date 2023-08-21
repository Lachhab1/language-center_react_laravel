<?php

namespace App\Http\Controllers;

use App\Models\studentsAttendance;


use App\Models\Etudiant;
use App\Models\InscrireClass;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Date;
use App\Http\Resources\studentsAttendanceResource;

use function GuzzleHttp\Promise\each;

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
    public function store($class_id, Request $request)
    {
        $dates = $request->input('dates');
        $students = InscrireClass::where('class__id', $class_id)->pluck('etudiant_id');

        $studentsAttendance = [];

        foreach ($students as $student_id) {
            foreach ($dates as $date) {
                // Check if an attendance record already exists for the student and date
                $existingAttendance = StudentsAttendance::where('student_id', $student_id)
                    ->where('date', $date)
                    ->first();

                if (!$existingAttendance) {
                    $attendance = StudentsAttendance::create([
                        'date' => $date,
                        'student_id' => $student_id,
                        'isAbsent' => '0',
                        'reason' => '',
                    ]);

                    $studentsAttendance[] = $attendance;
                }
            }
        }

        return response()->json(['studentsAttendance' => $studentsAttendance], 201);
    }





    /**
     * Display the specified resource.
     */


    //public function show(studentsAttendance $studentsAttendance)
    public function show($class_id)
    {
        $result1 = studentsAttendance::join('inscrire_classes', 'students_attendances.student_id', '=', 'inscrire_classes.etudiant_id')
            ->where('inscrire_classes.class__id', $class_id)
            ->get();

        $distinctDates = $result1->pluck('date')->unique();

        return [
            'result1' => studentsAttendanceResource::collection($result1),
            'result2' => $distinctDates,
        ];
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
    public function update(Request $request)
    {
        $requests = $request->all();
    
        foreach ($requests as $req) {
            if ($req['role'] === 'student') {

                $studentId = $req['id'];
                $attendanceData = $req['attendanceData'];
                
                foreach ($attendanceData as $data) {
                    $date = $data['date'];
                    $attendanceStatus = $data['attendanceStatus'];
                    
                    $existingAttendance = StudentsAttendance::where('student_id', $studentId)
                        ->where('date', $date)
                        ->first();
                    
                   
                        $existingAttendance->isAbsent = $attendanceStatus;
                        $existingAttendance->save();
                    
                }

            }
        }
    
        return response()->json(['message' => 'Attendance updated successfully'], 200);
    }
    





    /**
     * Remove the specified resource from storage.
     */
    public function destroy($class_id, Request $request)
    {
        $date = $request->input('date');
        $students = InscrireClass::where('class__id', $class_id)->pluck('etudiant_id');

        $result = StudentsAttendance::whereIn('date', $date)
            ->whereIn('student_id', $students)
            ->delete();

        return response()->json(['message' => 'Rows deleted successfully', 'rows_deleted' => $result], 200);
    }
}
