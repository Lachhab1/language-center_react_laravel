<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class studentsAttendance extends Model
{
    use HasFactory;
    protected $fillable = ['date','student_id','isAbsent','reason',];
    protected $table = 'students_attendances';
    public function etudiant()
    {
        return $this->belongsTo(Etudiant::class, 'student_id');
    }
}
