<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\InscrireClass;

class Payment extends Model
{
    use HasFactory;
    protected $fillable = [
        'inscrire_class_id',
        'amount',
        'payment_date',
    ];

    public function inscrireClass()
    {
        return $this->belongsTo(InscrireClass::class);
    }
}
