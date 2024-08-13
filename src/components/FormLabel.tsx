import type { InputLabelProps as MUIInputLabelProps, RegularBreakpoints } from '@mui/material';
import { FormLabel, Grid, InputLabel as MUIInputLabel } from '@mui/material';
import styled from 'styled-components';

const InputLabel = styled<InputLabelConponent>(FormLabel)`
  & .MuiFormLabel-asterisk {
    color: red;
    position: absolute;
    left: 0;
    margin-left: -10px; /* 调整此值以适应具体需求 */
  },
${({ labelBlocked }) =>
    labelBlocked
      ? `
          position: relative;
          transform: none;
          margin-bottom: 4px;
        `
      : ''
  }
`;

type InputLabelProps = {
  /** show label in a full row */
  labelBlocked?: boolean;
};

type InputLabelConponent = React.ComponentType<InputLabelProps & MUIInputLabelProps>;


type FormLabelWrapperProps = {
  label: string;
  labelCol?: RegularBreakpoints;
  controlCol?: RegularBreakpoints;
} & MUIInputLabelProps;
export const FormLabelWrapper = ({
  label,
  children,
  labelCol,
  controlCol,
  ...labelProps
}: FormLabelWrapperProps) => {
  return (
    <Grid
      container
      mb={4}
    >
      <Grid
        item
        xs={4}
        {...labelCol}
      >
        <InputLabel
          labelBlocked
          sx={{ lineHeight: '32px' }}
          {...labelProps}
        >
          {label}
        </InputLabel>
      </Grid>
      <Grid
        item
        xs={8}
        {...controlCol}
      >
        {children}
      </Grid>
    </Grid>
  );
};

export default InputLabel;
