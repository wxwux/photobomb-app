<?php 
namespace App\Traits\Uploader;

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\File;
use Intervention\Image\Facades\Image;

trait Uploader {
    public function uploadImage($file, $folderName, $resizeToPx = 500)
    {
        $name = $this->generateFileName($file, 'origin');
        $dir = "uploads/$folderName";
        $file->move("$dir/origin", $name);

        $resizedName = $this->generateFileName($file, 's'.$resizeToPx);
        
        $resizedImage = Image::make(public_path("$dir/origin/$name"))
            ->resize($resizeToPx, null, function ($constraint) {
                $constraint->aspectRatio();
            })
            ->save(public_path("$dir/$resizedName"));

        return [
            'name' => $name,
            'folder' => $folderName
        ];
    }

    private function generateFileName($file, $modificator)
    {
        $md5 = substr(md5($file->getClientOriginalName().$_SERVER ['HTTP_USER_AGENT']), 3, 10);
        return Auth::id().'q'.$md5.'.'.$file->getClientOriginalExtension();
    }

    private function removeFileIfExists($filename, $folder) {
        $path = public_path("uploads/$folder/$filename");

        if (File::exists($path)) {
            $origin = public_path("uploads/$folder/origin/$filename");
            File::delete($path);
            File::delete($origin);
        }
    }
}