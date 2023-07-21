<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\LanguageLevel;


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
    ];
    public $timestamps = false;

    public function level()
    {
        return $this->hasOne(LanguageLevel::class, 'id', 'level_id');
    }
    public function registerTests()
    {
        return $this->hasMany(RegisterTest::class, 'test_id', 'id');
    }
}
