import { 
  InvokeEndpointCommand, 
  InvokeEndpointCommandInput, 
  SageMakerRuntimeClient 
} from "@aws-sdk/client-sagemaker-runtime";

const sageMakerRuntime = new SageMakerRuntimeClient({ region: process.env.AWS_REGION });

interface QueryRagParams {
  bucketId: string;
  question: string;
  endpointName: string;
}

export async function querySageMakerRag({
  bucketId,
  question,
  endpointName,
}: QueryRagParams): Promise<string> {
  const payload = JSON.stringify({
    bucketId,
    question,
  });

  const commandInput: InvokeEndpointCommandInput = {
    EndpointName: endpointName,
    Body: Buffer.from(payload),
    ContentType: "application/json",
    Accept: "application/json",
  };

  const response = await sageMakerRuntime.send(new InvokeEndpointCommand(commandInput));
  if (!response.Body) {
    throw new Error("No response body from SageMaker endpoint");
  }

  const responseString = new TextDecoder("utf-8").decode(response.Body);
  const parsed = JSON.parse(responseString);

  return parsed.answer;
}