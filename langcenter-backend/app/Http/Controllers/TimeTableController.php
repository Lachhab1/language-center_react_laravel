<?php

namespace App\Http\Controllers;

use App\Models\TimeTable;
use App\Http\Controllers\Controller;
use App\Http\Resources\TimeTableResource;
use Illuminate\Http\Request;


use Illuminate\Support\Facades\Storage;
use Carbon\Carbon;

class TimeTableController extends Controller
{
    /**
     * Display a listing of the resource.
     */   public function index(Request $request)
{
    
    if($request->query('classroom_id')){
        $classroomId = $request->query('classroom_id');

        $query = TimeTable::select(
            'time_tables.id',
            'cours.title as course_title',
            'classes.name as class_name',
            'classrooms.name as classroom_name',
            'time_tables.startTime',
            'time_tables.finishTime',
            'time_tables.days'
        )
            ->join('cours', 'cours.id', '=', 'time_tables.course_id')
            ->join('classes', 'classes.id', '=', 'time_tables.class_id')
            ->join('classrooms', 'classrooms.id', '=', 'time_tables.classroom_id');
    
        if ($classroomId) {
            $query->where('time_tables.classroom_id', $classroomId);
        }
    
        $timeTables = $query->get();
    
        return response()->json([
            'timetable' => $timeTables
        ]);
    }else{
        $timeTables = TimeTable::select(
            'time_tables.id',
            'cours.title as course_title',
            'classes.name as class_name',
            'classrooms.name as classroom_name',
            'time_tables.startTime',
            'time_tables.finishTime',
            'time_tables.days'
        )
            ->join('cours', 'cours.id', '=', 'time_tables.course_id')
            ->join('classes', 'classes.id', '=', 'time_tables.class_id')
            ->join('classrooms', 'classrooms.id', '=', 'time_tables.classroom_id')
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
            'startTime' => 'required',
            'FinishTime' => 'required',
            'days' => 'required',
        ]);
    
        $data['days'] = json_encode($data['days']);
    
        $timeTable = TimeTable::create($data);
    
        return response(new TimeTableResource($timeTable), 201);
    }
    
    
    


    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $timeTable = TimeTable::findOrFail($id);
    
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
public function update(Request $request, TimeTable $timeTable)
{
    $data = $request->validate([
        'course_id' => 'required',
        'class_id' => 'required',
        'classroom_id' => 'required',
        'startTime' => 'required',
        'FinishTime' => 'required',
        'days' => 'required',
    ]);

    // Decode the JSON string back to an array

    $timeTable->fill($data);
    $timeTable->save();

    return new TimeTableResource($timeTable);
}

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(TimeTable $timeTable)
    {
        //
        $timeTable->delete();
        return response()->json([
            'message'=>'Timetable deleted successfully'
        ]);
    }
}