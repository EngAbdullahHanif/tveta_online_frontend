import { Formik, Form } from 'formik';
import * as Yup from 'yup';

function FileUploadForm() {
  const initialValues = {
    file: null,
  };

  const validationSchema = Yup.object().shape({
    file: Yup.mixed().required('Please select a file to upload'),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    const formData = new FormData();
    formData.append('file', values.file);
    console.log('file is submitted successfully');

    // Make a POST request to upload the file
    const response = await fetch('/upload', {
      method: 'POST',
      body: formData,
    });

    if (response.ok) {
      console.log(`File ${values.file.name} has been uploaded`);
    } else {
      console.log(`Failed to upload file ${values.file.name}`);
    }

    setSubmitting(false);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        isSubmitting,
      }) => (
        <Form>
          <div>
            <label htmlFor="file">Select a file:</label>
            <input
              id="file"
              name="file"
              type="file"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.file}
            />
            {errors.file && touched.file && <div>{errors.file}</div>}
          </div>
          <button type="submit" disabled={isSubmitting}>
            Submit
          </button>
        </Form>
      )}
    </Formik>
  );
}

export default FileUploadForm;
