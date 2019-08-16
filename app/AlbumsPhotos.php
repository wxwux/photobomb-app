<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class AlbumsPhotos extends Model
{
    protected $appends = ['total_likes'];
    protected $hidden = ['likes'];

    public function album() {
        return $this->belongsTo('App\Albums', 'albums_id');
    }

    public function likes() {
        return $this->hasMany('App\Likes', 'photo_id');
    }

    public function isLikedByUser($userId) {
        return $this->likes()->where('user_id', $userId)->exists();
    }

    public function comments() {
        return $this->hasMany('App\Comments', 'photo_id');
    }

    public function user() {
        return $this->belongsTo('App\User');
    }

    public function getTotalLikesAttribute() {
        return $this->likes->count();
    }
}
