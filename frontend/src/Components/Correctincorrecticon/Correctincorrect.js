import React, { useEffect, useState } from "react";
import CheckIcon from '@mui/icons-material/Check';
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import  "./Correctincorrect.css"
import { makeStyles, withThemeCreator } from "@mui/styles";

const useStyles=makeStyles((theme)=>({
    checkIcon:{
        color: "white",
        fontSize:'large',
    }

}))

export const Correctincorrect=(props)=>{
    const classes= useStyles()
    const {correct,shows}=props;
return (
    <>
    {shows ?  (correct?
        <span class="icon">
    <span>
    <CheckIcon className={classes.checkIcon}/>
    </span>
   
    </span>
    :
    <span class="wrongicon">
    <span>
    <ClearOutlinedIcon className={classes.checkIcon}/>
    </span>
    </span>
    ):""}
    
   

    </>

)


}