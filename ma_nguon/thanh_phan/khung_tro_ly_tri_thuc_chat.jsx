/**
 * Khung trò chuyện trợ lý tri thức (RAG nội bộ) — dùng chung: màn hình đầy đủ hoặc cửa sổ popup.
 */
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { CD } from '../tien_ich/chu_de_giao_dien';
import { dieuHuongMoTabMoi } from '../tien_ich/dieu_huong_mo_tab_moi';
import { docVanBan, dungDoc } from '../tien_ich/giong_doc_tri_thuc';
import taiLieuManifest from '../tien_ich/tai_lieu_manifest.json';
import { layDanhSachTriThucTuGiamDinh } from '../tien_ich/tri_thuc_tu_giam_dinh';
import { chatPythonService } from '../dich_vu/python_service_api';
import { traLoiTroLyTriThuc } from '../tien_ich/tro_ly_tri_thuc_engine';

const GOI_Y_NHANH = [
  { label: 'THUOC_417', text: 'Vì sao hệ thống báo THUOC_417? Căn cứ trong thư viện / quy tắc luật đã tích hợp?' },
  { label: 'CK_41', text: 'Giải thích CK_41 (công khám lần 2) theo tài liệu và quy tắc trong hệ thống' },
  { label: 'Phác đồ / ICD', text: 'Phác đồ CDSS và gợi ý ICD trong mô-đun chuyên môn / thư viện' },
  { label: 'QĐ 4210 / XML', text: 'Cấu trúc XML QĐ 4210, 7464: tài liệu nào trong thư viện và danh mục nội bộ?' },
];

/** Inline **đậm** và `mã đường dẫn` trong một dòng (React Native Text). */
const VanBanInlineTroLy = ({ line, textStyle, codeStyle }) => {
  const parts = String(line || '').split(/(\*\*[^*]+\*\*|`[^`]+`)/g);
  return (
    <Text style={textStyle}>
      {parts.map((part, i) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          return (
            <Text key={i} style={{ fontWeight: '800', color: textStyle.color }}>
              {part.slice(2, -2)}
            </Text>
          );
        }
        if (part.startsWith('`') && part.endsWith('`')) {
          return (
            <Text key={i} style={codeStyle}>
              {part.slice(1, -1)}
            </Text>
          );
        }
        return <Text key={i}>{part}</Text>;
      })}
    </Text>
  );
};

/**
 * Hiển thị câu trả lời trợ lý: tiêu đề, trích dẫn, gạch ngang, gọn hơn Markdown thô trong <Text>.
 */
const VanBanTraLoiTroLy = ({ text }) => {
  const lines = useMemo(() => String(text || '').split('\n'), [text]);
  return (
    <View style={styles.vbt_root}>
      {lines.map((rawLine, idx) => {
        const key = `L${idx}`;
        const t = rawLine.trimEnd();
        const trim = t.trim();
        if (!trim) {
          return <View key={key} style={styles.vbt_spacer} />;
        }
        if (/^---+$/u.test(trim)) {
          return <View key={key} style={styles.vbt_hr} />;
        }
        if (/^#{3}\s+/u.test(t)) {
          return (
            <Text key={key} style={styles.vbt_h3}>
              {t.replace(/^#{3}\s+/, '').trim()}
            </Text>
          );
        }
        if (/^#{4}\s+/u.test(t)) {
          return (
            <Text key={key} style={styles.vbt_h4}>
              {t.replace(/^#{4}\s+/, '').trim()}
            </Text>
          );
        }
        if (/^>\s?/.test(t)) {
          return (
            <View key={key} style={styles.vbt_quote}>
              <Text style={styles.vbt_quote_txt}>{t.replace(/^>\s?/, '')}</Text>
            </View>
          );
        }
        if (/^\s*[-*]\s+/.test(t)) {
          return (
            <Text key={key} style={styles.vbt_li}>
              <Text style={styles.vbt_bullet}>• </Text>
              <VanBanInlineTroLy line={t.replace(/^\s*[-*]\s+/, '')} textStyle={styles.vbt_li_inner} codeStyle={styles.vbt_code_inline} />
            </Text>
          );
        }
        if (/^\d+\.\s/.test(trim)) {
          return (
            <Text key={key} style={styles.vbt_oli}>
              <VanBanInlineTroLy line={trim} textStyle={styles.vbt_oli_inner} codeStyle={styles.vbt_code_inline} />
            </Text>
          );
        }
        if (/^\*[^*\n].+\*$/u.test(trim) && trim.startsWith('*')) {
          return (
            <Text key={key} style={styles.vbt_aside}>
              {trim.slice(1, -1)}
            </Text>
          );
        }
        if (/^`[^`\n]+`$/u.test(trim)) {
          return (
            <Text key={key} style={styles.vbt_code_block} selectable>
              {trim.slice(1, -1)}
            </Text>
          );
        }
        return (
          <Text key={key} style={styles.vbt_p}>
            <VanBanInlineTroLy line={t} textStyle={styles.vbt_p} codeStyle={styles.vbt_code_inline} />
          </Text>
        );
      })}
    </View>
  );
};

const tomTatNguonTheoLoai = (nguon) => {
  const by = {};
  for (const n of nguon || []) {
    const loai = n.loai || 'Khác';
    const tit = (n.tieuDe || n.file || '').trim();
    if (!tit) continue;
    if (!by[loai]) by[loai] = [];
    if (by[loai].length < 2) by[loai].push(tit.length > 52 ? `${tit.slice(0, 50)}…` : tit);
  }
  const entries = Object.entries(by);
  const shownEntries = entries.slice(0, 6);
  const rows = shownEntries.map(([loai, arr]) => `${loai}: ${arr.join(' · ')}`);
  const shown = shownEntries.reduce((acc, [, arr]) => acc + arr.length, 0);
  const total = (nguon || []).filter((n) => (n.tieuDe || n.file || '').trim()).length;
  const parts = [];
  if (total > shown) parts.push(`+${total - shown} tham chiếu`);
  if (entries.length > 6) parts.push(`+${entries.length - 6} nhóm nguồn`);
  const more = parts.join(' · ');
  return { rows, more };
};

const DongNguonTroLy = ({ nguon }) => {
  const { rows, more } = useMemo(() => tomTatNguonTheoLoai(nguon), [nguon]);
  if (!nguon?.length) return null;
  return (
    <View style={styles.nguon_block}>
      <Text style={styles.nguon_head}>Nguồn đã dùng</Text>
      {rows.map((row, ri) => (
        <Text key={ri} style={styles.nguon_row}>
          {row}
        </Text>
      ))}
      {more ? <Text style={styles.nguon_tail}>{more}</Text> : null}
    </View>
  );
};

/**
 * @param {object} props
 * @param {'man_hinh' | 'cua_so'} props.cheDoHienThi
 * @param {import('@react-navigation/native').NavigationProp<any>} [props.navigation]
 * @param {() => void} [props.onDong] — đóng cửa sổ (popup)
 * @param {() => void} [props.onQuayLaiMenu] — khi ở cửa sổ: quay lại menu FAB
 */
const KhungTroLyTriThucChat = ({
  cheDoHienThi = 'man_hinh',
  navigation,
  onDong,
  onQuayLaiMenu,
}) => {
  const laCuaSo = cheDoHienThi === 'cua_so';
  const [tinNhan, setTinNhan] = useState([]);
  const [nhap, setNhap] = useState('');
  const [dangXuLy, setDangXuLy] = useState(false);
  const [triThuc, setTriThuc] = useState([]);
  /** false = RAG nội bộ (mặc định); true = LLM qua Python (Unsloth-compatible HF). */
  const [cheDoLlm, setCheDoLlm] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    layDanhSachTriThucTuGiamDinh().then(setTriThuc).catch(() => setTriThuc([]));
    return () => dungDoc();
  }, []);

  const gui = useCallback(async (cauHoiRaw) => {
    const cauHoi = String(cauHoiRaw ?? nhap).trim();
    if (!cauHoi || dangXuLy) return;
    setNhap('');
    const userMsg = { role: 'user', text: cauHoi, ts: Date.now() };
    setTinNhan((prev) => [...prev, userMsg]);
    setDangXuLy(true);
    try {
      if (cheDoLlm) {
        const messages = [
          ...tinNhan
            .filter((m) => m.role === 'user' || m.role === 'assistant')
            .map((m) => ({ role: m.role, content: m.text })),
          { role: 'user', content: cauHoi },
        ];
        const ketQua = await chatPythonService({ messages, maxNewTokens: 512 });
        const loi = ketQua?.status === 'error' ? (ketQua.message || 'Lỗi LLM') : null;
        const text = loi || ketQua?.reply || ketQua?.detail || 'Không có phản hồi.';
        setTinNhan((prev) => [
          ...prev,
          {
            role: 'assistant',
            text,
            ok: !loi,
            nguon: [],
            ts: Date.now(),
            cheDo: 'llm',
          },
        ]);
      } else {
        const freshTriThuc = await layDanhSachTriThucTuGiamDinh().catch(() => []);
        const ketQua = await traLoiTroLyTriThuc({
          cauHoi,
          manifestItems: taiLieuManifest.items || [],
          generatedAt: taiLieuManifest.generatedAt || '',
          triThucGiamDinh: freshTriThuc,
          gioiHanTaiFile: 12,
        });
        setTinNhan((prev) => [
          ...prev,
          {
            role: 'assistant',
            text: ketQua.markdown || ketQua.loi || 'Không có nội dung.',
            ok: ketQua.ok,
            nguon: ketQua.nguon || [],
            ts: Date.now(),
            cheDo: 'rag',
          },
        ]);
      }
    } catch (e) {
      setTinNhan((prev) => [
        ...prev,
        {
          role: 'assistant',
          text: `**Lỗi xử lý:** ${String(e?.message || e)}`,
          ok: false,
          ts: Date.now(),
        },
      ]);
    } finally {
      setDangXuLy(false);
    }
  }, [dangXuLy, nhap, tinNhan, cheDoLlm]);

  useEffect(() => {
    const t = setTimeout(() => scrollRef.current?.scrollToEnd({ animated: true }), 120);
    return () => clearTimeout(t);
  }, [tinNhan, dangXuLy]);

  return (
    <View style={[styles.khung, laCuaSo && styles.khung_cua_so]}>
      <View style={[styles.header, laCuaSo && styles.header_cua_so]}>
        {laCuaSo && onQuayLaiMenu ? (
          <TouchableOpacity onPress={onQuayLaiMenu} style={styles.btn_header}>
            <Text style={styles.txt_header_btn}>←</Text>
          </TouchableOpacity>
        ) : null}
        {!laCuaSo && navigation ? (
          <TouchableOpacity onPress={() => dieuHuongMoTabMoi(navigation, 'TongQuan')} style={styles.btn_header}>
            <Text style={styles.txt_header_btn}>⬅ TỔNG QUAN</Text>
          </TouchableOpacity>
        ) : null}
        <Text style={[styles.title, laCuaSo && styles.title_cua_so]} numberOfLines={1}>
          🤖 Trợ lý tri thức
        </Text>
        <View style={styles.header_right_btns}>
          {navigation ? (
            <TouchableOpacity onPress={() => dieuHuongMoTabMoi(navigation, 'ThuVien')} style={styles.btn_header}>
              <Text style={styles.btn_side_txt}>📚</Text>
            </TouchableOpacity>
          ) : null}
          {laCuaSo && onDong ? (
            <TouchableOpacity onPress={onDong} style={styles.btn_header}>
              <Text style={styles.btn_close_txt}>✕</Text>
            </TouchableOpacity>
          ) : (
            <View style={{ minWidth: laCuaSo ? 0 : 44 }} />
          )}
        </View>
      </View>

      <View style={styles.che_do_row}>
        <TouchableOpacity
          style={[styles.che_do_btn, !cheDoLlm && styles.che_do_btn_on]}
          onPress={() => setCheDoLlm(false)}
          disabled={dangXuLy}
        >
          <Text style={[styles.che_do_txt, !cheDoLlm && styles.che_do_txt_on]}>RAG nội bộ</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.che_do_btn, cheDoLlm && styles.che_do_btn_on]}
          onPress={() => setCheDoLlm(true)}
          disabled={dangXuLy}
        >
          <Text style={[styles.che_do_txt, cheDoLlm && styles.che_do_txt_on]}>LLM (Python)</Text>
        </TouchableOpacity>
      </View>

      <Text style={[styles.lead, laCuaSo && styles.lead_compact]}>
        {cheDoLlm ? (
          <>
            Mô hình <Text style={styles.lead_em}>Unsloth-compatible</Text> (mặc định Qwen2.5-3B trên Python service). Cần{' '}
            <Text style={styles.lead_em}>GPU + pip install -r requirements-ai.txt</Text>. Hoặc{' '}
            <Text style={styles.lead_em}>CDSS_AI_MOCK=1</Text> để thử không GPU.
          </>
        ) : (
          <>
            Trích từ <Text style={styles.lead_em}>Thư viện</Text>, <Text style={styles.lead_em}>Chuyên môn</Text>,{' '}
            <Text style={styles.lead_em}>Danh mục nội bộ</Text>, <Text style={styles.lead_em}>Quy tắc luật</Text> và tri thức kiểm tra đã lưu — không tra web.
          </>
        )}
      </Text>

      <View style={[styles.chips, laCuaSo && styles.chips_compact]}>
        {GOI_Y_NHANH.map((g) => (
          <TouchableOpacity key={g.label} style={styles.chip} onPress={() => gui(g.text)} disabled={dangXuLy}>
            <Text style={styles.chip_txt}>{g.label}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <KeyboardAvoidingView
        style={styles.flex1}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 8 : 0}
      >
        <ScrollView
          ref={scrollRef}
          style={styles.scroll}
          contentContainerStyle={styles.scrollInner}
          keyboardShouldPersistTaps="handled"
        >
          {tinNhan.length === 0 ? (
            <Text style={styles.hint}>
              Gõ mã lỗi (THUOC_391…), ICD, hoặc từ khóa nghiệp vụ — hệ thống quét thư viện và tài liệu gắn chuyên môn / quy tắc. Đã lưu{' '}
              <Text style={{ fontWeight: '800' }}>{triThuc.length}</Text> bản ghi tri thức từ kiểm tra.
            </Text>
          ) : null}
          {tinNhan.map((m, idx) => (
            <View
              key={`${m.ts}-${idx}`}
              style={[styles.bubble, m.role === 'user' ? styles.bubble_user : styles.bubble_bot]}
            >
              <Text style={styles.bubble_role}>
                {m.role === 'user' ? 'Bạn' : (m.cheDo === 'llm' ? 'Trợ lý (LLM nội bộ)' : 'Trợ lý (RAG nội bộ)')}
              </Text>
              {m.role === 'assistant' ? (
                <VanBanTraLoiTroLy text={m.text} />
              ) : (
                <Text style={styles.bubble_text}>{m.text}</Text>
              )}
              {m.nguon?.length ? <DongNguonTroLy nguon={m.nguon} /> : null}
              {m.role === 'assistant' && m.ok !== false ? (
                <TouchableOpacity style={styles.speak_btn} onPress={() => docVanBan(m.text)}>
                  <Text style={styles.speak_btn_txt}>🔊 Đọc</Text>
                </TouchableOpacity>
              ) : null}
            </View>
          ))}
          {dangXuLy ? (
            <View style={styles.loading_row}>
              <ActivityIndicator color={CD.brand.mauChinh} />
              <Text style={styles.loading_txt}>Đang quét tri thức nội bộ…</Text>
            </View>
          ) : null}
        </ScrollView>

        <View style={styles.input_row}>
          <TextInput
            style={styles.input}
            placeholder="Câu hỏi, mã rule, ICD, phác đồ…"
            placeholderTextColor={CD.text.muted}
            value={nhap}
            onChangeText={setNhap}
            editable={!dangXuLy}
            onSubmitEditing={() => gui()}
            returnKeyType="send"
            multiline={Platform.OS !== 'web'}
          />
          <TouchableOpacity style={styles.send_btn} onPress={() => gui()} disabled={dangXuLy}>
            <Text style={styles.send_txt}>Gửi</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.stop_speak} onPress={() => dungDoc()}>
            <Text style={styles.stop_speak_txt}>⏹</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  khung: { flex: 1, backgroundColor: CD.bg.gradient_mobile, ...Platform.select({ web: { backgroundImage: CD.web.gradient_bg } }) },
  khung_cua_so: { minHeight: 320, maxHeight: '100%' },
  flex1: { flex: 1 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingVertical: 8,
    paddingTop: Platform.OS === 'web' ? 10 : 8,
    backgroundColor: CD.brand.mauDam,
    borderBottomWidth: 1,
    borderBottomColor: CD.border.header,
  },
  header_cua_so: { paddingTop: 10 },
  header_right_btns: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  btn_header: { padding: 8 },
  txt_header_btn: { color: CD.text.primary, fontWeight: '700', fontSize: 12, fontFamily: CD.font.family },
  btn_side_txt: { fontSize: 18 },
  btn_close_txt: { fontSize: 18, color: '#FFF', fontWeight: '800' },
  title: {
    color: CD.text.primary,
    fontWeight: '800',
    fontSize: 15,
    fontFamily: CD.font.family,
    flex: 1,
    textAlign: 'center',
  },
  title_cua_so: { fontSize: 14 },
  lead: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    color: CD.text.secondary,
    fontSize: 12,
    lineHeight: 18,
    fontFamily: CD.font.family,
  },
  lead_compact: { paddingVertical: 6, fontSize: 11, lineHeight: 16 },
  lead_em: { fontWeight: '800', color: CD.brand.mauDam },
  che_do_row: {
    flexDirection: 'row',
    gap: 8,
    paddingHorizontal: 12,
    paddingTop: 4,
    paddingBottom: 2,
  },
  che_do_btn: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: CD.border.glass,
    backgroundColor: CD.bg.glass_input,
  },
  che_do_btn_on: {
    borderColor: CD.brand.mauDam,
    backgroundColor: 'rgba(194, 24, 91, 0.1)',
  },
  che_do_txt: { fontSize: 12, color: CD.text.secondary, fontWeight: '600', fontFamily: CD.font.family },
  che_do_txt_on: { color: CD.brand.mauDam, fontWeight: '800' },
  mono: { fontFamily: CD.font.mono, fontSize: 11, color: CD.text.table_cell },
  chips: { flexDirection: 'row', flexWrap: 'wrap', gap: 6, paddingHorizontal: 12, marginBottom: 6 },
  chips_compact: { marginBottom: 4, gap: 4 },
  chip: {
    backgroundColor: CD.bg.glass_input,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: CD.border.glass,
  },
  chip_txt: { color: CD.brand.mauDam, fontWeight: '700', fontSize: 11, fontFamily: CD.font.family },
  scroll: { flex: 1 },
  scrollInner: { padding: 12, paddingBottom: 16 },
  hint: { color: CD.text.muted, fontSize: 13, lineHeight: 20, marginBottom: 8, fontFamily: CD.font.family },
  bubble: {
    marginBottom: 10,
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    maxWidth: '100%',
  },
  bubble_user: {
    alignSelf: 'flex-end',
    backgroundColor: 'rgba(194, 24, 91, 0.12)',
    borderColor: CD.border.accent,
  },
  bubble_bot: {
    alignSelf: 'stretch',
    backgroundColor: CD.bg.glass_card,
    borderColor: CD.border.glass,
  },
  bubble_role: { fontSize: 10, fontWeight: '800', color: CD.text.muted, marginBottom: 4, fontFamily: CD.font.family },
  bubble_text: { fontSize: 13, lineHeight: 20, color: CD.text.table_cell, fontFamily: CD.font.family },
  nguon_block: { marginTop: 10, paddingTop: 8, borderTopWidth: StyleSheet.hairlineWidth, borderTopColor: CD.border.glass },
  nguon_head: { fontSize: 10, fontWeight: '800', color: CD.text.muted, marginBottom: 4, letterSpacing: 0.4, fontFamily: CD.font.family },
  nguon_row: { fontSize: 11, lineHeight: 17, color: CD.text.secondary, marginBottom: 3, fontFamily: CD.font.family },
  nguon_tail: { fontSize: 10, color: CD.text.muted, marginTop: 2, fontStyle: 'italic', fontFamily: CD.font.family },
  vbt_root: { alignSelf: 'stretch' },
  vbt_spacer: { height: 5 },
  vbt_hr: {
    height: 1,
    backgroundColor: CD.border.glass_md,
    marginVertical: 10,
    opacity: 0.85,
  },
  vbt_h3: {
    fontSize: 14,
    fontWeight: '800',
    color: CD.brand.mauDam,
    marginTop: 4,
    marginBottom: 2,
    fontFamily: CD.font.family,
  },
  vbt_h4: {
    fontSize: 13,
    fontWeight: '800',
    color: CD.text.table_cell,
    marginTop: 6,
    marginBottom: 2,
    fontFamily: CD.font.family,
  },
  vbt_quote: {
    borderLeftWidth: 3,
    borderLeftColor: CD.brand.mauNhat,
    paddingLeft: 10,
    paddingVertical: 6,
    marginVertical: 4,
    backgroundColor: 'rgba(15, 23, 42, 0.04)',
    borderRadius: 6,
  },
  vbt_quote_txt: { fontSize: 12, lineHeight: 18, color: CD.text.secondary, fontStyle: 'italic', fontFamily: CD.font.family },
  vbt_li: { fontSize: 13, lineHeight: 20, color: CD.text.table_cell, marginBottom: 4, fontFamily: CD.font.family },
  vbt_li_inner: { fontSize: 13, lineHeight: 20, color: CD.text.table_cell, fontFamily: CD.font.family },
  vbt_bullet: { fontWeight: '800', color: CD.brand.mauChinh },
  vbt_oli: { fontSize: 13, lineHeight: 20, color: CD.text.table_cell, marginBottom: 6, fontFamily: CD.font.family },
  vbt_oli_inner: { fontSize: 13, lineHeight: 20, color: CD.text.table_cell, fontFamily: CD.font.family },
  vbt_p: { fontSize: 13, lineHeight: 20, color: CD.text.table_cell, marginBottom: 3, fontFamily: CD.font.family },
  vbt_aside: {
    fontSize: 11,
    lineHeight: 17,
    color: CD.text.muted,
    fontStyle: 'italic',
    marginTop: 6,
    fontFamily: CD.font.family,
  },
  vbt_code_inline: {
    fontFamily: CD.font.mono,
    fontSize: 12,
    backgroundColor: 'rgba(15, 23, 42, 0.06)',
    color: CD.text.table_cell,
    paddingHorizontal: 4,
    borderRadius: 4,
  },
  vbt_code_block: {
    fontFamily: CD.font.mono,
    fontSize: 11,
    color: CD.brand.mauDam,
    marginBottom: 4,
    paddingVertical: 2,
  },
  speak_btn: {
    alignSelf: 'flex-start',
    marginTop: 8,
    backgroundColor: CD.brand.mauNhat,
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: CD.border.accent,
  },
  speak_btn_txt: { color: CD.brand.mauDam, fontWeight: '800', fontSize: 12, fontFamily: CD.font.family },
  loading_row: { flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 6 },
  loading_txt: { color: CD.text.secondary, fontSize: 12, fontFamily: CD.font.family },
  input_row: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    padding: 10,
    gap: 6,
    borderTopWidth: 1,
    borderTopColor: CD.border.header,
    backgroundColor: CD.bg.glass_input,
  },
  input: {
    flex: 1,
    minHeight: 40,
    maxHeight: 100,
    borderWidth: 1,
    borderColor: CD.border.glass_md,
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 8,
    color: CD.text.primary,
    fontFamily: CD.font.family,
    fontSize: 14,
    ...Platform.select({ web: { outlineStyle: 'none' } }),
  },
  send_btn: {
    backgroundColor: CD.brand.mauChinh,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 10,
  },
  send_txt: { color: '#fff', fontWeight: '800', fontSize: 13, fontFamily: CD.font.family },
  stop_speak: {
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: CD.border.glass,
  },
  stop_speak_txt: { fontSize: 16 },
});

export default KhungTroLyTriThucChat;
