import { NextApiRequest, NextApiResponse } from "next";
import { querySageMakerRag } from "../../../../lib/sagemakerQuery";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    try {
      const { bucketId } = req.query;
      const { question } = req.body;

      if (!bucketId || typeof bucketId !== "string") {
        throw new Error("Invalid bucketId");
      }
      if (!question) {
        throw new Error("No question provided");
      }

      const endpointName = process.env.SAGEMAKER_RAG_ENDPOINT || "";
      if (!endpointName) {
        throw new Error("SAGEMAKER_RAG_ENDPOINT not configured");
      }

      const answer = await querySageMakerRag({
        bucketId,
        question,
        endpointName,
      });

      res.status(200).json({ answer });
    } catch (err: any) {
      console.error(err);
      res.status(500).json({ error: err.message });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}