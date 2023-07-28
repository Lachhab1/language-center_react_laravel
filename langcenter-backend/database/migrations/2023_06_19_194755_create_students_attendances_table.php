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
        Schema::create('students_attendances', function (Blueprint $table) {
            $table->id();
            $table->date("date");
            $table->boolean("isAbsent");
            $table->text("reason");
            $table->unsignedBigInteger("student_id");
            $table->timestamps();
            $table->foreign("student_id")->references("id")->on("etudiants")->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('students_attendances');
    }
};
