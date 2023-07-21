<?php

namespace App\Http\Controllers;

use App\Http\Resources\TestResource;
use App\Models\Tests;
use Illuminate\Http\Request;

class TestsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return TestResource::collection(Tests::all());
    }
    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //store a new test
        $data = $request->validate([
            'name' => 'required|string',
            'description' => 'string|nullable',
            'price' => 'required|integer',
            'duration' => 'required|integer',
            'level_id' => 'required|integer',
        ]);
        $test = Tests::create($data);
        return new TestResource($test);
    }
    /**
     * Display the specified resource.
     */
    public function show(Tests $test)
    {
        //show a test
        return new TestResource($test);
    }


    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Tests $test)
    {
        //update a test
        $data = $request->validate([
            'name' => 'required|string',
            'description' => 'string|nullable',
            'price' => 'required|integer',
            'duration' => 'required|integer',
            'level_id' => 'required|integer',
        ]);
        $test->update($data);
        return new TestResource($test);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Tests $test)
    {
        //delete a test
        $test->delete();
        return response(['message' => 'Test deleted'], 200);
    }
}
