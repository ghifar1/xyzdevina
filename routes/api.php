<?php

use App\Http\Controllers\AreaController;
use App\Http\Controllers\BranchController;
use App\Http\Controllers\ChannelController;
use App\Http\Controllers\DealerController;
use App\Http\Controllers\ExcelController;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\SegmentController;
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
Route::get('/profile', [ProfileController::class, 'index']);
Route::get('/profile/getall', [ProfileController::class, 'getAll']);
Route::post('/profile/add', [ProfileController::class, 'addUser']);
Route::post('/profile/edit', [ProfileController::class, 'editProfile']);

Route::get('/summary/volume', [SummaryController::class, 'volume']);
Route::get('/summary/profit', [SummaryController::class, 'profit']);
Route::get('/summary/topTenClientProfit', [SummaryController::class, 'topTenClientProfit']);
Route::get('/summary/topTenClientVolume', [SummaryController::class, 'topTenClientVolume']);
Route::get('/segment/segment', [SegmentController::class, 'segment']);
Route::get('/segment/segmentGrowth', [SegmentController::class, 'segmentGrowth']);
Route::get('/area/areaSnd', [AreaController::class, 'areaSnd']);
Route::get('/dealer', [DealerController::class, 'dealer']);
Route::get('/branch', [BranchController::class, 'branch']);
Route::get('/channel/groupingProduct', [ChannelController::class, 'groupingProduct']);
Route::get('/channel/eChannels', [ChannelController::class, 'eChannels']);


