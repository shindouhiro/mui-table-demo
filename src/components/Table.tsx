import EditingTable from './EditingTable';
import Input from './Input';
import { MenuItem } from '@mui/material';
import { memo, useMemo, useState } from 'react';
import type { ControllerRenderProps, FieldValues } from 'react-hook-form';
import { useFormContext, useWatch } from 'react-hook-form';

const TYPES = [
  { label: '字符串', value: 'string' },
  { label: '数值', value: 'number' },
]

const COMPARESTRING = [
  { label: '等于', value: '=' },
  { label: '不等于', value: '!=' },
  { label: 'in', value: 'in' },
  { label: 'not in', value: 'not in' },
  { label: '包含', value: 'include' },
  { label: '不包含', value: 'not include' }
]

const COMPARENUMBE = [
  { label: '大于等于', value: '>=' },
  { label: '大于', value: '>' },
  { label: '等于', vlaue: '=' },
  { label: '不等于', value: '!=' },
  { label: '小于等于', value: '<=' },
  { label: '小于', value: '<' }
]
type TypeOptions = (typeof TYPES)[number][];

interface ParamsTableProps {
  name: string;
  addition?: string | false;
  removable?: boolean;
  mode?: 'debug' | 'mock';
  type: string;
  /** 可选类型 */
}

interface IRelationOpts {
  label: string;
  value: string;
}

const ParamsTable = ({
  name,
  mode,
  addition,
  type,
  removable = true,
}: ParamsTableProps) => {
  const { control } = useFormContext();
  const inDebugMode = mode === 'debug';
  const [compareType, setCompareType] = useState('string')
  const relationOpts: any = useMemo(() => {
    return compareType === 'string' ? COMPARESTRING : COMPARENUMBE
  }, [compareType])
  const columns = useMemo<any[]>(
    () => [
      {
        key: 'expression',
        title: `${type === 'json' ? 'Json Path' : 'XPath'}`,
        controlProps: { readOnly: inDebugMode },
        rules: { required: '必填' },
      },
      {
        key: 'compareType',
        title: '类型',
        type: 'select',
        width: 120,
        controlProps: {
          inputProps: {
            readOnly: inDebugMode,
          },
          children: TYPES?.map(({ label, value }) => (
            <MenuItem
              key={label}
              value={value}
            >
              {label}
            </MenuItem>
          )),
        },
        defaultValue: 'string',

      },
      {
        key: 'relation',
        title: '比较方式',
        type: 'select',
        width: 120,
        controlProps: {
          inputProps: {
            readOnly: inDebugMode,
          },
          children: relationOpts?.map(({ value, label }) => (
            <MenuItem
              key={label}
              value={value}
            >
              {label}
            </MenuItem>
          )),
        },
        defaultValue: 'string',
      },
      {
        key: 'value',
        title: '期望值',
      },
    ],
    [inDebugMode, name, type, relationOpts],
  );

  return (
    <EditingTable
      name={name}
      control={control}
      columns={columns}
      addition={inDebugMode ? false : addition}
      removable={!!removable && !inDebugMode}
    />
  );
};

export default ParamsTable;

// type ValueControllerProps = {
//   field: ControllerRenderProps<FieldValues, string>;
//   index: number;
//   name: string;
// };
// // match special control by type value
// const ValueController = memo(function ValueController({
//   field,
//   index,
//   name,
// }: ValueControllerProps) {
//   const type = useWatch({
//     name: `${name}.${index}.type`,
//   });
//   return type === 'file' ? <UploadButton {...field} /> : <Input {...field} />;
// });
