/* eslint-disable @typescript-eslint/no-explicit-any */
import fs from "fs";
import matter from "gray-matter";
import path from "path";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeStringify from "rehype-stringify";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { unified } from "unified";

const categories = [
    {
        slug: "web-development",
        title: "Web Development",
        description: "I build websites and web applications using modern tools and technologies.",
        image: {
            src: "/img/work/web-development.png",
            alt: "Web Development",
        },
    },
    {
        slug: "minecraft-plugins",
        title: "Minecraft Plugins",
        description: "I develop custom plugins for Minecraft servers using basic and advanced frameworks.",
        image: {
            src: "/img/work/minecraft-plugins.png",
            alt: "Minecraft Plugins",
        },
    },
    {
        slug: "discord-bots",
        title: "Discord Bots",
        description: "I develop custom bots for Discord servers using Discord.js, Discord.py, JDA and other libraries.",
        image: {
            src: "/img/work/discord-bots.png",
            alt: "Discord Bots",
        },
    }
];

type Category = {
    title: string,
    description: string,
    image: {
        src: string,
        alt: string,
    },
    slug: string,
};

export async function getWorkCategories(): Promise<Category[]> {
    return categories;
}

function getMDXFiles(dir: string) {
    return fs.readdirSync(dir).filter((file) => path.extname(file) === ".mdx");
}

export async function markdownToHTML(markdown: string) {
    const p = await unified()
        .use(remarkParse)
        .use(remarkRehype)
        .use(rehypePrettyCode, {
            // https://rehype-pretty.pages.dev/#usage
            theme: {
                light: "min-light",
                dark: "min-dark",
            },
            keepBackground: false,
        })
        .use(rehypeStringify)
        .process(markdown);

    return p.toString();
}

export async function getPost(type: "work" | "blog", slug: string) {
    const filePath = path.join("content", type, `${slug}.mdx`);
    if (!fs.existsSync(filePath)) return null; // or throw an error, depending on your requirements
    const source = fs.readFileSync(filePath, "utf-8");
    const { content: rawContent, data: metadata } = matter(source);
    const content = await markdownToHTML(rawContent);
    return {
        source: content,
        metadata,
        slug,
    };
}

async function getAllWork(dir: string) {
    const mdxFiles = getMDXFiles(dir);
    return Promise.all(
        mdxFiles.map(async (file) => {
            const slug = path.basename(file, path.extname(file));
            const categorySlug = path.basename(dir);
            const fullSlug = `${categorySlug}/${slug}`;
            const post = await getPost("work", fullSlug);
            if (post == null) return;
            const { metadata, source } = post;
            return {
                metadata,
                slug: fullSlug,
                source,
            };
        })
    );
}

type Work = {
    slug: string;
    metadata: {
        title: string;
        description: string;
        publishedAt: string;
        image: string;
        links: {
            github: string;
            website: string;
        };
        tags: string;
    };
    source: string;
};

export async function getWorkOfCategory(category: string, page: number = 1) {
    if (typeof category !== "string") return null;
    const categories = await getWorkCategories();
    const categoryExists = categories.some((cat) => cat.slug === category);
    if (!categoryExists) return null;
    const works = await getAllWork(path.join(process.cwd(), "content/work/" + category));
    const pageSize = 3;
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return works.slice(startIndex, endIndex) as Work[];
}

export async function getWorkOfCategoryPageAmount(category: string) {
    if (typeof category !== "string") return null;
    const categories = await getWorkCategories();
    const categoryExists = categories.some((cat) => cat.slug === category);
    if (!categoryExists) return null;
    const works = await getAllWork(path.join(process.cwd(), "content/work/" + category));
    return works.length;
}

export async function getBlogPost(slug: string) {
    return getPost("blog", slug);
}