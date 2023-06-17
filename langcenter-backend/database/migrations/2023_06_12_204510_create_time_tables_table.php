<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('time_tables', function (Blueprint $table) {
            $table->id('id');
            $table->unsignedBigInteger('course_id');
            $table->unsignedBigInteger('class_id');
            $table->unsignedBigInteger('classroom_id');
            $table->time('startTime');
            $table->time('FinishTime');
            $table->unsignedBigInteger('day_id');
            $table->timestamps();
            $table->foreign('course_id')->references('id')->on('cours')->onDelete('cascade');
            $table->foreign('class_id')->references('id')->on('classes')->onDelete('cascade');
            $table->foreign('classroom_id')->references('id')->on('classrooms')->onDelete('cascade');
            $table->foreign('day_id')->references('id')->on('days');
           
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('time_tables');
    }
};