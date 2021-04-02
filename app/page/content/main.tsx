import style from "./main.css"
import { Route, Switch, BrowserRouter } from 'react-router-dom'
import Home from './home'
import Home1 from './test'
import Home2 from './test1'
const Main = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={Home}></Route>
                <Route exact path="/test" component={Home1}></Route>
                <Route exact path="/test1" component={Home2}></Route>
                <Route component={Home}></Route>
            </Switch>
        </BrowserRouter>
    )
}

export default Main