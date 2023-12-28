<?php

namespace App\Models;

use App\Models\Image;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Restaurant extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'description', 'user_id'];

    public function images()
    {
        return $this->morphMany(Image::class, 'imageable');
    }
}
