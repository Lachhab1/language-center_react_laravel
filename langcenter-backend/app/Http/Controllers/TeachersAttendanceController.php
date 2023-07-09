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
    public function store($date)
    {
        $day = Carbon::parse($date)->format('l');
        $dayNumber = 0;
    
        switch ($day) {
            case "Monday":
                $dayNumber = 1;
                break;
            case "Tuesday":
                $dayNumber = 2;
                break;
            case "Wednesday":
                $dayNumber = 3;
                break;
            case "Thursday":
                $dayNumber = 4;
                break;
            case "Friday":
                $dayNumber = 5;
                break;
            case "Saturday":
                $dayNumber = 6;
                break;
            case "Sunday":
                $dayNumber = 7;
                break;
        }
    
        $classIds = time_tables::where('day_id', $dayNumber)->pluck('class_id')->toArray();
        $teachers = Class_::whereIn('id', $classIds)->pluck('teacher_id')->toArray();
    
        $teachersAttendance = [];
    
        foreach ($teachers as $teacherId) {
            $attendance = TeachersAttendance::create([
                'date' => $date,
                'teacher_id' => $teacherId,
                'isAbsent' => false,
                'reason' => '',
            ]);
    
            $teachersAttendance[] = $attendance;
        }
    
        return response()->json(['CLASSIDS ' => $classIds], 201);
    }
    
    
        /**
         * Display the specified resource.
         */
    
    
        //public function show(studentsAttendance $studentsAttendance)
        public function show( $date)
        {
            $result = TeachersAttendance::where('date', $date)
                ->get();
        
            return teachersAttendanceResource::collection($result);
        }
        
    
        /**
         * Show the form for editing the specified resource.
         */
       
    
        /**
         * Update the specified resource in storage.
         */
    
     public function update(Request $request, $date)
{
    $data = json_decode($request->getContent(), true);

    // Extract the teacher IDs from the request data
    $teacherIds = array_column($data, 'id');

    // Retrieve the attendance records
    $attendances = TeachersAttendance::whereIn('teacher_id', $teacherIds)
        ->where('date', $date)
        ->get();

    // Update each attendance record
    foreach ($attendances as $attendance) {
        $teacherId = $attendance['teacher_id']; 
        $teacherData = collect($data)->firstWhere('id', $teacherId);

        // Update the attendance record with new values from the request
        $attendance->isAbsent = $teacherData['absent']; // Corrected field name
        $attendance->reason = $teacherData['reason'];
        $attendance->save();
    }

    return response()->json(['teacherIds' => 'Liste de présence mise à jour avec succès', 'attendances' => $attendances]);
}

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(TeachersAttendance $teachersAttendance)
    {
        //
    }
}
