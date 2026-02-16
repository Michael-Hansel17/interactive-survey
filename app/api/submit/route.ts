import { NextResponse } from "next/server";
import { google } from "googleapis";
import { surveySchema } from "@/lib/validation";

const getJwtClient = () => {
  const clientEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const privateKey = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n");

  if (!clientEmail || !privateKey) {
    throw new Error(
      "Server Misconfiguration: Missing Google Credentials in .env",
    );
  }

  return new google.auth.JWT({
    email: clientEmail,
    key: privateKey,
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });
};

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const validationResult = surveySchema.safeParse(body);

    if (!validationResult.success) {
      return NextResponse.json(
        {
          ok: false,
          error: "Data tidak valid",
          details: validationResult.error.flatten().fieldErrors,
        },
        { status: 400 },
      );
    }

    const { data } = validationResult;

    const timestamp = new Date().toLocaleString("id-ID", {
      timeZone: "Asia/Jakarta",
    });

    const phone = data.nomorTelepon ? `'${data.nomorTelepon}` : "-";

    const row = [
      timestamp,
      data.namaLengkap,
      phone,
      data.statusCG,
      data.tempatTinggal || "-",
      data.tempatKuliah,
      data.nomorCG || "-",
      data.coach || "-",
    ];

    const auth = getJwtClient();
    const sheets = google.sheets({ version: "v4", auth });

    const spreadsheetId = process.env.GOOGLE_SHEETS_ID;
    const sheetName = process.env.GOOGLE_SHEET_NAME || "Sheet1";

    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: `${sheetName}!A:H`,
      valueInputOption: "USER_ENTERED",
      insertDataOption: "INSERT_ROWS",
      requestBody: {
        values: [row],
      },
    });

    return NextResponse.json({ ok: true });
  } catch (err: any) {
    console.error("[API Error] Submit Failed:", err);

    return NextResponse.json(
      { ok: false, error: "Terjadi kesalahan server. Silakan coba lagi." },
      { status: 500 },
    );
  }
}
