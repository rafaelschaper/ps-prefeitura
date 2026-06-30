<?php

use App\Http\Controllers\CKEditorController;
use Illuminate\Support\Facades\Route;

Route::post('api/ckeditor/upload', [CKEditorController::class, 'upload']);