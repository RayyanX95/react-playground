import "./App.css";
import { Container } from "reactstrap";
import Retail from "./retail-store/retail";
import { RetailProvider } from "./retail-store/retail-context";
import fakeProducts from "./retail-store/fake-products";

function App() {
  return (
    <Container>
      <RetailProvider products={fakeProducts}>
        <Retail />
      </RetailProvider>
    </Container>
  );
}

export default App;
