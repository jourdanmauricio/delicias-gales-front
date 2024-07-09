import Link from 'next/link'

type SocialNetworks = {
  href: string;
  children: React.ReactNode
}

const SocialNetworks = ({ href, children }: SocialNetworks) => {
  return (
    <article>
      <Link href={href}>
        {children}
      </Link>
    </article>

  )
}
export default SocialNetworks