import { useSelector, useDispatch } from "react-redux"

const Counter = ({ actionCreator1, actionCreator2, actionCreator3, actionCreator4, actionCreator5, actionCreator6 }) => {
    const dispatch = useDispatch();

    const clickHandler = (e) => {
        if (e.target.name === "+2") {
            dispatch(actionCreator1(2));
        } else if (e.target.name === "-2") {
            dispatch(actionCreator2(2));
        } else {
            dispatch(actionCreator3(2));
        }
    }

        const clickHandler2 = (e) => {
            if (e.target.name === "*2") {
                dispatch(actionCreator4(2));
            } else if (e.target.name === "/2") {
                dispatch(actionCreator5(2));
            } else {
                dispatch(actionCreator6(3));
            }
        }
    
    const status = useSelector(state => state.counter.status);
    const count = useSelector(state => state.counter.count);
    const result = useSelector(state => state.test.result);
    const status2 = useSelector(state => state.test.status2);
    return (
        <>
            <p>{count}</p>
            <h3>{status}</h3>
            <button onClick={clickHandler} name="+2">+2</button>
            <button onClick={clickHandler} name="-2">-2</button>
            <button onClick={clickHandler} name="非同期+2">非同期+2</button>
            <p>{result}</p>
            <h3>{status2}</h3>
            <button onClick={clickHandler2} name="*2">×2</button>
            <button onClick={clickHandler2} name="/2">÷2</button>
            <button onClick={clickHandler2} name="非同期*3">非同期×3</button>

        </>
    )
}
export default Counter;