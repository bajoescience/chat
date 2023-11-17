import { useOutletContext } from "react-router-dom"

const Test = () => {
    const context = useOutletContext();
    console.log(context.personsState);
    return (
        <>
            <h1>Hello World</h1>
        </>
    );
}

export default Test