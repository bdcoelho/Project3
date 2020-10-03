import React, { useContext, useState, useEffect } from 'react';
import UserContext from "../utils/UserContext";

function NavHeader() {
    const { firstName, lastName } = useContext(UserContext);
  
    return (
      <div>

      </div>
    );
  }
  
  export default NavHeader;
  