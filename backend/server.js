import express from "express";
import AWS from "aws-sdk";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";

dotenv.config();

const app = express();

// ✅ Enable CORS for all origins (for development)
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Parse JSON bodies
app.use(express.json());

// Configure multer for file uploads
const upload = multer({ storage: multer.memoryStorage() });

const s3 = new AWS.S3({
  region: "ap-south-1",
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});

app.get("/get-upload-url", async (req, res) => {
  try {
    const filename = req.query.filename || req.query.fileName;
    const filetype = req.query.filetype || req.query.fileType || 'video/mp4';

    if (!filename) {
      return res.status(400).json({ error: "Missing filename parameter" });
    }

    const params = {
      Bucket: "video-input-nahul",
      Key: `uploads/${Date.now()}-${filename}`,
      Expires: 60,
      ContentType: filetype
    };

    const url = await s3.getSignedUrlPromise("putObject", params);
    console.log("Generated upload URL for:", params.Key);
    res.json({ url, key: params.Key });
  } catch (error) {
    console.error("Error generating upload URL:", error);
    res.status(500).json({ error: "Failed to generate upload URL" });
  }
});

const SUMMARY_BUCKET = "summary-output-nahul";

app.get("/get-summary", async (req, res) => {
  const rawKey = (req.query.key || req.query.filename || "").toString().trim();

  if (!rawKey) {
    return res.status(400).json({ error: "Missing filename or key query parameter" });
  }

  const pathParts = rawKey.split("/").filter(Boolean);
  const fileNameWithExt = pathParts[pathParts.length - 1] || rawKey;
  const dotIndex = fileNameWithExt.lastIndexOf(".");
  const nameWithoutExt = dotIndex !== -1 ? fileNameWithExt.substring(0, dotIndex) : fileNameWithExt;

  if (!nameWithoutExt) {
    return res.status(400).json({ error: "Invalid filename supplied" });
  }

  const timestampStripped = nameWithoutExt.replace(/^\d+-/, "");
  const transcriptStripped = timestampStripped.replace(/_transcript(_summary)?$/, "");
  const targetSuffix = `${transcriptStripped}_transcript_summary.txt`;

  const findSummaryObject = async () => {
    let continuationToken;
    let latestMatch = null;

    do {
      const response = await s3
        .listObjectsV2({
          Bucket: SUMMARY_BUCKET,
          ContinuationToken: continuationToken
        })
        .promise();

      const matches =
        response.Contents?.filter(
          (object) =>
            object.Key &&
            object.Key.endsWith(targetSuffix)
        ) || [];

      if (matches.length) {
        matches.forEach((object) => {
          if (
            !latestMatch ||
            new Date(object.LastModified) > new Date(latestMatch.LastModified)
          ) {
            latestMatch = object;
          }
        });
      }

      continuationToken = response.IsTruncated
        ? response.NextContinuationToken
        : undefined;
    } while (continuationToken && !latestMatch);

    return latestMatch;
  };

  try {
    const summaryObject = await findSummaryObject();

    if (!summaryObject?.Key) {
      return res.status(404).json({ error: "Summary not found for this file" });
    }

    const data = await s3
      .getObject({
        Bucket: SUMMARY_BUCKET,
        Key: summaryObject.Key
      })
      .promise();

    const summary = data.Body.toString("utf-8");
    res.json({ summary, key: summaryObject.Key });
  } catch (error) {
    console.error("Error retrieving summary from S3:", error);

    if (error.code === "NoSuchKey") {
      return res.status(404).json({ error: "Summary not found for this file" });
    }

    res.status(500).json({ error: "Failed to retrieve summary" });
  }
});

// ✅ NEW: Direct file upload endpoint
app.post("/upload-video", upload.single('video'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file provided" });
    }

    const originalFilename = req.file.originalname;
    const timestamp = Date.now();
    const key = `uploads/${timestamp}-${originalFilename}`;

    console.log(`Uploading file: ${originalFilename} to S3 as: ${key}`);

    const params = {
      Bucket: "video-input-nahul",
      Key: key,
      Body: req.file.buffer,
      ContentType: req.file.mimetype
    };

    await s3.upload(params).promise();
    
    console.log(`File uploaded successfully to S3: ${key}`);
    res.json({ 
      success: true,
      key: key,
      message: "File uploaded successfully"
    });
  } catch (error) {
    console.error("Error uploading file to S3:", error);
    res.status(500).json({ error: "Failed to upload file to S3" });
  }
});

app.listen(4000, () => console.log("Server running on port 4000")       );
