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

export type ServiceType = {
  _id?: string;
  name: string;
  description: string;
  price: number;
  duration: number;
  isActive?: boolean;
  createdBy?: User;
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

export type AppointmentType = {
  _id: string;
  user: User;
  serviceType: string;
  appointmentDate: string;
  status: string;
  vehicleDetails: {
    company: string;
    model: string;
    year: number;
    licencePlate: string;
    notes: string;
  };
  paymentDetails: {
    status: string;
    method: string;
    amount: number;
  };
};
