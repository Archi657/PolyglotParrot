import React from "react";
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import './CardDic.css'; // Import external CSS file

const CardDic = ({ dictations }) => {
  console.log('cardic component', dictations);

  return (
    <Row xs={1} sm={2} md={3} className="g-4">
      {dictations.map((dictation, idx) => (
        <Col key={idx}>
          <Card className="dictation-card">
            <Card.Img 
              variant="top" 
              src={dictation.backdrops[0] || "holder.js/100px160"} 
              alt="Dictation Image" 
              className="dictation-card-img" 
            />
            <Card.Body className="dictation-card-body">
              <Card.Title className="dictation-card-title">{dictation.title}</Card.Title>
              <Card.Text className="dictation-card-text">
                {dictation.description}
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default CardDic;
