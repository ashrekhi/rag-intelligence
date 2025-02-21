import { StartExecutionCommand, SFNClient } from "@aws-sdk/client-sfn";
const stepFunctionsClient = new SFNClient({ region: process.env.AWS_REGION });

interface TriggerIngestionParams {
  bucketId: string;
  s3Keys: string[];  // The S3 paths of the uploaded PDFs
}

export async function triggerSageMakerRagIngestion({
  bucketId,
  s3Keys,
}: TriggerIngestionParams): Promise<void> {
  const stateMachineArn = process.env.RAG_INGESTION_STATE_MACHINE_ARN;
  if (!stateMachineArn) {
    throw new Error("RAG_INGESTION_STATE_MACHINE_ARN not set");
  }

  const inputPayload = {
    bucketId,
    documents: s3Keys,
  };

  const command = new StartExecutionCommand({
    stateMachineArn,
    input: JSON.stringify(inputPayload),
  });

  await stepFunctionsClient.send(command);
}