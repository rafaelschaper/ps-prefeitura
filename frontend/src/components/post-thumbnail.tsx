import Link from 'next/link'

import type { postType } from '@/types/post'
import { cn } from '@/lib/utils'

type PostThumbnailProps = {
  post: postType
  actionLabel?: string
  className?: string
  href?: string
  imageClassName?: string
}

export function PostThumbnail({
  actionLabel,
  className,
  href,
  imageClassName,
  post,
}: PostThumbnailProps) {
  return (
    <article className={cn('flex items-center gap-4 bg-zinc-100 p-3', className)}>
      <PostThumbnailImage
        alt={post.title}
        className={cn('h-32 w-36 shrink-0 object-cover', imageClassName)}
        src={post.image}
      />

      <div className="flex flex-col justify-around min-w-0 py-2">
        <h3 className="text-lg font-semibold leading-tight text-emerald-900">
          {post.title}
        </h3>
        <p className="mt-2 line-clamp-5 text-sm leading-snug text-emerald-950">
          {post.description}
        </p>

        <PostThumbnailAction href={href} label={actionLabel} />
      </div>
    </article>
  )
}

function PostThumbnailAction({
  href,
  label,
}: {
  href?: string
  label?: string
}) {
  if (!label) {
    return null
  }

  if (href) {
    return (
      <Link className='max-w-fit mt-3 inline-flex h-6 items-center rounded-md bg-sky-500 px-3 text-[10px] font-bold uppercase text-white transition hover:bg-sky-600' href={href}>
        {label}
      </Link>
    )
  }

  return <span>{label}</span>
}

function PostThumbnailImage({
  alt,
  className,
  src,
}: {
  alt: string
  className: string
  src?: string
}) {
  if (!src) {
    return (
      <div
        aria-label="Imagem nao informada"
        className={`${className} flex items-center justify-center bg-zinc-200 text-xs font-medium text-zinc-500`}
        role="img"
      >
        Sem imagem
      </div>
    )
  }

  return <img alt={alt} className={className} src={src} />
}
