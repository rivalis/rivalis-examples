import { createRef } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import NavBar from './components/NavBar'
import DemoPage from './pages/DemoPage'
import HomePage from './pages/HomePage'

const router = createRef()

const Router = () => (
    <>
        <NavBar />
        <BrowserRouter ref={router}>
            <Switch>
                <Route exact path="/"><HomePage /></Route>
                <Route exact path="/demo"><DemoPage /></Route>
                <Route exact >Not Found</Route>
            </Switch>
        </BrowserRouter>
    </>
)

export default Router