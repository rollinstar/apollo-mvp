export function util_uuidToBase64(uuid: string): string {
  const hex = uuid.replaceAll('-', '');
  const buffer = Buffer.from(hex, 'hex');
  return buffer.toString('base64');
}
