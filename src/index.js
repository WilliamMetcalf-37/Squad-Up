import React from "react"
import ReactDOM from "react-dom"
import { BrowserRouter as Router } from "react-router-dom"
import SquadUp from "./components/SquadUp"

ReactDOM.render(
    <Router>
        <SquadUp />
    </Router>
    , document.getElementById("root"))