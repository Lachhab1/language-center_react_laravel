<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Parent_ extends Model
{
    use HasFactory;
    public $table = 'parents';
    public $timestamps = false;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'nom',
        'prenom',
        'cin',
        'sexe',
        'date_naissance',
        'email',
        'adresse',
        'telephone',
        'nbenfants',
    ];
    public function etudiant()
    {
        return $this->hasMany(Etudiant::class, 'parent_id', 'id');
    }
}
