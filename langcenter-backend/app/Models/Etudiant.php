<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use App\Models\Parent_;
use App\Models\InscrireClass;

class Etudiant extends Model
{
    use HasFactory;
    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    public $timestamps = false;
    protected $fillable = [
        'nom',
        'prenom',
        'date_naissance',
        'sexe',
        'email',
        'adresse',
        'telephone',
        'isActive',
        'parent_cin',
    ];
    public function parent_()
    {
        return $this->belongsTo(Parent_::class, 'parent_id', 'id');
    }
    public function inscrireClasses()
    {
        return $this->hasMany(InscrireClass::class, 'etudiant_id', 'id');
    }
}
