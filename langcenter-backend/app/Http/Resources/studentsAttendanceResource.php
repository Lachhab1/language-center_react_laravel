<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use App\Http\Resources\EtudiantResource;
use Illuminate\Http\Resources\Json\JsonResource;
use App\Models\Etudiant;

class studentsAttendanceResource extends JsonResource
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
            'date' => $this->date,
            'isAbsent' => $this->isAbsent,
            'reason' => $this->reason,
        ];
    }
}
