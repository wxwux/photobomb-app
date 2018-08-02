<?php

namespace App\Http\Controllers;

use App\Albums;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Intervention\Image\Facades\Image;
use Illuminate\Support\Facades\Validator;

class AlbumsController extends Controller
{
    public $folder = 'albums_covers';

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
        
        $uploadedFile = $this->uploadFile($request->file('cover'), $this->folder);
        
        $album->cover = $uploadedFile['name'];
        $album->save();
        
        $createdAlbum = $album;
        
        $createdAlbum['folder'] = $uploadedFile['folder'];

        return $createdAlbum;
    }

    public function view(Request $request)
    {
        return Albums::where('user_id', Auth::id())->get();
    }

    private function uploadFile($file, $folderName)
    {
        $name = $this->generateFileName($file, 'origin');
        $dir = "uploads/$folderName";
        $file->move("$dir/origin", $name);

        $resizedName = $this->generateFileName($file, 's500');
        
        $resizedImage = Image::make(public_path("$dir/origin/$name"))
            ->resize(500, null, function ($constraint) {
                $constraint->aspectRatio();
            })
            ->save(public_path("$dir/$resizedName"));

        return [
            'name' => $name,
            'folder' => $folderName
        ];
    }

    public function getById($id) {
        return Albums::where('user_id', Auth::id())->findOrFail($id);
    }

    private function generateFileName($file, $modificator)
    {
        $md5 = substr(md5($file->getClientOriginalName().$_SERVER ['HTTP_USER_AGENT']), 3, 10);
        return Auth::id().'q'.$md5.'.'.$file->getClientOriginalExtension();
    }
}
