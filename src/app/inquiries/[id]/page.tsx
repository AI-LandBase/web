import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { FACILITY_TYPE_LABELS, HAS_PC_LABELS } from "@/lib/inquiry-constants";

export default async function InquiryDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const numericId = Number(id);
  if (isNaN(numericId)) notFound();

  const inquiry = await prisma.inquiry.findUnique({
    where: { id: numericId },
  });

  if (!inquiry) notFound();

  return (
    <div className="w-full max-w-2xl mx-auto px-6 py-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">お問い合わせ詳細</h1>
        <Link href="/inquiries" className="text-blue-600 hover:underline">
          一覧に戻る
        </Link>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg p-6 space-y-4">
        <dl className="grid grid-cols-1 gap-4 text-sm">
          <div>
            <dt className="font-medium text-gray-500">受信日時</dt>
            <dd className="mt-1">
              {inquiry.createdAt.toLocaleDateString("ja-JP", {
                timeZone: "Asia/Tokyo",
              })}
              {" "}
              {inquiry.createdAt.toLocaleTimeString("ja-JP", {
                hour: "2-digit",
                minute: "2-digit",
                timeZone: "Asia/Tokyo",
              })}
            </dd>
          </div>

          <div>
            <dt className="font-medium text-gray-500">施設名</dt>
            <dd className="mt-1">{inquiry.facilityName}</dd>
          </div>

          <div>
            <dt className="font-medium text-gray-500">担当者名</dt>
            <dd className="mt-1">{inquiry.contactName}</dd>
          </div>

          <div>
            <dt className="font-medium text-gray-500">メールアドレス</dt>
            <dd className="mt-1">
              <a href={`mailto:${inquiry.email}`} className="text-blue-600 hover:underline">
                {inquiry.email}
              </a>
            </dd>
          </div>

          {inquiry.phone && (
            <div>
              <dt className="font-medium text-gray-500">電話番号</dt>
              <dd className="mt-1">{inquiry.phone}</dd>
            </div>
          )}

          {inquiry.facilityType && (
            <div>
              <dt className="font-medium text-gray-500">施設の種類</dt>
              <dd className="mt-1">
                {FACILITY_TYPE_LABELS[inquiry.facilityType] ?? inquiry.facilityType}
              </dd>
            </div>
          )}

          {inquiry.hasPc && (
            <div>
              <dt className="font-medium text-gray-500">PC保有状況</dt>
              <dd className="mt-1">
                {HAS_PC_LABELS[inquiry.hasPc] ?? inquiry.hasPc}
              </dd>
            </div>
          )}

          {inquiry.message && (
            <div>
              <dt className="font-medium text-gray-500">ご相談内容</dt>
              <dd className="mt-1 whitespace-pre-wrap">{inquiry.message}</dd>
            </div>
          )}
        </dl>
      </div>
    </div>
  );
}
