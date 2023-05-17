import React, { useCallback, useState } from "react";
import styled from "@emotion/styled";
import ResetBtnIcon from "../../images/input_reset_btn.png";
import CheckIcon from "../../images/check_icon.png";

import {
  validateUserIdV2,
  validatePasswordV2,
  validateBlank,
} from "../../helpers/ValidateHelper";
import { COLOR_V2 } from "../../constants/ColorV2";
import StopWatch from "../../elements/StopWatch";

type InputType =
  | "text"
  | "userId"
  | "password"
  | "confirmPassword"
  | "email"
  | "emailConfirm"
  | "phone"
  | "emailAuth";

interface IProps {
  className?: string;
  size?: string;
  disabled?: boolean;
  styleCustom?: Record<string, string>;
  placeholder?: string;
  validationMessage?: string;
  inputLabel?: string;
  value: string;
  onKeyPress?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onChange?: (
    e: React.ChangeEvent<HTMLInputElement>,
    validationError?: boolean
  ) => void;
  onClickClearValue?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  validationCheck?: boolean;
  loginType?: boolean;
  onKeyDown?: (
    e: React.KeyboardEvent<HTMLInputElement>,
    validationError: boolean
  ) => void;
  setEmail?: React.Dispatch<React.SetStateAction<string>>;
  warningMessage?: string;
  setInputValue?: React.Dispatch<React.SetStateAction<string>>;
  inputType?: InputType;
  setEmailDomain?: React.Dispatch<React.SetStateAction<string>>;
  selectedDomain?: string;
  isEmailConfirm?: boolean;
  setNationalCode?: React.Dispatch<React.SetStateAction<string>>;
  password?: string;
  maxLength?: number;
  isTimer?: boolean;
  successMessage?: string;
  emailSendSuccess?: boolean;
  setEmailSendSuccess?: React.Dispatch<React.SetStateAction<boolean>>;
  autoComplete?: string;
}

const InputV2: React.FC<IProps> = (props) => {
  const {
    disabled = false,
    styleCustom,
    placeholder,
    validationMessage,
    inputLabel,
    value,
    onChange,
    onKeyDown,
    onKeyPress,
    onClickClearValue,
    loginType,
    validationCheck,
    warningMessage,
    inputType = "text",
    setEmailDomain,
    setNationalCode,
    isEmailConfirm,
    password,
    isTimer,
    successMessage,
    emailSendSuccess,
    setEmailSendSuccess,
    autoComplete = "off",
  } = props;

  const [validationError, setValidationError] = useState(false);
  const [emailInputType, setEmailInputType] = useState(false);
  const [timeOver, setTimeOver] = useState(false);

  const onChangeTimer = () => {
    if (setEmailSendSuccess !== undefined) {
      setTimeOver(true);
      if (timeOver) {
        setEmailSendSuccess(false);
      }
    }
  };

  const setValidation = useCallback(
    (inputValue: string, inputType: string) => {
      if (inputType === "userId" && !loginType) {
        if (validateUserIdV2(inputValue)) {
          setValidationError(false);
        } else {
          setValidationError(true);
        }
      } else if (inputType === "password" && !loginType) {
        if (validatePasswordV2(inputValue)) {
          setValidationError(false);
        } else {
          setValidationError(true);
        }
      } else if (inputType === "confirmPassword") {
        if (password === inputValue) {
          setValidationError(false);
        } else {
          setValidationError(true);
        }
      } else if (inputType === "email") {
        if (validateBlank(inputValue)) {
          setValidationError(false);
        } else {
          setValidationError(true);
        }
      } else if (inputType === "phone") {
        if (validateBlank(inputValue)) {
          setValidationError(false);
        } else {
          setValidationError(true);
        }
      }
    },
    [value, password, loginType]
  );

  const onChangeInput = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {

    setValidation(e.target.value, inputType);
    onChange?.(e, validationError);
  };

  const onChangeEmailSelect = (
    e: React.ChangeEvent<HTMLSelectElement>
  ): void => {
    if (e.target.value === "direct_input") {
      setEmailInputType(true);
    }
    setEmailDomain?.(e.target.value);
  };

  const onChangeEmailInput = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setEmailDomain?.(e.target.value);
  };

  const onChangeNationCodeSelect = (
    e: React.ChangeEvent<HTMLSelectElement>
  ): void => {
    setNationalCode?.(e.target.value);
  };

  const setInputType = (): string => {
    if (inputType === "phone") {
      return "number";
    } else if (
      inputType === "password" ||
      inputType === "confirmPassword"
    ) {
      return "password";
    } else {
      return "text";
    }
  };

  const emailDomains = [
    { key: "naver", value: "@naver.com" },
    { key: "gmail", value: "@gmail.com" },
    { key: "kakao", value: "@kakao.com" },
    { key: "hanmail", value: "@hanmail.net" },
    { key: "daum", value: "@daum.net" },
    { key: "nate", value: "@nate.com" },
  ];

  const nationalCodes = [
    { key: "KOR", value: "+82", name: "한국(+82)" },
    { key: "CHN", value: "+86", name: "중국(+86)" },
    { key: "HKG", value: "+852", name: "홍콩(+852)" },
    { key: "THA", value: "+66", name: "태국(+66)" },
    { key: "RUS", value: "+7", name: "러시아(+7)" },
    { key: "JPN", value: "+81", name: "일본(+81)" },
    { key: "TW", value: "+886", name: "타이완(+886)" },
    { key: "USA", value: "+1", name: "미국(+1)" },
  ];

  return (
    <InputContainer styleCustom={styleCustom}>
      {inputLabel && (
        <LabelContainer>
          <InputLable styleCustom={styleCustom} color={COLOR_V2.BLACK1}>
            {inputLabel}
          </InputLable>
          {warningMessage && (
            <WarningMessageWrapper color={COLOR_V2.PRIMARY4}>
              {warningMessage}
            </WarningMessageWrapper>
          )}
        </LabelContainer>
      )}
      <FlexContainer styleCustom={styleCustom}>
        <InputOuter styleCustom={styleCustom}>
          <InputWrapper
            type={setInputType()}
            maxLength={loginType ? undefined : inputType === "phone" ? 20 : undefined}
            placeholder={placeholder}
            onChange={onChangeInput}
            onKeyDown={onKeyDown}
            onKeyUp={onChangeInput}
            onKeyPress={onKeyPress}
            value={value}
            validationCheck={validationCheck}
            styleCustom={styleCustom}
            inputType={inputType}
            validationErorr={validationError}
            autoComplete={autoComplete}
            disabled={disabled}
          />
          {value && inputType !== "emailAuth" && !disabled && (
            <ClearBtn onClick={onClickClearValue} src={ResetBtnIcon}>
              <img src={ResetBtnIcon} alt="Reset Icon" />
            </ClearBtn>
          )}

          {emailSendSuccess && isTimer ? (
            <TimerWrapper color={COLOR_V2.GRAY2}>
              <StopWatch count={180000} onChangeTimer={onChangeTimer} />
            </TimerWrapper>
          ) : null}

          {inputType === "phone" && (
            <NationalCodeSelectWrapper
              validationCheck={validationCheck}
              color={COLOR_V2.BLACK1}
              styleCustom={styleCustom}
              inputType={inputType}
              onChange={onChangeNationCodeSelect}
            >
              {nationalCodes.map((code) => (
                <option key={code.key} value={code.value}>
                  {code.name}
                </option>
              ))}
            </NationalCodeSelectWrapper>
          )}
        </InputOuter>

        {inputType === "email" ? (
          emailInputType ? (
            <DirectInputWrapper
              disabled={disabled}
              onChange={onChangeEmailInput}
              onKeyDown={onChangeEmailInput}
              onKeyUp={onChangeEmailInput}
              validationCheck={validationCheck}
              styleCustom={styleCustom}
              inputType={inputType}
            />
          ) : !isEmailConfirm ? (
            <SelectBoxWrapper
              disabled={disabled}
              onChange={onChangeEmailSelect}
              validationCheck={validationCheck}
              styleCustom={styleCustom}
              inputType={inputType}
            >
              {emailDomains.map((domain) => (
                <option key={domain.key} value={domain.value}>
                  {domain.value}
                </option>
              ))}
              <option key="direct" value="direct_input">
                직접입력
              </option>
            </SelectBoxWrapper>
          ) : null
        ) : null}
      </FlexContainer>

      {emailSendSuccess && validationCheck ? (
        <ValidationSuccess color={COLOR_V2.GREEN}>
          <CheckIconWrapper className="img-render" src={CheckIcon} alt="Check Icon" />{" "}
          {successMessage}
        </ValidationSuccess>
      ) : validationError || validationCheck ? (
        <ValidationError color={COLOR_V2.PRIMARY3}>
          {validationMessage}{" "}
        </ValidationError>
      ) : (
        <ValidationError>&nbsp;</ValidationError>
      )}
    </InputContainer>
  );
};


InputV2.defaultProps = {
  styleCustom: {
    margin: "16px 0 0 0",
    width: "100%",
    height: "52px",
    hoverColor: COLOR_V2.GRAY7,
    focusColor: COLOR_V2.GRAY7,
    defaultBorder: COLOR_V2.GRAY1,
    errorColor: COLOR_V2.PRIMARY4,
    borderColor: COLOR_V2.GRAY1,
  },
};

const InputContainer = styled.div<any>`
  margin: ${props =>
    props.styleCustom.margin ? props.styleCustom.margin : ""};
`;

const LabelContainer = styled.div`
  display: flex;
`;

const InputLable = styled.label<any>`
  font-weight: 400;
  font-size: 12px;
  line-height: 90%;
  letter-spacing: -0.02em;
  color: ${props => props.styleCustom?.labelColor};
  flex: none;
  order: 0;
  flex-grow: 0;
  margin-bottom: 8px;
  text-align: left;
`;

const InputWrapper = styled.input<any>`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: ${props =>
    props.inputType === "phone" ? "16px 16px 16px 100px" : "16px"};
  border: 1px solid ${props =>
    props.styleCustom.borderColor ? props.styleCustom?.borderColor : ""};
  box-sizing: border-box;
  border-radius: 8px;
  flex: none;
  order: 1;

  flex-grow: 0;
  margin: 0px 0px;

  background: ${props =>
    props.disabled
      ? props.styleCustom?.disabledColor
      : props.styleCustom?.background ?? ""};

  border: ${props =>
    props.disabled
      ? "none"
      : props.validationCheck || props.validationErorr
        ? "1px solid" + props.styleCustom?.errorColor
        : "1px solid" + props.styleCustom?.borderColor};

  //width:  ${props =>
    props.inputType === "email"
      ? "55%"
      : props.styleCustom?.width
        ? props.styleCustom?.width
        : ""}  ;
  //height : ${props =>
    props.styleCustom?.height ? props.styleCustom?.height : ""};
  width: 100%;;
  height: 100%;

  user-select: text;

  @media screen and (max-width: 768px) {
    width: 100%;
    padding:  "10px 10px 10px 80px";
  }

  &:hover {
    outline: none;
    border: ${props =>
    props.disabled ? "" : `1px solid ${props.styleCustom?.hoverColor}` ?? ""};
  }

  &:focus {
    outline: none;
    border: 1px solid ${props => props.styleCustom?.focusColor ?? ""};
  }

  &::placeholder {
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 140%;
    letter-spacing: -0.02em;
  }

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;

const InputOuter = styled.div<any>`
  position: relative;
  height: ${props => props.styleCustom?.height ?? ""};
  width: ${props => props.styleCustom?.width ?? ""};
  margin: 0px;
  padding: 0px;
  box-sizing: border-box;
`;

const ClearBtn = styled.button<any>`
  width: 16.5px;
  height: 16.5px;
  position:absolute;
  right: 15px;
  top: 35%;
  transform: translateY(-50%)
  border:none;
  cursor:pointer;
`;

const ValidationError = styled.div`
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 90%;
  letter-spacing: -0.02em;
  color: ${props => props.color ?? ""};
  text-align: left;
  margin: 10px 0px 0px 8px;
`;

const ValidationSuccess = styled.div`
  display: flex;
  item-align: center;
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 90%;
  letter-spacing: -0.02em;
  color: ${props => props.color ?? ""};
  text-align: left;
  margin: 10px 0px 0px 4px;
`;

const WarningMessageWrapper = styled.div`
  font-weight: 400;
  font-size: 12px;
  line-height: 90%;
  letter-spacing: -0.02em;
  color: ${props => props.color ?? ""};
  flex: none;
  order: 0;
  flex-grow: 0;
  margin: 0px;
  text-align: left;
`;

const FlexContainer = styled.div<any>`
  width: ${props => (props.styleCustom?.width ? props.styleCustom?.width : "")};
  height: ${props =>
    props.styleCustom?.height ? props.styleCustom?.height : ""};
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  @media screen and (max-width: 768px) {
    width: 100%;
  }
`;

const SelectBoxWrapper = styled.select<any>`
  justify-content: center;
  align-items: center;
  padding: 12px 8px;
  border: 1px solid
    ${props =>
    props.styleCustom?.borderColor ? props.styleCustom?.borderColor : ""};
  box-sizing: border-box;
  border-radius: 8px;
  flex-grow: 0;
  border: ${props =>
    props.validationCheck
      ? `1px solid ${props.styleCustom?.errorColor}`
      : `1px solid ${props.styleCustom?.borderColor}`};
  width: ${props =>
    props.inputType === "email"
      ? "50%"
      : props.styleCustom.width
        ? props.styleCustom.width
        : ""};
  height: ${props =>
    props.styleCustom?.height ? props.styleCustom?.height : ""};
  margin-left: 10px;
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 140%;
  letter-spacing: -0.02em;

  @media screen and (max-width: 768px) {
    width: 65%;
    padding: 12px 2px;
  }

  &:hover {
    outline: none;
    border: 1px solid
      ${props => (props.disabled ? "" : props.styleCustom?.hoverColor ?? "")};
  }

  &:focus {
    outline: none;
    border: 1px solid ${props => props.styleCustom?.focusColor ?? ""};
  }
`;

const DirectInputWrapper = styled.input<any>`
  justify-content: center;
  align-items: center;
  padding: 12px 8px;
  border: 1px solid ${props => props.styleCustom?.borderColor};
  box-sizing: border-box;
  border-radius: 8px;
  flex-grow: 0;
  border: ${props =>
    props.validationCheck
      ? "1px solid" + props.styleCustom?.errorColor
      : "1px solid" + props.styleCustom?.borderColor};
  width: ${props =>
    props.inputType === "email"
      ? "50%"
      : props.styleCustom?.width
        ? props.styleCustom?.width
        : ""};
  height: ${props =>
    props.styleCustom?.height ? props.styleCustom?.height : ""};
  margin-left: 10px;
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 140%;
  letter-spacing: -0.02em;

  @media screen and (max-width: 768px) {
    width: 65%;
    padding: 12px 2px;
  }

  &:hover {
    outline: 1px solid ${props => props.styleCustom?.hoverColor ?? ""};
  }

  &:focus {
    border: none;
    outline: 1px solid ${props => props.styleCustom?.focusColor ?? ""};
  }
`;

const NationalCodeSelectWrapper = styled.select<any>`
  left: 15px;
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 18px;
  letter-spacing: -0.01em;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  -webkit-appearance: none;
  -moz-appearance: none;
  text-indent: 1px;
  text-overflow: "";
  color: ${props => props.color ?? ""};

  &:focus {
    width: 70px;
    padding: 5px;
    font-size: 15px;
  }
`;

const TimerWrapper = styled.span`
  width: 16.5px;
  height: 16.5px;
  position:absolute;
  right: 25px;
  top: 45%;
  transform: translateY(-50%)
  border:none;
  cursor:pointer;
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 90%;
  text-align: right;
  letter-spacing: -0.02em;
  color: ${props => props.color ?? ""};
`;

const CheckIconWrapper = styled.img`
  margin-right: 5px;
  width: 10px;
  height: 7px;
  margin: auto 3px auto 0px;
`;

export default InputV2;
