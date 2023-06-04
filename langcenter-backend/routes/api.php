<?php

use App\Http\Controllers\LoginController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\InscrireClassController;
use App\Http\Controllers\TeacherController;

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
// Route::apiResource('classes', App\Http\Controllers\ClassController::class);
Route::put('/classes/{class_}', 'App\Http\Controllers\ClassController@update');
Route::get('/classes', 'App\Http\Controllers\ClassController@index');
Route::post('/classes', 'App\Http\Controllers\ClassController@store');
Route::get('/classes/{class_}', 'App\Http\Controllers\ClassController@show');
Route::delete('/classes/{class_}', 'App\Http\Controllers\ClassController@destroy');
// Route::apiResource('cours', App\Http\Controllers\CoursController::class);    
Route::put('/cours/{cours}', 'App\Http\Controllers\CoursController@update');
Route::get('/cours', 'App\Http\Controllers\CoursController@index');
Route::post('/cours', 'App\Http\Controllers\CoursController@store');
Route::get('/cours/{cours}', 'App\Http\Controllers\CoursController@show');
Route::delete('/cours/{cours}', 'App\Http\Controllers\CoursController@destroy');

//the payment
Route::post('/inscrires/{id}/register-payment', [InscrireClassController::class, 'registerPayment']);
//teacher api
Route::apiResource('teachers', TeacherController::class);
Route::get('/parents', 'App\Http\Controllers\ParentController@index');
Route::put('parents/{parent_}', 'App\Http\Controllers\ParentController@update');
Route::get('/parents/{parent_}','App\Http\Controllers\ParentController@show');

