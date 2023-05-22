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
    public $timestamps = false;
    protected $fillable = [
        'title',
        'anneeScolaire',
        'description',
        'frais',
    ];


    // public function etudiant()
    // {
    //     return $this->belongsToMany(Etudiant::class, 'inscrire_classes')
    //         ->using(InscrireClass::class)
    //         ->withPivot('inscription_date', 'frais_paid');
    // }
    public function inscrireClasses()
    {
        return $this->hasMany(InscrireClass::class, 'class_id', 'id');
    }
    // public function cours()
    // {
    //     return $this->belongsToMany(Cours::class, 'inscrire_classes')
    //         ->using(InscrireClass::class)
    //         ->withPivot('inscription_date', 'frais_paid');
    // }
}
