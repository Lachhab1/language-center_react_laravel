<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateUserRequest extends FormRequest
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
            'last_name' => 'required|string|max:255',
            'cin' => 'required|string|max:255|unique:users,cin,' . $this->id,
            'phone' => 'required|string|max:255|unique:users,phone,' . $this->id,
            'address' => 'required|string|max:255',
            'gender' => 'required|string|max:255',
            'date_of_hiring' => 'required|date',
            'birthday' => 'required|date',
            'image' => 'string|max:255',
            'email' => 'required|email|unique:users,email,' . $this->id,
            'password' => 'string|min:8|confirmed',
            'role' => 'required|string|in:admin,secretary,director',
            'is_active' => 'boolean'
        ];
    }
}
