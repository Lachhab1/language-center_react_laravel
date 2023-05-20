<?php

namespace App\Http\Controllers;

use App\Models\Etudiant;
use App\Models\Parent_;
use Illuminate\Http\Request;
use App\Http\Resources\EtudiantResource;

class EtudiantController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $etudiant = Etudiant::orderBy('id', 'desc')->paginate(10);
        return EtudiantResource::collection($etudiant);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $data = $request->validate([
            'nom' => 'required|string|max:254',
            // 'prenom' => 'required|string|max:254',
            // 'date_naissance' => 'required|date',
            // 'sexe' => 'required|string|max:254',
            // 'email' => 'required|string|email|max:254',
            // 'adresse' => 'required|string|max:254',
            // 'telephone' => 'required|string|max:254',
            // 'isActive' => 'required|boolean',
            'parent_nom' => 'string|max:254',
            // 'parent_prenom' => 'string|max:254',
            'parent_cin' => 'string|max:254',
            // 'parent_email' => 'string|email|max:254',
            // 'parent_adresse' => 'string|max:254',
            // 'parent_telephone' => 'string|max:254',
            // 'parent_nbenfants' => 'integer|max:254'
        ]);
        $etudiant = new Etudiant();
        $etudiant->nom = $request->nom;
        // $etudiant->prenom = $request->prenom;
        // $etudiant->date_naissance = $request->date_naissance;
        // $etudiant->sexe = $request->sexe;
        // $etudiant->email = $request->email;
        // $etudiant->adresse = $request->adresse;
        // $etudiant->telephone = $request->telephone;
        // $etudiant->isActive = $request->isActive;
        if ($request->has('underAge') && $request->underAge == true)
        {
            $parent = Parent_::where('cin', $request->parent_cin)->first();
            if ($parent) {
                // If the parent exists, associate it with the etudiant
                $etudiant->parent_()->associate($parent);
            } else {
                // If the parent does not exist, create a new parent and associate it
                $newParent = new Parent_();
                $newParent->nom = $request->parent_nom;
                // $newParent->prenom = $request->parent_prenom;
                $newParent->cin = $request->parent_cin;
                // $newParent->email = $request->parent_email;
                // $newParent->adresse = $request->parent_adresse;
                // $newParent->telephone = $request->parent_telephone;
                // $newParent->nbenfants = $request->parent_nbenfants;
                $newParent->save();
                $etudiant->parent_()->associate($newParent);
            }
        }else {
            $etudiant->parent_id = null;
        }
        $etudiant->save();
        return response()->json(['message' => 'Etudiant created successfully'], 201);
    }
        
        /**
     * Display the specified resource.
     */
    public function show(Etudiant $etudiant)
    {
        //
        return new EtudiantResource($etudiant);
    }



    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Etudiant $etudiant)
    {
        $data = $request->validate([
            'nom' => 'required|string|max:254',
            // 'prenom' => 'required|string|max:254',
            // 'date_naissance' => 'required|date',
            // 'sexe' => 'required|string|max:254',
            // 'email' => 'required|string|email|max:254',
            // 'adresse' => 'required|string|max:254',
            // 'telephone' => 'required|string|max:254',
            // 'isActive' => 'required|boolean',
            // 'parent_id' => 'required|integer',
        ]);
        if ($request->has('underAge') && $request->underAge == true)
        {
            $parent = Parent_::where('cin', $request->parent_cin)->first();
            $etudiant->parent_()->associate($parent);
        }
        $etudiant->update($data);
        return response()->json(['message' => 'Etudiant updated successfully'], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Etudiant $etudiant)
    {
               $etudiant->delete();
               return response()->json(['message' => 'Etudiant deleted successfully']);
    }
}
