import React, { useContext, useState, useEffect } from 'react';
import UserContext from "../utils/UserContext";
import Autocomplete from '../components/Autocomplete';

function NavHeader() {
    const { firstName, lastName } = useContext(UserContext);
  
    return (
      <div>
<Autocomplete />
  

      </div>
    );
  }
  
  export default NavHeader;
  