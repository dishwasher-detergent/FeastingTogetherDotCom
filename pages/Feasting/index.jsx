import Wizard from "../../components/Wizard"
import Create from "../../components/Feasting/Create"
import Define from "../../components/Feasting/Define"
import Waiting from "../../components/Feasting/Waiting"
import Together from "../../components/Feasting/Together"
import { useEffect, useRef, useState } from "react";
import { useSelector } from 'react-redux'

const Feasting = () => {
	const create = useRef()
	const define = useRef()
	const waiting = useRef()
	const session = useSelector((state) => state)
	const [skipCreate, setSkipCreate] = useState(false)

	useEffect(() => {
		if(session.session.session_id) {
			setSkipCreate(true)
		}
	},[])

	return (
		<Wizard childFunc={[create,define,waiting]} skipCreate={skipCreate}>
			<Create childFunc={create}/>
			<Define childFunc={define} />
			<Waiting childFunc={waiting} />
			<Together />
		</Wizard>
	);
}

export default Feasting;