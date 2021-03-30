import { storeContext } from '../../utils/stroe'
import style from './index.css'

interface prop {
    children: JSX.Element[] | JSX.Element
}

const Mask = (prop: prop) => {
    const { children } = prop
    const store = useContext(storeContext)
    const { mask, setMask } = store
    const [dom, setDom] = useState(false)
    const [show, setShow] = useState(false)
    useEffect(() => {
        if (typeof (mask) === 'number') {
            setDom(true)
            setShow(true)
        } else {
            setShow(false)
        }
    }, [mask])
    const _renderChildren = useCallback(() => {
        const arr: any = children
        if (arr.length) {
            return arr[mask]
        } else {
            return children
        }
    }, [dom])
    const closeAnima = (e: any) => {
        if (e.animationName.indexOf('hide') !== -1) {
            setDom(false)
            setMask(null)
        }
    }
    return (
        <div className={dom ? 'block' : 'none'}>
            <div className={`${style.maskBg} ${show ? style.show : style.hide}`} onClick={() => { setShow(false) }} onAnimationEnd={(e) => { closeAnima(e) }}></div>
            <div className={`${style.mask} ${show ? style.big : style.small}`}>
                {_renderChildren()}
            </div>
        </div>
    )
}

export default Mask