'use client';

import { type GoogleDrive, useGoogleDrives } from '@/features/workflow/hooks';
import {
  BaseSelector,
  type BaseSelectorOption,
} from '@/shared/components/BaseForm';

import { GoogleDriveOption } from './GoogleDriveOption';
import { GoogleDriveSelectorLabel } from './GoogleDriveSelectorLabel';

const MY_DRIVE_VALUE = { id: '__my_drive__', name: 'My Drive' };

const MY_DRIVE_OPTION: BaseSelectorOption<GoogleDrive | undefined> = {
  data: MY_DRIVE_VALUE,
  label: 'My Drive',
  value: MY_DRIVE_VALUE.id,
};

interface GoogleDriveSelectorProps {
  integrationAccountId: string;
  onValueChange?: (value: GoogleDrive | null) => void;
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

  const placeholder = loading ? 'Loading drives…' : 'Select drive…';

  return (
    <BaseSelector
      align="start"
      disabled={!integrationAccountId || loading}
      onValueChange={(selectedId) => {
        const isMyDrive = selectedId === MY_DRIVE_VALUE.id;
        const selectedDrive = drives.find((d) => d.id === selectedId) ?? null;
        const resolvedDrive = isMyDrive ? null : selectedDrive;

        onValueChange?.(resolvedDrive);
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
      value={value === null ? MY_DRIVE_VALUE.id : (value ?? '')}
    />
  );
};

export { GoogleDriveSelector };
