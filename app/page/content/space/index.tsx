import style from "./index.css"

function Space() {

    return (
        <>
            <svg xmlns="http://www.w3.org/2000/svg">
                
            </svg>
            <div className={style.page}>
                <div className={style.row}>
                    <div className={style.btn}></div>
                </div>
                <div className={style.row}>
                    <div className={style.btn}></div>
                </div>
                {/* <svg xmlns="http://www.w3.org/2000/svg" width="200px" height="40px">
                <rect width="200px" height="40px" fill="transparent" onClick={() => { console.log(5) }}>
                </rect>
                <path
                    stroke-width="3"
                    stroke-linecap="round"
                    d="M4.566,-7.433C14.787,4.415,38.353,18.5,69.6,18.5"
                    stroke="black"
                    fill="transparent"
                />
                <g transform="translate(100,0)" id="shape1"><path stroke="#454545" stroke-width="3" stroke-linecap="round" d="M4.566,-7.433C14.787,4.415,38.353,18.5,69.6,18.5" fill="none"></path></g>
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" width="200px" height="40px">
                    <rect width="200px" height="40px" fill="transparent" onClick={() => { console.log(5) }}>
                    </rect>
                    <path
                        d="
                                M 0 0
                                L 200 40
                                Z
                            "
                        stroke="black"
                        fill="transparent"
                    />
                </svg> */}
            </div>
        </>
    );
}

export default Space