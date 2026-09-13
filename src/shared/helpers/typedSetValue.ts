// useTypedSetValue.ts
import {
  type FieldValues,
  type Path,
  type PathValue,
  type UseFormSetValue,
} from 'react-hook-form';

const createTypedSetValue = <T extends FieldValues>(
  setValue: UseFormSetValue<T>,
) => {
  return <K extends Path<T>>(key: K, value: PathValue<T, K>) => {
    setValue(key, value);
  };
};

export { createTypedSetValue };
