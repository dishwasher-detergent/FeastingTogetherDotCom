import { useRouter } from 'next/router'
import { useEffect } from 'react';



const Feast = () => {
    const router = useRouter()

    useEffect(() => {
        router.push("/Feasting/Create")
    },[])
}

export default Feast