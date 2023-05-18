<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\Password;
use Illuminate\Validation\Rule;

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
        $userId = $this->route('user')->id;
        return [
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'username' => [
                'string',
                'max:255',
                Rule::unique('users')->ignore($userId),
            ],
            'cin' => [
                'required',
                'string',
                'max:255',
                Rule::unique('users')->ignore($userId),
            ],
            'phone' => [
                'required',
                'string',
                'max:255',
                Rule::unique('users')->ignore($userId),
            ],
            'address' => 'required|string|max:255',
            'gender' => 'required|string|in:female,male',
            'date_of_hiring' => 'required|date',
            'birthday' => 'required|date',
            'image' => 'string|max:255',
            'email' => [
                'required',
                'email',
                Rule::unique('users')->ignore($userId),
            ],
            'password' => [
                'nullable',
                'confirmed',
                Password::min(8)
                    ->letters()
                    ->symbols(),
            ],
            'role' => ['required','string','in:admin,secretary,director'],
            'is_active' => 'boolean',
        ];
    }
}
