<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Albums extends Model
{
    public function photos() {
        return $this->hasMany('App\AlbumsPhotos');
    }
}
