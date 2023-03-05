import { useEffect } from "react";
import { Link, useHistory, NavLink, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { getBoards, oneBoard, deleteBoard } from "../../../store/pinBoard";
import { getPins, onePin } from "../../../store/pin";
import './AllBoards.css'
import newboard from '../../Photo/newboard.png'


function AllBoards() {

    const dispatch = useDispatch();
    const history = useHistory();
    // const { boardId } = useParamas();
    // const { pinId } = useParams();

    const [name, setName] = useState('');
    // const boardSelector = useSelector(state => state.boards.oneBoard);
    const sessionUserId = useSelector(state => state.session.user.id);
    // console.log('session user id', sessionUserId)


    const handleSubmit = async (e) => {
        e.preventDefault();
    }

    // useEffect(() => {
    //     dispatch(onePin(pinId))
    // }, [dispatch])

    // const pin = useSelector(state => {
    //     return state.pins.allPins.pin
    // });

    // const pinArray = Object.values(pin);
    // console.log('pin array test', pinArray[0])

    const sessionBoard = useSelector(state => {
        return state.boards.allBoards
    });
    // console.log('session board', sessionBoard)

    const boardArray = Object.values(sessionBoard);
    // console.log('boards array', boardArray)

    useEffect(() => {
        dispatch(getBoards(sessionUserId))
    }, [dispatch])


    // if (!sessionBoard) return null;
    // if (!boardArray) return null;
    // useEffect(() => {
    //     dispatch(oneBoard(boardId))
    // }, [boardId, dispatch])


    return (
        <nav className='all-boards-container'>
            <div className='all-pin-card'>
                {boardArray.map(board => (
                    <div>
                        { boardArray.length ?
                        <ul>
                            <div id='boardCard' key={board.id}>
                                <NavLink to={`/pinboards/${board.id}/details`}>
                                <img className='one-board-img' src={newboard}></img>
                                    {/* { pinArray.length ?
                                        <img className='first-pin-image' src={pinArray.pin[0].imageUrl}></img>
                                    :
                                        <img className='one-board-img' src={newboard}></img>
                                    } */}
                                </NavLink>
                            </div>
                            <p className='board-name'>{board.name}</p>
                            <p className='pin-amount'>ADD SOMETHING HERE TO COUNT ALL THE PINS</p>
                        </ul>
                        :
                        <div className='no-board-header'>
                            <p className='no-board-text'> "You currently have no pinboards... Let's make one!"</p>
                        </div>
                        }
                    </div>
                ))}
            </div>
        </nav>
    )
}

export default AllBoards;
