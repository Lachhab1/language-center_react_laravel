<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Carbon\Carbon;

class TeacherSalaryResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */

    public function toArray(Request $request): array
    {
        $Months = [
            1 => 'Janvier',
            2 => 'Février',
            3 => 'Mars',
            4 => 'Avril',
            5 => 'Mai',
            6 => 'Juin',
            7 => 'Juillet',
            8 => 'Août',
            9 => 'Septembre',
            10 => 'Octobre',
            11 => 'Novembre',
            12 => 'Décembre',
        ];
        return [
            'id' => $this->id,
            'salary' => $this->salary,
            'month' => $Months[$this->month],
            'year' => $this->year,
            'date' => Carbon::parse($this->created_at)->format('d-m-Y'),
            'teacher_name' => $this->teacher->first_name . ' ' . $this->teacher->last_name,
            'teacher_id' => $this->teacher->id,
            'hours'=> $this->salary / $this->teacher->hourly_rate,
        ];
    }
}
