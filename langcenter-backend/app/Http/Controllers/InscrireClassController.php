<?php

namespace App\Http\Controllers;

use App\Models\InscrireClass;
use Illuminate\Http\Request;
use App\Http\Resources\InscrireClassRessource;
use App\Models\Etudiant;
use App\Models\Parent_;


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
                'nom' => 'required|string',
                'prenom' => 'required|string',
                'date_naissance' => 'required|date',
                'sexe' => 'required|string',
                'email' => 'required|email|unique:etudiants',
                'adresse' => 'required|string',
                'telephone' => 'required|string|max:13|regex:/^([0-9\s\-\+\(\)]*)$/|min:10|unique:etudiants',
                'parent_cin' => 'string',
                'parent_nom' => 'string',
                'parent_prenom' => 'string',
                'parent_sexe' => 'string',
                'parent_date_naissance' => 'date',
                'parent_email' => 'email',
                'parent_adresse' => 'string',
                'parent_telephone' => 'string',
                'parent_nbenfants' => 'integer',
                'class_id' => 'required|integer',
                'cours_id' => 'required|integer',
                'frais_paid' => 'required|integer',
            ]);
            $etudiant = new Etudiant();
            $etudiant->nom = $data['nom'];
            $etudiant->prenom = $data['prenom'];
            $etudiant->date_naissance = $data['date_naissance'];
            $etudiant->sexe = $data['sexe'];
            $etudiant->email = $data['email'];
            $etudiant->adresse = $data['adresse'];
            $etudiant->telephone = $data['telephone'];
            $etudiant->isActive = $data['isActive'];
            if ($request->has('underAge') && $request->underAge == true) {

                $parent = Parent_::where('cin', $request->parent_cin)->first();
                if ($parent) {
                    // If the parent exists, associate it with the etudiant
                    $etudiant->parent_()->associate($parent);
                } else {
                    // If the parent does not exist, create a new parent and associate it
                    $newParent = new Parent_();
                    $newParent->nom = $request->parent_nom;
                    $newParent->prenom = $request->parent_prenom;
                    $newParent->sexe = $request->parent_sexe;
                    $newParent->cin = $request->parent_cin;
                    $newParent->email = $request->parent_email;
                    $newParent->adresse = $request->parent_adresse;
                    $newParent->telephone = $request->parent_telephone;
                    $newParent->nbenfants = $request->parent_nbenfants;
                    $newParent->date_naissance = $request->parent_date_naissance;
                    $newParent->save();
                    $etudiant->parent_()->associate($newParent);
                }
            } else {
                $etudiant->parent_()->associate(null);
            }
            $etudiant->save();
            $inscrireClass = new InscrireClass();
            $inscrireClass->etudiant()->associate($etudiant);
            $inscrireClass->class_()->associate($request->class_id);
            $inscrireClass->cours()->associate($request->cours_id);
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
        
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(InscrireClass $inscrireClass)
    {
        // Delete the inscrireClass
        $etudiant = $inscrireClass->etudiant;
        $etudiant->load('inscrireClasses');


        $etudiant->inscrireClasses->each(function ($inscrireClass) {
            $inscrireClass->delete();
        });

        // Delete the etudiant
        if ($etudiant->parent_ && $etudiant->parent_->etudiant->count() == 1) {
            $etudiant->parent_->delete();
        }
        $etudiant->delete();

        return response()->json(null, 204);
    }
}
