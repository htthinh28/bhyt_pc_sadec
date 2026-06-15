/**
 * Bảng dữ liệu báo cáo — căn theo khổ vùng hiển thị: tự dãn cột (flex) khi đủ rộng, cuộn ngang khi hẹp; dòng tối thiểu cân đối.
 */
import { useMemo, useState } from 'react';
import { Platform, ScrollView, StyleSheet, Text, View } from 'react-native';

const MIN_COL = 84;
const ROW_MIN = 56;

const fmtCell = (v) => {
  if (v === null || v === undefined) return '';
  if (typeof v === 'boolean') return v ? 'có' : 'không';
  if (typeof v === 'object') return JSON.stringify(v);
  return String(v);
};

const tongMinW = (columns) =>
  (columns || []).reduce((s, c) => s + Math.max(MIN_COL, Number(c.width) || 88), 0);

const trongSoCot = (columns) =>
  (columns || []).map((c) => Math.max(MIN_COL, Number(c.width) || 88));

export default function BangMoHinhMuc5({
  title,
  subtitle,
  columns,
  rows,
  maxRows = 40,
  /** Tiền tố ổn định cho key dòng (tránh trùng ma_lk giữa các bảng) */
  stableKeyPrefix,
}) {
  const cols = Array.isArray(columns) ? columns : [];
  const slice = Array.isArray(rows) ? rows.slice(0, maxRows) : [];
  const conLai = Array.isArray(rows) && rows.length > maxRows ? rows.length - maxRows : 0;
  const keyPre = String(stableKeyPrefix || title || 'row').slice(0, 40);

  const [viewportW, setViewportW] = useState(0);
  const totalMin = useMemo(() => tongMinW(cols), [cols]);
  const wts = useMemo(() => trongSoCot(cols), [cols]);
  const stretch = viewportW > 12 && totalMin > 0 && totalMin <= viewportW;

  const onViewportLayout = (e) => {
    const nw = Math.round(e.nativeEvent.layout.width);
    if (nw > 0 && Math.abs(nw - viewportW) > 0.5) setViewportW(nw);
  };

  const headRow = (
    <View style={[styles.rowHead, stretch && styles.rowFull]}>
      {cols.map((col, ci) => (
        <View
          key={col.key}
          style={[
            styles.cellHead,
            stretch
              ? { flex: wts[ci], minWidth: MIN_COL, flexShrink: 1 }
              : { minWidth: Math.max(MIN_COL, col.width || 88) },
          ]}
        >
          <Text style={styles.cellHeadTxt}>
            {col.label}
          </Text>
        </View>
      ))}
    </View>
  );

  const bodyRows = slice.map((row, ri) => (
    <View
      key={String(row.id_dong || row.id_canh_bao || row.ma_lk || `${keyPre}-${ri}`)}
      style={[styles.row, stretch && styles.rowFull, ri % 2 === 1 && styles.rowAlt]}
    >
      {cols.map((col, ci) => (
        <View
          key={`${ri}-${col.key}`}
          style={[
            styles.cell,
            stretch
              ? { flex: wts[ci], minWidth: MIN_COL, flexShrink: 1 }
              : { minWidth: Math.max(MIN_COL, col.width || 88) },
          ]}
        >
          <Text style={styles.cellTxt}>
            {fmtCell(row[col.key])}
          </Text>
        </View>
      ))}
    </View>
  ));

  const tableInner =
    cols.length > 0 ? (
      <View style={[styles.tableShell, stretch && styles.tableShellFull]}>
        {headRow}
        {bodyRows}
      </View>
    ) : (
      <View style={styles.tableShell}>
        <Text style={styles.note}>Chưa khai báo cột hiển thị.</Text>
      </View>
    );

  return (
    <View style={styles.wrap}>
      <View style={styles.accentBar} />
      <View style={styles.inner}>
        <Text style={styles.title}>{title}</Text>
        {subtitle ? <Text style={styles.sub}>{subtitle}</Text> : null}
        <View style={styles.tableViewport} onLayout={onViewportLayout}>
          {stretch ? (
            tableInner
          ) : (
            <ScrollView horizontal showsHorizontalScrollIndicator nestedScrollEnabled>
              {tableInner}
            </ScrollView>
          )}
        </View>
        {conLai > 0 ? (
          <Text style={styles.note}>
            Hiển thị {maxRows}/{rows.length} dòng — dùng Xuất Excel để lấy đủ dữ liệu.
          </Text>
        ) : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    width: '100%',
    maxWidth: '100%',
    alignSelf: 'stretch',
    marginBottom: 18,
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: 'rgba(255,255,255,0.92)',
    borderWidth: 1,
    borderColor: 'rgba(148,163,184,0.35)',
    ...Platform.select({
      web: {
        boxShadow: '0 8px 30px rgba(15,23,42,0.08)',
      },
      default: {
        shadowColor: '#0f172a',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.08,
        shadowRadius: 14,
        elevation: 3,
      },
    }),
  },
  accentBar: {
    height: 4,
    width: '100%',
    backgroundColor: '#2563eb',
  },
  inner: {
    width: '100%',
    paddingHorizontal: 12,
    paddingTop: 12,
    paddingBottom: 12,
    alignItems: 'stretch',
  },
  title: {
    fontFamily: 'Arial',
    fontSize: 15,
    fontWeight: '700',
    color: '#0f172a',
    letterSpacing: 0.2,
    marginBottom: 4,
  },
  sub: {
    fontFamily: 'Arial',
    fontSize: 12,
    color: '#64748b',
    marginBottom: 12,
    lineHeight: 18,
  },
  tableViewport: {
    width: '100%',
    alignSelf: 'center',
    maxWidth: '100%',
  },
  tableShell: {
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    alignSelf: 'flex-start',
  },
  tableShellFull: {
    width: '100%',
    alignSelf: 'stretch',
  },
  rowHead: {
    flexDirection: 'row',
    backgroundColor: '#1e3a8a',
  },
  rowFull: {
    width: '100%',
    alignSelf: 'stretch',
  },
  row: {
    flexDirection: 'row',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#e2e8f0',
    backgroundColor: '#ffffff',
    minHeight: ROW_MIN,
    alignItems: 'stretch',
  },
  rowAlt: {
    backgroundColor: '#f8fafc',
  },
  cellHead: {
    paddingVertical: 13,
    paddingHorizontal: 12,
    justifyContent: 'flex-start',
    borderRightWidth: StyleSheet.hairlineWidth,
    borderRightColor: 'rgba(255,255,255,0.15)',
    minHeight: ROW_MIN,
  },
  cellHeadTxt: {
    fontFamily: 'Arial',
    fontSize: 12,
    fontWeight: '700',
    color: '#f1f5f9',
    lineHeight: 18,
  },
  cell: {
    paddingVertical: 12,
    paddingHorizontal: 12,
    justifyContent: 'flex-start',
    borderRightWidth: StyleSheet.hairlineWidth,
    borderRightColor: '#f1f5f9',
    minHeight: ROW_MIN,
  },
  cellTxt: {
    fontFamily: 'Arial',
    fontSize: 12,
    color: '#334155',
    lineHeight: 18,
  },
  note: {
    fontFamily: 'Arial',
    fontSize: 12,
    color: '#64748b',
    marginTop: 10,
    fontStyle: 'italic',
  },
});
