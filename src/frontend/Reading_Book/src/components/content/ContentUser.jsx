import React, { useContext, useState, useEffect } from "react";
import Style from "../../style/content.module.css";
import { Main, StoreContext } from "../cartBook/CartLibrary";
import { updateBook } from "../store/action";
import Context from "../store/Context";
import { useStore } from "../store/hook";
import ClipLoader from "react-spinners/ClipLoader";

function Content(props) {
  const [loading, setLoading] = useState(false);

    useEffect(()=>{
        setLoading(true)
        setTimeout(()=>{
                setLoading(false)
        },2000)
    },[])
  return (
    <>

      <div style={props.style}>
        <div className={Style.contentUser}>
          <div className={Style.contentForYou1}>
          {
              loading?
              <ClipLoader color={"D0021B"} loading={loading}  size={90}/>
              :""
              
            }
          <div>
              <Main />
                </div>
            
          
            
          </div>
        </div>
      </div>
    </>
  );
}

export default Content;
