<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Class_;
use App\Models\TeacherSalary;
use App\Models\TeachersAttendance;

class Teacher extends Model
{
    use HasFactory;

    protected $fillable = [
        'first_name',
        'last_name',
        'address',
        'cin',
        'birthday',
        'gender',
        'speciality',
        'diploma',
        'hiredate',
        'hourly_rate',
        'email',
        'phone',
    ];

    public function classes()
    {
        return $this->hasMany(Class_::class);
    }
    public function teacherSalary()
    {
        return $this->hasOne(TeacherSalary::class);
    }
    public function teacher_attendance()
    {
        return $this->hasMany(TeachersAttendance::class, 'teacher_id', 'id');
    }
}
