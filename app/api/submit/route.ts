import { NextResponse } from 'next/server';
import { google } from 'googleapis';

type Answers = Record<string, string>;

function getJwtClient() {
  const clientEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL!;
  const privateKey = process.env.GOOGLE_PRIVATE_KEY!.replace(/\\n/g, '\n');

  return new google.auth.JWT({
    email: clientEmail,
    key: privateKey,
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });
}

// mapping kolom: pastikan urutan sama dengan header di Google Sheet
const COLUMNS = [
  'Timestamp',       // A
  'Nama Lengkap',    // B
  'Nomor Telepon',   // C
  'Status CG',       // D
  'Tempat Tinggal',  // E
  'Tempat Kuliah',   // F
  'Nomor CG',        // G
] as const;

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const answers: Answers = body?.answers ?? {};

    const phone = answers['Nomor Telepon'] ? `'${answers['Nomor Telepon']}` : '';

    // Susun row sesuai urutan COLUMNS
    const timestamp = new Date().toISOString();
    const row = [
      timestamp,
      answers['Nama Lengkap'] || '',
      phone || '',
      answers['Status CG'] || '',
      answers['Tempat Tinggal'] || '',
      answers['Tempat Kuliah'] || '',
      answers['Nomor CG'] || '',
    ];

    const auth = getJwtClient();
    const sheets = google.sheets({ version: 'v4', auth });

    const spreadsheetId = process.env.GOOGLE_SHEETS_ID!;
    const sheetName = process.env.GOOGLE_SHEET_NAME || 'Sheet1';
    const range = `${sheetName}!A:G`;

    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range,
      valueInputOption: 'USER_ENTERED',
      insertDataOption: 'INSERT_ROWS',
      requestBody: {
        values: [row],
      },
    });

    return NextResponse.json({ ok: true });
  } catch (err: any) {
    console.error('Submit error:', err?.message || err);
    return NextResponse.json({ ok: false, error: String(err?.message || err) }, { status: 500 });
  }
}
