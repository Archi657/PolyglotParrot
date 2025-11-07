import { Container, Image } from "react-bootstrap";
import { useTranslation } from 'react-i18next';
import Emoji from "../shared/emoji/Emoji";
import './Support.css'
const Support = () => {

  const { t } = useTranslation()

  const { title, text, text_2 } = t("Support")
  return (
    <Container className="d-flex flex-column align-items-center text-center mt-5">
      <div style={{ display: "inline-flex", alignItems: "center", padding: "2px" }}>
        <h1 className="text-white fw-bold font-weight-bold p-2 mt-2">{title}</h1>
        <Emoji emoji="hand_heart" size={45} />
        <Emoji emoji="heart" size={45} />
      </div>

      <Image
        src={process.env.PUBLIC_URL + "/KAK400.png"}
        alt="Centered example"
        style={{ width: "300px", height: "300px", objectFit: "cover" }}
      />
      <div style={{ display: "inline-flex"}}>
        <Emoji emoji="bird" size={45} />
      <p id="example-collapse-text">{text}</p>
      </div>
      
      <p id="example-collapse-text">{text_2}</p>
    </Container>
  );
}

export default Support;
