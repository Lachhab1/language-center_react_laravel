<?php

use App\Http\Controllers\LoginController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\EtudiantController;
use App\Http\Controllers\InscrireClassController;

use App\Http\Controllers\TimeTableController;
use App\Models\TimeTable;

use App\Http\Controllers\ClassroomController;
use App\Models\classroom;

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

//timetable ak
Route::post('/timeTable', 'App\Http\Controllers\TimeTableController@store');
Route::get('/timeTable', 'App\Http\Controllers\TimeTableController@store');
Route::resource('/timeTable', TimeTableController::class);

//classroom ak
Route::resource('/classroom', ClassroomController::class);
