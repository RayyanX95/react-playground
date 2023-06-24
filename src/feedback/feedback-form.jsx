import { ErrorMessage, Field, Form, Formik } from "formik";
import formValidator from "./form-validator";

const FeedBackForm = (props) => (
  <main className="d-flex flex-column m-auto py-2 align-items-center">
    <h1 className="text-2xl text-gray-900 font-semibold m-auto">
      We'd love to hear your thoughts!
    </h1>

    <Formik
      initialValues={{ name: "", email: "", rating: "", comments: "" }}
      validate={formValidator}
      onSubmit={(values) => props.onSubmit(values)}
    >
      {({ isSubmitting }) => (
        <Form className="d-flex flex-column form bg-light py-3 px-5 my-3">
          <p className="text-small text-danger my-2">
            All fields marked with * are required
          </p>

          <label className="mt-4">
            Name *
            <Field
              type="text"
              name="name"
              placeholder="Name here"
              className="form-control"
            />
          </label>
          <ErrorMessage
            name="name"
            component="div"
            className="fs-6 text-danger"
          />
          <label className="mt-4">
            Email *
            <Field
              type="email"
              name="email"
              placeholder="Email here"
              className="form-control"
            />
          </label>

          <ErrorMessage
            name="email"
            component="div"
            className="fs-6 text-danger"
          />
          <label className="mt-4">
            Rating *
            <Field as="select" name="rating" className="form-control">
              <option value=""></option>
              <option value="Awesome">Awesome</option>
              <option value="Good">Good</option>
              <option value="Bad">Bad</option>
            </Field>
          </label>
          <ErrorMessage
            name="rating"
            component="div"
            className="fs-6 text-danger"
          />

          <label className="mt-4">
            Comments *
            <Field
              as="textarea"
              name="comments"
              placeholder="comments here"
              className="form-control"
            />
          </label>
          <ErrorMessage
            name="comments"
            component="div"
            className="fs-6 text-danger"
          />
          <button
            type="submit"
            disabled={isSubmitting}
            className="btn btn-primary mx-0 mt-2"
          >
            Submit
          </button>
        </Form>
      )}
    </Formik>
  </main>
);

export default FeedBackForm;
