<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Class_;
use App\Models\InscrireClass;

class Cours extends Model
{
    use HasFactory;
    public $table = 'cours';
    protected $fillable = ['title', 'description', 'duration'];

    // Define the many-to-many relationship with Etudiant
    public function class_()
    {
        return $this->belongsToMany(Class_::class, 'inscrire_classes')
            ->using(InscrireClass::class)
            ->withPivot('inscription_date', 'inscription_frais');
    }

    public function inscrireClasses()
    {
        return $this->hasMany(InscrireClass::class);
    }
}
