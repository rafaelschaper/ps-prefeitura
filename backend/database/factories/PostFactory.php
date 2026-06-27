<?php

namespace Database\Factories;

use App\Models\Post;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Post>
 */
class PostFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'title' => fake()->text(80),
            'description' => fake()->text(150),
            'image' => 'https://picsum.photos/'.rand(640, 480),
            'text' => fake()->text(5000),
        ];
    }
}
