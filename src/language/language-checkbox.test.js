import { render, screen } from "@testing-library/react";
import LanguageCheckBox from "./language-checkbox";
import userEvent from "@testing-library/user-event";

test("should selected lang color is green and fw-bold", async () => {
  render(<LanguageCheckBox />);

  const jsCheckbox = screen.getByRole("checkbox", { name: /javascript/i });
  userEvent.click(jsCheckbox);

  const jsText = await screen.findByText(/javascript/i);

  //! Use toBeChecked() instead of toHaveAttribute("checked", true)eslintjest-dom/prefer-checked
  // expect(jsCheckbox).toHaveAttribute("checked", true);
  expect(jsCheckbox).toBeChecked();

  //! Prefer .toHaveClass() over checking element classNameeslintjest-dom/prefer-to-have-class
  // expect(jsText.classList).toContain("text-success fw-bold");
  expect(jsText).toHaveClass("text-success fw-bold");
});
