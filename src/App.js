import {Button, Card, Container, Form, FormControl, Nav, Navbar, Spinner, Table} from "react-bootstrap";
import axios from "axios";
import {baseUrl, urls} from "./constants";
import {useState} from "react";

function App() {

    const [link, setLink] = useState("");
    const [analyticsData, setAnalyticsData] = useState({});
    const [error, setError] = useState("");
    const [isLoading, setLoading] = useState(false);


    function handleSubmit(e) {
        e.preventDefault();
        setError("");
        setLoading(true);
        const params = {
            url: link,
        }
        axios.get(`${baseUrl}${urls.GET_PAGE_ANALYTICS}`, {params})
            .then(res => {
                setAnalyticsData(res.data.data)
            })
            .catch(err => {
                setError(err.response.data.data);
            })
            .finally(() => setLoading(false))
    }

    return (
        <Container fluid={true} style={{padding: 0}}>
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" fixed="top">
                <Container>
                    <Navbar.Brand href="#home">Web App Analyser</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto">
                            <Form className="d-flex" onSubmit={(e) => handleSubmit(e)}>
                                <FormControl
                                    type="search"
                                    placeholder="Enter website url here..."
                                    className="mr-2"
                                    aria-label="Search"
                                    value={link}
                                    onChange={e => {
                                        setError("");
                                        setAnalyticsData({})
                                        setLink(e.target.value);
                                    }}
                                />
                                <Button disabled={!link} variant="outline-success" type="submit">Search</Button>
                            </Form>
                        </Nav>

                    </Navbar.Collapse>
                    <Navbar.Collapse className="justify-content-end">
                        <Navbar.Text>
                            By <a target="_blank" rel="noreferrer" href="https://au.linkedin.com/in/shanwije/">Shan Wijenayaka</a>
                        </Navbar.Text>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <Container style={{paddingTop: 70}}>
                {analyticsData.links ? <div>
                        {!isLoading && analyticsData.links && analyticsData.links.length && (

                            <div>
                                <Card>
                                    <Card.Header>
                                        <Card.Title>Title : {analyticsData.title}</Card.Title>
                                        <Card.Subtitle>({analyticsData.has_login ? "Login Page" : "Not a Login Page"})</Card.Subtitle>
                                        <p class="text-muted small">(HTML Version : {analyticsData.html_version})</p>
                                    </Card.Header>
                                    <Card.Body>
                                        <Card>
                                            <Card.Title className="text-center">HTML Header Counts</Card.Title>
                                            <Card.Body>
                                                <Table className="text-center" size="sm" striped bordered hover variant="light"
                                                       responsive>
                                                    <thead>
                                                    <tr>
                                                        <th>Header</th>
                                                        <th>Count</th>
                                                    </tr>
                                                    </thead>
                                                    <tbody>
                                                    <tr>
                                                        <td>h1</td>
                                                        <td>{analyticsData.heading_count.h1_count}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>h2</td>
                                                        <td>{analyticsData.heading_count.h2_count}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>h3</td>
                                                        <td>{analyticsData.heading_count.h3_count}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>h4</td>
                                                        <td>{analyticsData.heading_count.h4_count}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>h5</td>
                                                        <td>{analyticsData.heading_count.h5_count}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>h6</td>
                                                        <td>{analyticsData.heading_count.h6_count}</td>
                                                    </tr>

                                                    </tbody>
                                                </Table>
                                            </Card.Body>

                                        </Card>
                                        <Card>
                                            <Card.Body>
                                                <Card.Title className="text-center">Associated Links ( total
                                                    : {analyticsData.links.length} )</Card.Title>
                                                <Table size="sm" striped bordered hover variant="light" responsive>
                                                    <thead>
                                                    <tr>
                                                        <th>Link</th>
                                                        <th>Status</th>
                                                        <th>Internal/External</th>
                                                    </tr>
                                                    </thead>
                                                    <tbody>
                                                    {analyticsData.links.map((l) => (
                                                        <tr id={l.url}>
                                                            <td><a target="_blank" rel="noreferrer" href={l.url}>{l.url}</a></td>
                                                            <td>{(l.status < 300 && l.status >= 200) ?
                                                                <p className="text-info">Working</p> :
                                                                (<p className="text-danger">Issue loading the
                                                                    content <br/>{`( Status Code : ${l.status} )`}</p>)}</td>
                                                            <td>{l.is_internal_link ? "Internal link" : "external link"}</td>
                                                        </tr>
                                                    ))}
                                                    </tbody>
                                                </Table>
                                            </Card.Body>
                                        </Card>
                                    </Card.Body>
                                </Card>
                            </div>
                        )}
                    </div> :
                    <div style={{
                        height: window.innerHeight - 70,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        {error ? <p className="text-danger text-center">Unable to process your request<br/>({`Error : ${error}`})</p> : isLoading ?
                            <Spinner animation="border" role="status">
                            </Spinner>:
                            <h4 className="text-center">Welcome to Web App Analyser</h4>}
                    </div>
                }
            </Container>
        </Container>
    );
}

export default App;
