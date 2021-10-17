import React, { ButtonHTMLAttributes, FC } from "react";
import classNames from "classnames";
import { IPaginationProps } from "./Pagination.d";

export interface PrevButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: string | React.ReactElement;
}

export const PrevButton: FC<PrevButtonProps> = ({
  className,
  children,
  ...buttonProps
}) => {
  return (
    <button className={classNames(className)} {...buttonProps}>
      {children}
    </button>
  );
};

// NextButton
// PageButton

export const Pagination: FC<IPaginationProps> = () => {
  return <div className="text-blue-500">pagination</div>;
};
