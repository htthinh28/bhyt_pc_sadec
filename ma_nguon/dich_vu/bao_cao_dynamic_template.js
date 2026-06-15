/**
 * Dynamic Report Template — SPEC-BC-DYN-V2.0 (khung tối thiểu theo CDSS-BHYT-DATA-SPEC-V2.0).
 * Mô tả widget cấp khai báo; Hub + export có thể đọc song song hien_thi_bao_cao (SPEC-VIZ).
 */

export const PHIEN_BAN_DAC_TA_DYNAMIC = 'SPEC-BC-DYN-V2.0';

/** Mẫu mặc định gắn payload — không thay thế tổng hợp M5/M6/M7/M8, chỉ bổ sung metadata cấu hình. */
export const taoTemplateMacDinhBaoCaoHub = () => ({
  reportId: 'CDSS_BI_HUB_DEFAULT',
  title: 'Trung tâm báo cáo CDSS-BHYT',
  category: 'ALL',
  version: '1.0',
  phien_ban: PHIEN_BAN_DAC_TA_DYNAMIC,
  theme: 'clinical_slate_plus_accent',
  rbac: { view: ['BS', 'QL', 'ADMIN', 'KE_TOAN'], edit: ['QL', 'ADMIN'], khoa: ['*'] },
  widgets: [
    { id: 'w_exec_kpi', type: 'KpiTile', dataSource: 'tom_tat_tai_nguyen', title: 'Tóm tắt vận hành' },
    { id: 'w_cm00_heat', type: 'Heatmap', dataSource: 'bc_cm_00_khoa_nhom_loi', drillDownTo: 'w_cm_hs_list' },
    { id: 'w_dt01_rule', type: 'ParetoChart', dataSource: 'bc_dt_01_top_rule', drillDownTo: 'w_fact_canh_filtered' },
    { id: 'w_dt04_pareto', type: 'ParetoChart', dataSource: 'bc_dt_04_co_cau', title: 'Cơ cấu 80/20 (proxy XML1)' },
  ],
});
