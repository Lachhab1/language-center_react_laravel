<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class teachersAttendanceResource extends JsonResource
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
            'teacher' => $this->teacher,
            'date' => $this->date,
            'isAbsent' => $this->isAbsent,
            'reason' => $this->reason,
        ];
    }
}
