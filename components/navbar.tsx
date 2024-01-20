"use client"
import {
	Navbar as NextUINavbar,
	NavbarContent,
	NavbarMenu,
	NavbarMenuToggle,
	NavbarBrand,
	NavbarItem,
	NavbarMenuItem,
} from "@nextui-org/navbar";
import { Button } from "@nextui-org/button";
import { Kbd } from "@nextui-org/kbd";
import { Link } from "@nextui-org/link";
import { Input } from "@nextui-org/input";
import { link as linkStyles } from "@nextui-org/theme";
import { siteConfig } from "@/config/site";
import NextLink from "next/link";
import clsx from "clsx";
import { ThemeSwitch } from "@/components/theme-switch";
import {
	TwitterIcon,
	HeartFilledIcon,
} from "@/components/icons";
import Image from "next/image";

import { Logo } from "@/components/icons";
import FormNav from "./formNav";

export const Navbar = () => {
	return (
		<NextUINavbar maxWidth="xl" position="sticky">
			<NavbarContent className="basis-1/5 sm:basis-full" justify="start">
				<NavbarBrand as="li" className="gap-3 max-w-fit">
					<NextLink className="flex justify-start items-center gap-1" href="/">
						<Image src={'/saver-logo.png'} alt='Saver logo' width={50} height={50}/>
						<p className="text-xl text-inherit">Saver</p>
					</NextLink>
				</NavbarBrand>
				<ul className="hidden lg:flex gap-4 justify-start ml-2">
					{/* {siteConfig.navItems.map((item) => (
						<NavbarItem key={item.href}>
							<NextLink
								className={clsx(
									linkStyles({ color: "foreground" }),
									"data-[active=true]:text-primary data-[active=true]:font-medium"
								)}
								color="foreground"
								href={item.href}
							>
								{item.label}
							</NextLink>
						</NavbarItem>
					))} */}
				</ul>
			</NavbarContent>

			<NavbarContent
				className="hidden sm:flex basis-1/5 sm:basis-full"
				justify="end"
			>
				<NavbarItem className="hidden sm:flex gap-2">
					<Link isExternal href={siteConfig.links.twitter} aria-label="Twitter">
						<TwitterIcon className="text-default-500" />
					</Link>
					{/* <ThemeSwitch /> */}
				</NavbarItem>
				<NavbarItem className="hidden md:flex">
					{/* <Button
            isExternal
						as={Link}
						className="text-sm font-normal text-default-600 bg-default-100"
						// href={siteConfig.links.sponsor}
						startContent={<HeartFilledIcon className="text-danger" />}
						variant="flat"
					>
						Join our waitlist
					</Button> */}
					<FormNav />
				</NavbarItem>
			</NavbarContent>

			<NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
				{/* <ThemeSwitch /> */}
				{/* <NavbarMenuToggle /> */}
			</NavbarContent>

			{/* <NavbarMenu>
				<div className="mx-4 mt-2 flex flex-col gap-2">
					{siteConfig.navMenuItems.map((item, index) => (
						<NavbarMenuItem key={`${item}-${index}`}>
							<Link
								color={
									index === 2
										? "primary"
										: index === siteConfig.navMenuItems.length - 1
										? "danger"
										: "foreground"
								}
								href="#"
								size="lg"
							>
								{item.label}
							</Link>
						</NavbarMenuItem>
					))}
				</div>
			</NavbarMenu> */}
		</NextUINavbar>
	);
};