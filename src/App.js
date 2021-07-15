import {Button, Card, Container, Form} from "react-bootstrap";
import axios from "axios";
import {baseUrl, urls} from "./constants";
import {useState} from "react";

function App() {

    const [link, setLink] = useState("");
    const [al, setAl] = useState({});
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
                setAl(res.data)
            })
            .catch(err => {
                setError(err.response.data.data);
            })
            .finally(() => setLoading(false))
    }

    return (
        <Container fluid={true}>
            <div className="align-item-center justify-content">

                <Card className='d-grid gap-2'>
                    <Card.Body>
                        <Form onSubmit={(e) => handleSubmit(e)}>
                            <Form.Group>
                                <Form.Control size="sm" type="text" placeholder="Enter website url here..."
                                              value={link}
                                              onChange={e => {
                                                  setError("");
                                                  setLink(e.target.value);
                                              }}/>
                                {error && <Form.Text className="text-danger">
                                    {error}
                                </Form.Text>}
                                {isLoading && <Form.Text className="text-info">
                                    Loading ...
                                </Form.Text>}
                            </Form.Group>
                            <Button disabled={!link || isLoading} variant="primary" size="sm" type="submit"
                                    className='custom-full-width-button'>
                                Get Analytics
                            </Button>
                        </Form>
                    </Card.Body>
                </Card>
            </div>
            <div>
            </div>
        </Container>
    );
}

export default App;
