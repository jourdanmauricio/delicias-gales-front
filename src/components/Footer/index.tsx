import Link from 'next/link'

const Footer = () => {
  return (
    <footer className='mt-8 bg-gray-900 flex flex-col md:flex-row gap-4 w-full justify-around text-custom-secondary'>
      <section>
        {/* Logo */}
        <div className="flex gap-4 justify-center items-center">
          <Link href={"/"}>
            <h1 className={`font-caveat text-3xl md:text-4xl font-semibold mr-10`}>
              Delicias Gales
            </h1>
          </Link>
        </div>
      </section>
      <section>
        {/* Links */}
        <div className="flex gap-4 justify-center items-center">
          <Link href={"/"}>
            <h2 className='text-center'>LINKS</h2>
            <h1 className={`font-caveat text-3xl md:text-4xl font-semibold mr-10`}>
              Delicias Gales
            </h1>
          </Link>
        </div>
      </section>
      <section>
        {/* Logo */}
        <div className="flex gap-4 justify-center items-center">
          <Link href={"/"}>
            <h1 className={`font-caveat text-3xl md:text-4xl font-semibold mr-10`}>
              Delicias Gales
            </h1>
          </Link>
        </div>
      </section>
    </footer>
  )
}
export default Footer