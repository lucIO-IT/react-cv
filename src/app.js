const page_one = "/react-cv/src/bio.json";
const page_two = "/react-cv/src/io.json";
const page_three = "/react-cv/src/zio.json";
const HashRouter = window.ReactRouterDOM.HashRouter;
const Router = window.ReactRouterDOM.BrowserRouter;
const Route =  window.ReactRouterDOM.Route;
const Link =  window.ReactRouterDOM.Link;
const NavLink =  window.ReactRouterDOM.NavLink;
const Prompt =  window.ReactRouterDOM.Prompt;
const Switch = window.ReactRouterDOM.Switch;
const Redirect = window.ReactRouterDOM.Redirect;
const useParams = window.ReactRouterDOM.useParams;
const Motion = window.ReactMotion.Motion;
const spring = window.ReactMotion.spring;

function Spinner (props){
    return (
        <div className="loader">Loading...</div>
    )
}

function Home(props){
    return (
        <div style={{ opacity: props.opacity }}>
            <h1>Resume</h1>
            <span className="d-block padd">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum faucibus sem vel dictum tempus.
                Maecenas volutpat lorem ut odio aliquam, a iaculis quam facilisis. Orci varius natoque penatibus et
                magnis dis parturient montes, nascetur ridiculus mus. Curabitur suscipit fermentum urna, id elementum
                justo efficitur nec. Aliquam consequat justo vel porta congue. Aliquam placerat volutpat aliquet.
                Mauris ultrices, dui nec lacinia egestas, enim neque porttitor quam, ac sagittis elit massa ac diam.
                Cras elementum lectus sed pharetra faucibus. Donec vehicula nisi sit amet maximus ullamcorper.
                Proin feugiat viverra nisi non hendrerit.
            </span>
            <hr/>
            <h2>Experience</h2>
            <div className="padd">
                <span className="d-block font-weight-bold lead">Full-Stack Developer - Data Reply</span>
                <span className="d-block font-weight-light">July 2019 - Present</span>
                <br/>
                <ul>
                    <li>ETL Programming - Spark, Hive & Hadoop</li>
                    <li>Back-End development - Python & Django</li>
                    <li>Front-End development - JQuery & Bootstrap</li>
                </ul>
            </div>
            <div className="padd">
                <span className="d-block font-weight-bold lead">Full-Stack Developer - Freelancer</span>
                <span className="d-block font-weight-light">May 2018 - July 2019</span>
                <br/>
                <ul>
                    <li>Back-End development - Python & Django</li>
                    <li>Front-End development - JQuery & Bootstrap</li>
                </ul>
            </div>
            <div className="padd">
                <span className="d-block font-weight-bold lead">Educator - Various</span>
                <span className="d-block font-weight-light">September 2011 - May 2018</span>
                <br/>
                <ul>
                    <li>Entrepreneurship Education</li>
                    <li>Programming Education targeted primarily at children</li>
                </ul>
            </div>
            <h2>Education</h2>
            <div className="padd">
                <span className="d-block font-weight-bold lead">Alma Mater Studiorum of Bologna</span>
                <span className="d-block lead">Bachelor's Degree in Philosophy</span>
                <span className="d-block font-weight-light">March 2013</span>
            </div>
            <h2>Skills</h2>
            <div className="padd">
                <ul>
                    <li>Python</li>
                    <li>JavaScript</li>
                    <li>HTML</li>
                    <li>CSS</li>
                    <li>SQL</li>
                </ul>
            </div>
        </div>
    )
}

class Page extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            data: { warning: "There is no data" },
            loading: false,
            url: this.props.url ? this.props.url : undefined,
            transition_style: "transition"
        }
    }

    fetchDataFromRemote(url){
        this.setState({ loading: true });
        setTimeout(() => {axios.get(url).then(
            response => {
                this.setState({ data: response.data, loading: false });
            }
        ).catch(
            error => {
                console.log(error);
            }
        )}, 10);
    }

    updateContent(str){
        /*
            NB: setState accetta come secondo parametro una funzione che equivale al metodo resolve() dell'oggetto Promise
            Quindi non è necessario impostare un setTimeout -> setTimeout(() => this.fetchDataFromRemote(url), 100);
        */

        this.setState({ url: str }, () => {
            const url = this.state.url;
            this.fetchDataFromRemote(url)
        });
    }

    componentDidMount(){
        if (this.state.url){
            const url = this.state.url;
            this.fetchDataFromRemote(url);
        }
    }

    componentDidUpdate(prevProps, prevState, snapShot){
        if (prevProps.url != this.props.url){
            this.updateContent(this.props.url);
            this.setState({transition_style: "transition"});
        }
    }

    render(){
        let nested_content = [];
        const data = this.state.data;
        Object.keys(this.state.data).forEach(e => {
            nested_content.push(
                <div className="padd">
                    <span className="d-block font-weight-bold lead">{this.state.data[e].title}</span>
                    <span className="d-block font-weight-light">{this.state.data[e].time}</span>
                    <br/>
                    {this.state.data[e].activities ? <ul>{this.state.data[e].activities.map(e => <li>{e}</li>)}</ul> : ""}
                </div>
            );
        });
        return (
            <div>
                <h2>{ this.props.title }</h2>
                {this.state.loading ? <Spinner /> : (
                        <div className={this.state.transition_style}>{ nested_content }</div>
                    )
                }
            </div>
        );
    }

}

function Nav(props){
    let nav_items = [];
    const dict_keys = Object.keys(props.items);
    dict_keys.forEach(e => {
        const link = dict_keys.indexOf(e) == 0 ? (
                                                <li class="nav-item">
                                                    <NavLink exact className="nav-link" to="/" activeClassName="active">
                                                        Home</NavLink>
                                                </li>) : (
                                                <li class="nav-item">
                                                    <NavLink className="nav-link" to={e} activeClassName="active">
                                                        {e}</NavLink>
                                                </li>
                                                );
        nav_items.push(link);
    });
    return (
        <ul class="nav nav-pills flex-column">
            { nav_items }
        </ul>
    )
}

class App extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            nav: {
                "Home": page_one,
                "Experience": page_one,
                "Education": page_two,
                "Unresolved Page": page_three,
                "Unfound": page_three
            }
        }
    }

    render(){

        return(
            <div className="app-container">
                <HashRouter>
                    <aside className="app-sidebar">
                        <div className="sticky-top">
                        <div className="padd">
                            <div className="app-round-portrait">
                                <img src="/react-cv/src/assets/img/foto_mia.jpg" class="img-fluid" alt="Foto di Emanuele Romagnoli" />
                            </div>
                        </div>
                        <div className="padd">
                            <h6 className="text-center">Welcome to my site!<br/>
                            I'm Emanuele Romagnoli</h6>
                            <p className="text-center">Full-Stack Django Developer</p>
                            <div className="d-flex justify-content-center align-items-center">
                                <span className="padd-min">
                                    <a href="#" target="_blank" className="app-icon"><i class="fa fa-github"></i></a>
                                </span>
                                <span className="padd-min">
                                    <a href="#" target="_blank" className="app-icon"><i class="fa fa-linkedin"></i></a>
                                </span>
                            </div>
                        </div>

                        <Nav items={ this.state.nav } />
                        </div>
                    </aside>
                    <main className="app-core padd">
                            <Switch>
                                <Route exact path="/">
                                    <Motion defaultStyle={{x: -5}} style={{x: spring(1)}}>
                                        {value => <Home opacity={value.x} />}
                                    </Motion>
                                </Route>
                                <Route path="/experience">
                                    <Page title="Experience" url={ this.state.nav["Experience"] } />
                                </Route>
                                <Route path="/education">
                                    <Page title="Education" url={ this.state.nav["Education"] } />
                                </Route>
                                <Route path="/unresolved page">
                                    <Page title="Unresolved" url={ this.state.nav["Unresolved Page"] } />
                                </Route>
                                <Route path="*">
                                    <span>404: Page not found</span>
                                </Route>
                            </Switch>
                    </main>
                </HashRouter>
            </div>
        )
    }
}

const e = document.getElementById("app");
ReactDOM.render(<App />, e);