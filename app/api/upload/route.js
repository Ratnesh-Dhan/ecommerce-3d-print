import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/admin-auth";

const endpoint = process.env.B2_ENDPOINT?.trim();

const s3 = new S3Client({
  endpoint: endpoint && !/^https?:\/\//i.test(endpoint) ? `https://${endpoint}` : endpoint,
  credentials: {
    accessKeyId: process.env.B2_KEY_ID,
    secretAccessKey: process.env.B2_APPLICATION_KEY,
  },
  region: "us-east-005",
});

export async function POST(request) {
  if (!(await isAdmin(request.headers.get("cookie")))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const formData = await request.formData();
    const file = formData.get("file");
    if (!(file instanceof File) || !file.type.startsWith("image/")) {
      return NextResponse.json({ error: "Please select an image file." }, { status: 400 });
    }

    const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, "-");
    const key = `products/${Date.now()}-${safeName}`;
    await s3.send(new PutObjectCommand({
      Bucket: process.env.B2_BUCKET_NAME,
      Key: key,
      Body: Buffer.from(await file.arrayBuffer()),
      ContentType: file.type,
    }));

    const baseUrl = process.env.B2_PUBLIC_URL || `https://f005.backblazeb2.com/file/${process.env.B2_BUCKET_NAME}`;
    return NextResponse.json({ success: true, key, url: `${baseUrl}/${key}` });
  } catch (error) {
    console.error("B2 image upload error:", error);
    return NextResponse.json({ error: "Image upload failed." }, { status: 500 });
  }
}
