<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use App\Models\Etudiant;


class LanguageLevel extends Model
{
    use HasFactory;
    public $table = 'language_levels';
    protected $fillable = [
        'name',
    ];
    public $timestamps = false;
    public function etudiants()
    {
        return $this->hasMany(Etudiant::class, 'level_id', 'id');
    }
}
