import { render, screen, waitFor } from "@testing-library/react";
import LanguageDropdown from "./language-dropdown";
import userEvent from "@testing-library/user-event";

test("should select lang and show the text with the lang", async () => {
  render(<LanguageDropdown />);
  userEvent.click(
    screen.getByRole("button", { name: /Programming Language/i })
  );
  userEvent.click(screen.getByRole("menuitem", { name: /javascript/i }));

  //! Prefer `findByRole` query over using `waitFor` + `getByRole` (eslinttesting-library/prefer-find-by)
  // const selection = await waitFor(() =>
  //   screen.getByRole("heading", { name: /you selected:       javascript/i })
  // );

  const selection = await screen.findByRole("heading", {
    name: /you selected: javascript/i,
  });

  expect(selection).toBeInTheDocument();
});
