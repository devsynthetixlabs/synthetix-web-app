import apiClient from "./request";

export const authLoginAPI = async ({ email, password }: { email: string, password: string }) => {
  const body = {
    email,
    password
  };
  try {
    const res = await apiClient.post(`/auth/login`, body);
    return res
  } catch (error) {
    console.error("Error login api", { error });
    return null;
  }
};

export const authSignUpAPI = async ({ email, password, firstName, lastName }: { email: string, password: string; firstName: string; lastName: string }) => {
  const body = {
    email,
    password,
    first_name: firstName,
    last_name: lastName,
    tenant_id: 'synthetix_admin_internal',
  };
  try {
    const res = await apiClient.post(`/auth/signup`, body);
    return res
  } catch (error) {
    console.error("Error login api", { error });
    return null;
  }
};