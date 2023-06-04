<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TeacherResource extends JsonResource
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
            'first_name' => $this->first_name,
            'cin' => $this->cin,
            'last_name' => $this->last_name,
            'address' => $this->address,
            'phone' => $this->phone,
            'email' => $this->email,
            'diploma' => $this->diploma,
            'speciality' => $this->speciality,
            'hourly_rate' => $this->hourly_rate,
            'birthday' => $this->birthday,
            'hiredate' => $this->hiredate,
            'gender' => $this->gender,
            'classes' => $this->classes,
        ];
    }
}
