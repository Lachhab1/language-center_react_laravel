<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Etudiant;
use App\Models\Class_;
use App\Models\Cours;

class InscrireClass extends Model
{
    use HasFactory;

    protected $table = 'inscrire_classes'; // Corrected table name to match the migration
    protected $primaryKey = null; // Removed primaryKey property since composite primary key is used
    public $incrementing = false;

    // Define the relationships with other models
    public function etudiant()
    {
        return $this->belongsTo(Etudiant::class, 'etudiant_id');
    }

    public function class_()
    {
        return $this->belongsTo(Class_::class, 'class_id');
    }

    public function cours()
    {
        return $this->belongsTo(Cours::class, 'cours_id');
    }
}
