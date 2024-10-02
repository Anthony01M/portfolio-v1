import { getWorkOfCategory, getWorkOfCategoryPageAmount, getWorkCategories } from "@/data/data";
import Link from "next/link";
import { ArrowLeftIcon } from "@radix-ui/react-icons";
import AnimatedShinyText from "@/components/magicui/animated-shiny-text";
import { Card, CardFooter, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import Image from "next/image";
import Markdown from "react-markdown";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { notFound } from "next/navigation";

interface WorkCategoryProps {
    params: { categorySlug: string };
    searchParams: { page?: string };
}

export default async function WorkCategory({ params, searchParams }: WorkCategoryProps) {
    const { categorySlug } = params;
    const page = parseInt(searchParams.page || "1", 10);
    const works = await getWorkOfCategory(categorySlug, page);
    const categories = await getWorkCategories();
    const categoryExists = categories.some((cat) => cat.slug === categorySlug);
    const pageCount = await getWorkOfCategoryPageAmount(categorySlug);
    if (works?.length === 0 && categoryExists && !pageCount) {
        return (
            <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
                <div className="flex flex-wrap justify-center gap-8">
                    <p className="text-lg text-center text-muted-foreground dark:text-muted-foreground-invert">
                    There isn&apos;t any work available in this category yet! :(
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
    if (!works || !categoryExists) return notFound();
    return (
        <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
            <div
                className={cn(
                    "group rounded-full border border-black/5 bg-reverse text-base text-white dark:text-black transition-all ease-in hover:cursor-pointer dark:border-white/5"
                )}
            >
                <Link href="/work">
                    <AnimatedShinyText className="inline-flex items-center justify-center px-4 py-1 transition ease-out hover:duration-300">
                        <ArrowLeftIcon className="ml-1 size-3 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
                        <span>{"   "}Go Back</span>
                    </AnimatedShinyText>
                </Link>
            </div>

            <div className="flex flex-wrap justify-center gap-8">
                {works.length !== 0 ? (
                    works
                        .sort((a, b) => {
                            if (a?.metadata?.publishedAt && b?.metadata?.publishedAt) {
                                return new Date(a.metadata.publishedAt) > new Date(b.metadata.publishedAt) ? -1 : 1;
                            }
                            return 0;
                        })
                        .map((work) => {
                            if (!work) return null; // This should NEVER happen.
                            return (
                                <Card
                                    key={work.slug}
                                    className="flex flex-col overflow-hidden border hover:shadow-lg transition-all duration-300 ease-out h-full"
                                >
                                    <Image
                                        src={work.metadata?.image}
                                        alt={work.metadata?.title}
                                        width={500}
                                        height={300}
                                        className="h-40 w-full overflow-hidden object-cover object-top"
                                    />
                                    <CardHeader className="px-2">
                                        <div className="space-y-1">
                                            <CardTitle className="mt-1 text-base">{work.metadata?.title}</CardTitle>
                                            <Markdown className="prose max-w-full text-pretty font-sans text-xs text-muted-foreground dark:prose-invert">
                                                {work.metadata?.description}
                                            </Markdown>
                                        </div>
                                    </CardHeader>
                                    <CardContent className="mt-auto flex flex-col px-2">
                                        <div className="flex flex-wrap gap-1 justify-start items-start text-start">
                                            {work.metadata.tags.split(",").map((tag) => (
                                                <Badge className="px-1 py-0 text-[10px]" variant="secondary" key={tag}>
                                                    {tag.trim()}
                                                </Badge>
                                            ))}
                                        </div>
                                    </CardContent>
                                    <CardFooter>
                                        {work.metadata?.links?.github && (
                                            <div className="flex justify-center items-center text-center gap-1 w-full">
                                                <Link href={work.metadata.links.github}>
                                                    <span className="px-2 py-1 bg-reverse text-white dark:text-black border border-primary rounded-md text-sm w-28">
                                                        GitHub
                                                    </span>
                                                </Link>
                                            </div>
                                        )}
                                        {work.metadata?.links?.website && (
                                            <div className="flex justify-center items-center text-center gap-1 w-full">
                                                <Link href={work.metadata.links.website}>
                                                    <span className="px-2 py-1 bg-reverse text-white dark:text-black border border-primary rounded-md text-sm w-28">
                                                        Website
                                                    </span>
                                                </Link>
                                            </div>
                                        )}
                                    </CardFooter>
                                </Card>
                            );
                        })
                ): null}
            </div>

            {works.length !== 0 ? (
                <div className="flex justify-center items-center text-center gap-1 w-full">
                    {page > 1 && (
                        <Link href={`/work/${categorySlug}?page=${page - 1}`}>
                            <span className="px-2 py-1 bg-reverse text-white dark:text-black border border-primary rounded-md text-sm w-28">
                                Previous
                            </span>
                        </Link>
                    )}
                    {Array.from({ length: totalPages }, (_, i) => {
                        const pageNumber = i + 1;
                        const isActive = pageNumber === page;
                        return (
                            <Link key={pageNumber} href={`/work/${categorySlug}?page=${pageNumber}`}>
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
                        <Link href={`/work/${categorySlug}?page=${page + 1}`}>
                            <span className="px-2 py-1 bg-reverse text-white dark:text-black border border-primary rounded-md text-sm w-28">
                                Next
                            </span>
                        </Link>
                    )}
                </div>
            ) : null}
        </div>
    );
}
