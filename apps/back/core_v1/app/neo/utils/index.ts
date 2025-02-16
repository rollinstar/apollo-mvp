export function util_uuidToBase64(uuid: string): string {
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  if (!uuidRegex.test(uuid)) throw new Error('Invalid UUID format');
  const hex = uuid.replaceAll('-', '');
  const buffer = Buffer.from(hex, 'hex');
  return buffer.toString('base64').slice(0, -2);
}
