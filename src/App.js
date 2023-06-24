import "./App.css";
import LanguageCheckBox from "./language/language-checkbox";
import LanguageDropdown from "./language/language-dropdown";

function App() {
  return (
    <div style={{ padding: "3rem" }}>
      {/* Add your component to test here 💡 */}
      <LanguageDropdown />
      <LanguageCheckBox />
    </div>
  );
}

export default App;
