import { ModalProps } from '@/types/common-type';
import xbutton from '@/assets/common/x.svg';
import Image from 'next/image';
const Modal = ({
  title,
  subtitle,
  onClose,
  children,
  leftButton,
  rightButton,
  isDisable,
  canRight,
}: ModalProps) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-3xl p-4">
        <div className="flex flex-row justify-between pb-2 border-b-[1px] border-b-black300 pt-[10px]">
          <div className="flex flex-col gap-2">
            <div className="title04B">{title}</div>
            <div className="text-fontcolor03 body04R ">{subtitle}</div>
          </div>
          <div className="cursor-pointer" onClick={onClose}>
            <Image width={32} height={32} priority src={xbutton} alt="x" />
          </div>
        </div>
        <div>{children}</div>
        <div className="flex flex-row justify-between h-[40px]">
          <div
            className="w-[48%] bg-black500 flex items-center justify-center cursor-pointer"
            onClick={leftButton.onClick}
          >
            <div className="body04M text-white">{leftButton.text}</div>
          </div>
          {isDisable ? (
            <div
              className={`w-[48%] flex items-center justify-center cursor-pointer ${
                canRight ? 'bg-mainPurple' : 'bg-disablePurple'
              } `}
              onClick={canRight ? rightButton.onClick : undefined}
            >
              <div className="body04M text-white">{rightButton.text}</div>
            </div>
          ) : (
            <div
              className="w-[48%] bg-mainPurple flex items-center justify-center cursor-pointer"
              onClick={rightButton.onClick}
            >
              <div className="body04M text-white">{rightButton.text}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Modal;