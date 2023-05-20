<?php

use App\Http\Controllers\LoginController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;

Route::post('/login', [LoginController::class, 'login']);


Route::middleware('auth:sanctum')->group(
    function () {
        Route::get('/user', function (Request $request) {
            return $request->user();
        });
        Route::post('/logout', [LoginController::class, 'logout']);
        Route::apiResource('users', UserController::class);
        Route::post('/etudiant/add', [App\Http\Controllers\ApiController::class, 'createEtudiant']);
        Route::get('/etudiants', [App\Http\Controllers\ApiController::class, 'getEtudiants']);
        Route::post('/parent/add', [App\Http\Controllers\ApiController::class, 'createParent']);
        Route::get('/parents', [App\Http\Controllers\ApiController::class, 'getParents']);
    }
);
