<?php

use App\Http\Controllers\LoginController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\EtudiantController;
use App\Http\Controllers\InscrireClassController;

Route::post('/login', [LoginController::class, 'login']);


Route::middleware('auth:sanctum')->group(
    function () {
        Route::get('/user', function (Request $request) {
            return $request->user();
        });
        Route::post('/logout', [LoginController::class, 'logout']);
        Route::apiResource('users', UserController::class);
    }
);
Route::apiResource('etudiants', App\Http\Controllers\EtudiantController::class);
Route::apiResource('inscrire-classes', App\Http\Controllers\InscrireClassController::class);
