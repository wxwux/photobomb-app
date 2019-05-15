<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::prefix('api')->group(function () {
    Route::post('register', 'AuthController@register');
    Route::post('login', 'AuthController@login');
    Route::post('refreshToken', 'AuthController@refreshToken');

    Route::middleware(['jwt.auth'])->group(function () {
        Route::get('user', 'AuthController@getUser');

        Route::post('albums', 'AlbumsController@create');
        Route::get('albums', 'AlbumsController@view');
        Route::get('albums/{id}', 'AlbumsController@getById');

        Route::post('photos', 'PhotosController@uploadPhotos');

    });
});

Route::get('/', function () {
    return view('index');
});
