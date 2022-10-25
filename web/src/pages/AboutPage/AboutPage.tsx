import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'
import { AiFillGithub, AiFillLinkedin, AiOutlineMail } from 'react-icons/ai'
import { TbWorld } from 'react-icons/tb'

const AboutPage = () => {
  return (
    <>
      <MetaTags title="About" description="About page" />
      <div className="flex flex-col items-center justify-center gap-2 dark:text-white">
        <div className='w-32 rounded-md'>
          <img src="eumemo.jpg" className='rounded-md' alt="a selfie of myself" />
        </div>
        <h1 className="text-3xl font-semibold">Hello, I'm Lindennerd</h1>
        <pre>The developer behind this project</pre>

        <article className="mt-8 w-full p-2 sm:w-1/2 space-y-4 text-justify">
          <p>
            I love coding ever since I was a young boy, I always loved to build things
            that others can enjoy, software that make their life better, be it
            because made them laugh, because they had fun using it or just because it automated
            away that awfull boring task.
          </p>
          <p>
            It was because of this passion for technology and its potential that
            I decided to make software development my life's work, my legacy to
            this world.
          </p>
          <p className="text-center font-semibold">
            Maybe I can help you as well 😉 <br />
            Feel free to reach me out in my socials below
          </p>

          <div className="flex items-center justify-center gap-4 text-2xl">
            <a href="https://br.linkedin.com/in/luiz-paulo-lindenmaier-710153146">
              <AiFillLinkedin />
            </a>
            <a href="https://github.com/Lindennerd">
              <AiFillGithub />
            </a>
            <a href="https://lindennerd.vercel.app">
              <TbWorld />
            </a>
            <a href="mailto://lindennerd@gmail.com">
              <AiOutlineMail/>
            </a>
          </div>
        </article>
      </div>
    </>
  )
}

export default AboutPage
