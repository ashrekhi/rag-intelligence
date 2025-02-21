import { NextApiRequest, NextApiResponse } from "next";
import { nanoid } from "nanoid";
import { s3Client } from "../../../lib/aws";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { triggerSageMakerRagIngestion } from "../../../lib/sagemakerIngestion";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    try {
      const bucketId = nanoid();

      // Note: In production, implement proper file parsing here
      const pdfBuffer = Buffer.from("Fake PDF data for example");

      const s3Key = `${bucketId}/document.pdf`;
      await s3Client.send(
        new PutObjectCommand({
          Bucket: process.env.S3_BUCKET_NAME,
          Key: s3Key,
          Body: pdfBuffer,
        })
      );

      await triggerSageMakerRagIngestion({ bucketId, s3Keys: [s3Key] });

      res.status(200).json({ bucketId });
    } catch (err: any) {
      console.error(err);
      res.status(500).json({ error: err.message });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}