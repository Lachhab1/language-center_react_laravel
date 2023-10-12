<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Teacher;
use Carbon\Carbon;
class TeacherHours extends Controller
{
    public function getTeacherHours($id,Request $request)
    {
        $teacher = Teacher::find($id);
        //get hours based on teacher_attendance if isAbsant = 2 then sum the hours correonding to the classes hes teaching
        $teacher_attendance = $teacher->teacher_attendance;
        $differnce = 0;
        $hours = 0;
        $minutes = 0;
        $monthNow = $request->month; 
        $yearNow = $request->year;
        foreach ($teacher_attendance as $attendance) {
            $month = Carbon::parse($attendance->date)->month;
            $year = Carbon::parse($attendance->date)->year;
            if (($month == $monthNow && $year == $yearNow) && ($attendance->isAbsent == 2 || $attendance->isAbsent == 3)) {
                //get start time and end time from class table
                $class = $attendance->class;
                $start_time = $class->timeTable->startTime;
                $end_time = $class->timeTable->FinishTime;
                //convert to minutes
                $end_time = strtotime($end_time);
                $start_time = strtotime($start_time);
                //get differnce
                $differnce = $end_time - $start_time;
                $differnce = $differnce / 60;
                $minutes += $differnce;
                // //convert to hours
                // $hours = $differnce / 60;
            }
        }
        $hours = $minutes / 60;
        return $hours;
    }
}
