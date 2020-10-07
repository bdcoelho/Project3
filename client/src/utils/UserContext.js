import { createContext } from "react";

const UserContext = createContext({
  id: null,
  email: null,
  firstName: null,
  lastName: null
});

export default UserContext;