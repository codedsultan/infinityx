<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class AdminUserSeeder extends Seeder
{
    public function run()
    {
        $name = config('admin.name');
        $email = config('admin.email');
        $password = config('admin.password');

        if (!$name || !$email || !$password) {
            $this->command?->warn('Admin user not seeded. Missing ADMIN_NAME, ADMIN_EMAIL, or ADMIN_PASSWORD in env.');
            return;
        }

        User::updateOrCreate(
            ['email' => $email],
            [
                'name' => $name,
                'password' => Hash::make($password),
                'email_verified_at' => now(),
            ]
        );

        $this->command?->info("Admin user ensured: {$email}");
    }
}
