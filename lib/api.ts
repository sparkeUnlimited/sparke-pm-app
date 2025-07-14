import { NextRequest, NextResponse } from "next/server";

export const sendMaterialEmailReport = async (materials?: any[]) => {
  console.log("Emailing material order summary...", materials);
};

export const sendEstimateEmail = async (data: any, pdf: Blob) => {
  console.log("Sending estimate email...", data, pdf);
};

export const ensureCustomerFolder = async (path: string) => {
  console.log("Ensuring folder exists:", path);
};

export const submitEHSForm = async (data: any) => {
  const resp = await fetch("https://api.sparkeunlimited.ca/safety", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!resp.ok) {
    const message = await resp.text();
    throw new Error(`API request failed: ${resp.status} ${message}`);
  }

  return resp.json();
};