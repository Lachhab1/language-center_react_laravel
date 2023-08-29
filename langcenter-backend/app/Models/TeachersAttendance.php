<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Teacher;
use App\Models\Class_;

class TeachersAttendance extends Model
{
    use HasFactory;
    protected $fillable = ['date', 'teacher_id', 'isAbsent', 'reason', 'class_id'];
    protected $table = 'teachers_attendances';
    public function teacher()
    {
        return $this->belongsTo(Teacher::class, 'teacher_id');
    }
    public function class()
    {
        return $this->belongsTo(Class_::class, 'class_id');
    }
}
