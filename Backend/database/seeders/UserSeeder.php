<?php

// database/seeders/UserSeeder.php
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

class UserSeeder extends Seeder
{
    public function run()
    {
        // CMM
        $cmm = User::create([
            'username' => 'cmm01',
            'password' => Hash::make('password123'),
            'role' => 'cmm',
            'parent_id' => null
        ]);

        // MM di bawah CMM
        $mm1 = User::create([
            'username' => 'mm01',
            'password' => Hash::make('password123'),
            'role' => 'mm',
            'parent_id' => $cmm->id
        ]);

        $mm2 = User::create([
            'username' => 'mm02',
            'password' => Hash::make('password123'),
            'role' => 'mm',
            'parent_id' => $cmm->id
        ]);

        // Asman di bawah MM01
        User::create([
            'username' => 'asman01',
            'password' => Hash::make('password123'),
            'role' => 'asman',
            'parent_id' => $mm1->id
        ]);

        // Asman di bawah MM02
        User::create([
            'username' => 'asman02',
            'password' => Hash::make('password123'),
            'role' => 'asman',
            'parent_id' => $mm2->id
        ]);
    }
}


?>