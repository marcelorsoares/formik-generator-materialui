
import React, { useEffect, useRef, useState } from 'react';
import HintWarning from "../UI/HintWarning";
import {
  FormControl,
  InputLabel,
  FormHelperText,
  MenuItem,
  Select,
  OutlinedInput,
  FilledInput,
} from "@material-ui/core";
import { useField } from 'formik';
import classes from '../index.css'

import { last } from "../functions/formHelper";

export default function SelectFieldFormik({ fieldData }) {

  const { title, path, choice, titleChoice, category, disabled, hint, warning, required } = fieldData;

  const selectRef = useRef(null);
  const [labelWidth, setLabelWidth] = useState(null);

  const [field, { error }] = useField(path);
  let noLabelNotchWidth = title ? title.length * 9 : 0;

  useEffect(() => {
    if (selectRef && selectRef.current) {
      let labelWidth = selectRef.current.offsetWidth;
      setLabelWidth(labelWidth);
    }
  }, [title]);

  return (
    <div className={classes.flex}>
      <HintWarning hint={warning} isWarning />
      <FormControl
        error={!!error}
        variant={disabled ? "filled" : "outlined"}
        margin={"dense"}
        className={classes.flexGrow}>
        <InputLabel
          shrink={!!field.value || (field.value === 0)}
          required={required}
          ref={selectRef}
          htmlFor={path}>{title}</InputLabel>
        <Select
          name={field.name}
          value={field.value === 0 ? 0 : field.value || ''}
          onChange={field.onChange}
          input={disabled ?
            <FilledInput
              readOnly={true}
            />
            :
            <OutlinedInput
              labelWidth={labelWidth || noLabelNotchWidth}
              notched={!!field.value || (field.value === 0)}
            />}
          MenuProps={{
            PaperProps: {
              style: {
                maxHeight: 300,
              },
            }
          }}
          label={title}
        >
          {choice.map((choice, i) => {
            if (!choice && choice !== 0) {
              return <MenuItem key={i} value={null}>
                {"-"}
              </MenuItem>
            } else if (!choice.category) {
              return <MenuItem key={i} value={choice}>
                {(titleChoice && titleChoice[i]) || choice}
              </MenuItem>
            } else {
              return [
                <MenuItem key={i + "category"} disabled>
                  <em>{choice.category}</em>
                </MenuItem>,
                choice.values.map((value, j) => <MenuItem key={j + "" + i} value={value}>{value}</MenuItem>)
              ]
            }
          }
          )}
        </Select>
        {error && <FormHelperText margin={"dense"} error>{error}</FormHelperText>}
      </FormControl>
      <HintWarning hint={hint} />
    </div>
  )
};
