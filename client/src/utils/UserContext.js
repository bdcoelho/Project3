import { createContext } from "react";

const UserContext = createContext({
  id: "",
  email: "",
  firstName: "",
  lastName: ""
});

export default UserContext;