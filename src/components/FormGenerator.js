import MomentUtils from '@date-io/moment';
import {
  MuiPickersUtilsProvider
} from '@material-ui/pickers';
import { Form } from 'formik';
import PropTypes from 'prop-types';
import React from 'react';
import useIsMounted from '../functions/useIsMounted';
import classes from '../index.css';
import ErrorListener from './ErrorListener';
import FieldGenerator from './FieldGenerator';
import FormikWithRef from './FormikWithRef';
import SubmitListener from './SubmitListener';
function FormGenerator({ initialValues = {}, fields = [], getFields = null, onSubmit = () => null, onError = null, readOnly = false, formRef = null,
  validateOnBlur = true, validateOnChange = true, validateOnMount = true, onSubmitWithError = null,
  validationSchema = null, shouldTriggerErrors = null }) {

  const isMounted = useIsMounted();

  return (
    <MuiPickersUtilsProvider utils={MomentUtils}>
      <FormikWithRef
        ref={formRef}
        validateOnBlur={validateOnBlur}
        validateOnChange={validateOnChange}
        validateOnMount={validateOnMount}
        enableReinitialize
        initialValues={initialValues}
        onSubmit={(values, { setSubmitting }) => {
          onSubmit(values);
          if (isMounted.current) {
            setSubmitting(false);
          }
        }}
        validationSchema={validationSchema}
      >
        {({ values, ...formFunction }) => (
          <Form>
            {!!onError && <ErrorListener onError={onError} shouldTriggerErrors={shouldTriggerErrors} />}
            {!!onSubmitWithError && <SubmitListener onSubmitWithError={onSubmitWithError} />}
            { (!!getFields ? getFields(values) : fields).map((field, i) => <div key={i} className={classes.noCollapse}>
              <FieldGenerator
                readOnly={readOnly}
                formFunction={formFunction}
                fieldData={field}
              />
            </div>)}
          </Form>
        )}
      </FormikWithRef>
    </MuiPickersUtilsProvider>
  );
}

FormGenerator.propTypes = {
  initialValues: PropTypes.object,
  fields: PropTypes.arrayOf(PropTypes.object),
  getFields: PropTypes.func,
  onSubmit: PropTypes.func,
  readOnly: PropTypes.bool,
  formRef: PropTypes.object.isRequired,
  validateOnBlur: PropTypes.bool,
  validateOnChange: PropTypes.bool,
  validateOnMount: PropTypes.bool,
  validationSchema: PropTypes.object,
  onError: PropTypes.func,
  shouldTriggerErrors: PropTypes.func,
  onSubmitWithError: PropTypes.func,
};

export default FormGenerator
