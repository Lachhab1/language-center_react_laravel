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
    public $timestamps = false;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'etudiant_id', // Corrected column name to match the migration
        'class_id',
        'inscription_date',
        'negotiated_price',
    ];

    // Define the relationships with other models
    public function etudiant()
    {
        return $this->belongsTo(Etudiant::class, 'etudiant_id');
    }

    public function class_()
    {
        return $this->belongsTo(Class_::class, 'class__id', 'id');
    }
    public function payment()
    {
        return $this->hasOne(Payment::class);
    }
}
