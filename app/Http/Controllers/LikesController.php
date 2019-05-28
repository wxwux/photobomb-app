<?php

namespace App\Http\Controllers;

use App\Likes;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class LikesController extends Controller
{
    public function add(Request $request) {
        $photoId = $request->id;
        $settedLike = Likes::where('photo_id', $photoId)
                ->where('user_id', Auth::id())
                ->first();

        if ($settedLike === null) {

            $like = new Likes();       

            $like->user_id = Auth::id();
            $like->photo_id = $photoId;

            $like->save();

            $likesAmount = Likes::where('photo_id', $photoId);

            return response()->json([
                'likes' => count($likesAmount)
            ]);

        } else {
            return response()->json([
                'error' => true, 
                'message' => "От вас лайк уже есть"
            ], 409);
        }

    }
}
