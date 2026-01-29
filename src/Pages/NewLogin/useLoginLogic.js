import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { signInAction } from "../../../store/reducers/loginSlice/loginSlice";
import { setWindowClass } from "../../../utils/helpers";
import { useLocalStorage } from "../../../utils/hooks/useLocalStorage";
import { axiosInstance } from "../../../utils/axiosInstance";
import { toast } from "react-toastify";

export const useLoginLogic = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { i18n } = useTranslation();
  const [isRightPanelActive, setRightPanelActive] = useState(false);
  const [load, setLoad] = useState(false);
  const [ip, setIp] = useState("");
  const [isForgot, setIsForgot] = useState(false);
  const { user, loading, error, success } = useSelector(
    (state) => state.authSlice
  );
  console.log('userxxxxxxxxx:', success)
  const [isPopupOpen, setIsPopupOpen] = useState({ Id: "", isOpen: false });

  const [credentials, setCredentials] = useState({
    UserName: "",
    username: "",
    Mobile: "",
    OTP: "",
    Password: "",
    ConfirmPassword: "",
    password: "",
  });

  useEffect(() => {
    setLoad(true);
    fetch("https://api.ipify.org?format=json")
      .then((response) => response.json())
      .then((data) => {
        setIp(data?.ip);
        setLoad(false);
      })
      .catch((error) => {
        console.error("Error fetching IP:", error);
        setLoad(false);
      });
  }, []);

  useEffect(() => {
    if (
      success &&
      user?.user?.SuperAdmin == 1 &&
      user?.user?.isAuthroizedApproval == 0
    ) {
      openAgreeDialog(user);
    } else {
      AgreeButtonCheck(user, success);
    }
  }, [success]);

  const openAgreeDialog = (user) => {
    setIsPopupOpen({
      Id: user,
      isOpen: true,
    });
  };

  const closeAgreeDialog = () => {
    setIsPopupOpen({
      Id: "",
      isOpen: false,
    });
  };

  const AgreeButtonCheck = (user, success) => {
    console.log('user, success::', user, success)
    if (success) {
      setIsPopupOpen({
        Id: "",
        isOpen: false,
      });

      const userData = {
        IsRazorPayGateway: user?.user?.IsRazorPayGateway,
        IsHdfcPayGateway: user?.user?.IsHdfcPayGateway,
        AddBlankRateTypeWorkOrder: user?.user?.AddBlankRateTypeWorkOrder,
        MainCentreID: user?.user?.MainCentreID,
        CentreVsRateTypeatWorkOrder: user?.user?.CentreVsRateTypeatWorkOrder,
        SessionShowOnlineRemark: user?.user?.ShowOnlineRemark,
        SessionDoctorId: user?.user?.DoctorId,
        SessionInvoiceTo: user?.user?.InvoiceTo,
        SessionRateTypeID: user?.user?.RateTypeID,
        DefaultCurrencyName: user?.user?.DefaultCurrencyName,
        HideInvoiceBillingCycle: user?.user?.HideInvoiceBillingCycle,
        HideRePrintColorCode: user?.user?.HideRePrintColorCode,
        ShowAllCheckBarcodeOption: user?.user?.ShowAllCheckBarcodeOption,
        ShowRePrintTotal: user?.user?.ShowRePrintTotal,
        ShowPaymentGatewayLinkinTop: user?.user?.ShowPaymentGatewayLinkinTop,
        DefaultDateTypeResultEntry: user?.user?.DefaultDateTypeResultEntry,
        HidePRDM: user?.user?.HidePRDM,
        AllowTestAddWithOutAge: user?.user?.AllowTestAddWithOutAge,
        AllowRateTypeRefereshWorkOrder:
          user?.user?.AllowRateTypeRefereshWorkOrder,
        AllowLabReport_Manual_W: user?.user?.AllowLabReport_Manual_W,
        AllowReceipt_Manual_W: user?.user?.AllowReceipt_Manual_W,

        AllowLabReport_Manual_SMS: user?.user?.AllowLabReport_Manual_SMS,
        AllowReceipt_Manual_SMS: user?.user?.AllowReceipt_Manual_SMS,

        AllowLabReport_Manual_E: user?.user?.AllowLabReport_Manual_E,
        AllowReceipt_Manual_E: user?.user?.AllowReceipt_Manual_E,

        MenuDirection: user?.user?.MenuDirection,
        AllowEditRanges: user?.user?.AllowEditRanges,
        HideBirthday: user?.user?.HideBirthday,
        HideOutSourceColor: user?.user?.HideOutSourceColor,
        ReferedByDoctorDesignationID: user?.user?.ReferedByDoctorDesignationID,
        DesignationId: user.user.DesignationId ? user.user.DesignationId : 0,
        RemoveTestStatusLogic: user?.user?.RemoveTestStatusLogic,
        DefaultSearchTypeValue: user?.user?.DefaultSearchTypeValue,
        IsWebsiteLogin: user?.user?.IsWebsiteLogin,
        Website: user?.user?.Website,
        ShowBalanceAmount: user.user.ShowBalanceAmount,
        ImageGuid: user.user.ImageGuid,
        ModifyRegDate: user.user.ModifiedRegDate,
        Username: user.user.Username,
        DefaultCentre: user.user.DefaultCentreID,
        ShowDashboard: user.user.ShowDashboard,
        CompanyCode: user.user.CompanyCode,
        SkipMicLabEntry: user.user.SkipMicLabEntry,
        CompanyLogo: user.user.CompanyLogo,
        EmployeeID: user.user.EmployeeID,
        ImageLogo: user.user.LogoCompany,
        EmployeeImage: user.user.EmployeeImage ? user.user.EmployeeImage : "",

        CompanyName: user.user.CompanyName ? user.user.CompanyName : "",
        CompanyID: user.user.CompanyID ? user.user.CompanyID : "",
        Theme:
          user.user.Theme == "Default" ? "sky_blue_theme" : user.user.Theme,
        IsPoct: user.user.IsPoct ? user.user.IsPoct : 0,
        DesignationName: user.user.DesignationName
          ? user.user.DesignationName
          : "",
        SuperAdmin: user.user.SuperAdmin ? user.user.SuperAdmin : 0,
        OnAppGoToMainList: user.user.OnAppGoToMainList
          ? user.user.OnAppGoToMainList
          : 0,
        DefaultRole: user.user.DefaultRole ? user.user.DefaultRole : 0,
        IsRoleWise: user.user.IsRoleWise ? user.user.IsRoleWise : 0,
        IsCDAC: user.user.CDAC ? user.user.CDAC : 0,
        IsPatientWiseReporting: user.user.IsPatientWiseReporting
          ? user.user.IsPatientWiseReporting
          : 0,
        HideRate: user.user.HideRate ? user.user.HideRate : 0,
        AutoFillPaidAmount: user.user.AutoFillPaidAmount,
        TGLabobservationID: user.user.TGLabobservationID ? user.user.TGLabobservationID : "",
        LDLLabobservationID: user.user.LDLLabobservationID ? user.user.LDLLabobservationID : "",
        VLDLLabobservationID: user.user.VLDLLabobservationID ? user.user.VLDLLabobservationID : "",
        DefaultDocotorOnWorkorder: user.user.DefaultDocotorOnWorkorder ? user.user.DefaultDocotorOnWorkorder : "",
        AddBlankRateTypeWorkOrder: user.user.AddBlankRateTypeWorkOrder ? user.user.AddBlankRateTypeWorkOrder : "",
      };

      useLocalStorage("submenu", "set", user?.user?.MenuDirection);
      useLocalStorage("theme", "set", userData?.Theme);
      useLocalStorage("userData", "set", userData);
      useLocalStorage("accessRight", "set", user?.user?.AccessRight);
      useLocalStorage(
        "BarocdeNoMaxLength",
        "set",
        user?.user?.BarocdeNoMaxLength
      );
      useLocalStorage("DefaultCentre", "set", user.user.DefaultCentreID);
      useLocalStorage(
        "language",
        "set",
        user.user.EmpLanguageCode ? user.user.EmpLanguageCode : "en"
      );
      i18n.changeLanguage(
        user.user.EmpLanguageCode ? user.user.EmpLanguageCode : "en"
      );
      useLocalStorage("token", "set", user.token);
      setWindowClass(`hold-transition login-page ${userData?.Theme}`);
      user.user.ShowDashboard == 1
        ? navigate("/dashboard")
        : navigate("/Welcome");
    }
  };

  const validate = () => {
    let errorMessage = "";
    if (!isRightPanelActive) {
      if (!credentials?.username?.trim() && !credentials?.password?.trim()) {
        errorMessage = "Username and Password are required";
      } else {
        if (!credentials?.username?.trim()) {
          errorMessage = "Username is required";
        }
        if (!credentials?.password?.trim()) {
          errorMessage = "Password is required";
        }
      }
    }

    if (isRightPanelActive && !isForgot) {
      if (!credentials?.UserName?.trim() && !credentials?.Mobile?.trim()) {
        errorMessage = "Username and Registered Mobile Number are required";
      } else {
        if (!credentials?.UserName?.trim()) {
          errorMessage = "Username is required";
        }
        if (!credentials?.Mobile?.trim()) {
          errorMessage += errorMessage
            ? " and Registered Mobile Number are required"
            : "Registered Mobile Number is required";
        }
      }
    }

    if (isRightPanelActive && isForgot) {
      if (!String(credentials?.OTP)?.trim()) {
        errorMessage = "OTP is required";
      }
      if (!String(credentials?.Password)?.trim()) {
        errorMessage += errorMessage
          ? " and Password is required"
          : "Password is required";
      }
      if (!String(credentials?.ConfirmPassword)?.trim()) {
        errorMessage += errorMessage
          ? " and Confirm Password is required"
          : "Confirm Password is required";
      }
      if (
        credentials?.Password?.trim() &&
        credentials.Password !== credentials.ConfirmPassword
      ) {
        errorMessage += errorMessage
          ? " and Confirm Password does not match Password"
          : "Confirm Password does not match Password";
      }
    }

    if (errorMessage) {
      toast.error(errorMessage);
      return false;
    }
    return true;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "UserName" || name === "username") {
      setCredentials({
        ...credentials,
        UserName: value,
        username: value,
      });
    } else {
      setCredentials({
        ...credentials,
        [name]: value,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      dispatch(
        signInAction({
          username: credentials.username,
          password: credentials.password,
          ipaddress: ip,
        })
      );
    }
  };

  const handleForget = (e) => {
    e.preventDefault();
    if (validate()) {
      setLoad(true);
      axiosInstance
        .post("ForgetPasswordController/ForgetPassword", {
          UserName: credentials?.UserName,
          Mobile: credentials?.Mobile,
        })
        .then((res) => {
          if (res.data?.success) {
            toast.success(res.data?.message);
            setIsForgot(true);
          } else if (res.data?.message === "User not found.") {
            toast.error(res.data?.message);
          }
          setLoad(false);
        })
        .catch((err) => {
          setLoad(false);
          toast.error(
            err?.response?.data?.message
              ? err?.response?.data?.message
              : "Something Went Wrong"
          );
        });
    }
  };

  const handleReset = (e) => {
    e.preventDefault();
    if (validate()) {
      axiosInstance
        .post("ForgetPasswordController/ResetPassword", {
          UserName: credentials?.UserName,
          Mobile: credentials?.Mobile,
          OTP: credentials?.OTP,
          Password: credentials?.Password,
          ConfirmPassword: credentials?.ConfirmPassword,
        })
        .then((res) => {
          if (res.data?.success) {
            setRightPanelActive(false);
            toast.success(res.data?.message);
          } else {
            toast.error(res.data?.message);
          }
        })
        .catch((error) => {
          toast.error(error.message || "An error occurred.");
        });
    }
  };

  return {
    credentials,
    handleChange,
    handleSubmit,
    handleForget,
    handleReset,
    isRightPanelActive,
    setRightPanelActive,
    isForgot,
    setIsForgot,
    isPopupOpen,
    closeAgreeDialog,
    AgreeButtonCheck,
    loading: load,
    validate,
  };
};
