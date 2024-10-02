"use client";

import Image from "next/image";
import { ArrowRightIcon } from "@radix-ui/react-icons";
import Link from "next/link";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LinkPreview } from "@/components/aceternity/link-preview";
import AnimatedShinyText from "@/components/magicui/animated-shiny-text";
import PulsatingButton from "@/components/magicui/pulsating-button";

import AppwriteSvg from '@/app/assets/svg/appwrite.svg';
import Css3Svg from '@/app/assets/svg/css3.svg';
import ExpressJsSvg from "@/app/assets/svg/expressjs.svg";
import FigmaSvg from "@/app/assets/svg/figma.svg";
import FirebaseSvg from "@/app/assets/svg/firebase.svg";
import FlaskSvg from "@/app/assets/svg/flask.svg";
import Html5Svg from "@/app/assets/svg/html5.svg";
import JavaSvg from "@/app/assets/svg/java.svg";
import JavaScriptSvg from "@/app/assets/svg/javascript.svg";
import MySQLSvg from "@/app/assets/svg/mysql.svg";
import NextJSSvg from "@/app/assets/svg/nextjs.svg";
import NodeJSSvg from "@/app/assets/svg/nodejs.svg";
import PostmanSvg from "@/app/assets/svg/postman.svg";
import PythonSvg from "@/app/assets/svg/python.svg";
import ReactJSSvg from "@/app/assets/svg/reactjs.svg";
import RedisSvg from "@/app/assets/svg/redis.svg";
import SQLiteSvg from "@/app/assets/svg/sqlite.svg";
import TailwindCSSSvg from "@/app/assets/svg/tailwindcss.svg";
import TypeScriptSvg from "@/app/assets/svg/typescript.svg";
import ZapierSvg from "@/app/assets/svg/zapier.svg";

import { cn } from "@/lib/utils";

export default function Home() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 p-8 pb-20 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <div className="flex flex-col gap-8 items-center pt-5">
        <div
          className={cn(
            "group rounded-full border border-black/5 bg-reverse text-base text-white dark:text-black transition-all ease-in hover:cursor-pointer dark:border-white/5",
          )}
        >
          <Link href="/work">
            <AnimatedShinyText className="inline-flex items-center justify-center px-4 py-1 transition ease-out hover:duration-300">
              <span>✨ Checkout My Work</span>
              <ArrowRightIcon className="ml-1 size-3 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
            </AnimatedShinyText>
          </Link>
        </div>
        <h1>Hi, I&apos;m Anthony M. 👋</h1>
        <PulsatingButton>
          ABOUT ME
        </PulsatingButton>
      </div>
      <div className="flex flex-col gap-8 items-center pt-5">
        <Avatar className="size-40 border">
          <AvatarImage alt="Anthony M." src="/img/avatar.png" />
          <AvatarFallback>Anthony M.</AvatarFallback>
        </Avatar>
      </div>
      <div className="flex flex-col gap-8 items-center lg:col-span-2 pt-10">
        <h2 className="text-xl">Languages and Tools</h2>
        <div className="flex flex-wrap gap-4 justify-center">
          {badges.map((badge) => (
            <LinkPreview
              url={badge.link}
              key={badge.alt}
            >
              <div className="bg-alwayslight p-4 rounded-full">
                <Image width="40" height="40" alt={badge.alt} key={badge.alt} src={badge.svg} className="min-w-[40px] min-h-[40px] max-w-[40px] max-h-[40px] object-contain" />
              </div>
            </LinkPreview>
          ))}
        </div>
      </div>
    </div >
  );
}

const badges = [
  {
    svg: AppwriteSvg, alt: "Appwrite", link: "https://appwrite.io/"
  },
  {
    svg: Css3Svg, alt: "Css3", link: "https://developer.mozilla.org/en-US/docs/Web/CSS"
  },
  {
    svg: ExpressJsSvg, alt: "ExpressJs", link: "https://expressjs.com/"
  },
  {
    svg: FigmaSvg, alt: "Figma", link: "https://www.figma.com/"
  },
  {
    svg: FirebaseSvg, alt: "Firebase", link: "https://firebase.google.com/"
  },
  {
    svg: FlaskSvg, alt: "Flask", link: "https://flask.palletsprojects.com/"
  },
  {
    svg: Html5Svg, alt: "Html5", link: "https://developer.mozilla.org/en-US/docs/Web/HTML"
  },
  {
    svg: JavaSvg, alt: "Java", link: "https://www.java.com/"
  },
  {
    svg: JavaScriptSvg, alt: "JavaScript", link: "https://developer.mozilla.org/en-US/docs/Web/JavaScript"
  },
  {
    svg: MySQLSvg, alt: "MySQL", link: "https://www.mysql.com/"
  },
  {
    svg: NextJSSvg, alt: "NextJS", link: "https://nextjs.org/"
  },
  {
    svg: NodeJSSvg, alt: "NodeJS", link: "https://nodejs.org/"
  },
  {
    svg: PostmanSvg, alt: "Postman", link: "https://www.postman.com/"
  },
  {
    svg: PythonSvg, alt: "Python", link: "https://www.python.org/"
  },
  {
    svg: ReactJSSvg, alt: "ReactJS", link: "https://reactjs.org/"
  },
  {
    svg: RedisSvg, alt: "Redis", link: "https://redis.io/"
  },
  {
    svg: SQLiteSvg, alt: "SQLite", link: "https://www.sqlite.org/index.html"
  },
  {
    svg: TailwindCSSSvg, alt: "TailwindCSS", link: "https://tailwindcss.com/"
  },
  {
    svg: TypeScriptSvg, alt: "TypeScript", link: "https://www.typescriptlang.org/"
  },
  {
    svg: ZapierSvg, alt: "Zapier", link: "https://zapier.com"
  }
];