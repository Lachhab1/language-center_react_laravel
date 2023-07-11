<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TestPayment extends Model
{
    use HasFactory;
    protected $fillable = [
        'register_id',
        'date',
        'status',
        'amount',
        'payment_method',
    ];
    public $timestamps = false;
    public function register()
    {
        return $this->belongsTo(RegisterTest::class, 'register_id', 'id');
    }
}
