<?php

use App\Http\Controllers\AreaController;
use App\Http\Controllers\ExcelController;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\SummaryController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('/login', [LoginController::class, 'login']);
Route::post('/upload', [ExcelController::class, 'upload']);
Route::get('/excel', [ExcelController::class, 'get']);

Route::get('/summary/volume', [SummaryController::class, 'volume']);
Route::get('/summary/profit', [SummaryController::class, 'profit']);
Route::get('/summary/topTenClientProfit', [SummaryController::class, 'topTenClientProfit']);
Route::get('/summary/topTenClientVolume', [SummaryController::class, 'topTenClientVolume']);
Route::get('/area/segment', [AreaController::class, 'segment']);
Route::get('/area/segmentGrowth', [AreaController::class, 'segmentGrowth']);

