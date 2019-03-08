const getLoginState = state => {
  const { loginState } = state.common;
  return loginState;
};

const getClientInfo = state => {
  const { clientInfo } = state.common;

  return clientInfo;
};

export default {
  getLoginState,
  getClientInfo
};
