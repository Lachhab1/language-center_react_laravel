<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class InscrireClassRessource extends JsonResource
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
            'etudiant' => $this->etudiant,
            'cours' => $this->class_->cours,
            'inscription_date' => $this->inscription_date,
            'negotiated_price' => $this->negotiated_price,
            'status' => $this->payment_status,
            'payment' => $this->payment,
        ];
    }
}
