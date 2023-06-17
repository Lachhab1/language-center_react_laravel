<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class time_tables extends Model
{
    use HasFactory;
    protected $fillable = ['course_id','class_id','classroom_id','startTime','FinishTime','day_id'];
}
