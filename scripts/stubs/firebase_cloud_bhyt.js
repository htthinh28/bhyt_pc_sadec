const okResult = Object.freeze({ ok: true, skipped: true, source: 'claim-audit-cli-stub' });

export const hydrateDvktTableFromFirebase = async () => [];
export const syncDvktTablesToFirebase = async () => okResult;
export const taiKetQuaGiamDinhLenFirebase = async () => okResult;
export const capNhatMetaDatasetCucBoTheoRows = async () => okResult;
export const layMetaDatasetCucBo = async () => ({ ok: true, exists: false, source: 'claim-audit-cli-stub' });
export const layMetaDatasetFirebase = async () => ({ ok: true, exists: false, source: 'claim-audit-cli-stub' });

export default {
  hydrateDvktTableFromFirebase,
  syncDvktTablesToFirebase,
  taiKetQuaGiamDinhLenFirebase,
  capNhatMetaDatasetCucBoTheoRows,
  layMetaDatasetCucBo,
  layMetaDatasetFirebase,
};
