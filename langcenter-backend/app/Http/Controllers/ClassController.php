<?php
namespace App\Http\Controllers;
use App\Models\Class_;
use Illuminate\Http\Request;
use App\Http\Resources\ClassRessource;

class ClassController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $classes = Class_::all();
        return response(ClassRessource::collection($classes), 200);
    }


    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => 'required|string|max:254',
            'school_year' => 'required|string|max:254',
            'description' => 'string|nullable',
            'capacity' => 'required|integer',
        ]);
        $class_ = Class_::create($data);
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
    public function update(Request $request,Class_ $class_)
    {
        $data = $request->validate([
            'name' => 'required|string|max:254',
            'school_year' => 'required|string|max:254',
            'description' => 'string|nullable',
            'capacity' => 'required|integer',
        ]);
        $class_->name = $data['name'];
        $class_->school_year = $data['school_year'];
        $class_->description = $data['description'];
        $class_->capacity = $data['capacity'];
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
