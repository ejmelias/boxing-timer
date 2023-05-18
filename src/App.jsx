import { useState, useEffect } from 'react'

const ROUNDS = 12;
const ROUND_LENGTH = 5;
const INTERVAL_LENGTH = 5;

function App() {

    const [time, setTime] = useState(ROUND_LENGTH);
    const [isRunning, setIsRunning] = useState(false);
    const [round, setRound] = useState(1);
    const [type, setType] = useState("ROUND");
    const [bell, setBell] = useState(null);
    
    useEffect(() => {
        const newAudio = new Audio('bell3.m4a');
        newAudio.load();
        setBell(newAudio);
    },[]);

    useEffect(() => {
        if (isRunning) {
            const intervalId = setInterval(() => setTime(time - 1), 1000);

            if(time === 0) {
                if(type === 'ROUND') {
                    if(round === ROUNDS) {
                        reset();
                    } else {
                        bell.play();
                        setType("INTERVAL");
                        setTime(INTERVAL_LENGTH);
                        
                    }
                } else if (type === 'INTERVAL') {
                    bell.play();
                    setType("ROUND");
                    setTime(ROUND_LENGTH);
                    setRound(round + 1);
                   
                }
            }
            return () => clearInterval(intervalId);
        }
    }, [isRunning, time]);


    function reset() {
        setIsRunning(false);
        setTime(ROUND_LENGTH);
        setRound(1);
        setType('ROUND');
    }

    function startStop() {
        if(type === 'ROUND' && round === 1 && time === ROUND_LENGTH) {
            bell.play();
        }
        setIsRunning(!isRunning);
    }

    return (
        <div className="grid grid-rows-3 w-screen h-screen font-rubik overflow-hidden bg-gray-700 text-white">

            <div className='flex justify-center items-center text-8xl'>
                {Math.floor(time / 60)}:
                {Math.floor(time % 60).toString().padStart(2, "0")}
            </div>
            <div className='grid grid-flow-row justify-center content-center'>
                <div className='text-4xl flex justify-center'>
                    {type}
                </div>
                <div className='text-9xl flex justify-center'>
                    {round}
                </div>
            </div>
            <div className='grid grid-flow-row justify-center items-center'>
                <div className='flex w-screen justify-center h-3/4'>
                    <button className={`border ${isRunning ? `bg-blue-500` : `bg-green-500`} flex items-center justify-center rounded-xl w-3/4`} onClick={startStop}>
                        {isRunning 
                            ? 
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-10 h-10">
                                <path fillRule="evenodd" d="M6.75 5.25a.75.75 0 01.75-.75H9a.75.75 0 01.75.75v13.5a.75.75 0 01-.75.75H7.5a.75.75 0 01-.75-.75V5.25zm7.5 0A.75.75 0 0115 4.5h1.5a.75.75 0 01.75.75v13.5a.75.75 0 01-.75.75H15a.75.75 0 01-.75-.75V5.25z" clipRule="evenodd" />
                            </svg>
                            : 
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-10 h-10">
                                <path fillRule="evenodd" d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z" clipRule="evenodd" />
                            </svg>
                        }
                    </button>
                </div>
                <div className='flex w-screen justify-center h-1/3'>
                    <button className="border bg-red-500 text-center rounded-xl w-1/4" onClick={reset}>
                        Reset
                    </button>
                </div>
            </div>
        </div>
    );
}

export default App
