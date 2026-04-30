import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { FACILITY_TYPE_LABELS } from "@/lib/inquiry-constants";

export default async function InquiriesPage() {
  const inquiries = await prisma.inquiry.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="w-full max-w-6xl mx-auto px-6 py-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">お問い合わせ一覧</h1>
      </div>

      {inquiries.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="border-b-2 border-gray-300">
                <th className="text-left py-3 px-2">受信日時</th>
                <th className="text-left py-3 px-2">施設名</th>
                <th className="text-left py-3 px-2">担当者名</th>
                <th className="text-left py-3 px-2">メール</th>
                <th className="text-left py-3 px-2">施設種類</th>
                <th className="text-left py-3 px-2">操作</th>
              </tr>
            </thead>
            <tbody>
              {inquiries.map((inquiry) => (
                <tr key={inquiry.id} className="border-b border-gray-200">
                  <td className="py-3 px-2">
                    {inquiry.createdAt.toLocaleDateString("ja-JP")}{" "}
                    {inquiry.createdAt.toLocaleTimeString("ja-JP", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </td>
                  <td className="py-3 px-2">{inquiry.facilityName}</td>
                  <td className="py-3 px-2">{inquiry.contactName}</td>
                  <td className="py-3 px-2">{inquiry.email}</td>
                  <td className="py-3 px-2">
                    {inquiry.facilityType
                      ? FACILITY_TYPE_LABELS[inquiry.facilityType] ?? inquiry.facilityType
                      : ""}
                  </td>
                  <td className="py-3 px-2">
                    <Link
                      href={`/inquiries/${inquiry.id}`}
                      className="text-blue-600 hover:underline"
                    >
                      詳細
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-gray-500">お問い合わせはまだありません。</p>
      )}
    </div>
  );
}
