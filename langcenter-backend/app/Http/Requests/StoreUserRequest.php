<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreUserRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array|string>
     */
    public function rules(): array
    {
        return [
            'first_name' => 'required|string|max:255',
            'last_name' => 'string|max:255',
            'username' => 'required|string|max:255|unique:users,username',
            'cin' => 'required|string|max:255|unique:users,cin',
            'phone' => 'required|string|max:255|unique:users,phone',
            'address' => 'required|string|max:255',
            'gender' => 'required|string|max:255',
            'date_of_hiring' => 'required|date',
            'birthday' => 'required|date',
            'image' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'password' => 'string|min:8|confirmed',
            'role' => 'required|string|in:admin,secretary,director',
        ];
    }
}
