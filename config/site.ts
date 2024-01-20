export type SiteConfig = typeof siteConfig;

export const siteConfig = {
	name: "Save Protocol",
	description: "Save regularly, profit from the inaction of others.",
	navItems: [
		{
			label: "Start",
			href: "/save",
		},
    {
      label: "My savings",
      href: "/docs",
    },
		{
      label: "Landing",
      href: "/landing",
    },
	],
	navMenuItems: [
		{
			label: "Profile",
			href: "/profile",
		},
		{
			label: "Dashboard",
			href: "/dashboard",
		},
		{
			label: "Projects",
			href: "/projects",
		},
		{
			label: "Team",
			href: "/team",
		},
		{
			label: "Calendar",
			href: "/calendar",
		},
		{
			label: "Settings",
			href: "/settings",
		},
		{
			label: "Help & Feedback",
			href: "/help-feedback",
		},
		{
			label: "Logout",
			href: "/logout",
		},
	],
	links: {
		twitter: "https://twitter.com/luchogax",
		docs: "https://nextui.org",
		discord: "https://discord.gg/9b6yyZKmH4",
    sponsor: "https://patreon.com/jrgarciadev"
	},
};
