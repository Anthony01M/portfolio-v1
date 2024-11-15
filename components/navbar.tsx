"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { Dock, DockIcon } from "@/components/magicui/dock";
import { ModeToggle } from "@/components/mode-toggle";
import { buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { HouseIcon, MailIcon } from "lucide-react";
import DiscordIcon from "@/app/assets/svg/discord.svg";
import GithubIcon from "@/app/assets/svg/github.svg";
import axios from "axios";

async function fetchGithubStats() {
    const response = await axios.get("/api/getStats");
    return response.data;
}

export default function Navbar() {
    const [githubStats, setGithubStats] = useState<{ public_repos: number } | null>(null);

    useEffect(() => {
        async function getStats() {
            try {
                const stats = await fetchGithubStats();
                setGithubStats(stats);
            } catch (error) {
                console.error("Failed to fetch GitHub stats:", error);
            }
        }

        getStats();
    }, []);

    return (
        <div className="pointer-events-none fixed inset-x-0 bottom-0 z-30 mx-auto mb-4 flex origin-bottom h-full max-h-14">
            <div className="fixed bottom-0 inset-x-0 h-16 w-full bg-background to-transparent backdrop-blur-lg [-webkit-mask-image:linear-gradient(to_top,black,transparent)] dark:bg-background"></div>
            <Dock className="z-50 pointer-events-auto relative mx-auto flex min-h-full h-full items-center px-1 bg-background [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)] transform-gpu dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset] ">
                <DockIcon>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Link
                                href="/"
                                className={cn(
                                    buttonVariants({ variant: "ghost", size: "icon" }),
                                    "size-12"
                                )}
                            >
                                <HouseIcon className="size-4" />
                            </Link>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>Home</p>
                        </TooltipContent>
                    </Tooltip>
                </DockIcon>
                <DockIcon>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Link
                                href="/contact"
                                className={cn(
                                    buttonVariants({ variant: "ghost", size: "icon" }),
                                    "size-12"
                                )}
                            >
                                <MailIcon className="size-4" />
                            </Link>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>Contact</p>
                        </TooltipContent>
                    </Tooltip>
                </DockIcon>
                <Separator orientation="vertical" className="h-full" />
                <DockIcon>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Link
                                href="https://discord.gg/JgPqJqk"
                                className={cn(
                                    buttonVariants({ variant: "ghost", size: "icon" }),
                                    "size-12"
                                )}
                            >
                                <Image alt="discord" key="discord" src={DiscordIcon} className="size-5" />
                            </Link>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>Discord</p>
                        </TooltipContent>
                    </Tooltip>
                </DockIcon>
                <DockIcon>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Link
                                href="https://github.com/Anthony01M"
                                className={cn(
                                    buttonVariants({ variant: "ghost", size: "icon" }),
                                    "size-12 relative"
                                )}
                            >
                                <Image alt="github" key="github" src={GithubIcon} className="size-5 dark:invert" />
                                {githubStats && (
                                    <span className="absolute top-0 right-0 inline-flex items-center justify-center px-1.5 py-0.5 text-[10px] font-bold leading-none text-white bg-red-500 rounded-full">
                                        {githubStats.public_repos > 99 ? '99+' : githubStats.public_repos}
                                    </span>
                                )}
                            </Link>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>Github</p>
                        </TooltipContent>
                    </Tooltip>
                </DockIcon>
                <Separator orientation="vertical" className="h-full py-2" />
                <DockIcon>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <ModeToggle />
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>Theme</p>
                        </TooltipContent>
                    </Tooltip>
                </DockIcon>
            </Dock>
        </div>
    );
}