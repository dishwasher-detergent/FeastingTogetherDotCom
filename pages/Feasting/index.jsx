import Wizard from "../../components/Wizard"
import Create from "../../components/Feasting/Create"
import Define from "../../components/Feasting/Define"
import Waiting from "../../components/Feasting/Waiting"
import Together from "../../components/Feasting/Together"
import { useRef } from "react";

const Feasting = () => {
	const create = useRef()
	const define = useRef()
	const waiting = useRef()

	return (
		<Wizard childFunc={[create,define,waiting]}>
			<Create childFunc={create}/>
			<Define childFunc={define} />
			<Waiting childFunc={waiting} />
			<Together />
		</Wizard>
	);
}

export default Feasting;