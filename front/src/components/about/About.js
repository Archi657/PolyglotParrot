import { Container, Image } from "react-bootstrap";
import { useTranslation } from 'react-i18next';
import Emoji from "../shared/emoji/Emoji";
const about  = () => {

  const { t } = useTranslation()

  const { title, text, text_2 } = t("About")
  // TODO Improve Image
  return (
    <Container className="d-flex flex-column align-items-center text-center mt-5">
      
      <Image
        src={process.env.PUBLIC_URL + "/KAK400.png"}
        alt="Centered example"
        roundedCircle
        style={{ width: "300px", height: "300px", objectFit: "cover" }}
      />
      <h1 className="text-white fw-bold font-weight-bold p-2 mt-2">{title}</h1>
      <Emoji emoji="cat" size={45} />
      <p id="example-collapse-text">{text}</p>
      <p id="example-collapse-text">{text_2}</p>
    </Container>
  );
}

export default about;
