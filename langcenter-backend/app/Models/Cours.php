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
    protected $fillable = ['title', 'description', 'duration', 'price', 'class__id'];
    public $timestamps = false;

    public function class_()
    {
        return $this->belongsTo(Class_::class);
    }
}
