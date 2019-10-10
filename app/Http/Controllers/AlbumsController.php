<?php

namespace App\Http\Controllers;

use App\Albums;
use Illuminate\Http\Request;
use App\Traits\Uploader\Uploader;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class AlbumsController extends Controller
{
    public $folder = 'albums_covers';

    use Uploader;

    public function create(Request $request)
    {
        Validator::make($request->all(), [
            'title' => 'required',
            'desc' => 'required',
            'cover' => 'required|image|max:1500'
        ])->validate();
            
        $album = new Albums();

        $album->title = $request->title;
        $album->desc = $request->desc;
        $album->user_id = Auth::id();
        
        $uploadedFile = $this->uploadImage($request->file('cover'), $this->folder);
        
        $album->cover = $uploadedFile['name'];
        $album->save();
        
        $createdAlbum = $album;
        
        $createdAlbum['folder'] = $uploadedFile['folder'];

        return $createdAlbum;
    }

    public function update(Request $request, $id) {
        Validator::make($request->all(), [
            'title' => 'required|string',
            'desc' => 'required|string',
        ])->validate();
        $userId = Auth::id();
        try {
            $album = Albums::where('id', $id)->where("user_id", $userId)->first();

            $album->title = $request->title;
            $album->desc = $request->desc;

            if ($request->hasFile('cover')) {
                $this->removeFileIfExists($album->cover, $this->folder);

                $albumCover = $this->uploadImage($request->file('cover'), $this->folder, 300);
                $album->cover = $albumCover['name'];
            }

            $album->save();

            return response()->json([
                'album' => $album
            ]);
        } catch (ModelNotFoundException $error) {
            return response()->json([
                'message' => 'Такой записи нет, либо она вам не принадлежит' 
            ], 404);
        };


    }

    public function remove($albumId) {
        try {
            $album = Albums::where('id', $albumId)
                    ->where('user_id', Auth::id())
                    ->first();

            $album->delete();

            return response()->json([
                'album' => $album
            ]);

        } catch (ModelNotFoundException $error) {
            return response()->json([
                'message' => 'Такой записи нет, либо она вам не принадлежит' 
            ], 404);
        }
    }

    public function view(Request $request)
    {
        return Albums::where('user_id', Auth::id())->get();
    }

    public function getById($id) {
        return Albums::where('user_id', Auth::id())->findOrFail($id);
    }
}
