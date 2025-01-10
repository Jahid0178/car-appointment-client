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
