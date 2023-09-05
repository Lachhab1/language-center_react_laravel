<?php

namespace App\Http\Controllers;

use App\Models\TeachersAttendance;
use App\Http\Controllers\Controller;
use App\Http\Resources\ClassRessource;
use App\Http\Resources\teachersAttendanceResource;
use Illuminate\Http\Request;
use app\Http\Resources\TeachersAttendanceRessource;
use App\Http\Resources\TimeTableResource;
use App\Models\Class_;
use App\Models\InscrireClass;
use App\Models\time_tables;
use Illuminate\Support\Carbon;

class TeachersAttendanceController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $data = teachersAttendance::all();
        return teachersAttendanceResource::collection($data);
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
        $teachers = Class_::where('id', $class_id)->pluck('teacher_id');

        $teachersAttendance = [];

        foreach ($teachers as $teacher_id) {
            foreach ($dates as $date) {
                // Check if an attendance record already exists for the teacher and date
                $existingAttendance = TeachersAttendance::where('teacher_id', $teacher_id)
                    ->where('date', $date)
                    ->first();

                if (!$existingAttendance) {
                    $attendance = TeachersAttendance::create([
                        'date' => $date,
                        'teacher_id' => $teacher_id,
                        'isAbsent' => '0',
                        'reason' => '',
                        'class_id' => $class_id
                    ]);

                    $teachersAttendance[] = $attendance;
                }
            }
        }

        return response()->json(['teachersAttendance' => $teachersAttendance], 201);
    }




    /**
     * Display the specified resource.
     */


    //public function show(studentsAttendance $studentsAttendance)
    public function show($class_id)
    {
        $TeacherIdBasedOnGrp = Class_::where('id', $class_id)->pluck("teacher_id");
        $result = TeachersAttendance::where('teacher_id', $TeacherIdBasedOnGrp)
            ->get();

        return teachersAttendanceResource::collection($result);
    }


    /**
     * Show the form for editing the specified resource.
     */

    /**
     * Update the specified resource in storage.
     */

    public function update(Request $request)
    {
        $requests = $request->all();

        foreach ($requests as $req) {
            if ($req['role'] === 'teacher') {

                $teacherId = $req['id'];
                $attendanceData = $req['attendanceData'];

                foreach ($attendanceData as $data) {
                    $date = $data['date'];
                    $attendanceStatus = $data['attendanceStatus'];

                    $existingAttendance = TeachersAttendance::where('teacher_id', $teacherId)
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
        $teachers = Class_::where('id', $class_id)->pluck('teacher_id');

        $result = teachersAttendance::whereIn('date', $date)
            ->whereIn('teacher_id', $teachers)
            ->delete();

        return response()->json(['message' => 'Rows deleted successfully', 'rows_deleted' => $result], 200);
    }
}
