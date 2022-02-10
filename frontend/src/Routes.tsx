import { Router, Route, Switch } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import Home from "./pages/Home/Home";
import MovieDetails from "./pages/MovieDetails/MovieDetails";
import Movies from "./pages/Movies/Movies";
import history from "./util/history";

const Routes = () => (
    <Router history={history}>
        <Navbar />
        <Switch>
            <Route path="/" exact>
                <Home />
            </Route>
            <PrivateRoute path="/movies" exact={true}>
                <Movies />
            </PrivateRoute>
            <PrivateRoute path="/movies/:movieId" exact={false}>
                <MovieDetails />
            </PrivateRoute>
        </Switch>
    </Router>
);

export default Routes;