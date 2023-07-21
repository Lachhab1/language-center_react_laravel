<?php

namespace App\Http\Controllers;

use App\Models\Etudiant;
use Illuminate\Http\Request;

class AssignLevel extends Controller
{
    public function assignLevel(Request $request)
    {
        $data = $request->validate([
            'student_id' => 'required|integer|exists:etudiants,id',
            'level_id' => 'required|integer|exists:language_levels,id',
        ]);
        $etudiant = Etudiant::find($data['student_id']);
        if (!$etudiant) {
            return response()->json([
                'message' => 'Student not found',
            ], 404);
        }
        $etudiant->level_id = $data['level_id'];
        $etudiant->save();
        return response()->json([
            'message' => 'Level assigned successfully',
            'student' => $etudiant,
        ], 200);
    }
    public function getLevel(Request $request)
    {
        $etudiant = Etudiant::find($request['id']);
        if (!$etudiant) {
            return response()->json([
                'message' => 'Student not found',
            ], 404);
        }
        if (!$etudiant->level) {
            return response()->json([
                'message' => 'Level not found',
            ], 404);
        }
        return response()->json([
            "level" =>
            $etudiant->level->name,
        ], 200);
    }
}
