import { Quiz } from '../types';

// Hermes'te atob/btoa her sürümde garanti olmadığı için kendi base64'ümüzü kullanıyoruz.
// URL-safe alfabe: kod WhatsApp/Instagram'a yapıştırıldığında bozulmaz.
const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_';

function utf8Encode(str: string): number[] {
  const bytes: number[] = [];
  for (const ch of str) {
    const code = ch.codePointAt(0)!;
    if (code < 0x80) {
      bytes.push(code);
    } else if (code < 0x800) {
      bytes.push(0xc0 | (code >> 6), 0x80 | (code & 0x3f));
    } else if (code < 0x10000) {
      bytes.push(0xe0 | (code >> 12), 0x80 | ((code >> 6) & 0x3f), 0x80 | (code & 0x3f));
    } else {
      bytes.push(
        0xf0 | (code >> 18),
        0x80 | ((code >> 12) & 0x3f),
        0x80 | ((code >> 6) & 0x3f),
        0x80 | (code & 0x3f)
      );
    }
  }
  return bytes;
}

function utf8Decode(bytes: number[]): string {
  let out = '';
  let i = 0;
  while (i < bytes.length) {
    const b = bytes[i];
    let code: number;
    if (b < 0x80) {
      code = b;
      i += 1;
    } else if (b < 0xe0) {
      code = ((b & 0x1f) << 6) | (bytes[i + 1] & 0x3f);
      i += 2;
    } else if (b < 0xf0) {
      code = ((b & 0x0f) << 12) | ((bytes[i + 1] & 0x3f) << 6) | (bytes[i + 2] & 0x3f);
      i += 3;
    } else {
      code =
        ((b & 0x07) << 18) |
        ((bytes[i + 1] & 0x3f) << 12) |
        ((bytes[i + 2] & 0x3f) << 6) |
        (bytes[i + 3] & 0x3f);
      i += 4;
    }
    out += String.fromCodePoint(code);
  }
  return out;
}

function base64Encode(bytes: number[]): string {
  let out = '';
  for (let i = 0; i < bytes.length; i += 3) {
    const b0 = bytes[i];
    const b1 = bytes[i + 1];
    const b2 = bytes[i + 2];
    out += ALPHABET[b0 >> 2];
    out += ALPHABET[((b0 & 0x03) << 4) | ((b1 ?? 0) >> 4)];
    out += b1 === undefined ? '' : ALPHABET[((b1 & 0x0f) << 2) | ((b2 ?? 0) >> 6)];
    out += b2 === undefined ? '' : ALPHABET[b2 & 0x3f];
  }
  return out;
}

function base64Decode(str: string): number[] {
  const bytes: number[] = [];
  for (let i = 0; i < str.length; i += 4) {
    const c0 = ALPHABET.indexOf(str[i]);
    const c1 = ALPHABET.indexOf(str[i + 1]);
    const c2 = str[i + 2] !== undefined ? ALPHABET.indexOf(str[i + 2]) : -1;
    const c3 = str[i + 3] !== undefined ? ALPHABET.indexOf(str[i + 3]) : -1;
    if (c0 < 0 || c1 < 0) throw new Error('invalid code');
    bytes.push((c0 << 2) | (c1 >> 4));
    if (c2 >= 0) bytes.push(((c1 & 0x0f) << 4) | (c2 >> 2));
    if (c3 >= 0) bytes.push(((c2 & 0x03) << 6) | c3);
  }
  return bytes;
}

export function encodeQuiz(quiz: Quiz): string {
  return base64Encode(utf8Encode(JSON.stringify(quiz)));
}

/**
 * Kullanıcı girdisinden ham test kodunu çıkarır. Şunların hepsini kabul eder:
 *  - düz kod: "eyJ2Ijox..."
 *  - tam link: "https://heartprint.app/?q=eyJ2Ijox..."
 *  - deep link: "heartprint://quiz?q=eyJ2Ijox..."
 *  - "#q=..." fragment biçimi
 */
export function extractCode(input: string): string {
  const s = input.trim();
  const m = s.match(/[?#&]q=([^&\s]+)/);
  if (m) {
    try {
      return decodeURIComponent(m[1]);
    } catch {
      return m[1];
    }
  }
  return s;
}

/** Geçersiz/bozuk kodda null döner — UI hata mesajı gösterir. */
export function decodeQuiz(code: string): Quiz | null {
  try {
    const cleaned = code.trim().replace(/\s+/g, '');
    const parsed = JSON.parse(utf8Decode(base64Decode(cleaned)));
    if (
      parsed?.v !== 1 ||
      typeof parsed.cat !== 'string' ||
      typeof parsed.name !== 'string' ||
      !Array.isArray(parsed.answers) ||
      parsed.answers.some((a: unknown) => typeof a !== 'number')
    ) {
      return null;
    }
    return parsed as Quiz;
  } catch {
    return null;
  }
}
