<?php

namespace App\Http\Controllers;

use App\Photo;
use App\AlbumsPhotos;
use Illuminate\Http\Request;
use App\Traits\Uploader\Uploader;
use App\Http\Requests\UploadRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class PhotosController extends Controller
{
    public $folder = "photos";
    use Uploader;

    public function uploadPhotos(UploadRequest $request) {
        $photos = $request->file('photos');

        foreach ($photos as $photo) {
            $uploadedFile = $this->uploadImage($photo, $this->folder);
            $photoModel = new AlbumsPhotos();

            $photoModel->filename = $uploadedFile['name'];
            $photoModel->albums_id = $request->albumId;
            $photoModel->user_id = Auth::id();
            $photoModel->title = 'Название';
            $photoModel->description = 'Описание фотографии';

            $photoModel->save();
        }

        $albumsPhotos = AlbumsPhotos::where('albums_id', $request->albumId)->get();

        return response()->json([
            'photos' => $albumsPhotos,
            'folder' => $uploadedFile['folder']
        ]); 
    }

    public function view($albumId) {
        $photos = AlbumsPhotos::where('albums_id', $albumId)
            ->where('user_id', Auth::id())
            ->get(); 

        return response()->json([
            'photos' => $photos,
            'folder' => $this->folder
        ]);
    }

    public function edit(Request $request, $photoId) {
        Validator::make($request->all(), [
            'title' => 'required',
            'description' => 'required',
        ])->validate();

        try {
            $photo = AlbumsPhotos::where('user_id', Auth::id())->findOrFail($photoId);

            $photo->title = $request->title;
            $photo->description = $request->description;

            $photo->save();

            return $photo;

        } catch (ModelNotFoundException $e) {
            return response()->json([
                'message' => "такой записи не существует либо она вам не принадлежит"
            ]);
        }
    }
}