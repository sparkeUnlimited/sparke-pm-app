export const sendMaterialEmailReport = async (materials?: any[]) => {
  console.log("Emailing material order summary...", materials);
};

export const sendEstimateEmail = async (data: any, pdf: Blob) => {
  console.log("Sending estimate email...", data, pdf);
};

export const ensureCustomerFolder = async (path: string) => {
  console.log("Ensuring folder exists:", path);
};
