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
        'price',
    ];
    public $timestamps = false;

    public function registerTests()
    {
        return $this->hasMany(RegisterTest::class, 'test_id', 'id');
    }
}
