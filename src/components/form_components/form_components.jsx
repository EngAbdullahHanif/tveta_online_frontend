import { inputLabel } from 'config/styling';
import { FormGroup, Label } from 'reactstrap';

export const MyFormGroup = ({ children, ...props }) => (
  <FormGroup className="form-group has-float-label error-l-100 " {...props}>
    {children}
  </FormGroup>
);

export const MyLabel = ({ children, required, ...props }) => (
  <Label style={inputLabel} {...props}>
    {children}
    {required && <span style={{ color: 'red' }}>*</span>}
  </Label>
);

export const MyErrorLabel = ({ children, hide, ...props }) => {
  if (hide) return null;
  return (
    <div
      className="invalid-feedback d-block bg-danger text-white messageStyle"
      {...props}
    >
      {children}
    </div>
  );
};

export const RequiredHash = () => <span style={{ color: 'red' }}>*</span>;
