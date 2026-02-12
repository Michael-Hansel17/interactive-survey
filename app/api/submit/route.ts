import { NextResponse } from "next/server";
import { google } from "googleapis";

function getJwtClient() {
    const clientEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
    const privateKey = process.env.GOOGLE_PRIVATE_KEY
        ? process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n")
        : undefined;

    if (!clientEmail || !privateKey) {
        throw new Error("Missing Google Credentials in .env");
    }

    return new google.auth.JWT({
        email: clientEmail,
        key: privateKey,
        scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });
}

export async function POST(req: Request) {
    try {
        // Frontend mengirim JSON berisi object answers langsung: { namaLengkap: "...", ... }
        const answers = await req.json();

        // Format Nomor Telepon (tambah kutip satu ' agar tidak dianggap rumus oleh Excel/Sheets)
        const phone = answers["nomorTelepon"]
            ? `'${answers["nomorTelepon"]}`
            : "";

        const timestamp = new Date().toLocaleString("id-ID", { timeZone: "Asia/Jakarta" });
        
        // Mapping Data: Urutan ini HARUS SAMA dengan urutan kolom di Google Sheet nanti
        const row = [
            timestamp,
            answers["namaLengkap"] || "-",
            phone,
            answers["statusCG"] || "-",
            answers["tempatTinggal"] || "-",
            answers["tempatKuliah"] || "-", // Ini akan berisi "UMN", "Pradita", dll.
            answers["nomorCG"] || "-",
        ];

        const auth = getJwtClient();
        const sheets = google.sheets({ version: "v4", auth });

        const spreadsheetId = process.env.GOOGLE_SHEETS_ID;
        const sheetName = process.env.GOOGLE_SHEET_NAME || "Sheet1";
        
        // Range A:G artinya kita mengisi kolom A sampai G
        const range = `${sheetName}!A:G`;

        await sheets.spreadsheets.values.append({
            spreadsheetId,
            range,
            valueInputOption: "USER_ENTERED",
            insertDataOption: "INSERT_ROWS",
            requestBody: {
                values: [row],
            },
        });

        return NextResponse.json({ ok: true });
    } catch (err: any) {
        console.error("Submit error:", err?.message || err);
        return NextResponse.json(
            { ok: false, error: String(err?.message || err) },
            { status: 500 }
        );
    }
}