<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use App\Models\Parent_;

class Etudiant extends Model
{
    use HasFactory;
    public $timestamps = false;
    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'nom',
        'prenom',
        'date_naissance',
        'sexe',
        'email',
        'adresse',
        'telephone',
        'isActive',
        'parent_id',
    ];
    public function parent_()
    {
        return $this->belongsTo(Parent_::class, 'parent_id', 'id');
    }
}
