<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TestPayResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->register->student->prenom . ' ' . $this->register->student->nom,
            'register_id' => $this->register_id,
            'amount' => intval($this->amount),
            'price' => $this->register->test->price,
            'remaining' => intval($this->register->test->price) - intval($this->amount) > 0 ? intval($this->register->test->price) - intval($this->amount) : 0,
            'payment_method' => $this->payment_method,
            'status' => $this->status,
            'date' => $this->register->date,
        ];
    }
}
