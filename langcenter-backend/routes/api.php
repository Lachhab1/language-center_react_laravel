<?php

use App\Http\Controllers\LoginController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\InscrireClassController;
use App\Http\Controllers\TeacherController;
use App\Http\Controllers\ParentController;
use App\Http\Controllers\EtudiantController;
use App\Http\Controllers\CoursController;
use App\Http\Controllers\StudentsAttendanceController;
use App\Http\Controllers\DaysController;

use App\Http\Controllers\TimeTablesController;
use App\Models\time_tables;

use App\Http\Controllers\ClassroomController;
use App\Models\Classroom;

Route::post('/login', [LoginController::class, 'login']);


Route::post('/login', [LoginController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', function (Request $request) {
        return $request->user();
    });
    Route::post('/logout', [LoginController::class, 'logout']);
    Route::apiResource('users', UserController::class);
});

Route::apiResource('etudiants', EtudiantController::class);
Route::apiResource('inscrire-classes', InscrireClassController::class);

Route::put('/classes/{class_}', 'App\Http\Controllers\ClassController@update');
Route::get('/classes', 'App\Http\Controllers\ClassController@index');
Route::post('/classes', 'App\Http\Controllers\ClassController@store');
Route::get('/classes/{class_}', 'App\Http\Controllers\ClassController@show');
Route::delete('/classes/{class_}', 'App\Http\Controllers\ClassController@destroy');

Route::put('/cours/{cours}', 'App\Http\Controllers\CoursController@update');
Route::get('/cours', 'App\Http\Controllers\CoursController@index');
Route::post('/cours', 'App\Http\Controllers\CoursController@store');
Route::get('/cours/{cours}', 'App\Http\Controllers\CoursController@show');
Route::delete('/cours/{cours}', 'App\Http\Controllers\CoursController@destroy');

Route::post('/inscrires/{id}/register-payment', [InscrireClassController::class, 'registerPayment']);
Route::put('/update-payment/{id}', [InscrireClassController::class, 'updatePayment']);
Route::delete('/delete-payment/{id}/', [InscrireClassController::class, 'deletePayment']);
//teacher api
// Route::apiResource('teachers', TeacherController::class);
Route::get('/teachers', 'App\Http\Controllers\TeacherController@index');
Route::post('/teachers', 'App\Http\Controllers\TeacherController@store');
Route::get('/teachers/{teacher}', 'App\Http\Controllers\TeacherController@show');
Route::put('/teachers/{teacher}', 'App\Http\Controllers\TeacherController@update');
Route::delete('/teachers/{teacher}', 'App\Http\Controllers\TeacherController@destroy');
//parent api
Route::get('/parents', 'App\Http\Controllers\ParentController@index');
Route::put('parents/{parent_}', 'App\Http\Controllers\ParentController@update');
Route::get('/parents/{parent_}', 'App\Http\Controllers\ParentController@show');


// Timetable routes
Route::post('/timeTable', 'App\Http\Controllers\TimeTablesController@store');
Route::get('/timeTable', 'App\Http\Controllers\TimeTablesController@index');
Route::get('/timeTable/{id}', 'App\Http\Controllers\TimeTablesController@show');
Route::put('/timeTable/{timeTable}', 'App\Http\Controllers\TimeTablesController@update');
Route::delete('/timeTable/{timeTable}', 'App\Http\Controllers\TimeTablesController@destroy');
//Route::get('/timeTable', [TimeTableController::class, 'index']);

//days
Route::get('/days', 'App\Http\Controllers\DaysController@index');
Route::get('/days/{id}', 'App\Http\Controllers\DaysController@show');

// Classroom routes
Route::resource('/classroom', ClassroomController::class);
Route::get('/classroom', 'App\Http\Controllers\ClassroomController@index');
Route::get('/classroom/{id}', 'App\Http\Controllers\ClassroomController@show');
Route::post('/classroom', 'App\Http\Controllers\ClassroomController@store');
Route::put('/classroom/{classroom}', 'App\Http\Controllers\ClassroomController@update');
Route::delete('/classroom/{classroom}', 'App\Http\Controllers\ClassroomController@destroy');
//number countroller
Route::get('/number', 'App\Http\Controllers\NumberController@index');

//presence Etudiant
Route::get('/studentsAttendance/{class_id}/{date}','App\Http\Controllers\StudentsAttendanceController@show');
Route::get('/studentsAttendance','App\Http\Controllers\StudentsAttendanceController@index');
Route::post('/studentsAttendance/{class_id}/{date}','App\Http\Controllers\StudentsAttendanceController@store');
Route::put('/studentsAttendance/{class_id}/{date}','App\Http\Controllers\StudentsAttendanceController@update');

//presence Etudiant
Route::get('/teachersAttendance/{date}','App\Http\Controllers\TeachersAttendanceController@show');
Route::get('/teachersAttendance','App\Http\Controllers\TeachersAttendanceController@index');
Route::post('/teachersAttendance/{date}','App\Http\Controllers\TeachersAttendanceController@store');
Route::put('/teachersAttendance/{date}','App\Http\Controllers\TeachersAttendanceController@update');