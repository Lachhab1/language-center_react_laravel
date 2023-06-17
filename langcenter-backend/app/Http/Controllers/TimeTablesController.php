<?php

namespace App\Http\Controllers;

use App\Models\time_tables;
use App\Http\Controllers\Controller;
use App\Http\Resources\TimeTableResource;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;


use Illuminate\Support\Facades\Storage;
use Carbon\Carbon;

class TimeTablesController extends Controller
{
    /**
     * Display a listing of the resource.
     */   public function index(Request $request)
    {

        if ($request->query('classroom_id')) {
            $classroomId = $request->query('classroom_id');
            $query = time_tables::select(
                
                'time_tables.id',
                'cours.title as course_title',
                'classes.name as class_name',
                'classrooms.name as classroom_name',
                'time_tables.startTime',
                'time_tables.finishTime',
                'time_tables.day_id',
                 'classes.event_color as event_color' ,
                 'classes.start_date as start_date',
                 'classes.end_date as end_date',

            )
                ->join('cours', 'cours.id', '=', 'time_tables.course_id')
                ->join('classes', 'classes.id', '=', 'time_tables.class_id')
                ->join('classrooms', 'classrooms.id', '=', 'time_tables.classroom_id')
                ->join('days', 'days.id', '=', 'time_tables.day_id');

            if ($classroomId) {
                $query->where('time_tables.classroom_id', $classroomId);
            }

            $timeTables = $query->get();

            return response()->json([
                'timetable' => $timeTables
            ]);
        } else if($request->query('class_id')){
            $class_id = $request->query('class_id');
            $query = time_tables::select(
                'time_tables.id',
                'cours.title as course_title',
                'classes.name as class_name',
                'classrooms.name as classroom_name',
                'time_tables.startTime',
                'time_tables.finishTime',
                'time_tables.day_id',
                'classes.start_date as start_date',
                'classes.end_date as end_date',
            )
                ->join('cours', 'cours.id', '=', 'time_tables.course_id')
                ->join('classes', 'classes.id', '=', 'time_tables.class_id')
                ->join('classrooms', 'classrooms.id', '=', 'time_tables.classroom_id')
                ->join('days', 'days.id', '=', 'time_tables.day_id');

            
            if ($class_id) {
                $query->where('time_tables.class_id', $class_id);
            }
            
            $timeTables = $query->get();

            return response()->json([
                'timetable' => $timeTables
            ]);

        } else{
            $timeTables = time_tables::select(
                'time_tables.id',
                'cours.title as course_title',
                'classes.name as class_name',
                'classrooms.name as classroom_name',
                'time_tables.startTime',
                'time_tables.finishTime',
                'days.name',
                'classes.start_date as start_date',
                'classes.end_date as end_date',
                'day_id',
                'classes.event_color as event_color'

            )
                ->join('cours', 'cours.id', '=', 'time_tables.course_id')
                ->join('classes', 'classes.id', '=', 'time_tables.class_id')
                ->join('classrooms', 'classrooms.id', '=', 'time_tables.classroom_id')
                ->join('days', 'days.id', '=', 'time_tables.day_id')
                ->get();

            return response()->json($timeTables);
        }
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
    {
        $data = $request->validate([
            'course_id' => 'required',
            'class_id' => 'required',
            'classroom_id' => 'required',
            'days.*.name' => 'required',
            'days.*.startTime' => 'required',
            'days.*.FinishTime' => 'required',
        ]);
    
        Log::info("test show data: ",$data);
        
        $timeTables = [];
        
        foreach ($data['days'] as $day) {
            $timeTable = time_tables::create([
                'course_id' => $data['course_id'],
                'class_id' => $data['class_id'],
                'classroom_id' => $data['classroom_id'],
                'startTime' => $day['startTime'],
                'FinishTime' => $day['FinishTime'],
                'day_id' => $day['name'],
            ]);
    
            $timeTables[] = $timeTable;
        }
    
        return response()->json(['timeTables' => $timeTables], 201);
    }
    
    

    
    




    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $timeTable = time_tables::findOrFail($id);

        return response()->json([
            'timeTable' => $timeTable
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    /* public function edit(TimeTable $timeTable)
    {
        //
    }
 */
    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, time_tables $timeTable)
    {
        $data = $request->validate([
            'course_id' => 'required',
            'class_id' => 'required',
            'classroom_id' => 'required',
            'startTime' => 'required',
            'FinishTime' => 'required',
            'day_id' => 'required',
        ]);

        // Decode the JSON string back to an array

        $timeTable->fill($data);
        $timeTable->save();

        return new TimeTableResource($timeTable);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(time_tables $timeTable)
    {
        //
        $timeTable->delete();
        return response()->json([
            'message' => 'Timetable deleted successfully'
        ]);
    }
}
