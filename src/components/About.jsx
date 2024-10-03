import React, { useEffect, useState } from "react";
import axios from "axios";
import { Zoom } from "react-reveal";
import { Row, Container, Card } from "react-bootstrap";

const About = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    // fetch("https://reqres.in/api/users")
    //   .then((response) => response.json())
    //   .then((json) => setData(json.data));
    getData();
  }, []);

  const getData = async () => {
    const res = await axios.get("https://reqres.in/api/users");
    setData(res.data.data);
  };

  return (
    <section>
      <Container>
        <h1 className="text-center mt-4">Our Team</h1>
        <hr></hr>
        <Row>
          {data.map((item) => {
            return (
              <Zoom key={item.id} right delay={(item.id + 2) * 100}>
                <div className="col-md-4 mb-4 text-center">
                  <Card className="mb-5">
                    <Card.Body>
                      <Card.Img src={item.avatar}></Card.Img>
                      <Card.Title>
                        {item.first_name} {item.last_name}
                      </Card.Title>
                      <Card.Text>{item.email}</Card.Text>
                    </Card.Body>
                  </Card>
                </div>
              </Zoom>
            );
          })}
        </Row>
      </Container>
    </section>
  );
};

export default About;
