<?php

namespace App\Http\Controllers;

use App\Models\Cours;
use Illuminate\Http\Request;
use App\Http\Resources\CoursResource;
use App\Models\Class_;

class CoursController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $cours = Cours::orderBy('id', 'desc')->paginate(10);
        return response(CoursResource::collection($cours), 200);
    }



    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $data = $request->validate([
            'title' => 'required|string|max:254',
            'description' => 'string|max:254|nullable',
            'duration' => 'required|string|max:254',
            'price' => 'required|integer',
        ]);
        $cours = Cours::create($data);
        return response(new CoursResource($cours), 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Cours $cours)
    {
        return new CoursResource($cours);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Cours $cours)
    {
        $data = $request->validate([
            'title' => 'required|string|max:254',
            'description' => 'string',
            'duration' => 'required|string',
            'price' => 'required|integer',
        ]);
        $cours->title = $data['title'];
        $cours->description = $data['description'];
        $cours->duration = $data['duration'];
        $cours->price = $data['price'];
        $cours->save();
        return response(new CoursResource($cours), 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Cours $cours)
    {
        $cours->delete();
        return response(null, 204);
    }
}
