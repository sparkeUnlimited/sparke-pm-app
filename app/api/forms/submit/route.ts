import { NextRequest, NextResponse } from "next/server";
import { DynamoDBClient, PutItemCommand } from "@aws-sdk/client-dynamodb";

const client = new DynamoDBClient({ region: "us-east-1" });

export async function POST(req: NextRequest) {
  const body = await req.json();

  const item = {
    PK: { S: `FORM#${body.formTitle}` },
    SK: { S: `SUBMIT#${body.submissionDate}` },
    Data: { S: JSON.stringify(body.sections) },
  };

  const command = new PutItemCommand({
    TableName: "EHSForms",
    Item: item,
  });

  try {
    await client.send(command);
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to write to DynamoDB" }, {
      status: 500,
    });
  }
}
