import { DashboardSidebarNavigationType } from "@/typescript/types";

export const dashboardSidebarNavigations: DashboardSidebarNavigationType = {
  admin: [
    {
      id: 1,
      title: "Dashboard",
      path: "/dashboard",
      icon: "layout-dashboard",
    },
    {
      id: 2,
      title: "Users",
      path: "/dashboard/users",
      icon: "users",
    },
    {
      id: 3,
      title: "Appointments",
      path: "/dashboard/appointments",
      icon: "notepad-text",
    },
  ],
  user: [
    {
      id: 1,
      title: "Dashboard",
      path: "/dashboard",
      icon: "layout-dashboard",
    },
    {
      id: 2,
      title: "Bookings",
      path: "/dashboard/bookings",
      icon: "notepad-text",
    },
  ],
};
