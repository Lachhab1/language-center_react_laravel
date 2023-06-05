<?php

namespace App\Http\Controllers;

use App\Models\Class_;
use Illuminate\Http\Request;
use App\Http\Resources\ClassRessource;
use App\Models\Cours;

class ClassController extends Controller
{
    /**
     * Display a listing of the resource.
     */
   // public function index()
    //{
     //   $classes = Class_::all();
     //   return response(ClassRessource::collection($classes), 200);
    //}

    public function index(Request $request)
    {
        // Retrieve classes based on cours_id
        if ($request->has('cours_id')) {
            $classes = Class_::where('cours_id', $request->input('cours_id'))->get();
        } else {
    
             $classes = Class_::all();
            return response(ClassRessource::collection($classes), 200);
        }
    
        return response()->json($classes);
    }
    


    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => 'required|string|max:254|unique:classes',
            'school_year' => 'required|string|max:254',
            'description' => 'string|nullable',
            'capacity' => 'required|integer',
            'start_date' => 'required|date',
            'end_date' => 'required|date|after:start_date',
            'level' => 'required|string|max:254',
            'cours_id' => 'required|integer|exists:cours,id'
        ]);
        $class_ = new Class_();
        $class_->name = $data['name'];
        $class_->school_year = $data['school_year'];
        $class_->description = $data['description'];
        $class_->capacity = $data['capacity'];
        $class_->start_date = $data['start_date'];
        $class_->end_date = $data['end_date'];
        $class_->level = $data['level'];
        $class_->cours_id = $data['cours_id'];
        $class_->save();
        return new ClassRessource($class_);
    }

    /**
     * Display the specified resource.
     */
    public function show(Class_ $class_)
    {
        return new ClassRessource($class_);
    }


    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Class_ $class_)
    {
        $data = $request->validate([
            'name' => 'required|string|max:254|unique:classes,name,' . $class_->id,
            'school_year' => 'required|string|max:254',
            'description' => 'string|nullable',
            'capacity' => 'required|integer',
            'start_date' => 'required|date',
            'end_date' => 'required|date|after:start_date',
            'level' => 'required|string|max:254',
            'cours_id' => 'required|integer|exists:cours,id'
        ]);
        $class_->name = $data['name'];
        $class_->school_year = $data['school_year'];
        $class_->description = $data['description'];
        $class_->capacity = $data['capacity'];
        $class_->start_date = $data['start_date'];
        $class_->end_date = $data['end_date'];
        $class_->level = $data['level'];
        $class_->cours_id = $data['cours_id'];
        $class_->save();
        return new ClassRessource($class_);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Class_ $class_)
    {
        if ($class_) {
            $class_->delete();
            return response(['message' => 'Class deleted'], 200);
        } else {
            return response(['message' => 'Class not found'], 404);
        }
    }
}
