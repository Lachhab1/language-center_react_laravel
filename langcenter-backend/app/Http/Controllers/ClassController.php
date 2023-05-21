<?php
namespace App\Http\Controllers;
use App\Models\Class_;
use Illuminate\Http\Request;

class ClassController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $classes = Class_::all();
        return response($classes, 200);
    }


    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $data = $request->validate([
            'nom' => 'required|string|max:254',
            'anneeScolaire' => 'required|integer',
            'description' => 'string',
        ]);
        $class_ = Class_::create($data);
        return response($class_, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Class_ $class_)
    {
        //
    }


    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Class_ $class_)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Class_ $class_)
    {
        //
    }
}
