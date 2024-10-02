"use client";

import React from "react";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalTrigger,
} from "@/components/aceternity/animated-modal";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { cn } from "@/lib/utils";
import Link from "next/link";

interface PulsatingButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  pulseColor?: string;
  duration?: string;
}

export default function PulsatingButton({
  className,
  children,
  pulseColor = "#0096ff",
  duration = "1.5s",
  ...props
}: PulsatingButtonProps) {
  const birthDate = new Date("2002-06-05");
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return (
    <Modal>
      <ModalTrigger>
        <span
          className={cn(
            "relative text-reverse text-center cursor-pointer flex justify-center items-center rounded-lg text-white dark:text-black bg-reverse px-4 py-2",
            className,
          )}
          style={
            {
              "--pulse-color": pulseColor,
              "--duration": duration,
            } as React.CSSProperties
          }
          {...props}
        >
          <div className="relative z-10">{children}</div>
          <div className="absolute top-1/2 left-1/2 size-full rounded-lg bg-inherit animate-pulse -translate-x-1/2 -translate-y-1/2" />
        </span>
      </ModalTrigger>
      <ModalBody>
        <ModalContent>
          <h1 className="text-center text-xl">ABOUT ME</h1>
          <br />
          <p>
            I am a full-stack developer from Lebanon ({age} years old), a tech enthusiast, and a lifelong learner. I love building things that make life easier and more fun.
          </p>
          <p>
            I am passionate about creating software that is both functional and beautiful. I am always looking for new opportunities to learn and grow.
          </p>
          <p>
            I am currently working on a number of projects, private and open-source projects.
          </p>
          <p>
            I am always open to new opportunities and collaborations, so feel free to reach out if you have any questions or ideas.
          </p>
        </ModalContent>
        <ModalFooter className="grid grid-cols-1">
          <div className="items-center justify-evenly text-center">
            <Modal>
              <ModalTrigger>
                <span className="px-2 py-1 bg-reverse text-white dark:text-black border border-primary rounded-md text-sm w-28">Education</span>
              </ModalTrigger>
              <ModalBody>
                <ModalContent>
                  <h1 className="text-center text-xl">EDUCATION</h1>
                  <br />
                  <ul className="mb-4 ml-4 divide-y divide-dashed border-l text-left">
                    <li className="relative ml-10 py-4">
                      <div className="absolute -left-16 top-2 flex items-center justify-center bg-white rounded-full">
                        <Avatar className="border size-12 m-auto">
                          <AvatarImage src="/img/cnam.png" alt="CNAM" className="object-contain" />
                          <AvatarFallback>CNAM</AvatarFallback>
                        </Avatar>
                      </div>
                      <div className="flex flex-1 flex-col justify-start gap-1">
                        <time className="text-xs text-muted-foreground">
                          2020 - Present
                        </time>
                        <h2 className="font-semibold leading-none">
                          CNAM
                        </h2>
                        <span className="prose dark:prose-invert text-sm text-muted-foreground">
                          Learning Computer Engineering, from the basics to the advanced. Not looking forward to the mastery of it, but to the journey of learning.
                        </span>
                      </div>
                    </li>
                    <li className="relative ml-10 py-4">
                      <div className="absolute -left-16 top-2 flex items-center justify-center bg-primary dark:bg-black rounded-full">
                        <Avatar className="border size-12 m-auto">
                          <AvatarImage src="/img/sainte-famille.png" alt="Sainte Famille Francaise" className="object-contain" />
                          <AvatarFallback>Sainte Famille Francaise</AvatarFallback>
                        </Avatar>
                      </div>
                      <div className="flex flex-1 flex-col justify-start gap-1">
                        <time className="text-xs text-muted-foreground">
                          2004 - 2020
                        </time>
                        <h2 className="font-semibold leading-none">
                          Sainte Famille Francaise
                        </h2>
                        <span className="prose dark:prose-invert text-sm text-muted-foreground">
                          Learned the basics of life, and the importance of education. Till this day, I&apos;m thankful to them.
                        </span>
                      </div>
                    </li>
                  </ul>
                </ModalContent>
              </ModalBody>
            </Modal>
            <Modal>
              <ModalTrigger>
                <span className="px-2 py-1 bg-reverse text-white dark:text-black border border-primary rounded-md text-sm w-28">Experience</span>
              </ModalTrigger>
              <ModalBody>
                <ModalContent>
                  <h1 className="text-center text-xl">EXPERIENCE</h1>
                  <br />
                  <ul className="mb-4 ml-4 divide-y divide-dashed border-l text-left">
                  <li className="relative ml-10 py-4">
                      <div className="absolute -left-16 top-2 flex items-center justify-center bg-white rounded-full">
                        <Avatar className="border size-12 m-auto">
                          <AvatarImage src="/img/misck.png" alt="MISCK" className="object-contain" />
                          <AvatarFallback>MISCK</AvatarFallback>
                        </Avatar>
                      </div>
                      <div className="flex flex-1 flex-col justify-start gap-1">
                        <time className="text-xs text-muted-foreground">
                          January 2024 - Present
                        </time>
                        <h2 className="font-semibold leading-none">
                          MISCK CIPHER
                        </h2>
                        <span className="prose dark:prose-invert text-sm text-muted-foreground">
                          Facilitator & Design Phase Key Person
                        </span>
                      </div>
                    </li>
                    <li className="relative ml-10 py-4">
                      <div className="absolute -left-16 top-2 flex items-center justify-center bg-primary dark:bg-black rounded-full">
                        <Avatar className="border size-12 m-auto">
                          <AvatarImage src="/img/sparkedhostllc.png" alt="Sparked Host LLC" className="object-contain" />
                          <AvatarFallback>Sparked Host LLC</AvatarFallback>
                        </Avatar>
                      </div>
                      <div className="flex flex-1 flex-col justify-start gap-1">
                        <time className="text-xs text-muted-foreground">
                          x - x
                        </time>
                        <h2 className="font-semibold leading-none">
                          Sparked Host LLC
                        </h2>
                        <span className="prose dark:prose-invert text-sm text-muted-foreground">
                          Support Representative
                        </span>
                      </div>
                    </li>
                  </ul>
                </ModalContent>
              </ModalBody>
            </Modal>
            <Modal>
              <ModalTrigger>
                <span className="px-2 py-1 bg-reverse text-white dark:text-black border border-primary rounded-md text-sm w-28">Achievements</span>
              </ModalTrigger>
              <ModalBody>
                <ModalContent>
                  <h1 className="text-center text-xl">ACHIEVEMENTS</h1>
                  <br />
                  <p>
                    I have yet to achieve something significant in my life, but I am always looking forward to the future.
                  </p>
                </ModalContent>
              </ModalBody>
            </Modal>
          </div>
          <div>
            <Separator orientation="horizontal" className="py-2 bg-transparent" />
          </div>
          <div className="items-center justify-center text-center">
            <Link href="/contact">
              <button className="px-2 py-1 bg-destructive text-white rounded-md text-sm w-28">Contact Me</button>
            </Link>
          </div>
        </ModalFooter>
      </ModalBody>
    </Modal>
  );
}
