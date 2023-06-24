import { render, screen } from "@testing-library/react";
import Feedback from "./feedback";
import userEvent from "@testing-library/user-event";

test("should render thanks message when user submit the form with the correct data", async () => {
  render(<Feedback />);

  const data = {
    fakeName: "Rayyan",
    fakeEmail: "rayyan@test.com",
    fakeComment: "comments",
  };
  const getRating = () => {
    const ratings = ["Awesome", "Good", "Bad"];
    return ratings[Math.floor(Math.random() * ratings.length)];
  };

  userEvent.type(screen.getByRole("textbox", { name: /name/i }), data.fakeName);
  userEvent.type(
    screen.getByRole("textbox", { name: /email/i }),
    data.fakeEmail
  );
  userEvent.selectOptions(screen.getByRole("combobox"), getRating());
  userEvent.type(
    screen.getByRole("textbox", { name: /comments/i }),
    data.fakeComment
  );

  userEvent.click(screen.getByRole("button", { name: /submit/i }));

  // Assert
  const thanksMessage = await screen.findByText(
    `We appreciate your responses ${data.fakeName}!`
  );
  expect(thanksMessage).toBeInTheDocument();
});

test.each`
  value
  ${"a"}
  ${"a@b"}
  ${"a@b.c"}
`(
  'Email Input, given invalid value "$value", displays error message',
  async ({ value }) => {
    render(<Feedback />);
    const emailInput = screen.getByRole("textbox", { name: /email/i });

    userEvent.click(emailInput);
    userEvent.tab();
    userEvent.type(emailInput, value);

    const errorMessage = await screen.findByText(/invalid email address/i);
    expect(errorMessage).toBeInTheDocument();
  }
);

// test("Form, given blank input value, displays error message", async () => {
//   render(<Feedback />);
//   const nameInput = screen.getByRole("textbox", { name: /name/i });
//   const emailInput = screen.getByRole("textbox", { name: /email/i });
//   const ratingSelect = screen.getByRole("combobox", { name: /rating/i });
//   const commentsInput = screen.getByRole("textbox", { name: /comments/i });
//   userEvent.click(nameInput);
//   userEvent.click(emailInput);
//   userEvent.click(ratingSelect);
//   userEvent.click(commentsInput);
//   userEvent.tab();
//   expect(await screen.findByText(/name required/i)).toBeInTheDocument();
//   expect(await screen.findByText(/email required/i)).toBeInTheDocument();
//   expect(await screen.findByText(/rating required/i)).toBeInTheDocument();
//   expect(await screen.findByText(/comments required/i)).toBeInTheDocument();
// });

test.each`
  inputLabel
  ${"Name"}
  ${"Email"}
  ${"Rating"}
  ${"Comments"}
`(
  "Form, given blank $inputLabel input value, displays error message",
  async ({ inputLabel }) => {
    render(<Feedback />);

    userEvent.click(screen.getByText(`${inputLabel} *`));
    userEvent.tab();

    const errorMessage = await screen.findByText(`${inputLabel} Required`);
    expect(errorMessage).toBeInTheDocument();
  }
);
