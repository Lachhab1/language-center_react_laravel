<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use App\Models\Class_;
use App\Http\Resources\ClassRessource;

class CoursResource extends JsonResource
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
            'title' => $this->title,
            'duration' => $this->duration,
            'price' => $this->price,
            'description' => $this->description,
        ];
    }
}
