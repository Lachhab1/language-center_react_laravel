<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TeachersAttendance extends Model
{
    use HasFactory;
    protected $fillable = ['date','teacher_id','isAbsent','reason',];
    protected $table = 'teachers_attendances';
    public function teacher()
    {
        return $this->belongsTo(Teacher::class, 'teacher_id');
    }
}
