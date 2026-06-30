'use client'

import { useState } from 'react'

import { DashboardPostsTable } from '@/components/dashboard/posts-table'
import type { postType } from '@/types/post'

import { PostDeleteDialog } from './post-delete'
import { PostEditScreen } from './post-edit'
import { PostInfo } from './post-info'

type PostagensTableProps = {
  posts: postType[]
}

export function PostagensTable({ posts }: PostagensTableProps) {
  const [selectedPost, setSelectedPost] = useState<postType | null>(null)
  const [editingPost, setEditingPost] = useState<postType | null>(null)
  const [deletingPost, setDeletingPost] = useState<postType | null>(null)

  return (
    <>
      <DashboardPostsTable
        onDeletePost={setDeletingPost}
        onEditPost={setEditingPost}
        onViewPost={setSelectedPost}
        posts={posts}
      />

      {selectedPost && (
        <PostInfo onClose={() => setSelectedPost(null)} post={selectedPost} />
      )}

      {editingPost && (
        <PostEditScreen onClose={() => setEditingPost(null)} post={editingPost} />
      )}

      {deletingPost && (
        <PostDeleteDialog
          onClose={() => setDeletingPost(null)}
          post={deletingPost}
        />
      )}
    </>
  )
}
