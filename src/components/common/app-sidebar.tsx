import { Command } from 'lucide-react';
import type * as React from 'react';

import { LocalizedNavLink } from '@/components/common/localized-nav-link';
import { NavMain } from '@/components/common/nav-main.tsx';
import { NavProjects } from '@/components/common/nav-projects.tsx';
import { NavSecondary } from '@/components/common/nav-secondary.tsx';
import { NavUser } from '@/components/common/nav-user.tsx';
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from '@/components/ui/sidebar.tsx';
import { useAuthContext } from '@/hooks/use-auth-context.ts';
import { useLogout } from '@/features/auth/hooks/use-auth.ts';

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
	const { user } = useAuthContext();
	const { logout } = useLogout();

	return (
		<Sidebar variant="inset" {...props}>
			<SidebarHeader>
				<SidebarMenu>
					<SidebarMenuItem>
						<SidebarMenuButton size="lg" asChild>
							<LocalizedNavLink to="/">
								<div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
									<Command className="size-4" />
								</div>
								<div className="grid flex-1 text-left text-sm leading-tight">
									<span className="truncate font-medium">Project</span>
									<span className="truncate text-xs">name</span>
								</div>
							</LocalizedNavLink>
						</SidebarMenuButton>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarHeader>
			<SidebarContent>
				<NavMain />
				<NavProjects />
				<NavSecondary className="mt-auto" />
			</SidebarContent>
			<SidebarFooter>
				<NavUser user={user} logout={logout} />
			</SidebarFooter>
		</Sidebar>
	);
}
