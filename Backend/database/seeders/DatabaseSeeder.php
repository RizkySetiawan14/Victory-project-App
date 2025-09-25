<?php

// namespace Database\Seeders;

// use Illuminate\Database\Seeder;
// use Illuminate\Support\Facades\Hash;
// use App\Models\User;

// class DatabaseSeeder extends Seeder
// {
//     public function run(): void
//     {
//         // ===== CMM 1 =====
//         $cmm1 = User::create([
//             'name' => 'CMM 1',
//             'password' => Hash::make('password123'),
//             'role' => 'cmm',
//             'team_id' => 1,
//             'parent_id' => null,
//         ]);

//         // MM untuk CMM 1
//         $mm1a = User::create([
//             'name' => 'MM 1A',
//             'password' => Hash::make('password123'),
//             'role' => 'mm',
//             'team_id' => 1,
//             'parent_id' => $cmm1->id,
//         ]);
//         $mm1b = User::create([
//             'name' => 'MM 1B',
//             'password' => Hash::make('password123'),
//             'role' => 'mm',
//             'team_id' => 1,
//             'parent_id' => $cmm1->id,
//         ]);

//         // Asman untuk MM 1A
//         User::create([
//             'name' => 'Asman 1A-1',
//             'password' => Hash::make('password123'),
//             'role' => 'asman',
//             'team_id' => 1,
//             'parent_id' => $mm1a->id,
//         ]);
//         User::create([
//             'name' => 'Asman 1A-2',
//             'password' => Hash::make('password123'),
//             'role' => 'asman',
//             'team_id' => 1,
//             'parent_id' => $mm1a->id,
//         ]);

//         // Asman untuk MM 1B
//         User::create([
//             'name' => 'Asman 1B-1',
//             'password' => Hash::make('password123'),
//             'role' => 'asman',
//             'team_id' => 1,
//             'parent_id' => $mm1b->id,
//         ]);
//         User::create([
//             'name' => 'Asman 1B-2',
//             'password' => Hash::make('password123'),
//             'role' => 'asman',
//             'team_id' => 1,
//             'parent_id' => $mm1b->id,
//         ]);

//         // ===== CMM 2 =====
//         $cmm2 = User::create([
//             'name' => 'CMM 2',
//             'password' => Hash::make('password123'),
//             'role' => 'cmm',
//             'team_id' => 2,
//             'parent_id' => null,
//         ]);

//         // MM untuk CMM 2
//         $mm2a = User::create([
//             'name' => 'MM 2A',
//             'password' => Hash::make('password123'),
//             'role' => 'mm',
//             'team_id' => 2,
//             'parent_id' => $cmm2->id,
//         ]);
//         $mm2b = User::create([
//             'name' => 'MM 2B',
//             'password' => Hash::make('password123'),
//             'role' => 'mm',
//             'team_id' => 2,
//             'parent_id' => $cmm2->id,
//         ]);

//         // Asman untuk MM 2A
//         User::create([
//             'name' => 'Asman 2A-1',
//             'password' => Hash::make('password123'),
//             'role' => 'asman',
//             'team_id' => 2,
//             'parent_id' => $mm2a->id,
//         ]);
//         User::create([
//             'name' => 'Asman 2A-2',
//             'password' => Hash::make('password123'),
//             'role' => 'asman',
//             'team_id' => 2,
//             'parent_id' => $mm2a->id,
//         ]);

//         // Asman untuk MM 2B
//         User::create([
//             'name' => 'Asman 2B-1',
//             'password' => Hash::make('password123'),
//             'role' => 'asman',
//             'team_id' => 2,
//             'parent_id' => $mm2b->id,
//         ]);
//         User::create([
//             'name' => 'Asman 2B-2',
//             'password' => Hash::make('password123'),
//             'role' => 'asman',
//             'team_id' => 2,
//             'parent_id' => $mm2b->id,
//         ]);
//     }
// }
