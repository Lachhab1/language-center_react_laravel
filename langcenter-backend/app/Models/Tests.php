<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Tests extends Model
{
    use HasFactory;
    public $table = 'tests';
    protected $fillable = [
        'name',
        'description',
        'price',
        'duration',
        'level_id',
        'isPaid',
    ];
    public $timestamps = false;
}
