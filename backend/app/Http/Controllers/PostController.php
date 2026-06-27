<?php

namespace App\Http\Controllers;

use App\Models\Post;
use App\Http\Requests\PostRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Throwable;

class PostController extends Controller
{
    protected $post;

    public function __construct(Post $post)
    {
        $this->post = $post;
    }

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request): JsonResponse
    {
        $post = $this->post->newQuery()
            ->when($request->has('title'), fn($query) => $query->orWhere('title', 'like', "%{$request['title']}%"))
            ->orderBy('created_at', 'desc')
            ->paginate((int) $request->per_page);

        return response()->json($post, Response::HTTP_OK);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(PostRequest $request): JsonResponse
    {
        $data = $request->validated();
        
        if ($request->hasFile('image')){
            $path = $request->file('image')->store('posts', 'public');
            $data['image'] = url('storage/'.$path);
        }

        $post = $this->post->create($data);

        return response()->json($post, Response::HTTP_CREATED);
    }

    /**
     * Display the specified resource.
     */
    public function show(Post $post): JsonResponse
    {
        return response()->json($post, Response::HTTP_OK);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(PostRequest $request, Post $post): JsonResponse
    {
        $data = $request->validated();

        if ($request->hasFile('image')) {
            try {
                $image_name = explode('posts/', $post['image']);
                Storage::disk('public')->delete('posts/'.$image_name[1]);
            } catch (Throwable) {
            } finally {
                $path = $request->file('image')->store('posts', 'public');
                $data['image'] = url('storage/'.$path);
            }
        }

        $post->update($data);

        return response()->json($post, Response::HTTP_OK);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Post $post): JsonResponse
    {
        $post->delete();
        return response()->json([], Response::HTTP_NO_CONTENT);
    }
}
