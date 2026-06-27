<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Override;

class PostRequest extends FormRequest
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
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        $postRules = [];
        $putRules = [];

        $rules = [
            'title' => ['string', 'min:3', 'max:100'],
            'description' => ['string', 'min:3', 'max:300'],
            'image' => ['image', 'mimes:jpeg,png,jpg,webp'],
            'text' => ['string'],
        ];

        if ($this->isMethod('post')){
            $postRules = [
                'title' => ['required'],
                'description' => ['required'],
                'text' => ['required'],
            ];
        }

        if ($this->isMethod('put')) {
            $putRules = [
                'title' => ['sometimes'],
                'description' => ['sometimes'],
                'text' => ['sometimes'],
            ];
        }

        return array_merge_recursive($rules, $postRules, $putRules);
    }

    public function messages()
    {
        return [
            'title.required' => 'O campo TÍTULO é obrigatório.',
            'title.string' => 'O campo TÍTULO deve conter um texto válido.',
            'title.max' => 'O campo TÍTULO deve ter no máximo 100 caracteres.',
            'title.min' => 'O campo TÍTULO deve ter no mínimo 3 caracteres.',

            'description.required' => 'O campo DESCRIÇÃO é obrigatório.',
            'description.string' => 'O campo DESCRIÇÃO deve conter um texto válido.',
            'description.max' => 'O campo DESCRIÇÃO deve ter no máximo 300 caracteres.',
            'description.min' => 'O campo DESCRIÇÃO deve ter no mínimo 3 caracteres.',

            'image.image' => 'O campo IMAGEM deve conter apenas imagens.',
            'image.mimes' => 'O campo IMAGEM deve aceitar apenas imagens jpeg, png, jpg e webp.',

            'text.required' => 'O campo TEXTO é obrigatório.',
            'text.string' => 'O campo TEXTO deve conter um texto válido.',
        ];
    }
}
