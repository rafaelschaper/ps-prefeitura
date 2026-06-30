<?php

namespace App\Http\Controllers;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Throwable;

class CKEditorController extends Controller
{
    public function upload(Request $request): JsonResponse
    {
        try {
            if (!$request->hasFile('upload')) {
                return response()->json([
                    'error' => 'No file uploaded'
                ], Response::HTTP_BAD_REQUEST);
            }

            $request->validate([
                'upload' => 'required|image|mimes:jpeg,png,jpg,gif,webp|max:5120',
            ]);

            $file = $request->file('upload');
            $path = $file->store('uploads/editor', 'public');

            return response()->json([
                'url' => url('storage/' . $path)
            ], Response::HTTP_OK);

        } catch (Throwable $e) {
            return response()->json([
                'error' => [
                    'message' => 'File upload failed: ' . $e->getMessage()
                ]
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}
