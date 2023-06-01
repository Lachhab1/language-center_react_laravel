<?php

namespace App\Http\Controllers;

use App\Models\InscrireClass;
use Illuminate\Http\Request;
use App\Http\Resources\InscrireClassRessource;
use App\Models\Etudiant;


class InscrireClassController extends Controller
{
    public function index()
    {
        $inscrireClasses = InscrireClass::orderBy('id', 'asc')->paginate(10);
        return InscrireClassRessource::collection($inscrireClasses);
    }
    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        try {
            $data = $request->validate([
                'etudiant_id' => 'required|integer',
                'class_id' => 'required|integer',
                'frais_paid' => 'required|integer',
            ]);
            $inscrireClass = new InscrireClass();
            $etudiant = Etudiant::findOrFail($request->etudiant_id);
            $inscrireClass->etudiant()->associate($etudiant);
            $inscrireClass->class_()->associate($request->class_id);
            $inscrireClass->inscription_date = now();
            $inscrireClass->frais_paid = $request->frais_paid;
            $inscrireClass->save();
            return response(new InscrireClassRessource($inscrireClass), 201);
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()], 500);
        }
    }
    /**
     * Display the specified resource.
     */
    public function show(InscrireClass $inscrireClass)
    {
        return new InscrireClassRessource($inscrireClass);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, InscrireClass $inscrireClass)
    {
        try {
            $data = $request->validate([
                'frais_paid' => 'required|integer',
            ]);
            $inscrireClass->frais_paid = $request->frais_paid;
            $inscrireClass->save();
            return response(new InscrireClassRessource($inscrireClass), 201);
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(InscrireClass $inscrireClass)
    {
        $inscrireClass->delete();
        return response()->json(['message' => 'InscrireClass deleted successfully'], 200);
    }

}
