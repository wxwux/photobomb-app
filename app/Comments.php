<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Comments extends Model
{
    public function photo() {
        return $this->belongsTo('App\AlbumsPhotos', 'photo_id');
    }

    public function user() {
        return $this->belongsTo('App\User');
    }
}
