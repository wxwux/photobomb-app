<?php

namespace App\Http\Controllers;

use App\User;
use Illuminate\Http\Request;
use App\Traits\Uploader\Uploader;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Validator;

class UsersController extends Controller
{

    use Uploader;

    public $folder = 'user';

    public function update(Request $request) {
        Validator::make($request->all(), [
            'name' => 'required|string',
            'description' => 'required|string',
            'avatar' => 'required|image|max:500',
            'email' => 'required|email',
            'background' => 'image|max:1500',
        ])->validate();

        $userId = Auth::id();

        $user = User::find($userId);

        $user->name = $request->name;
        $user->description = $request->description;
        $user->email = $request->email;
        $user->vk = $request->vk;
        $user->fb = $request->fb;
        $user->tw = $request->tw;

        if ($request->hasFile('avatar')) {
            $this->removeFileIfExists($user->avatar);

            $userAvatar = $this->uploadImage($request->file('avatar'), $this->folder, 300);
            $user->avatar = $userAvatar['name'];
        }

        if ($request->hasFile('background')) {
            $this->removeFileIfExists($user->background);

            $background = $this->uploadImage($request->file('background'), $this->folder);
            $user->background = $background['name'];
        }

        $user->save();

        return $user;
    }

    public function info() {
        $userId = Auth::id();
        $user = User::find($userId);

        return response()->json([
            'name' => $user->name,
            'description' => $user->description,
            'avatar' => $user->avatar,
            'background' => $user->background,
            'socials' => [
                'vk' => $user->vk,
                'fb' => $user->fb,
                'tw' => $user->tw,
                'email' => $user->email,
            ]
        ]);
    } 

    private function removeFileIfExists($filename) {
        $path = public_path("uploads/$this->folder/$filename");

        if (File::exists($path)) {
            $origin = public_path("uploads/$this->folder/origin/$filename");
            File::delete($path);
            File::delete($origin);
        }

    }
}
