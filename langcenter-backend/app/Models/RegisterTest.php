<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Etudiant;
use App\Models\Test;
use App\Models\TestPayment;

class RegisterTest extends Model
{
    use HasFactory;
    protected $fillable = [
        'student_id',
        'test_id',
        'status',
        'start_time',
        'end_time',
        'date',
    ];
    public $timestamps = false;
    public function student()
    {
        return $this->belongsTo(Etudiant::class, 'student_id', 'id');
    }
    public function test()
    {
        return $this->belongsTo(Test::class, 'test_id', 'id');
    }
    public function testPayments()
    {
        return $this->hasMany(TestPayment::class, 'register_id', 'id');
    }
}
