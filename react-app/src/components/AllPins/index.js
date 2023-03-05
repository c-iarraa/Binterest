import { useEffect } from "react";
import { Link, useHistory, NavLink } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react"
import { getPins } from "../../store/pin";
import './AllPins.css'



// Create all spots component that will render all spots after mounting (useEffect & dispatch)
function AllPins() {
    // imported dispatch
    const dispatch = useDispatch();
    // Find data with useSelector in your component
    const sessionPin = useSelector(state => {
        return state.pins.allPins
    });

    const pinsArray = Object.values(sessionPin)

    useEffect(() => {
        dispatch(getPins())
    }, [dispatch])

    return (
        <nav className='container'>
        {pinsArray.map(el => (
        <ul>
            <div id='pinCard' key={el.id}>
                <NavLink to={`/pins/${el.id}`}>
                <img className='pinImg' src={el.imageUrl}></img>
                </NavLink>
            </div>
        </ul>
        ))}
        </nav>
    )
}

export default AllPins;
