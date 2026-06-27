<?php

use App\Http\Controllers\PostController;
use App\Http\Controllers\AuthController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Symfony\Component\HttpFoundation\Response;

Route::post('/login', [AuthController::class, 'login']);

Route::middleware(['auth:sanctum'])->group(function () {
    Route::get('/profile', function (Request $request) {
        return response()->json(Auth::user(), Response::HTTP_OK);
    });

    Route::apiResource('/posts', PostController::class)->except(['index', 'show']);

    Route::post('/logout', [AuthController::class, 'logout']);
});

Route::apiResource('/posts', PostController::class)->only(['index', 'show']);

Route::get('/', function () {
    return ['Laravel' => app()->version()];
});