import React from "react";
import logo from '../../img/logo.png'
import './LogoSearch.css'
import { UilSearch } from '@iconscout/react-unicons'
const LogoSearch = () => {
  return (
        <div className="mt-2">
                 <div className="LogoSearch container">
                    <img src={logo} alt="" />
                    <div className="Search">
                        <input type="text" placeholder="#Explore"/>
                        <div className="s-icon">
                              <UilSearch/>
                        </div>
                    </div>
                 </div>
        </div>
  );
};

export default LogoSearch;
