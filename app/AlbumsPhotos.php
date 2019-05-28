<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class AlbumsPhotos extends Model
{
    public function album() {
        return $this->belongsTo('App\Albums');
    }

    public function likes() {
        return $this->hasMany('App\Likes');
    }
}
