export const generateStdError = (error) => {
  const response = error.response;
  const status = response.status;
  const errorMessage = response.data.error;

  if (errorMessage) {
    throw new Error(errorMessage);
  }

  switch (status) {
    case 500: {
      throw new Error("Ошибка сервера. Перезагрузите страницу");
    }
  }
};
