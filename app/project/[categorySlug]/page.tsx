import { getProjectOfCategory, getProjectOfCategoryPageAmount, getProjectCategories } from "@/data/data";
import Link from "next/link";
import { ArrowLeftIcon } from "@radix-ui/react-icons";
import { Card, CardFooter, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import Image from "next/image";
import Markdown from "react-markdown";
import { Badge } from "@/components/ui/badge";
import { notFound } from "next/navigation";
import { LinkPreview } from "@/components/aceternity/link-preview";

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

interface ProjectCategoryProps {
    params: { categorySlug: string };
    searchParams: { page?: string };
}

const languagesAndTools = [
    { name: "JavaScript", svg: JavaScriptSvg, type: "language" },
    { name: "TypeScript", svg: TypeScriptSvg, type: "language" },
    { name: "Python", svg: PythonSvg, type: "language" },
    { name: "Java", svg: JavaSvg, type: "language" },
    { name: "HTML", svg: Html5Svg, type: "language" },
    { name: "CSS", svg: Css3Svg, type: "language" },
    { name: "Node.js", svg: NodeJSSvg, type: "language" },
    { name: "Express.js", svg: ExpressJsSvg, type: "tool" },
    { name: "React", svg: ReactJSSvg, type: "tool" },
    { name: "Next.js", svg: NextJSSvg, type: "tool" },
    { name: "TailwindCSS", svg: TailwindCSSSvg, type: "tool" },
    { name: "Flask", svg: FlaskSvg, type: "tool" },
    { name: "Appwrite", svg: AppwriteSvg, type: "tool" },
    { name: "Firebase", svg: FirebaseSvg, type: "tool" },
    { name: "MySQL", svg: MySQLSvg, type: "tool" },
    { name: "SQLite", svg: SQLiteSvg, type: "tool" },
    { name: "Redis", svg: RedisSvg, type: "tool" },
    { name: "Postman", svg: PostmanSvg, type: "tool" },
    { name: "Figma", svg: FigmaSvg, type: "tool" },
    { name: "Zapier", svg: ZapierSvg, type: "tool" },
];

export default async function ProjectCategory({ params, searchParams }: ProjectCategoryProps) {
    const { categorySlug } = params;
    const page = parseInt(searchParams.page || "1", 10);
    const projects = await getProjectOfCategory(categorySlug, page);
    const categories = await getProjectCategories();
    const categoryExists = categories.some((cat) => cat.slug === categorySlug);
    const pageCount = await getProjectOfCategoryPageAmount(categorySlug);
    if (projects?.length === 0 && categoryExists && !pageCount) {
        return (
            <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
                <div className="flex flex-wrap justify-center gap-8">
                    <p className="text-lg text-center text-muted-foreground dark:text-muted-foreground-invert">
                        There isn&apos;t any project available in this category yet! :(
                    </p>
                </div>
            </div>
        );
    }
    if (!pageCount) return notFound();
    const totalPages = Math.ceil(pageCount / 3);
    if (page > totalPages) {
        return (
            <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
                <div className="flex flex-wrap justify-center gap-8">
                    <p className="text-lg text-center text-muted-foreground dark:text-muted-foreground-invert">
                        Invalid page number. Please try a page number between 1 and {totalPages}.
                    </p>
                </div>
            </div>
        );
    }
    if (!projects || !categoryExists) return notFound();

    const formattedCategoryName = categorySlug.replace(/-/g, ' ').replace(/\b\w/g, char => char.toUpperCase());

    return (
        <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 font-[family-name:var(--font-geist-sans)]">
            <h1 className="text-3xl font-bold">{formattedCategoryName}</h1>

            <div className="flex flex-wrap justify-center gap-8">
                {projects.length !== 0 ? (
                    projects
                        .sort((a, b) => {
                            if (a?.metadata?.publishedAt && b?.metadata?.publishedAt) {
                                return new Date(a.metadata.publishedAt) > new Date(b.metadata.publishedAt) ? -1 : 1;
                            }
                            return 0;
                        })
                        .map((project) => {
                            if (!project) return null; // This should NEVER happen.
                            const tags = project.metadata.tags.split(",").map(tag => tag.trim().toLowerCase());
                            const languages = languagesAndTools.filter(tool => tool.type === "language" && tags.includes(tool.name.toLowerCase()));
                            const tools = languagesAndTools.filter(tool => tool.type === "tool" && tags.includes(tool.name.toLowerCase()));
                            const otherTags = tags.filter(tag => !languagesAndTools.some(tool => tool.name.toLowerCase() === tag));
                            return (
                                <Card
                                    key={project.slug}
                                    className="flex flex-col overflow-hidden border hover:shadow-lg transition-all duration-300 ease-out h-full min-h-[450px]"
                                >
                                    <Image
                                        src={project.metadata?.image}
                                        alt={project.metadata?.title}
                                        width={500}
                                        height={300}
                                        className="h-40 w-full overflow-hidden object-cover object-top"
                                    />
                                    <CardHeader className="px-2 max-w-[300px]">
                                        <div className="space-y-1">
                                            <div className="flex items-center justify-between">
                                                <CardTitle className="mt-1 text-base">
                                                    {project.metadata?.title}
                                                </CardTitle>
                                                {!project.metadata?.active && (
                                                    <Badge className="px-1 py-0 text-[10px]" variant="destructive" key={project.metadata?.title}>
                                                        Inactive
                                                    </Badge>
                                                )}
                                            </div>
                                            <Markdown className="prose max-w-full text-pretty font-sans text-xs text-muted-foreground dark:prose-invert">
                                                {project.metadata?.description}
                                            </Markdown>
                                            {languages.length > 0 && (
                                                <div className="mt-2">
                                                    <p className="text-xs font-semibold">Language{languages.length > 1 ? "s" : ""}:</p>
                                                    <div className="flex flex-wrap gap-1">
                                                        {languages.map((language) => (
                                                            <Badge className="px-1 py-0 text-[10px] whitespace-nowrap flex items-center gap-1" variant="secondary" key={language.name}>
                                                                <Image
                                                                    src={language.svg}
                                                                    alt={language.name}
                                                                    width={16}
                                                                    height={16}
                                                                    className="object-contain"
                                                                />
                                                                {language.name}
                                                            </Badge>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}
                                            {tools.length > 0 && (
                                                <div className="mt-2">
                                                    <p className="text-xs font-semibold">Tool{tools.length > 1 ? "s" : ""}:</p>
                                                    <div className="flex flex-wrap gap-1">
                                                        {tools.map((tool) => (
                                                            <Badge className="px-1 py-0 text-[10px] whitespace-nowrap flex items-center gap-1" variant="secondary" key={tool.name}>
                                                                <Image
                                                                    src={tool.svg}
                                                                    alt={tool.name}
                                                                    width={16}
                                                                    height={16}
                                                                    className="object-contain"
                                                                />
                                                                {tool.name}
                                                            </Badge>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </CardHeader>
                                    <CardContent className="mt-auto flex flex-col px-2 max-w-[300px]">
                                        <div className="flex flex-wrap gap-1 justify-start items-start text-start max-w-full mt-2">
                                            {otherTags.map((tag) => (
                                                <Badge className="px-1 py-0 text-[10px] whitespace-nowrap" variant="secondary" key={tag}>
                                                    {tag}
                                                </Badge>
                                            ))}
                                        </div>
                                    </CardContent>
                                    <CardFooter>
                                        {project.metadata?.links?.github && (
                                            <div className="flex justify-center items-center text-center gap-1 w-full">
                                                <Link href={project.metadata.links.github}>
                                                    <span className="px-2 py-1 bg-reverse text-white dark:text-black border border-primary rounded-md text-sm w-28">
                                                        GitHub
                                                    </span>
                                                </Link>
                                            </div>
                                        )}
                                        {project.metadata?.links?.website && (
                                            <div className="flex justify-center items-center text-center gap-1 w-full">
                                                <LinkPreview url={project.metadata.links.website}>
                                                    <span className="px-2 py-1 bg-reverse text-white dark:text-black border border-primary rounded-md text-sm">
                                                        Website
                                                    </span>
                                                </LinkPreview>
                                            </div>
                                        )}
                                    </CardFooter>
                                </Card>
                            );
                        })
                ) : null}
            </div>

            {projects.length !== 0 ? (
                <div className="flex justify-between items-center text-center gap-1 w-full">
                    <Link href="/project">
                        <span className="flex items-center px-2 py-1 bg-reverse text-white dark:text-black border border-primary rounded-md text-sm w-28">
                            <ArrowLeftIcon className="mr-1 size-3" />
                            Go Back
                        </span>
                    </Link>
                    <div className="flex gap-1">
                        {page > 1 && (
                            <Link href={`/project/${categorySlug}?page=${page - 1}`}>
                                <span className="px-2 py-1 bg-reverse text-white dark:text-black border border-primary rounded-md text-sm w-28">
                                    Previous
                                </span>
                            </Link>
                        )}
                        {Array.from({ length: totalPages }, (_, i) => {
                            const pageNumber = i + 1;
                            const isActive = pageNumber === page;
                            return (
                                <Link key={pageNumber} href={`/project/${categorySlug}?page=${pageNumber}`}>
                                    <span
                                        className={`px-2 py-1 ${isActive ? "bg-primary text-destructive" : "bg-reverse text-white dark:text-black"
                                            } border border-primary rounded-md text-sm w-28`}
                                    >
                                        {pageNumber}
                                    </span>
                                </Link>
                            );
                        })}
                        {page < totalPages && (
                            <Link href={`/project/${categorySlug}?page=${page + 1}`}>
                                <span className="px-2 py-1 bg-reverse text-white dark:text-black border border-primary rounded-md text-sm w-28">
                                    Next
                                </span>
                            </Link>
                        )}
                    </div>
                </div>
            ) : null}
        </div>
    );
}