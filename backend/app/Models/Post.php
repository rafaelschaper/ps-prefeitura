<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;
use Throwable;

class Post extends Model
{
    /** @use HasFactory<\Database\Factories\PostFactory> */
    use HasFactory, HasUuids;

    protected $fillable = [
        'title',
        'description',
        'image',
        'text',
    ];

    protected static function booted()
    {
        self::deleted(function (Post $post) {
            try {
                $image_name = explode('posts/', $post['image']);
                Storage::disk('public')->delete('posts/'.$image_name[1]);
            }catch (Throwable){} 
        });
    }
}
