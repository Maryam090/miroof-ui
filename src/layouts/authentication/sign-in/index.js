import { useState } from "react";

// react-router-dom components
import { Link } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";
import Checkbox from "@mui/material/Checkbox";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftInput from "components/SoftInput";
import SoftButton from "components/SoftButton";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import { postData } from "../../../api";
import { SIGN_IN } from "../../../constants";

// Authentication layout components
import BasicLayout from "layouts/authentication/components/BasicLayout";
import Separator from "layouts/authentication/components/Separator";

// Images
import curved6 from "assets/images/curved-images/curved14.jpg";
import logo from "assets/images/logos/transparentlogo-1.png";

function SignIn() {
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setError] = useState(false);
  const [message, setMessage] = useState("");


  const handleLogin = async () => {
    setIsLoading(true);
    try {
      const {message, isError} = await postData(SIGN_IN, { username: "solar", password: "123" });
        setMessage(message);
        setError(isError);
        console.log("response", message);
        setIsLoading(false);
    } catch (e) {
      console.log("ee", e);
    }
  };
  return (
    <BasicLayout title="Sign In!" description="Login in your project." image={curved6}>
      <Card className="rounded-10">
        <SoftBox pt={2} textAlign="center">
          <SoftBox component="img" src={logo} alt="master card" width="auto" height="130px" />
          <Separator />
        </SoftBox>
        <SoftBox pt={2} pb={3} px={3}>
          {hasError && !isLoading && (
            <Stack sx={{ width: "100%" }} spacing={2} pb={3}>
              <Alert severity="error" variant="outlined" size="md">{message}</Alert>
            </Stack>
          )}
          <SoftBox component="form" role="form">
            <h1 className="test">HELLO</h1>
            <SoftBox mb={2}>
              <SoftInput placeholder="Username" />
            </SoftBox>
            <SoftBox mb={2}>
              <SoftInput type="password" placeholder="Password" />
            </SoftBox>
            <SoftBox mt={4} mb={1}>
              <SoftButton
                variant="gradient"
                color="dark"
                disabled={isLoading}
                fullWidth
                onClick={handleLogin}
              >
                {isLoading ? "Sign in..." : "Sign in"}
              </SoftButton>
            </SoftBox>
          </SoftBox>
        </SoftBox>
      </Card>
    </BasicLayout>
  );
}
export default SignIn;