<?php


namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TimeTableResource extends JsonResource
{
    public function toArray(Request $request)
    {
        return [
            // Define the resource attributes here
            'id' => $this->id,
            'course_id' => $this->course_id,
            'class_id' => $this->class_id,
            'classroom_id' => $this->classroom_id,
            'startTime' => $this->startTime,
            'FinishTime' => $this->finishTime,
            'days' => $this->days,
            // Add more attributes as needed
        ];
    }
}
