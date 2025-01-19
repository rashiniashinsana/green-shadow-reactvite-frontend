import {useSelector} from "react-redux";

export function Dashboard() {

    // @ts-ignore
    const crops = useSelector((state) =>state.crop);

    return (
        <>
            <header><h6>Dashboard</h6></header>
        </>
    );
}