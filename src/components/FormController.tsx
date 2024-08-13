import type { FormControlTypeMap, SxProps } from '@mui/material';
import { FormHelperText, FormControl as MuiFormControl } from '@mui/material';
import type { ReactNode } from 'react';
import type { ControllerRenderProps, FieldError, FieldValues, UseControllerProps } from 'react-hook-form';
import { Controller } from 'react-hook-form';
import InputLabel from './FormLabel';

export interface FormControlProps extends Omit<UseControllerProps<any>, 'render'> {
  label?: string;
  /** The help Text rendered with FormHelperText control */
  help?: string;
  children: (field: ControllerRenderProps<FieldValues, string>) => ReactNode;
  /** show label in a full row */
  labelBlocked?: boolean;
  /** If true, the label will indicate that the input is required.  */
  required?: boolean;
  sx?: SxProps;
  variant?: FormControlTypeMap['props']['variant'];
  mt?: string;
  isErrMsg?: boolean;
}


type HelpTextByConditionsOptions = {
  isErrMsg: boolean;
  error?: FieldError;
  help?: string;
};

const getHelpTextByConditions = ({
  isErrMsg,
  error,
  help
}: HelpTextByConditionsOptions) => {
  if (isErrMsg && error) {
    return help || error?.message;
  }
  if (isErrMsg && !error) {
    return '';
  }
  return help || error?.message;;
};

const FormController = ({
  name,
  label,
  help,
  children,
  labelBlocked = false,
  required = false,
  sx,
  variant,
  isErrMsg = false,
  mt,
  ...props
}: FormControlProps) => {
  return (
    <Controller
      name={name}
      {...props}
      render={({ field, fieldState: { error } }) => {
        const helpText = getHelpTextByConditions({ isErrMsg, error, help })
        return (
          <MuiFormControl
            fullWidth
            error={Boolean(error)}
            {...{ sx, variant }}
          >
            {label && (
              <InputLabel
                labelBlocked={labelBlocked}
                required={required}
                shrink={labelBlocked}
              >
                {label}
              </InputLabel>
            )}
            {children(field)}
            {helpText && <FormHelperText sx={{ mx: 0, mt: mt }}>{helpText}</FormHelperText>}
          </MuiFormControl>
        );
      }}
    />
  );
};

export default FormController;
