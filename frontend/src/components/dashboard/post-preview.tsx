import type { postType } from '@/types/post'

type DashboardPostPreviewProps = {
  post: postType
}

export function DashboardPostPreview({ post }: DashboardPostPreviewProps) {
  return (
    <div className="space-y-6">
      <section className="mx-auto w-full max-w-md border border-zinc-300 bg-white p-5 shadow-sm">
        <h2 className="mb-4 text-center text-sm font-semibold">Miniatura</h2>

        <div className="mx-auto flex max-w-xs gap-4 bg-zinc-100 p-3">
          <PostImage
            alt={post.title}
            className="h-32 w-36 shrink-0 object-cover"
            src={post.image}
          />

          <div className="min-w-0 py-2">
            <h3 className="text-sm font-bold leading-tight text-emerald-900">
              {post.title}
            </h3>
            <p className="mt-2 line-clamp-5 text-xs leading-snug text-emerald-950">
              {post.description}
            </p>
          </div>
        </div>
      </section>

      <article className="border border-zinc-300 bg-white p-5 shadow-sm">
        <h2 className="mb-6 text-center text-sm font-semibold">Postagem</h2>

        <h3 className="mb-8 text-center text-2xl font-bold text-emerald-950">
          {post.title}
        </h3>

        <div className="text-sm leading-relaxed text-zinc-800">
          <PostImage
            alt={post.title}
            className="mb-4 h-72 w-full object-cover md:float-left md:mb-3 md:mr-5 md:w-72"
            src={post.image}
          />

          <p className="mb-3 font-medium leading-relaxed text-emerald-950">
            {post.description}
          </p>

          <EditorContent html={post.text} />
        </div>
      </article>
    </div>
  )
}

function EditorContent({ html }: { html: string }) {
  return (
    <div
      className="ck-content max-w-none text-sm leading-relaxed text-zinc-800 [&_figure]:my-4 [&_figure]:max-w-full [&_img]:h-auto [&_img]:max-w-full [&_ol]:ml-5 [&_ol]:list-decimal [&_p]:mb-3 [&_table]:w-full [&_ul]:ml-5 [&_ul]:list-disc"
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
