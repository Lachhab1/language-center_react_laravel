<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Teacher;

class TeacherSalary extends Model
{
    use HasFactory;
    protected $fillable = [
        'teacher_id',
        'salary',
        'month',
        'year',
        'created_at',
    ];
    public function teacher()
    {
        return $this->belongsTo(Teacher::class);
    }
}
