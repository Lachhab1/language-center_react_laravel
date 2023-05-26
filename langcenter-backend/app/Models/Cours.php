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
    protected $fillable = ['title', 'description', 'duration', 'price'];
    public $timestamps = false;

    public function class_()
    {
        return $this->belongsToMany(Class_::class, 'inscrire_classes')
            ->using(InscrireClass::class)
            ->withPivot('inscription_date', 'frais_paid');
    }

    public function inscrireClasses()
    {
        return $this->hasMany(InscrireClass::class, 'cours_id', 'id');
    }
}
