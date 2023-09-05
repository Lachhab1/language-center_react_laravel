<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Cours;
use App\Models\Class_;

class time_tables extends Model
{
    use HasFactory;
    protected $fillable = ['course_id', 'class_id', 'classroom_id', 'startTime', 'FinishTime', 'day_id'];
    public $timestamps = false;
    protected $table = 'time_tables';
    public function course()
    {
        return $this->belongsTo(Cours::class, 'course_id');
    }
    public function class()
    {
        return $this->belongsTo(Class_::class, 'class_id');
    }
}
