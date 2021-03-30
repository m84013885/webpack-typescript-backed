// 定时器
/*
useInterval(()=>{
    
},1000)
停止某个定时器
clearInterval(window.timer[num])
*/
window.timer = []
function useInterval(callback: any, delay: number) {
    const saveCallback: any = useRef()
    useEffect(() => {
        saveCallback.current = callback
    })
    useEffect(() => {
        function tick() {
            saveCallback.current()
        }
        if (delay !== null) {
            window.timer.push(setInterval(tick, delay))
        }
    }, [])
}

// key事件按键
/*
    const left = useKeyPress(65)
    useEffect(()=>{
    当left为true就是点击下去了
    },[left])
*/
function useKeyPress(targetKey: any) {
    const [keyPressed, setKeyPressed] = useState(false)
    function downHandler(prop: any) {
        const { keyCode } = prop
        if (keyCode === targetKey) {
            setKeyPressed(true)
        }
    }
    const upHandler = (prop: any) => {
        const { keyCode } = prop
        if (keyCode === targetKey) {
            setKeyPressed(false)
        }
    }
    useEffect(() => {
        window.addEventListener('keydown', downHandler)
        window.addEventListener('keyup', upHandler)
        return () => {
            window.removeEventListener('keydown', downHandler)
            window.removeEventListener('keyup', upHandler)
        }
    }, [])
    return keyPressed
}


export { useInterval, useKeyPress }