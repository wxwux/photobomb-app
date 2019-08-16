<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Likes extends Model
{
    public function photo() {
        $this->belongsTo('App/AlbumsPhotos');
    }

}
