<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Http\Requests\LoginRequest;
use App\Models\User;

class LoginController extends Controller
{
    public function login(LoginRequest $request)
    {
        $credentials = $request->validated();

        if (!Auth::attempt($credentials)) {
            return response(
                [
                    'message' => 'Provided email or password is incorrect.'
                ],
                401
            );
        }
        /** @var User $user */
        $user = Auth::user();
        $token = $user->createToken('authToken')->plainTextToken;
        return response(
            [
                'user' => $user,
                'token' => $token
            ],
            200
        );
    }
    public function logout(Request $request)
    {
        $user = $request->user();
        $user->currentAccessToken()->delete();
        if ($user->currentAccessToken()) {
            return response(
                [
                    'message' => 'User logged out successfully.'
                ],
                200
            );
        } else {
            return response(
                [
                    'message' => 'Something went wrong.'
                ],
                500
            );
        }
    }
}
