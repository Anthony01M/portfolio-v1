import Markdown from "react-markdown";
import Image from "next/image";
import Link from "next/link";

import {
    Card,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import { getWorkCategories } from "@/data/data"

export default async function WorkCategory() {
    const categories = await getWorkCategories();
    return (
        <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-15 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
            <div className="flex flex-col items-center justify-center mb-8">
                <h1 className="text-4xl font-bold text-center mb-2">My Work</h1>
                <p className="text-center text-muted-foreground dark:text-muted-invert">
                    Please select a category to view my work in that category.
                </p>
            </div>
            <div className="flex flex-wrap justify-center gap-8">
                {categories.map((category) => (
                    <Card key={category.slug} className="flex flex-col overflow-hidden border hover:shadow-lg transition-all duration-300 ease-out h-full w-64 md:w-80">
                        <Image
                            src={category.image.src}
                            alt={category.title}
                            width={500}
                            height={300}
                            className="h-40 w-full overflow-hidden object-cover object-top"
                        />
                        <CardHeader className="px-2">
                            <div className="space-y-1">
                                <CardTitle className="mt-1 text-base">{category.title}</CardTitle>
                                <Markdown className="prose max-w-full text-pretty font-sans text-xs text-muted-foreground dark:prose-invert">
                                    {category.description}
                                </Markdown>
                            </div>
                        </CardHeader>
                        <CardFooter>
                            <div className="flex justify-center items-center text-center gap-1 w-full">
                                <Link href={`/work/${category.slug}`}>
                                    <span className="px-2 py-1 bg-reverse text-white dark:text-black border border-primary rounded-md text-sm w-28">View Work</span>
                                </Link>
                            </div>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
    );
}