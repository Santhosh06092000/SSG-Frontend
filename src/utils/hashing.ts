export const encode = (data: any) => {
  try {
    return btoa(JSON.stringify(data));
  } catch (error) {
    return "";
  }
};

export const decode = (data: any) => {
  try {
    return JSON.parse(atob(data));
  } catch (error) {
    return null;
  }
};
