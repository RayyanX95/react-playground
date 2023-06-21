import "./App.css";
import { Container } from "bootstrap";
import Vote from "./mui/vote";

function App() {
  return (
    <Container>
      <Vote totalGlobalLikes={10} />
    </Container>
  );
}

export default App;
