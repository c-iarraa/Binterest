import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, useParams } from "react-router-dom";
import { search_pins } from '../../store/pin';

import './SearchBar.css';

function PinBySearch() {
    const dispatch = useDispatch()
    const { keyword } = useParams();
    console.log('@!@!@', keyword)


    useEffect(() => {
        dispatch(search_pins(keyword))
    }, [dispatch, keyword])


    // const singlePin = useSelector((state) => {
    //     return state.pins.onePin
    // })
    // const pin = useSelector(state => state.pins.allPins)
    const pin = useSelector(state => state.pins.searchedPins)
    const pinArr = Object.values(pin)

    if(!pinArr) return null
    // if(!singlePin) return null


    return pinArr &&(
        <div className='search-pins-container'>
            {/* <h1>hello</h1> */}
            <div className='search-captions-container'>
                <div className='search-captions'>
                {pinArr?.length > 0 ?
                    // <><div className='search-cap'> {pinArr?.length} search results for "{keyword}"</div><span className='search-cap'></span></>
                    <></>
                    :
                    <><div className='search-cap'> We couldn't find any results for "{keyword}"</div><span className='search-cap'> &nbsp;</span><div className='search-again-message'>Let's try finding something else!</div></>
                }
                </div>
            </div>
            <div className='search-box'>
                <div className='search-pin-box'>
                    {pinArr.map(el => (
                    <ul>
                        <div id='pinCard' key={el.id}>
                            <NavLink to={`/pins/${el.id}`}>
                            <img className='pinImg' src={el.imageUrl}></img>
                            </NavLink>
                        </div>
                    </ul>
                    ))}
                </div>
            </div>
    </div>
  )
}

export default PinBySearch
