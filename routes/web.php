<?php

use App\Models\User;
use Carbon\Carbon;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Route;

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

Route::get('/init', function () {
    $user = User::updateOrCreate(
        ['email' => 'admin@gmail.com'],
        [
            'name' => 'admin',
            'password' => Hash::make(12345),
            'divisi' => 'admin',
            'image' => '12345'
        ]
    );

    return "OK";
});


Route::get('/{any}', function () {
    return view('app');
})->where('any', '.*');

Route::get('/', function () {
    return view('welcome');
});


