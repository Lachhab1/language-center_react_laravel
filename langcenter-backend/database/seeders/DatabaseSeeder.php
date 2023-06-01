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

        // \App\Models\User::factory()->create([
        //     'name' => 'Test User',
        //     'email' => 'test@example.com',
        // ]);
        \App\Models\User::create(['email' => 'admin@admin.com', 'password' => bcrypt('12345678'), 'first_name' => 'admin', 'last_name' => 'admin', 'username' => 'admin', 'role' => 'admin', 'cin' => 'bv1895', 'birthday' => '2002-01-01', 'date_of_hiring' => '2022-01-01', 'gender' => 'male', 'phone' => '0687439035', 'address' => 'qooqo', 'image' => 'empty']);
        \App\Models\Parent_::create(
            [
                'nom' => 'Test User',
                'prenom' => 'Test User',
                'cin' => 'bv1895',
                'sexe' => 'male',
                'date_naissance' => '2002-01-01',
                'email' => 'parent@parent.com',
                'adresse' => 'test',
                'telephone' => '0687439035',
            ]
        );
        \App\Models\Etudiant::create([
            'nom' => 'Test User',
            'prenom' => 'Test User',
            'date_naissance' => '2002-01-01',
            'sexe' => 'male',
            'email' => 'test@test.com',
            'adresse' => 'test',
            'telephone' => '0687439035',
            'parent_id' => 1,
        ]);
        \App\Models\Class_::create([
            'name' => 'A-1',
            'school_year' => '2021-2022',
            'description' => 'Test User',
            'capacity' => 30,
            'start_date' => '2021-01-01',
            'end_date' => '2022-01-01',
            'level' => 'A',
        ]);
        \App\Models\Cours::create([
            'title' => 'Test User',
            'description' => 'Test User',
            'duration' => '4 hours',
            'price' => 1000,
            'class__id' => 1,
        ]);
        \App\Models\InscrireClass::create([
            'class__id' => 1,
            'etudiant_id' => 1,
            'inscription_date' => '2021-01-01',
            'negotiated_price' => 1000,
            'payment_status' => 'paid',
        ]);
    }
}
