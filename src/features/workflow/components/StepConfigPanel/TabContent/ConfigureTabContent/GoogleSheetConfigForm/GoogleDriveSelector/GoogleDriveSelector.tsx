'use client';

import { type GoogleDrive,useGoogleDrives } from '@/features/workflow/hooks';
import {
  BaseSelector,
  type BaseSelectorOption,
} from '@/shared/components/BaseForm';

import { GoogleDriveOption } from './GoogleDriveOption';
import { GoogleDriveSelectorLabel } from './GoogleDriveSelectorLabel';

const MY_DRIVE_VALUE = '__my_drive__';

const MY_DRIVE_OPTION: BaseSelectorOption<GoogleDrive | undefined> = {
  data: undefined,
  label: 'My Drive',
  value: MY_DRIVE_VALUE,
};

interface GoogleDriveSelectorProps {
  integrationAccountId: string;
  onValueChange?: (value: string | null) => void;
  side?: 'top' | 'right' | 'bottom' | 'left';
  value?: string | null;
}

const GoogleDriveSelector = ({
  integrationAccountId,
  onValueChange,
  side,
  value,
}: GoogleDriveSelectorProps) => {
  const { drives, loading } = useGoogleDrives({ integrationAccountId });

  const driveOptions: BaseSelectorOption<GoogleDrive | undefined>[] =
    drives.map((drive) => ({
      data: drive,
      label: drive.name,
      value: drive.id,
    }));

  const options = [MY_DRIVE_OPTION, ...driveOptions];

  // null (My Drive) maps to the sentinel; everything else passes through
  const selectorValue = value === null ? MY_DRIVE_VALUE : (value ?? '');

  const placeholder = loading ? 'Loading drives…' : 'Select drive…';

  return (
    <BaseSelector
      algin="start"
      disabled={!integrationAccountId || loading}
      onValueChange={(selectedId) => {
        onValueChange?.(selectedId === MY_DRIVE_VALUE ? null : selectedId);
      }}
      options={options}
      placeholder={placeholder}
      renderLabel={(selectedOption) => (
        <GoogleDriveSelectorLabel
          loading={loading}
          placeholder={placeholder}
          selectedOption={selectedOption}
        />
      )}
      renderOption={(option) => <GoogleDriveOption option={option} />}
      side={side}
      value={selectorValue}
    />
  );
};

export { GoogleDriveSelector };
