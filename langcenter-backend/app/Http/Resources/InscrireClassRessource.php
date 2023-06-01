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
            'parent' => $this->etudiant->parent_,
            'class' => $this->class_,
            'cours' => $this->class_->cours,
            'inscription_date' => $this->inscription_date,
            'frais_paid' => $this->frais_paid,
        ];
    }
}
