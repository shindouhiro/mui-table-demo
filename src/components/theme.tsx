;
import * as locales from '@mui/material/locale';
import { alpha, createTheme } from '@mui/material/styles';

const FormFieldSize = 'small';
export const headingColor = 'rgba(0,0,0,0.88)';
const HeadDefalutStyle = {
  fontWeight: 500,
  color: headingColor,
};

const theme = createTheme(
  {
    spacing: 4,
    palette: {
      mode: 'light',
      primary: {
        main: '#613eea',
      },
      info: {
        main: '#613eea',
      },
      success: {
        main: 'rgb(86, 202, 0)',
      },
      error: {
        main: '#EB3850',
      },
      background: {
        default: 'rgba(58, 53, 65, 0.04)',
      },
      cancel: {
        main: colors['grey']?.[700],
      },
      warning: {
        main: '#ebae21',
      },
    },
    typography: {
      fontFamily:
        'Inter,sans-serif,-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol"',
      h1: {
        ...HeadDefalutStyle,
        fontSize: '2.5rem',
      },
      h2: {
        ...HeadDefalutStyle,
        fontSize: '2rem',
      },
      h3: {
        ...HeadDefalutStyle,
        fontSize: '1.5rem',
      },
      h4: {
        ...HeadDefalutStyle,
        fontSize: '1.25rem',
      },
      h5: {
        ...HeadDefalutStyle,
        fontSize: '1rem',
      },
      h6: {
        ...HeadDefalutStyle,
        fontSize: '0.875rem',
      },
      body1: {
        fontSize: '0.875rem',
      },
      body2: {
        fontSize: '0.75rem',
        color: '#BDC1CAFF',
      },
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: () => ({
          body: {
            color: 'rgba(0,0,0,0.85)',
          },
        }),
      },
      MuiAppBar: {
        styleOverrides: {
          root: ({ theme }) => ({
            boxShadow: 'none',
            borderBottom: `2px solid ${theme.palette.grey['200']}`,
          }),
        },
      },
      MuiButton: {
        defaultProps: {
          size: FormFieldSize,
        },
        styleOverrides: {
          root: ({ ownerState, theme }) =>
            ownerState.variant === 'contained' && ownerState.color
              ? {
                '&:hover': {
                  background: `${theme?.palette?.[ownerState.color]?.light} !important`,
                },
              }
              : {},
        },
        variants: [
          {
            props: { variant: 'dashed' },
            style: ({ theme }) => ({
              border: `1px dashed ${theme.palette.primary.main}`,
              strokeDasharray: 4,
              padding: 0,
              color: theme.palette.primary.main,
              '&:hover': {
                background: alpha(theme.palette.primary.main, 0.04),
              },
            }),
          },
          {
            props: { variant: 'dashed', color: 'cancel' },
            style: ({ theme }) => ({
              border: `1px dashed ${theme.palette.cancel?.main}`,
              padding: 0,
              '&:hover': {
                background: alpha(theme.palette.cancel!.main, 0.04),
              },
            }),
          },
        ],
      },
      MuiIconButton: {
        defaultProps: {
          size: FormFieldSize,
        },
      },
      MuiSelect: {
        defaultProps: {
          size: FormFieldSize,
        },
      },
      MuiAvatar: {
        styleOverrides: {
          root: {
            color: '#fff',
          },
        },
      },
      MuiOutlinedInput: {
        defaultProps: {
          size: FormFieldSize,
        },
        styleOverrides: {
          root: ({ ownerState }) => (!ownerState.multiline ? { paddingRight: 0 } : {}),
          input: ({ ownerState }) => {
            if (ownerState.size === 'small' && !ownerState.multiline) {
              return {
                padding: '6px 14px !important',
              };
            }
            if (ownerState.size === 'medium' && !ownerState.multiline) {
              return {
                padding: '8.5px 14px !important',
              };
            }
          },
        },
      },
      MuiInputLabel: {
        defaultProps: {
          size: FormFieldSize,
        },
      },
      MuiFormControl: {
        defaultProps: {
          size: FormFieldSize,
        },
      },
      MuiRadio: {
        defaultProps: {
          size: FormFieldSize,
        },
      },
      MuiTableCell: {
        styleOverrides: {
          head: {
            fontWeight: 600,
            backgroundColor: '#F5F1FEFF',
            padding: '8px 16px',
            border: '2px solid #fff',
            borderBottom: 'none',
            whiteSpace: 'nowrap',
          },
        },
      },
      MuiMenu: {
        defaultProps: {
          elevation: 1,
        },
        styleOverrides: {
          list: {
            padding: '8px 4px',
          },
          root: {
            '& .MuiButtonBase-root': {
              padding: '4px 12px',
            },
            '& .MuiListItemIcon-root': {
              minWidth: '32px',
            },
          },
        },
      },
      MuiLink: {
        defaultProps: {
          underline: 'none',
        },
      },
      MuiDialogTitle: {
        styleOverrides: {
          root: {
            fontSize: 18,
            fontWeight: 600,
          },
        },
      },
    },
  },
  locales['zhCN'],
);

export default theme;
