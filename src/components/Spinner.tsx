import {ReactElement} from "react";
import "../App.scss";

interface SpinnerProps {
    loading: boolean;
}

const Spinner = ({loading}: SpinnerProps): ReactElement => {
	return (loading ?
		<div className="spinnerWrapper"><span className="loader"></span></div> :
		<></>)
}

export default Spinner;