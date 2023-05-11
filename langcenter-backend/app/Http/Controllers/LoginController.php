<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;
use Illuminate\Support\Facades\Auth;

class LoginController extends Controller
{
    public function login(Request $request)
    {
        $credentials = $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required']
        ]);
        if (!auth()->attempt($credentials)) {
            throw ValidationException::withMessages([
                'email' => [
                    _('auth.failed')
                ]
            ]);
        }
        return $request->user();
    }
    public function logout(Request $request)
    {
        return Auth::logout();
    }
}
