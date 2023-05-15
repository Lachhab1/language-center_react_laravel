<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'first_name' => $this->first_name,
            'last_name' => $this->last_name,
            'cin' => $this->cin,
            'phone' => $this->phone,
            'address' => $this->address,
            'gender' => $this->gender,
            'birthday' => $this->birthday,
            'image' => $this->image,
            'date_of_hiring' => $this->date_of_hiring,
            'role' => $this->role,
            'email' => $this->email,
            'is_active' => true,
            'created_at' => $this->created_at->format('Y-m-d H:i:s')
        ];
    }
}
