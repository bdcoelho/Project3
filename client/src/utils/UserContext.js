import { createContext } from "react";

const UserContext = createContext({
  id: "",
  email: "",
  firstName: "",
  lastName: "",
  lng: "",
  lat: ""
});

export default UserContext;