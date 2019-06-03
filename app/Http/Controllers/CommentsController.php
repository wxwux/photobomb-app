<?php

namespace App\Http\Controllers;

use App\Comments;
use App\AlbumsPhotos;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class CommentsController extends Controller
{
    public function add(Request $request) {
        Validator::make($request->all(), [
            'photo_id' => 'required|integer',
            'content' => 'required'
        ])->validate();

        $comment = new Comments();

        $comment->photo_id = $request->photo_id;
        $comment->content = $request->content;
        $comment->user_id = Auth::id();

        $comment->save();

        $comment['user'] = $comment->user;

        return $comment;
    }

    public function get($photoId) {
        $data = Comments::with('user')->find(7);
        return $data;
    }
}
