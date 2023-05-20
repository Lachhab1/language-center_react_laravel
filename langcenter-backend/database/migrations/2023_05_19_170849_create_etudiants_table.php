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
        Schema::create('etudiants', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('parent_id');
            $table->string('nom', 254);
            // $table->string('prenom', 254);
            // $table->datetime('date_naissance');
            // $table->string('sexe', 254);
            // $table->string('email', 254);
            // $table->string('adresse', 254);
            // $table->string('telephone', 254);
            // $table->boolean('isActive');
            $table->foreign('parent_id')->references('id')->on('parents')->onUpdate('cascade')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('etudiants');
    }
};
