<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddClassIdToCoursTable extends Migration
{
    public function up()
    {
        Schema::table('cours', function (Blueprint $table) {
            $table->foreignId('class__id')->constrained('classes')->onDelete('cascade');
        });
    }

    public function down()
    {
        Schema::table('cours', function (Blueprint $table) {
            $table->dropForeign(['class__id']);
            $table->dropColumn('class__id');
        });
    }
}
