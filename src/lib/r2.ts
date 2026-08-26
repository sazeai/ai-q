import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3"

export const R2_PUBLIC_DOMAIN =
  import.meta.env.R2_PUBLIC_URL ||
  process.env.R2_PUBLIC_URL ||
  "https://pub-554b6178bcfb4c0b8facf2f1ae88f4c8.r2.dev"

export const R2_BUCKET_NAME =
  import.meta.env.R2_BUCKET_NAME ||
  process.env.R2_BUCKET_NAME ||
  "ai-q"

let s3Client: S3Client | null = null

export function getR2Client(): S3Client {
  if (!s3Client) {
    const accountId =
      import.meta.env.R2_ACCOUNT_ID || process.env.R2_ACCOUNT_ID || ""
    const accessKeyId =
      import.meta.env.R2_ACCESS_KEY_ID || process.env.R2_ACCESS_KEY_ID || ""
    const secretAccessKey =
      import.meta.env.R2_SECRET_ACCESS_KEY ||
      process.env.R2_SECRET_ACCESS_KEY ||
      ""

    s3Client = new S3Client({
      region: "auto",
      endpoint: accountId
        ? `https://${accountId}.r2.cloudflarestorage.com`
        : undefined,
      credentials: {
        accessKeyId,
        secretAccessKey,
      },
    })
  }
  return s3Client
}

export async function uploadToR2({
  buffer,
  filename,
  contentType = "image/jpeg",
  folder = "prompts",
}: {
  buffer: Uint8Array | Buffer
  filename: string
  contentType?: string
  folder?: string
}): Promise<{ key: string; url: string }> {
  // Sanitize filename and create clean key
  const cleanName = filename.toLowerCase().replace(/[^a-z0-9.-]/g, "-")
  const timestamp = Date.now()
  const key = `${folder}/${timestamp}-${cleanName}`

  const client = getR2Client()
  const command = new PutObjectCommand({
    Bucket: R2_BUCKET_NAME,
    Key: key,
    Body: buffer,
    ContentType: contentType,
  })

  await client.send(command)

  const publicUrl = `${R2_PUBLIC_DOMAIN.replace(/\/$/, "")}/${key}`
  return { key, url: publicUrl }
}
