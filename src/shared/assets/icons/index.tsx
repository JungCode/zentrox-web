import { IIconProps } from '@/shared/assets/types';

const ZentroxIcon = (props: IIconProps) => (
  <svg
    fill="none"
    height="32"
    viewBox="0 0 32 32"
    width="32"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <rect fill="#1A1F36" height="32" rx="2" width="32" />
    <path
      d="M18.5 23.5V21H15.1667V12.6667H13.5V15.1667H7.66667V8.5H13.5V11H18.5V8.5H24.3333V15.1667H18.5V12.6667H16.8333V19.3333H18.5V16.8333H24.3333V23.5H18.5ZM9.33333 10.1667V13.5V10.1667ZM20.1667 18.5V21.8333V18.5ZM20.1667 10.1667V13.5V10.1667ZM20.1667 13.5H22.6667V10.1667H20.1667V13.5ZM20.1667 21.8333H22.6667V18.5H20.1667V21.8333ZM9.33333 13.5H11.8333V10.1667H9.33333V13.5Z"
      fill="white"
    />
  </svg>
);

export { ZentroxIcon };
