import React from "react";

function Footer(){
    var footer = {
        
        "left": "0",
        "bottom": "0",
        "width": "100%",
        "backgroundColor": "#dc3545",
        "color": "white",
        "textAlign": "center"
    }
    return(
        <div>
            <p className="text-center p-2" style={footer}>© 2022 E-Commerce</p>
        </div>
    );
}

export default Footer;