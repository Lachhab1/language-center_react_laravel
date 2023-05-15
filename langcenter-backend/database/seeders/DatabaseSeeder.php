<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // \App\Models\User::factory(10)->create();

        \App\Models\User::create(['email' => 'admin@admin.com','password' => bcrypt('12345678'),'first_name' => 'admin','last_name' => 'admin','role' => 'admin','cin' => 'bv1895', 'birthday' => '2002-01-01', 'date_of_hiring' => '2022-01-01' ,'gender' => 'male','phone' => '0687439035','address' => 'qooqo','image' => 'empty']);

    }
}