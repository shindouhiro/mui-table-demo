;
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import type { CheckboxProps, SelectProps, SwitchProps } from '@mui/material';
import {
  Box,
  Button,
  Checkbox,
  IconButton,
  Select,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@mui/material';
import { isFunction } from 'lodash';
import { memo, type ReactNode } from 'react';
import type {
  Control,
  ControllerRenderProps,
  FieldValues,
  RegisterOptions,
  UseFieldArrayAppend,
  ValidateResult,
} from 'react-hook-form';
import { useFieldArray } from 'react-hook-form';
import FormController from './FormController';
import type { InputProps } from './Input';
import Input from './Input';

type BaseColumnRule = Omit<
  RegisterOptions<any, string>,
  'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled' | 'validate'
> & {
  validate?: (
    value: unknown,
    formValues: any,
    index: number,
  ) => ValidateResult | Promise<ValidateResult>;
};

type BaseColumnType<T = any> = {
  key: string;
  title: string;
  /** @default 'input' */
  rules?: BaseColumnRule;
  placeholder?: string;
  defaultValue?: string | number | boolean;
  width?: number;
  renderControl?: (field: ControllerRenderProps<FieldValues, string>, index: number) => ReactNode;
} & T;
type InputColumnType = BaseColumnType<{ type?: 'input'; controlProps?: InputProps }>;
type CheckboxColumnType = BaseColumnType<{ type: 'checkbox'; controlProps?: CheckboxProps }>;
type SwitchColumnType = BaseColumnType<{ type: 'switch'; controlProps?: SwitchProps }>;
type SelectColumnType = BaseColumnType<{ type: 'select'; controlProps?: SelectProps }>;
type FileUploadColumnType = BaseColumnType<{ type: 'file'; controlProps?: UploadButtonProps }>;

export type ColumnType =
  | InputColumnType
  | CheckboxColumnType
  | SwitchColumnType
  | SelectColumnType
  | FileUploadColumnType;

export type EditingTableProps = {
  /** form control name */
  name: string;
  control: Control<FieldValues>;
  columns: ColumnType[];
  emptyText?: string;
  addition?:
  | false
  | string
  | ((args: { append: UseFieldArrayAppend<FieldValues, string> }) => ReactNode);
  /** @default true */
  removable?: boolean;
};

const EditingTable = ({
  name,
  control,
  columns,
  addition = '新增',
  emptyText = '暂无数据',
  removable = true,
}: EditingTableProps) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name,
  });

  const renderField = (
    column: ColumnType,
    inputField: ControllerRenderProps<FieldValues, string>,
    index: number,
  ) => {

    const { type, controlProps, placeholder, renderControl } = column;
    if (renderControl) {
      return renderControl(inputField, index);
    }
    console.log({
      column,
      inputField,
      index
    })
    switch (type) {
      case 'input':
        return (
          <Input
            sx={{ flex: 1 }}
            {...(controlProps || {})}
            {...inputField}
            placeholder={placeholder}
          />
        );
      case 'checkbox':
        return (
          <Checkbox
            {...(controlProps || {})}
            {...inputField}
            checked={inputField.value}
          />
        );
      case 'switch':
        return (
          <Switch
            {...(controlProps || {})}
            {...inputField}
          />
        );
      case 'select':
        return (
          <Select
            {...(controlProps || {})}
            {...inputField}
          // onChange={(e) => {
          //   console.log({ e })
          //   inputField.onChange(e.target.value);
          // }}
          />
        );
      default:
        return (
          <Input
            sx={{ flex: 1 }}
            {...(controlProps || {})}
            {...inputField}
            placeholder={placeholder}
          />
        );
    }
  };

  return (
    <Box>
      <Table>
        <TableHead>
          <TableRow>
            {columns.map((column) => (
              <TableCell
                key={column.key}
                width={column.width}
              >
                {column.title}
              </TableCell>
            ))}
            {removable && <TableCell>操作</TableCell>}
          </TableRow>
        </TableHead>
        <TableBody>
          {fields?.map((field, index) => (
            <TableRow
              key={field.id}
              sx={{ cursor: 'pointer' }}
            >
              {columns.map((column) => {
                const { key, defaultValue, rules } = column;
                return (
                  <TableCell key={key}>
                    <FormController
                      key={field.id}
                      control={control}
                      name={`${name}.${index}.${key}`}
                      rules={bindIndexToRules(rules, index) as unknown as any}
                      defaultValue={defaultValue}
                    >
                      {(inputField) => renderField(column, inputField, index)}
                    </FormController>
                  </TableCell>
                );
              })}
              {removable && (
                <TableCell>
                  <IconButton
                    color="primary"
                    onClick={() => remove(index)}
                  >
                    <DeleteOutlineOutlinedIcon fontSize="small" />
                  </IconButton>
                </TableCell>
              )}
            </TableRow>
          ))}
          {/* {!fields.length && ( */}
          {/*   <TableEmpty */}
          {/*     text={emptyText} */}
          {/*     colSpan={columns.length + 1} */}
          {/*   /> */}
          {/* )} */}
        </TableBody>
      </Table>
      {addition && (
        <div>
          {typeof addition === 'function' ? (
            addition({ append })
          ) : (
            <Button
              fullWidth
              color="primary"
              onClick={() => append({})}
            >
              {addition}
            </Button>
          )}
        </div>
      )}
    </Box>
  );
};

function bindIndexToRules(rules: ColumnType['rules'], index: number) {
  if (isFunction(rules?.validate)) {
    const validate = (...args: [any, any]) => rules!.validate!.apply(null, [...args, index]);
    return {
      ...rules,
      validate,
    };
  }
  return rules;
}

export default memo(EditingTable);
