// import * as VConsole from 'vconsole'
// new VConsole()

import './index.common.css'
import '../../utils/myBabel'
import '../../utils/resize'

import Main from "./content/main"
import { StoreProvider } from '../../utils/stroe'

ReactDOM.render(<StoreProvider><Main /></StoreProvider>, document.getElementById("main"))