<?php

namespace App\Http\Resources;

use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Resources\Json\JsonResource;

class AlbumsPhotos extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'total_likes' => $this->total_likes,
            'filename' => $this->filename,
            'description' => $this->description,
            'liked_by_user' => $this->isLikedByUser(Auth::id()),
            'comments' => $this->comments,
            'album' => $this->album,
            'user' => $this->user
        ];
    }
}
