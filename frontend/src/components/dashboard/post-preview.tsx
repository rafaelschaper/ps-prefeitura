import { PostThumbnail } from '@/components/post-thumbnail'
import { cn } from '@/lib/utils'
import type { postType } from '@/types/post'

type DashboardPostPreviewProps = {
  post: postType
}

type PostContentPreviewProps = {
  articleClassName?: string
  imageClassName?: string
  post: postType
  showSectionTitle?: boolean
  titleClassName?: string
  titleTag?: 'h1' | 'h2' | 'h3'
}

export function DashboardPostPreview({ post }: DashboardPostPreviewProps) {
  return (
    <div className="space-y-6">
      <section className="mx-auto w-full max-w-lg border border-zinc-300 bg-white p-5 shadow-sm">
        <h2 className="mb-4 text-center text-sm font-semibold">Miniatura</h2>

        <PostThumbnail className="mx-auto max-w-lg" post={post} />
      </section>

      <PostContentPreview post={post} />
    </div>
  )
}

export function PostContentPreview({
  articleClassName,
  imageClassName,
  post,
  showSectionTitle = true,
  titleClassName,
  titleTag: TitleTag = 'h3',
}: PostContentPreviewProps) {
  return (
    <article
      className={cn(
        'border border-zinc-300 bg-white p-5 shadow-sm',
        articleClassName,
      )}
    >
      {showSectionTitle ? (
        <h2 className="mb-6 text-center text-sm font-semibold">Postagem</h2>
      ) : null}

      <TitleTag
        className={cn(
          'mt-8 mb-12 md:m-16 text-center text-lg md:text-4xl font-[900] text-emerald-950',
          titleClassName,
        )}
      >
        {post.title}
      </TitleTag>

      <div className="md:text-[22px] leading-relaxed text-zinc-800">
        <PostImage
          alt={post.title}
          className={cn(
            'mb-4 h-72 w-full object-cover md:float-left md:mb-3 md:mr-5 md:w-72',
            imageClassName,
          )}
          src={post.image}
        />

        <p className="mb-3 font-[600] leading-relaxed text-emerald-950">
          {post.description}
        </p>

        <EditorContent html={post.text} />
      </div>
    </article>
  )
}

function EditorContent({ html }: { html: string }) {
  return (
    <div
      className="ck-content max-w-none text-base md:text-xl leading-relaxed text-zinc-800 [&_figure]:my-4 [&_figure]:max-w-full [&_img]:h-auto [&_img]:max-w-full [&_ol]:ml-5 [&_ol]:list-decimal [&_p]:mb-3 [&_table]:w-full [&_ul]:ml-5 [&_ul]:list-disc"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}

function PostImage({
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
