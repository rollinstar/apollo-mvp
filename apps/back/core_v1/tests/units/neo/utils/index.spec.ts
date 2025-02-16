import { util_uuidToBase64 } from '@xcore/neo/utils';

describe('util_uuidToBase64', () => {
  it('converts UUID to base64 correctly', () => {
    const uuid1 = '123e4567-e89b-12d3-a456-426614174000';
    expect(util_uuidToBase64(uuid1)).toBe('Ej5FZ+ibEtOkVkJmFBdAAA');

    const uuid2 = '00000000-0000-0000-0000-000000000000';
    expect(util_uuidToBase64(uuid2)).toBe('AAAAAAAAAAAAAAAAAAAAAA');

    const uuid3 = 'ffffffff-ffff-ffff-ffff-ffffffffffff';
    expect(util_uuidToBase64(uuid3)).toBe('/////////////////////w');
  });

  it('throws error for invalid UUID format', () => {
    const invalidUuid = '123-456-789';
    expect(() => util_uuidToBase64(invalidUuid)).toThrow();

    const invalidHexUuid = 'xxxxx000-0000-0000-0000-000000000000';
    expect(() => util_uuidToBase64(invalidHexUuid)).toThrow();
  });
});
