const ASCII_MAP: Record<string, string> = {
  '₹': 'Rs ',
  '–': '-',
  '—': '-',
  '’': "'",
  '‘': "'",
  '“': '"',
  '”': '"',
  '×': 'x',
  '→': '->',
  '·': '-',
  '…': '...',
}

function toAscii(text: string): string {
  return text.replace(/[^\x20-\x7e]/g, (ch) => ASCII_MAP[ch] ?? '?')
}

function escapePdf(text: string): string {
  return toAscii(text).replace(/\\/g, '\\\\').replace(/\(/g, '\\(').replace(/\)/g, '\\)')
}

export function wrapText(text: string, width = 82): string[] {
  const lines: string[] = []
  let current = ''
  for (const word of text.split(' ')) {
    if ((current + ' ' + word).trim().length > width) {
      if (current.trim()) lines.push(current.trim())
      current = word
    } else {
      current += ' ' + word
    }
  }
  if (current.trim()) lines.push(current.trim())
  return lines
}

/** Builds a minimal, valid single-page A4 PDF with a title and body lines. */
export function buildPdfBlob(title: string, lines: string[]): Blob {
  const body = lines.slice(0, 40)
  const content = [
    `BT /F2 20 Tf 56 790 Td (${escapePdf(title)}) Tj ET`,
    `BT /F1 12 Tf 56 764 Td (LocoTrails - Trip Guidebook) Tj ET`,
    ...body.map((line, i) => `BT /F1 12 Tf 56 ${736 - i * 18} Td (${escapePdf(line)}) Tj ET`),
  ].join('\n')

  const objects = [
    '<< /Type /Catalog /Pages 2 0 R >>',
    '<< /Type /Pages /Kids [3 0 R] /Count 1 >>',
    '<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] /Resources << /Font << /F1 5 0 R /F2 6 0 R >> >> /Contents 4 0 R >>',
    `<< /Length ${content.length} >>\nstream\n${content}\nendstream`,
    '<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>',
    '<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>',
  ]

  let pdf = '%PDF-1.4\n'
  const offsets: number[] = []
  objects.forEach((object, index) => {
    offsets.push(pdf.length)
    pdf += `${index + 1} 0 obj\n${object}\nendobj\n`
  })

  const xrefStart = pdf.length
  pdf += `xref\n0 ${objects.length + 1}\n0000000000 65535 f \n`
  for (const offset of offsets) {
    pdf += `${String(offset).padStart(10, '0')} 00000 n \n`
  }
  pdf += `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xrefStart}\n%%EOF`

  return new Blob([pdf], { type: 'application/pdf' })
}

export function downloadPdf(filename: string, title: string, lines: string[]): void {
  const url = URL.createObjectURL(buildPdfBlob(title, lines))
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  document.body.appendChild(link)
  link.click()
  link.remove()
  URL.revokeObjectURL(url)
}
