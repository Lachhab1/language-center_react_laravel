<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Etudiant;
use App\Models\InscrireClass;


class Class_ extends Model
{
    use HasFactory;
    protected $table = 'classes';


    public function etudiants()
    {
        return $this->belongsToMany(Etudiant::class, 'inscrire_classes')
            ->using(InscrireClass::class)
            ->withPivot('inscription_date', 'inscription_frais');
    }
    public function inscrireClasses()
    {
        return $this->hasMany(InscrireClass::class);
    }
    public function cours()
    {
        return $this->belongsToMany(Cours::class, 'inscrire_classes')
            ->using(InscrireClass::class)
            ->withPivot('inscription_date', 'inscription_frais');
    }
}
