<?php

namespace App\Http\Controllers;

use App\Models\InscrireClass;
use Illuminate\Http\Request;
use App\Http\Resources\InscrireClassRessource;

class InscrireClassController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $inscrireClasses = InscrireClass::orderBy('id', 'desc')->paginate(10);
        return InscrireClassRessource::collection($inscrireClasses);
    }



    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $data = $request->validate([
            'etudiant_id' => 'required|integer',
            'class_id' => 'required|integer',
            'cours_id' => 'required|integer',
            'inscription_date' => 'required|date',
            'frais_paid' => 'required|decimal',
        ]);
        $inscrireClass = InscrireClass::create($data);
        $inscrireClass->etudiant;
        $inscrireClass->class;
        $inscrireClass->cours;
        return response($inscrireClass, 201);
    }


    /**
     * Display the specified resource.
     */
    public function show(InscrireClass $inscrireClass)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, InscrireClass $inscrireClass)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(InscrireClass $inscrireClass)
    {
        //
    }
}
