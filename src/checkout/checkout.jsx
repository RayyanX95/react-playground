import React from "react";

import {
  // Paper,
  Button,
  Typography,
  Step,
  StepLabel,
  Stepper,
  CssBaseline,
} from "@mui/material";

import { makeStyles } from "@mui/styles";

import AddressForm from "./address-from";
import PaymentForm from "./payment-form";
import Review from "./review";
import Paper from "@mui/material/Paper";

const fakeProducts = [
  { name: "T-shirt", desc: "White Fitted Shirt", price: "$19.99" },
  { name: "Denim Jeans", desc: "GAP Jeans", price: "$29.99" },
  {
    name: "Nike Free Runner",
    desc: "black/grey running shoe",
    price: "$49.99",
  },
  { name: "Shipping", desc: "", price: "Free" },
];

const customerInfo = {
  firstName: "",
  lastName: "",
  address1: "",
  address2: "",
  city: "",
  state: "",
  zipCode: "",
  country: "",
  cardType: "",
  cardHolder: "",
  cardNumber: "",
  expiryDate: "",
  cardCvv: "",
};

const useStyles = makeStyles(() => ({
  appBar: {
    position: "relative",
  },
  layout: {
    width: "auto",
    marginLeft: "2rem",
    marginRight: "2rem",
    "@media (min-width: 600px)": {
      width: "600px",
      marginLeft: "auto",
      marginRight: "auto",
    },
  },
  paper: {
    marginTop: "1.875rem",
    marginBottom: "1.875rem",
    padding: "1.25rem",
    "@media (min-width: 600px)": {
      marginTop: "3.75rem",
      marginBottom: "3.75rem",
      padding: "1.875rem",
    },
  },
  stepper: {
    padding: "1.875rem 0 3.125rem",
  },
  buttons: {
    display: "flex",
    justifyContent: "flex-end",
  },
  button: {
    marginTop: "1.875rem",
    marginLeft: "1rem",
  },
}));

const steps = ["Shipping address", "Payment details", "Review your order"];

const Checkout = () => {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const [formValues, setFormValues] = React.useState(customerInfo);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  function getStepContent(step) {
    switch (step) {
      case 0:
        return (
          <AddressForm formValues={formValues} setFormValues={handleChange} />
        );
      case 1:
        return (
          <PaymentForm formValues={formValues} setFormValues={handleChange} />
        );
      case 2:
        return <Review formValues={formValues} products={fakeProducts} />;
      default:
        throw new Error("Unknown step");
    }
  }

  const handleNext = () => setActiveStep(activeStep + 1);

  const handleBack = () => setActiveStep(activeStep - 1);

  return (
    <>
      <CssBaseline />

      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography component="h1" variant="h4" align="center">
            Checkout
          </Typography>
          <Stepper activeStep={activeStep} className={classes.stepper}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <>
            {activeStep === steps.length ? (
              <>
                <Typography variant="h5" gutterBottom>
                  Thank you for your order.
                </Typography>
                <Typography variant="subtitle1">
                  Your order number is #2001539. We have emailed your order
                  confirmation, and will send you an update when your order has
                  shipped.
                </Typography>
              </>
            ) : (
              <>
                {getStepContent(activeStep)}
                <div className={classes.buttons}>
                  {activeStep !== 0 && (
                    <Button onClick={handleBack} className={classes.button}>
                      Back
                    </Button>
                  )}
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleNext}
                    className={classes.button}
                  >
                    {activeStep === steps.length - 1 ? "Place order" : "Next"}
                  </Button>
                </div>
              </>
            )}
          </>
        </Paper>
      </main>
    </>
  );
};

export default Checkout;
