import dynamicIconImports from "lucide-react/dynamicIconImports";

export type User = {
  _id: string;
  name: string;
  email: string;
  avatar: string;
  phone: string;
  gender: string;
  role: string;
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
  };
  permission: {
    manageUsers: boolean;
    manageAppointments: boolean;
    manageServices: boolean;
  };
  appointments: [];
};

export type DashboardSidebarNavigationType = {
  admin: {
    id: number;
    title: string;
    path: string;
    icon: keyof typeof dynamicIconImports;
  }[];
  user: {
    id: number;
    title: string;
    path: string;
    icon: keyof typeof dynamicIconImports;
  }[];
};
