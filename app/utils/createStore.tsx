

const createStore = () => {
    // 控制弹窗
    const [mask, setMask] = useState(null)

    return {
        mask,
        setMask,
    }
}

export default createStore