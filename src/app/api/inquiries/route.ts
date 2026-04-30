import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

const FACILITY_TYPES = [
  "minpaku",
  "simple_lodging",
  "ryokan",
  "hotel",
  "other",
];
const HAS_PC_OPTIONS = ["mac", "windows", "other_pc", "no"];

export async function POST(request: NextRequest) {
  const body = await request.json();
  const data = body.inquiry ?? body;

  const errors: string[] = [];

  if (!data.facility_name?.trim()) {
    errors.push("施設名を入力してください");
  }
  if (!data.contact_name?.trim()) {
    errors.push("お名前を入力してください");
  }
  if (!data.email?.trim()) {
    errors.push("メールアドレスを入力してください");
  } else if (!/^[^@\s]+@[^@\s]+$/.test(data.email)) {
    errors.push("メールアドレスの形式が正しくありません");
  }
  if (data.facility_type && !FACILITY_TYPES.includes(data.facility_type)) {
    errors.push("施設の種類が正しくありません");
  }
  if (data.has_pc && !HAS_PC_OPTIONS.includes(data.has_pc)) {
    errors.push("PC保有状況が正しくありません");
  }

  if (errors.length > 0) {
    return NextResponse.json({ errors }, { status: 422 });
  }

  const inquiry = await prisma.inquiry.create({
    data: {
      facilityName: data.facility_name.trim(),
      contactName: data.contact_name.trim(),
      email: data.email.trim(),
      phone: data.phone?.trim() || null,
      facilityType: data.facility_type || null,
      hasPc: data.has_pc || null,
      message: data.message?.trim() || null,
    },
  });

  return NextResponse.json(
    {
      message:
        "お問い合わせありがとうございます。内容を確認の上、ご連絡いたします。",
      id: inquiry.id,
    },
    { status: 201 }
  );
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}
