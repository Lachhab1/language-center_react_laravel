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
        Schema::create('teachers_attendances', function (Blueprint $table) {
            $table->id();
            $table->date("date");
            $table->boolean("isAbsent");
            $table->text("reason");
            $table->unsignedBigInteger("teacher_id");
            $table->timestamps();
            $table->foreign("teacher_id")->references("id")->on("teachers");
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('teachers_attendances');
    }
};
