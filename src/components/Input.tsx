import CancelRoundedIcon from '@mui/icons-material/CancelRounded';
import type { InputProps as MuiInputProps } from '@mui/material';
import { IconButton, OutlinedInput as MuiInput, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  input: {
    '&:not(:hover)': {
      '& .MuiButtonBase-root': {
        display: 'none',
      },
    },
  },
  multilineCounting: {
    position: 'absolute',
    right: 0,
    top: ' 100%',
    padding: 0,
  },
});

const getValueLength = (value: unknown) => {
  if (typeof value === 'string') return value.length;
  return 0;
};

export type InputProps = Omit<MuiInputProps, 'onChange'> & {
  allowClear?: boolean;
  onChange?: (v: string) => void;
  maxLength?: number;
};

const Input = ({ allowClear, onChange, maxLength, inputProps = {}, ...props }: InputProps) => {
  const classes = useStyles();

  const clearText = () => {
    onChange?.('');
  };

  const endAdornment = allowClear ? (
    <IconButton
      size="small"
      sx={{ width: 32, height: 32 }}
      onClick={clearText}
    >
      <CancelRoundedIcon sx={{ fontSize: 16 }} />
    </IconButton>
  ) : maxLength ? (
    <Typography
      variant="body2"
      sx={{ px: 2 }}
      className={props.multiline ? classes.multilineCounting : ''}
    >
      {getValueLength(props.value)}/{maxLength}
    </Typography>
  ) : null;

  return (
    <MuiInput
      className={classes.input}
      onChange={(e) => onChange?.(e.target.value)}
      {...props}
      endAdornment={endAdornment}
      inputProps={{
        ...inputProps,
        maxlength: maxLength,
      }}
    />
  );
};

export default Input;
