/**
 * Seed danh muc ICD10 nhap vien cap cuu tu file Excel nguon.
 * Nguon: C:\\Users\\admin\\Downloads\\Tieu_chuan_nhap_viên.xlsx
 * Cap nhat: 2026-03-30
 */

export const PHIEN_BAN_DANH_MUC_ICD10_CAP_CUU = '2026-03-30-icd10-cap-cuu-seed-352';

export const COT_DANH_MUC_ICD10_CAP_CUU = [
  "ID",
  "Nhom_Benh",
  "Tinh_Trang_Benh",
  "ICD_Chinh",
  "Ly_Do_Nhap_Vien",
  "ICD_Kem_Theo",
  "Ngoai_Le",
  "Tu_Khoa"
];

export const DANH_MUC_ICD10_CAP_CUU = [
  {
    "ID": "NH01",
    "Nhom_Benh": "Nhi ",
    "Tinh_Trang_Benh": "Ngừng thở hoặc cơn ngừng thở",
    "ICD_Chinh": "R06.8 (Ngừng thở/Cơn ngừng thở)",
    "Ly_Do_Nhap_Vien": "Mã hóa trực tiếp tình trạng ngừng hô hấp cấp tính cần hồi sức ngay lập tức.",
    "ICD_Kem_Theo": "P28.4 (Cơn ngừng thở trẻ sơ sinh)J96.0 (Suy hô hấp cấp)T75.1 (Ngạt nước)",
    "Ngoai_Le": "Cơn khóc ngất (Breath-holding spells) lành tính, trẻ tự hồi phục nhanh, hồng hào trở lại.",
    "Tu_Khoa": ""
  },
  {
    "ID": "NH02",
    "Nhom_Benh": "Nhi ",
    "Tinh_Trang_Benh": "Rối loạn nhịp tim hoặc suy tim",
    "ICD_Chinh": "I49.9 (Rối loạn nhịp tim, không xác định) hoặc I50.9 (Suy tim)",
    "Ly_Do_Nhap_Vien": "Chỉ định nhập viện bắt buộc để theo dõi huyết động và xử trí cấp cứu tim mạch.",
    "ICD_Kem_Theo": "I47.1 (Nhịp nhanh kịch phát trên thất)Q24.9 (Tim bẩm sinh)I40 (Viêm cơ tim cấp)",
    "Ngoai_Le": "Rối loạn nhịp xoang (Sinus arrhythmia) sinh lý theo hô hấp ở trẻ em khỏe mạnh.",
    "Tu_Khoa": ""
  },
  {
    "ID": "NH03",
    "Nhom_Benh": "Nhi ",
    "Tinh_Trang_Benh": "Sốt cao liên tục ≥ 40 độ C hoặc hạ thân nhiệt ≤ 35,5 độ C ",
    "ICD_Chinh": "R50.9 (Sốt cao ác tính) hoặc R68.0 (Hạ thân nhiệt)",
    "Ly_Do_Nhap_Vien": "Các mốc nhiệt độ này cảnh báo rối loạn trung tâm điều nhiệt hoặc nhiễm trùng huyết nặng.",
    "ICD_Kem_Theo": "A41.9 (Nhiễm khuẩn huyết)A90 (Sốt xuất huyết Dengue)P80 (Hạ thân nhiệt sơ sinh)",
    "Ngoai_Le": "Sốt cao đơn thuần do sau tiêm chủng hoặc mọc răng (thường <40°C), đáp ứng tốt với thuốc hạ sốt, trẻ tỉnh táo.",
    "Tu_Khoa": ""
  },
  {
    "ID": "NH04",
    "Nhom_Benh": "Nhi ",
    "Tinh_Trang_Benh": "Rối loạn nhịp thở",
    "ICD_Chinh": "R06.0 (Khó thở/Thở nhanh/Thở chậm)",
    "Ly_Do_Nhap_Vien": "Dấu hiệu sớm của suy hô hấp hoặc tổn thương thần kinh trung ương.",
    "ICD_Kem_Theo": "J18.9 (Viêm phổi)E87.2 (Nhiễm toan chuyển hóa)P22.1 (Cơn khó thở thoáng qua sơ sinh)",
    "Ngoai_Le": "Thở nhanh nhất thời do sợ hãi, quấy khóc, sau đó nhịp thở trở về bình thường khi trẻ yên.",
    "Tu_Khoa": ""
  },
  {
    "ID": "NH05",
    "Nhom_Benh": "Nhi ",
    "Tinh_Trang_Benh": "Có dấu hiệu của bít tắc đường thở hoặc dị vật đường thở",
    "ICD_Chinh": "T17 (Dị vật đường hô hấp)",
    "Ly_Do_Nhap_Vien": "Tình trạng cấp cứu tối khẩn cấp (Code Blue), cần can thiệp thủ thuật ngay.",
    "ICD_Kem_Theo": "J38.5 (Co thắt thanh quản)T17.3 (Dị vật vào thanh quản)T17.5 (Dị vật vào phế quản)",
    "Ngoai_Le": "Dị vật đã được ho khạc ra ngoài hoàn toàn, trẻ hết khó thở, nghe phổi thông khí tốt (theo dõi ngắn).",
    "Tu_Khoa": ""
  },
  {
    "ID": "NH06",
    "Nhom_Benh": "Nhi ",
    "Tinh_Trang_Benh": "Suy hô hấp các mức độ khác nhau",
    "ICD_Chinh": "J96.0 (Suy hô hấp cấp)",
    "Ly_Do_Nhap_Vien": "Chẩn đoán xác định tình trạng mất bù chức năng phổi, bắt buộc hỗ trợ hô hấp.",
    "ICD_Kem_Theo": "J21 (Viêm tiểu phế quản cấp)J45.9 (Hen phế quản)J80 (RDS)",
    "Ngoai_Le": "Cảm cúm thông thường gây nghẹt mũi dẫn đến thở khò khè nhưng SpO2 đảm bảo, không gắng sức.",
    "Tu_Khoa": ""
  },
  {
    "ID": "NH07",
    "Nhom_Benh": "Nhi ",
    "Tinh_Trang_Benh": "Dấu hiệu của tiền sốc hoặc sốc",
    "ICD_Chinh": "R57.9 (Sốc, không xác định)",
    "Ly_Do_Nhap_Vien": "Tình trạng suy tuần hoàn cấp, tụt huyết áp hoặc tưới máu mô kém (CRT > 3s).",
    "ICD_Kem_Theo": "A41.9 (Sốc nhiễm khuẩn)R57.1 (Sốc giảm thể tích)T78.2 (Sốc phản vệ)",
    "Ngoai_Le": "Ngất xỉu do cường phế vị (Vasovagal syncope), mạch huyết áp nhanh chóng ổn định sau khi nằm nghỉ.",
    "Tu_Khoa": ""
  },
  {
    "ID": "NH08",
    "Nhom_Benh": "Nhi ",
    "Tinh_Trang_Benh": "Dấu hiệu của mất nước nặng hoặc rối loạn điện giải nặng",
    "ICD_Chinh": "E86 (Mất thể tích dịch) hoặc E87 (Rối loạn điện giải)",
    "Ly_Do_Nhap_Vien": "Cần bù dịch/điện giải đường tĩnh mạch khẩn cấp để tránh trụy mạch/biến chứng thần kinh.",
    "ICD_Kem_Theo": "A09 (Tiêu chảy cấp)E13.1 (Đái tháo đường nhiễm toan ceton)",
    "Ngoai_Le": "Mất nước nhẹ (Phác đồ A/B), trẻ uống được, bù dịch đường uống thành công.",
    "Tu_Khoa": ""
  },
  {
    "ID": "NH09",
    "Nhom_Benh": "Nhi ",
    "Tinh_Trang_Benh": "Suy giảm ý thức với các mức độ khác nhau",
    "ICD_Chinh": "R40 (Lơ mơ, ngầy ngật, hôn mê)",
    "Ly_Do_Nhap_Vien": "Báo động tổn thương thần kinh (GCS/AVPU giảm). Cần tìm nguyên nhân thực thể.",
    "ICD_Kem_Theo": "A39 (Viêm màng não)S06 (Chấn thương sọ não)E15 (Hạ đường huyết)",
    "Ngoai_Le": "Trẻ ngủ gà do tác dụng phụ của thuốc (kháng histamin, an thần) đã biết, dấu hiệu sinh tồn ổn định.",
    "Tu_Khoa": ""
  },
  {
    "ID": "NH10",
    "Nhom_Benh": "Nhi ",
    "Tinh_Trang_Benh": "Co giật do bất cứ nguyên nhân nào",
    "ICD_Chinh": "R56.0 (Co giật do sốt) hoặc R56.8 (Co giật khác)",
    "Ly_Do_Nhap_Vien": "Mọi cơn co giật mới hoặc đang diễn tiến đều là cấp cứu thần kinh.",
    "ICD_Kem_Theo": "G40 (Động kinh)A83 (Viêm não Nhật Bản)R71 (U não)",
    "Ngoai_Le": "Trẻ có tiền sử động kinh, cơn co giật ngắn cũ đã hết, gia đình biết cách xử trí và trẻ tỉnh táo hoàn toàn.",
    "Tu_Khoa": ""
  },
  {
    "ID": "NH11",
    "Nhom_Benh": "Nhi ",
    "Tinh_Trang_Benh": "Yếu, liệt cấp tính tiến triển có nguy cơ suy hô hấp ",
    "ICD_Chinh": "G61.0 (Hội chứng Guillain-Barré) hoặc R53",
    "Ly_Do_Nhap_Vien": "Nguy cơ liệt cơ hô hấp dẫn đến ngừng thở. Cần theo dõi sát tại ICU.",
    "ICD_Kem_Theo": "A80 (Bại liệt)G70.0 (Nhược cơ cấp)A05.1 (Ngộ độc Botulinum)",
    "Ngoai_Le": "Yếu cơ do mệt mỏi sau ốm dậy hoặc giả liệt (Toddler's fracture) không có nguy cơ suy hô hấp.",
    "Tu_Khoa": ""
  },
  {
    "ID": "NH12",
    "Nhom_Benh": "Nhi ",
    "Tinh_Trang_Benh": "Thiếu máu nặng",
    "ICD_Chinh": "D64.9 (Thiếu máu, không xác định)",
    "Ly_Do_Nhap_Vien": "Mã hóa tình trạng giảm Hemoglobin nghiêm trọng (thường Hgb < 7g/dL) cần truyền máu hoặc can thiệp ngay.",
    "ICD_Kem_Theo": "D56 (Thalassemia)D61.9 (Suy tủy xương)D69.3 (Xuất huyết giảm tiểu cầu)",
    "Ngoai_Le": "Thiếu máu nhẹ/trung bình do thiếu sắt, đang điều trị bổ sung sắt uống, lâm sàng ổn định.",
    "Tu_Khoa": ""
  },
  {
    "ID": "NH13",
    "Nhom_Benh": "Nhi ",
    "Tinh_Trang_Benh": "Trẻ bỏ ăn hoặc bỏ bú",
    "ICD_Chinh": "R63.3 (Khó khăn trong nuôi dưỡng và luân chuyển thức ăn)",
    "Ly_Do_Nhap_Vien": "Dấu hiệu \"Cờ đỏ\" (Red Flag) ở nhi khoa, báo hiệu tình trạng nhiễm trùng nặng hoặc tổn thương thần kinh/cơ.",
    "ICD_Kem_Theo": "A41.9 (Nhiễm khuẩn huyết)J18.9 (Viêm phổi nặng)G03.9 (Viêm màng não)",
    "Ngoai_Le": "Trẻ biếng ăn tâm lý hoặc do mọc răng, viêm loét miệng nhẹ (K12), vẫn uống được sữa/nước.",
    "Tu_Khoa": ""
  },
  {
    "ID": "NH14",
    "Nhom_Benh": "Nhi ",
    "Tinh_Trang_Benh": "Nôn nặng hoặc nôn dịch máu hoặc vàng hoặc xanh hoặc đen hoặc bụng chướng",
    "ICD_Chinh": "K92.0 (Nôn ra máu) hoặc R11 (Buồn nôn và nôn)",
    "Ly_Do_Nhap_Vien": "Nôn dịch xanh/vàng/máu hoặc bụng chướng là dấu hiệu tắc ruột hoặc xuất huyết tiêu hóa.",
    "ICD_Kem_Theo": "K56.6 (Tắc ruột)K91.8 (Xuất huyết tiêu hóa)Q41 (Teo/hẹp ruột bẩm sinh)",
    "Ngoai_Le": "Nôn trớ sinh lý sau ăn (GERD nhẹ), trẻ vẫn chơi, không mất nước, dịch nôn là sữa/thức ăn cũ.",
    "Tu_Khoa": ""
  },
  {
    "ID": "NH15",
    "Nhom_Benh": "Nhi ",
    "Tinh_Trang_Benh": "Khóc thét từng cơn và nôn ở trẻ nhũ nhi",
    "ICD_Chinh": "R10.4 (Đau bụng khác/Khóc thét) hoặc K56.1",
    "Ly_Do_Nhap_Vien": "Đây là triệu chứng kinh điển của Lồng ruột cấp. Cần siêu âm và tháo lồng cấp cứu.",
    "ICD_Kem_Theo": "K56.1 (Lồng ruột)K40 (Thoát vị bẹn nghẹt)R10.0 (Bụng ngoại khoa)",
    "Ngoai_Le": "Khóc dạ đề (Colic), khóc do đói hoặc tã ướt, dỗ nín ngay, bụng mềm, không nôn.",
    "Tu_Khoa": ""
  },
  {
    "ID": "NH16",
    "Nhom_Benh": "Nhi ",
    "Tinh_Trang_Benh": "Bí tiểu hoặc vô niệu",
    "ICD_Chinh": "R33 (Bí tiểu) hoặc R34 (Vô niệu/Thiểu niệu)",
    "Ly_Do_Nhap_Vien": "Dấu hiệu suy thận cấp hoặc tắc nghẽn đường tiết niệu dưới (sỏi/u/dị tật).",
    "ICD_Kem_Theo": "N17 (Suy thận cấp)N20.1 (Sỏi niệu quản)Q64.1 (Dị tật bàng quang)",
    "Ngoai_Le": "Bí tiểu chức năng do sợ đau (sau nong bao quy đầu) nhưng bàng quang không căng trướng quá mức.",
    "Tu_Khoa": ""
  },
  {
    "ID": "NH17",
    "Nhom_Benh": "Nhi ",
    "Tinh_Trang_Benh": "Các chấn thương cần theo dõi: điểm PTS < 10 (Thang điểm Pediatric Trauma Score)",
    "ICD_Chinh": "T14 (Chấn thương không xác định vùng) hoặc mã S cụ thể",
    "Ly_Do_Nhap_Vien": "Điểm PTS < 10  cảnh báo đa chấn thương nghiêm trọng, cần theo dõi tại cơ sở có khả năng phẫu thuật/hồi sức.",
    "ICD_Kem_Theo": "S06 (Chấn thương sọ não)S36 (Chấn thương tạng bụng)T07 (Đa chấn thương)",
    "Ngoai_Le": "Chấn thương phần mềm nhẹ, điểm PTS ≥ 10, trẻ tỉnh táo, vận động bình thường.",
    "Tu_Khoa": ""
  },
  {
    "ID": "NH18",
    "Nhom_Benh": "Nhi ",
    "Tinh_Trang_Benh": "Đuối nước",
    "ICD_Chinh": "T75.1 (Ngạt nước và không tử vong do chìm)",
    "Ly_Do_Nhap_Vien": "Tai nạn có nguy cơ phù phổi cấp và tổn thương não do thiếu oxy. Cần nhập viện theo dõi sát hô hấp.",
    "ICD_Kem_Theo": "J96.0 (Suy hô hấp cấp)J80 (ARDS)J18.9 (Viêm phổi hít)",
    "Ngoai_Le": "Ngạt nước thoáng qua, trẻ tỉnh táo ngay, SpO2 bình thường, phổi không rale (tùy đánh giá bác sĩ).",
    "Tu_Khoa": ""
  },
  {
    "ID": "NH19",
    "Nhom_Benh": "Nhi ",
    "Tinh_Trang_Benh": "Ngộ độc cấp hoặc nghi ngộ độc cấp",
    "ICD_Chinh": "T36-T50 (Ngộ độc thuốc) hoặc T51-T65 (Ngộ độc hóa chất)",
    "Ly_Do_Nhap_Vien": "Tình trạng cấp cứu chống độc, nguy cơ diễn biến khó lường (suy gan/thận/thần kinh).",
    "ICD_Kem_Theo": "X49 (Ngộ độc hóa chất ngẫu nhiên)T62 (Ngộ độc thực phẩm)A05 (Ngộ độc thức ăn do vi khuẩn)",
    "Ngoai_Le": "Rối loạn tiêu hóa nhẹ nghi do thức ăn, không có dấu hiệu toàn thân, không mất nước.",
    "Tu_Khoa": ""
  },
  {
    "ID": "NH20",
    "Nhom_Benh": "Nhi ",
    "Tinh_Trang_Benh": "Sơ sinh non yếu, nhẹ cân phải nhập viện theo dõi sau sinh",
    "ICD_Chinh": "P07 (Rối loạn liên quan thai nghén ngắn và cân nặng thấp)",
    "Ly_Do_Nhap_Vien": "Trẻ sinh non/nhẹ cân có nguy cơ hạ đường huyết, hạ thân nhiệt, suy hô hấp rất cao.",
    "ICD_Kem_Theo": "P07.3 (Sinh non)P07.1 (Cân nặng thấp)P22.0 (Hội chứng suy hô hấp sơ sinh)",
    "Ngoai_Le": "Không có ngoại lệ đối với sơ sinh non yếu theo chỉ định chuyên khoa.",
    "Tu_Khoa": ""
  },
  {
    "ID": "NH21",
    "Nhom_Benh": "Nhi ",
    "Tinh_Trang_Benh": "Vàng da sơ sinh trước 48h tuổi hoặc vàng da vùng 3 trở lên",
    "ICD_Chinh": "P59 (Vàng da sơ sinh) hoặc P58 (Vàng da do tan máu)",
    "Ly_Do_Nhap_Vien": "Vàng da sớm (<48h) hoặc lan sâu (vùng 3-5) là vàng da bệnh lý, nguy cơ vàng da nhân não.",
    "ICD_Kem_Theo": "P55 (Bất đồng nhóm máu Rh/ABO)P57 (Vàng da nhân)Q44.2 (Teo đường mật)",
    "Ngoai_Le": "Vàng da sinh lý (xuất hiện sau 48h, chỉ ở mặt/ngực), trẻ bú tốt, không li bì, bilirubin máu không cao.",
    "Tu_Khoa": ""
  },
  {
    "ID": "NH22",
    "Nhom_Benh": "Nhi ",
    "Tinh_Trang_Benh": "Xuất huyết hoặc mất máu cấp (xuất huyết tiêu hóa, đái máu…)",
    "ICD_Chinh": "K92.2 (Xuất huyết tiêu hóa) hoặc R31 (Đái máu)",
    "Ly_Do_Nhap_Vien": "Tình trạng mất máu cấp tính cần cầm máu và bù khối lượng tuần hoàn.",
    "ICD_Kem_Theo": "D69.3 (Xuất huyết giảm tiểu cầu)N00 (Viêm cầu thận cấp)K25 (Loét dạ dày)",
    "Ngoai_Le": "Chảy máu cam (chảy máu mũi) số lượng ít, tự cầm sau sơ cứu ép mũi, không có bệnh lý đông máu.",
    "Tu_Khoa": ""
  },
  {
    "ID": "NH23",
    "Nhom_Benh": "Nhi ",
    "Tinh_Trang_Benh": "Cơn đau mức độ ≥ trung bình (> 4/10 theo thang điểm đau)",
    "ICD_Chinh": "R52 (Đau, không phân loại nơi khác) hoặc R10 (Đau bụng và vùng chậu)",
    "Ly_Do_Nhap_Vien": "Cơn đau từ mức trung bình trở lên  cần nhập viện để giảm đau và tìm nguyên nhân thực thể.",
    "ICD_Kem_Theo": "R07 (Đau họng/ngực)M25.5 (Đau khớp)G44 (Hội chứng đau đầu)",
    "Ngoai_Le": "Đau nhẹ (<4 điểm), đáp ứng với thuốc giảm đau thông thường (Paracetamol/Ibuprofen), trẻ chơi lại được.",
    "Tu_Khoa": ""
  },
  {
    "ID": "NH24",
    "Nhom_Benh": "Nhi ",
    "Tinh_Trang_Benh": "Phẫu thuật ngoại khoa cấp cứu",
    "ICD_Chinh": "K35.8 (Viêm ruột thừa cấp) hoặc K40.3 (Thoát vị bẹn nghẹt)",
    "Ly_Do_Nhap_Vien": "Các bệnh lý bắt buộc can thiệp phẫu thuật ngay để bảo toàn tính mạng/cơ quan.",
    "ICD_Kem_Theo": "K56.1 (Lồng ruột)N44 (Xoắn tinh hoàn)Q43 (Dị tật ruột gây tắc)",
    "Ngoai_Le": "Các phẫu thuật theo chương trình (mổ phiên) đã được lên lịch hẹn trước, tình trạng trẻ ổn định.",
    "Tu_Khoa": ""
  },
  {
    "ID": "NH25",
    "Nhom_Benh": "Nhi ",
    "Tinh_Trang_Benh": "Bỏng nông ≥ 10%... hoặc bỏng sâu, bỏng vùng nguy hiểm",
    "ICD_Chinh": "T31 (Bỏng phân loại theo diện tích) hoặc T20-T29",
    "Ly_Do_Nhap_Vien": "Diện tích/Vị trí bỏng theo quy định QĐ79  có nguy cơ sốc bỏng và nhiễm trùng cao.",
    "ICD_Kem_Theo": "T32 (Ăn mòn do hóa chất)T27 (Bỏng đường hô hấp)R57.1 (Sốc giảm thể tích)",
    "Ngoai_Le": "Bỏng độ 1 (đỏ da), diện tích nhỏ (<5%), vị trí không nguy hiểm (lưng, đùi ngoài), trẻ không đau nhiều.",
    "Tu_Khoa": ""
  },
  {
    "ID": "NH26",
    "Nhom_Benh": "Nhi ",
    "Tinh_Trang_Benh": "Mất/giảm thị lực đột ngột, chấn thương, bỏng mắt...",
    "ICD_Chinh": "S05 (Tổn thương mắt và hốc mắt) hoặc H54 (Mù và giảm thị lực)",
    "Ly_Do_Nhap_Vien": "Nguy cơ mất chức năng thị giác vĩnh viễn. Cần chuyên khoa Mắt can thiệp khẩn cấp.",
    "ICD_Kem_Theo": "T26 (Bỏng mắt)T15 (Dị vật mắt)H16 (Viêm giác mạc)",
    "Ngoai_Le": "Dị vật kết mạc nhỏ, đã lấy ra dễ dàng, không tổn thương giác mạc, thị lực bình thường.",
    "Tu_Khoa": ""
  },
  {
    "ID": "NH27",
    "Nhom_Benh": "Nhi ",
    "Tinh_Trang_Benh": "Chảy máu do vết thương nông/sâu đã băng ép 5 phút không cầm",
    "ICD_Chinh": "T14.1 (Vết thương hở) hoặc R58 (Xuất huyết)",
    "Ly_Do_Nhap_Vien": "Dấu hiệu tổn thương mạch máu lớn hoặc rối loạn đông máu, nguy cơ mất máu tiếp diễn.",
    "ICD_Kem_Theo": "S51 (Vết thương cẳng tay)S01 (Vết thương đầu)D66 (Hemophilia)",
    "Ngoai_Le": "Vết thương phần mềm nhỏ, nông, máu đã tự cầm hoặc cầm sau khi băng ép ngắn, không cần khâu.",
    "Tu_Khoa": ""
  },
  {
    "ID": "NH28",
    "Nhom_Benh": "Nhi ",
    "Tinh_Trang_Benh": "Loạn thần cấp, ý tưởng tự sát, kích động",
    "ICD_Chinh": "F23 (Rối loạn loạn thần cấp) hoặc R45.8",
    "Ly_Do_Nhap_Vien": "Tình trạng cấp cứu tâm thần, nguy hiểm cho bản thân trẻ và người xung quanh.",
    "ICD_Kem_Theo": "X60-X84 (Cố ý tự hại)F19 (Rối loạn do dùng chất)F32 (Trầm cảm)",
    "Ngoai_Le": "Rối loạn lo âu nhẹ, không có hành vi nguy hiểm, gia đình cam kết quản lý và theo dõi sát.",
    "Tu_Khoa": ""
  },
  {
    "ID": "NH29",
    "Nhom_Benh": "Nhi ",
    "Tinh_Trang_Benh": "Bị xâm hại thân thể, lạm dụng có nguy cơ tiếp diễn",
    "ICD_Chinh": "T74 (Hội chứng bị ngược đãi)",
    "Ly_Do_Nhap_Vien": "Cần nhập viện để kiểm tra pháp y, bảo vệ an toàn cho trẻ và hỗ trợ tâm lý khẩn cấp.",
    "ICD_Kem_Theo": "T74.1 (Lạm dụng thể chất)T74.2 (Lạm dụng tình dục)Z04.4 (Khám sau khi bị cưỡng hiếp)",
    "Ngoai_Le": "Nghi ngờ chưa có bằng chứng rõ ràng, trẻ an toàn trong vòng tay người bảo hộ tin cậy (cần báo công an/xã hội).",
    "Tu_Khoa": ""
  },
  {
    "ID": "NH30",
    "Nhom_Benh": "Nhi ",
    "Tinh_Trang_Benh": "Nghi ngờ hoặc chẩn đoán tim bẩm sinh (sàng lọc/lâm sàng)",
    "ICD_Chinh": "Q24.9 (Dị tật bẩm sinh tim, không xác định)",
    "Ly_Do_Nhap_Vien": "Cần nhập viện để siêu âm tim, đánh giá luồng shunts và nguy cơ suy tim/tím tái.",
    "ICD_Kem_Theo": "Q21.1 (Thông liên nhĩ)Q21.0 (Thông liên thất)Q25.0 (Còn ống động mạch)",
    "Ngoai_Le": "Tim bẩm sinh đơn thuần (như PFO nhỏ) tình cờ phát hiện, trẻ hồng hào, bú tốt, tăng cân đều (hẹn tái khám).",
    "Tu_Khoa": ""
  },
  {
    "ID": "NH31",
    "Nhom_Benh": "Nhi ",
    "Tinh_Trang_Benh": "Sơ sinh sau đẻ có yếu tố nguy cơ cao",
    "ICD_Chinh": "P03 (Thai/sơ sinh bị ảnh hưởng bởi biến chứng lao động/sinh)",
    "Ly_Do_Nhap_Vien": "Nhóm trẻ sinh ra từ mẹ bệnh lý, sinh khó, ngạt... cần theo dõi sát trong 24-72h đầu.",
    "ICD_Kem_Theo": "P00 (Ảnh hưởng bởi mẹ bệnh)P20 (Suy thai)P01 (Ảnh hưởng bởi biến chứng thai nghén)",
    "Ngoai_Le": "Trẻ sinh thường, mẹ khỏe mạnh, chỉ số Apgar tốt, bú tốt, không có yếu tố nguy cơ (nằm cùng mẹ/xuất viện).",
    "Tu_Khoa": ""
  },
  {
    "ID": "NH32",
    "Nhom_Benh": "Nhi ",
    "Tinh_Trang_Benh": "Côn trùng hoặc động vật cắn có nguy cơ ảnh hưởng tính mạng",
    "ICD_Chinh": "T63 (Tác dụng độc của nọc độc động vật) hoặc W54 (Chó cắn)",
    "Ly_Do_Nhap_Vien": "Nguy cơ sốc phản vệ, nhiễm độc nọc hoặc bệnh dại/uốn ván.",
    "ICD_Kem_Theo": "T63.0 (Nọc rắn)T63.4 (Nọc rết)X23 (Ong đốt)",
    "Ngoai_Le": "Vết cắn côn trùng lành tính (muỗi, kiến thường), phản ứng tại chỗ nhẹ, không phù nề lan tỏa.",
    "Tu_Khoa": ""
  },
  {
    "ID": "NH33",
    "Nhom_Benh": "Nhi ",
    "Tinh_Trang_Benh": "Hội chứng bong vẩy da do tụ cầu",
    "ICD_Chinh": "L00 (Hội chứng bong vảy da do tụ cầu - SSSS)",
    "Ly_Do_Nhap_Vien": "Bệnh lý nhiễm trùng da cấp tính nặng, nguy cơ nhiễm trùng huyết và mất nước.",
    "ICD_Kem_Theo": "L01 (Chốc lở)A41.0 (Nhiễm khuẩn huyết tụ cầu)L08 (Nhiễm trùng da khác)",
    "Ngoai_Le": "Chốc lở khu trú (L01), diện tích nhỏ, không sốt, không bong da toàn thân (điều trị kháng sinh bôi/uống).",
    "Tu_Khoa": ""
  },
  {
    "ID": "NL01",
    "Nhom_Benh": "Người lớn",
    "Tinh_Trang_Benh": "Ngừng tuần hoàn",
    "ICD_Chinh": "I46.9 (Ngừng tim, không xác định)",
    "Ly_Do_Nhap_Vien": "Mã hóa chính xác tình trạng ngừng tim. Đây là tình trạng cấp cứu tối khẩn cấp (Code Blue).",
    "ICD_Kem_Theo": "I21.9 (Nhồi máu cơ tim cấp)T75.1 (Ngạt nước)T75.4 (Điện giật)",
    "Ngoai_Le": "Không có ngoại lệ (Trừ trường hợp tử vong ngoại viện đã xác định rõ).",
    "Tu_Khoa": ""
  },
  {
    "ID": "NL02",
    "Nhom_Benh": "Người lớn",
    "Tinh_Trang_Benh": "Mạch quá nhanh hoặc quá chậm hoặc không đều gây ảnh hưởng đến huyết động: tụt huyết áp, thay đổi ý thức, dấu hiệu của sốc, đau ngực, suy tim cấp ",
    "ICD_Chinh": "I49.9 (Loạn nhịp tim, không xác định)",
    "Ly_Do_Nhap_Vien": "Mã tổng quát cho các rối loạn nhịp tim ảnh hưởng huyết động. Cần chọn mã cụ thể hơn nếu có ECG.",
    "ICD_Kem_Theo": "I47.1 (Nhịp nhanh kịch phát trên thất)I44.2 (Block nhĩ thất hoàn toàn)R57.0 (Sốc tim)",
    "Ngoai_Le": "Ngoại tâm thu thưa, người bệnh hoàn toàn bình thường, huyết động ổn định, không đau ngực.",
    "Tu_Khoa": ""
  },
  {
    "ID": "NL03",
    "Nhom_Benh": "Người lớn",
    "Tinh_Trang_Benh": "Rối loạn thân nhiệt: Tăng thân nhiệt hoặc giảm thân nhiệt",
    "ICD_Chinh": "R50.9 (Sốt, không xác định) hoặc R68.0 (Hạ thân nhiệt)",
    "Ly_Do_Nhap_Vien": "Dùng cho các trường hợp sốt cao ác tính hoặc hạ thân nhiệt nghiêm trọng chưa rõ nguyên nhân.",
    "ICD_Kem_Theo": "A41.9 (Nhiễm khuẩn huyết)T67.0 (Say nóng và say nắng)A90 (Sốt xuất huyết Dengue)",
    "Ngoai_Le": "Sốt nhẹ (do viêm họng, cảm cúm) đáp ứng tốt với thuốc hạ sốt, toàn trạng tốt.",
    "Tu_Khoa": ""
  },
  {
    "ID": "NL04",
    "Nhom_Benh": "Người lớn",
    "Tinh_Trang_Benh": "Cơn tăng huyết áp có/không dấu hiệu tổn thương cơ quan đích (huyết áp ≥ 180/120 mmHg) hoặc tụt huyết áp (huyết áp < 90/60 mmHg) và các dấu hiệu của sốc",
    "ICD_Chinh": "I10 (Tăng huyết áp vô căn - Ghi chú: Cơn THA cấp cứu) hoặc I95.9 (Tụt huyết áp)",
    "Ly_Do_Nhap_Vien": "Định nghĩa Cơn tăng huyết áp cấp cứu (Hypertensive Emergency) hoặc Sốc/Tụt áp.",
    "ICD_Kem_Theo": "I64 (Đột quỵ não)I21 (Nhồi máu cơ tim)R57 (Sốc, không phân loại nơi khác)",
    "Ngoai_Le": "Tăng huyết áp khẩn trương (Urgency) không có tổn thương cơ quan đích, hạ áp đường uống tại chỗ ổn định.",
    "Tu_Khoa": ""
  },
  {
    "ID": "NL05",
    "Nhom_Benh": "Người lớn",
    "Tinh_Trang_Benh": "Khó thở nguyên nhân tại đường thở, dị vật đường thở, hẹp đường thở, hội chứng xâm nhập ",
    "ICD_Chinh": "T17 (Dị vật trong đường hô hấp) hoặc J98.8 (Rối loạn hô hấp khác)",
    "Ly_Do_Nhap_Vien": "Mã hóa cho các tắc nghẽn cơ học đường thở hoặc hội chứng xâm nhập cấp tính.",
    "ICD_Kem_Theo": "J38.5 (Co thắt thanh quản)T78.2 (Phù mạch - Quincke)J95.5 (Hẹp dưới thanh môn sau thủ thuật)",
    "Ngoai_Le": "Dị vật đã được ho khạc ra ngoài hoàn toàn, bệnh nhân hết khó thở, khám tai mũi họng bình thường.",
    "Tu_Khoa": ""
  },
  {
    "ID": "NL06",
    "Nhom_Benh": "Người lớn",
    "Tinh_Trang_Benh": "Thở nhanh, thở chậm, thở rít, thở gấp, thở gắng sức, có cơn ngừng thở, nghẹt thở, rối loạn nhịp thở, tím tái ",
    "ICD_Chinh": "R06.0 (Khó thở) hoặc R06.8 (Các bất thường khác của nhịp thở)",
    "Ly_Do_Nhap_Vien": "Mã triệu chứng hô hấp cấp tính đe dọa suy hô hấp.",
    "ICD_Kem_Theo": "J44.1 (Đợt cấp COPD)J45.9 (Hen phế quản)E87.2 (Nhiễm toan chuyển hóa)",
    "Ngoai_Le": "Cảm giác khó thở cơ năng (do lo âu/Hysteria), nhịp thở và SpO2 bình thường, khí máu bình thường.",
    "Tu_Khoa": ""
  },
  {
    "ID": "NL07",
    "Nhom_Benh": "Người lớn",
    "Tinh_Trang_Benh": "Suy hô hấp",
    "ICD_Chinh": "J96.0 (Suy hô hấp cấp)",
    "Ly_Do_Nhap_Vien": "Chẩn đoán xác định tình trạng phổi mất chức năng trao đổi khí (PaO2 giảm, PaCO2 tăng).",
    "ICD_Kem_Theo": "J18.9 (Viêm phổi)J81 (Phù phổi cấp)J80 (Hội chứng suy hô hấp cấp tiến triển)",
    "Ngoai_Le": "Suy hô hấp mạn tính ổn định ở bệnh nhân COPD cũ (J96.1), không có dấu hiệu đợt cấp.",
    "Tu_Khoa": ""
  },
  {
    "ID": "NL08",
    "Nhom_Benh": "Người lớn",
    "Tinh_Trang_Benh": "Người bệnh đang được hỗ trợ thông khí",
    "ICD_Chinh": "Z99.1 (Lệ thuộc vào máy thở) kèm mã bệnh gốc",
    "Ly_Do_Nhap_Vien": "Dành cho bệnh nhân chuyển tuyến đang thở máy hoặc cần thở máy ngay lập tức.",
    "ICD_Kem_Theo": "J96.0 (Suy hô hấp cấp)G70.0 (Nhược cơ nặng)G61.0 (Hội chứng Guillain-Barré)",
    "Ngoai_Le": "Bệnh nhân ngưng thở khi ngủ (OSAS) đang dùng máy CPAP cá nhân tại nhà ổn định.",
    "Tu_Khoa": ""
  },
  {
    "ID": "NL09",
    "Nhom_Benh": "Người lớn",
    "Tinh_Trang_Benh": "Co giật toàn thể đang xảy ra hoặc trong vòng 24 giờ",
    "ICD_Chinh": "R56.8 (Co giật khác và không xác định)",
    "Ly_Do_Nhap_Vien": "Tình trạng cấp cứu thần kinh, nguy cơ chấn thương hoặc trạng thái động kinh.",
    "ICD_Kem_Theo": "G40.9 (Động kinh)S06 (Chấn thương sọ não)A83 (Viêm não Nhật Bản)",
    "Ngoai_Le": "Bệnh nhân động kinh cũ, cơn co giật ngắn đã hết, bệnh nhân tỉnh táo hoàn toàn, tuân thủ điều trị.",
    "Tu_Khoa": ""
  },
  {
    "ID": "NL10",
    "Nhom_Benh": "Người lớn",
    "Tinh_Trang_Benh": "Ho ra máu số lượng vừa hoặc nặng, đang xảy ra hoặc trong vòng 24 giờ ",
    "ICD_Chinh": "R04.2 (Ho ra máu)",
    "Ly_Do_Nhap_Vien": "Nguy cơ tắc nghẽn đường thở do cục máu đông hoặc sốc mất máu.",
    "ICD_Kem_Theo": "A15 (Lao phổi)J47 (Giãn phế quản)C34 (Ung thư phế quản phổi)",
    "Ngoai_Le": "Khạc ra dây máu nhỏ lẫn trong đờm do viêm họng cấp hoặc viêm lợi, không ho ra máu tươi.",
    "Tu_Khoa": ""
  },
  {
    "ID": "NL11",
    "Nhom_Benh": "Người lớn",
    "Tinh_Trang_Benh": "Ngất, xỉu hoặc rối loạn ý thức theo dõi do nguyên nhân thần kinh hoặc tim mạch, đang xảy ra hoặc trong vòng 24 giờ ",
    "ICD_Chinh": "R55 (Ngất và xỉu) hoặc R40 (Lơ mơ, ngầy ngật, hôn mê)",
    "Ly_Do_Nhap_Vien": "Cần nhập viện để tìm nguyên nhân (Rối loạn nhịp, TIA, Hẹp van tim).",
    "ICD_Kem_Theo": "I45.9 (Rối loạn dẫn truyền tim)G45.9 (Thiếu máu não thoáng qua)I95.1 (Hạ huyết áp tư thế)",
    "Ngoai_Le": "Ngất do phản xạ phế vị (Vasovagal syncope) đơn thuần, hoàn cảnh rõ ràng, phục hồi nhanh và hoàn toàn.",
    "Tu_Khoa": ""
  },
  {
    "ID": "NL12",
    "Nhom_Benh": "Người lớn",
    "Tinh_Trang_Benh": "Nôn nhiều hoặc nôn dai dẳng; tiêu chảy nặng, kéo dài ảnh hưởng đến chức năng sống ",
    "ICD_Chinh": "A09 (Tiêu chảy và viêm dạ dày ruột) hoặc R11 (Buồn nôn và nôn)",
    "Ly_Do_Nhap_Vien": "Nguy cơ mất nước, rối loạn điện giải và suy thận cấp (trước thận).",
    "ICD_Kem_Theo": "E86 (Mất thể tích dịch)N17 (Suy thận cấp)K56 (Tắc ruột)",
    "Ngoai_Le": "Rối loạn tiêu hóa nhẹ, bệnh nhân uống bù nước được, dấu hiệu sinh tồn ổn định.",
    "Tu_Khoa": ""
  },
  {
    "ID": "NL13",
    "Nhom_Benh": "Người lớn",
    "Tinh_Trang_Benh": "Nôn máu hoặc đại tiện ra máu, phân đen ",
    "ICD_Chinh": "K92.0 (Nôn ra máu) hoặc K92.1 (Phân đen)",
    "Ly_Do_Nhap_Vien": "Dấu hiệu điển hình của Xuất huyết tiêu hóa (trên/dưới). Cần nội soi cầm máu cấp cứu.",
    "ICD_Kem_Theo": "K25.4 (Loét dạ dày chảy máu)I85.0 (Vỡ giãn TM thực quản)K62.5 (Xuất huyết hậu môn trực tràng)",
    "Ngoai_Le": "Đi cầu ra máu tươi số lượng ít dính giấy vệ sinh do trĩ hoặc nứt kẽ hậu môn, không thiếu máu.",
    "Tu_Khoa": ""
  },
  {
    "ID": "NL14",
    "Nhom_Benh": "Người lớn",
    "Tinh_Trang_Benh": "Chảy máu không cầm; chảy máu số lượng lớn; chảy máu khó cầm; chảy máu số lượng ít nhưng kéo dài; chảy máu có nguy cơ tắc nghẽn đường thở và chảy máu tiếp diễn",
    "ICD_Chinh": "R58 (Xuất huyết, không phân loại nơi khác)",
    "Ly_Do_Nhap_Vien": "Mã chung cho tình trạng chảy máu bất thường. Cần xác định vị trí để mã hóa cụ thể hơn (ví dụ: Chảy máu mũi R04.0).",
    "ICD_Kem_Theo": "D69.3 (Xuất huyết giảm tiểu cầu)D66 (Hemophilia)T79.2 (Chảy máu thứ phát sau chấn thương)",
    "Ngoai_Le": "Chảy máu vết thương phần mềm nhỏ đã tự cầm hoặc băng ép cầm tốt, không ảnh hưởng huyết động.",
    "Tu_Khoa": ""
  },
  {
    "ID": "NL15",
    "Nhom_Benh": "Người lớn",
    "Tinh_Trang_Benh": "Chấn thương (giao thông, lao động, sinh hoạt, bạo lực ...) hoặc chấn thương cần xử trí cấp cứu do đe dọa chức năng sống hoặc nguy cơ gây tàn phế, đuối nước, vết thương sâu, phức tạp ",
    "ICD_Chinh": "T14 (Chấn thương không xác định vùng) hoặc mã S tương ứng",
    "Ly_Do_Nhap_Vien": "Nhóm mã S00-T98. Cần ưu tiên mã tổn thương giải phẫu nặng nhất (Ví dụ: S06 - Chấn thương sọ não).",
    "ICD_Kem_Theo": "S06 (Chấn thương sọ não)S36 (Chấn thương tạng bụng)T75.1 (Ngạt nước)",
    "Ngoai_Le": "Chấn thương phần mềm đơn thuần, vết thương nông, sây sát da, bệnh nhân tỉnh táo, vận động tốt.",
    "Tu_Khoa": ""
  },
  {
    "ID": "NL16",
    "Nhom_Benh": "Người lớn",
    "Tinh_Trang_Benh": "Bỏng và ngạt khói khi có một trong các tiêu chí sau: Diện bỏng chung > 10% diện tích cơ thể hoặc bỏng sâu > 5% diện tích cơ thể; Bỏng hô hấp; Bỏng ống tiêu hoá; Bỏng điện cao thế hoặc hoá chất hoặc tia xạ; Bỏng chu vi chi thể; Bỏng đáng kể vùng mặt; bỏng mắt; bỏng tai; bỏng tầng sinh môn; bỏng bàn tay; bỏng bàn chân; bỏng các khớp lớn; Bỏng kèm theo chấn thương lớn; người bệnh có các bệnh lý mạn tính; Bỏng có biến chứng: sốc bỏng, nhiễm trùng toàn thân. ",
    "ICD_Chinh": "T31 (Bỏng phân loại theo diện tích) kèm mã vị trí T20-T30",
    "Ly_Do_Nhap_Vien": "Mã T31 rất quan trọng để xác định mức độ nặng (% diện tích) theo quy định BHYT.",
    "ICD_Kem_Theo": "T27 (Bỏng đường hô hấp)T59 (Tác dụng độc của khí/khói)R57.1 (Sốc giảm thể tích)",
    "Ngoai_Le": "Bỏng độ 1 (đỏ da), diện tích nhỏ <5%, vị trí không nguy hiểm, không đau quá mức.",
    "Tu_Khoa": ""
  },
  {
    "ID": "NL17",
    "Nhom_Benh": "Người lớn",
    "Tinh_Trang_Benh": "Đau do nguyên nhân thực thể, mức độ dữ dội hoặc đột ngột ở bất cứ vị trí nào trên cơ thể ",
    "ICD_Chinh": "R52 (Đau, không phân loại nơi khác)",
    "Ly_Do_Nhap_Vien": "Dấu hiệu gợi ý tổn thương tạng rỗng (thủng dạ dày), tắc mạch (nhồi máu) hoặc chèn ép cấp.",
    "ICD_Kem_Theo": "R10.0 (Bụng ngoại khoa)I20.0 (Đau thắt ngực không ổn định)M54.5 (Đau lưng cấp)",
    "Ngoai_Le": "Đau mạn tính tái phát đã biết nguyên nhân, mức độ đau nhẹ/vừa, đáp ứng thuốc giảm đau uống.",
    "Tu_Khoa": ""
  },
  {
    "ID": "NL18",
    "Nhom_Benh": "Người lớn",
    "Tinh_Trang_Benh": "Đột ngột chóng mặt, giảm thính lực hoặc mất thị lực và/hoặc thị trường ",
    "ICD_Chinh": "H91.2 (Điếc đột ngột) hoặc H53 (Rối loạn thị lực)",
    "Ly_Do_Nhap_Vien": "Cảnh báo đột quỵ não hệ sống nền hoặc tắc mạch máu nuôi dưỡng thần kinh giác quan.",
    "ICD_Kem_Theo": "I63 (Nhồi máu não)H81.1 (Chóng mặt kịch phát lành tính)H34 (Tắc động mạch võng mạc)",
    "Ngoai_Le": "Chóng mặt tư thế nhẹ, không dấu hiệu thần kinh khu trú. Giảm thị lực từ từ do tật khúc xạ/đục T3.",
    "Tu_Khoa": ""
  },
  {
    "ID": "NL19",
    "Nhom_Benh": "Người lớn",
    "Tinh_Trang_Benh": "Các dấu hiệu cấp tính hoặc tiến triển: liệt hoặc rối loạn vận động, rối loạn ngôn ngữ, rối loạn cảm giác, rối loạn thị giác, chóng mặt, liệt mặt, đau đầu… xác định nguyên nhân do tổn thương thần kinh trung ương ",
    "ICD_Chinh": "G46 (Hội chứng mạch máu não) hoặc R47 (Rối loạn ngôn ngữ)",
    "Ly_Do_Nhap_Vien": "Dấu hiệu thần kinh khu trú (Focal signs) điển hình của đột quỵ hoặc u não chèn ép.",
    "ICD_Kem_Theo": "I64 (Đột quỵ, không xác định)G51.0 (Liệt Bell - Liệt mặt ngoại biên)D33 (U não)",
    "Ngoai_Le": "Đau đầu căng cơ, chóng mặt nhẹ không kèm dấu hiệu thần kinh khu trú, CT-Scan bình thường.",
    "Tu_Khoa": ""
  },
  {
    "ID": "NL20",
    "Nhom_Benh": "Người lớn",
    "Tinh_Trang_Benh": "Xuất hiện dấu hiệu nghi ngờ hoặc phản vệ hoặc dị ứng nặng",
    "ICD_Chinh": "T78.2 (Sốc phản vệ) hoặc T78.4 (Dị ứng, không xác định)",
    "Ly_Do_Nhap_Vien": "Tình trạng cấp cứu miễn dịch, nguy cơ trụy mạch và co thắt thanh quản.",
    "ICD_Kem_Theo": "L50.0 (Mày đay dị ứng)J45 (Hen phế quản)T88.6 (Sốc phản vệ do thuốc)",
    "Ngoai_Le": "Dị ứng da nhẹ (mẩn ngứa), không khó thở, huyết động ổn định.",
    "Tu_Khoa": ""
  },
  {
    "ID": "NL21",
    "Nhom_Benh": "Người lớn",
    "Tinh_Trang_Benh": "Phù khu trú hoặc Phù toàn thân nặng ảnh hưởng đến chức năng sống",
    "ICD_Chinh": "R60.1 (Phù toàn thân) hoặc T78.3 (Phù mạch)",
    "Ly_Do_Nhap_Vien": "Dấu hiệu quá tải dịch, suy tim, suy thận hoặc chèn ép tĩnh mạch lớn/bạch mạch.",
    "ICD_Kem_Theo": "N04 (Hội chứng thận hư)I50 (Suy tim)I80 (Huyết khối tĩnh mạch sâu)",
    "Ngoai_Le": "Phù nhẹ 2 chi dưới do suy van tĩnh mạch mạn tính hoặc tư thế, không khó thở.",
    "Tu_Khoa": ""
  },
  {
    "ID": "NL22",
    "Nhom_Benh": "Người lớn",
    "Tinh_Trang_Benh": "Rối loạn nước, điện giải, thăng bằng toan kiềm từ vừa đến nặng ",
    "ICD_Chinh": "E87 (Rối loạn dịch, điện giải và cân bằng kiềm toan)",
    "Ly_Do_Nhap_Vien": "Nguy cơ rối loạn nhịp tim (Tăng/Hạ Kali) hoặc phù não/hôn mê (Hạ Natri).",
    "ICD_Kem_Theo": "E87.1 (Hạ Natri máu)E87.6 (Hạ Kali máu)E87.2 (Nhiễm toan)",
    "Ngoai_Le": "Rối loạn nhẹ không triệu chứng lâm sàng, điều chỉnh được bằng chế độ ăn/thuốc uống.",
    "Tu_Khoa": ""
  },
  {
    "ID": "NL23",
    "Nhom_Benh": "Người lớn",
    "Tinh_Trang_Benh": "Hội chứng não - màng não",
    "ICD_Chinh": "R29.1 (Màng não kích thích) hoặc G03.9",
    "Ly_Do_Nhap_Vien": "Gồm: Đau đầu, nôn, cứng gáy, sợ ánh sáng. Gợi ý viêm màng não hoặc xuất huyết dưới nhện.",
    "ICD_Kem_Theo": "G00 (Viêm màng não mủ)I60 (Xuất huyết dưới nhện)A87 (Viêm màng não virus)",
    "Ngoai_Le": "Đau vùng cổ gáy do thoái hóa hoặc co cứng cơ, không sốt, Kernig (-), Brudzinski (-).",
    "Tu_Khoa": ""
  },
  {
    "ID": "NL24",
    "Nhom_Benh": "Người lớn",
    "Tinh_Trang_Benh": "Rối loạn ý thức, điểm GCS dưới 13, do nguyên nhân thực thể ",
    "ICD_Chinh": "R40.1 (Lơ mơ) hoặc R40.2 (Hôn mê)",
    "Ly_Do_Nhap_Vien": "Mức độ tri giác giảm (Glasgow < 13) báo động tổn thương não bộ nghiêm trọng.",
    "ICD_Kem_Theo": "S06 (Chấn thương sọ não)E15 (Hạ đường huyết)I61 (Xuất huyết não)",
    "Ngoai_Le": "Ngủ gà do thiếu ngủ hoặc tác dụng phụ thuốc an thần mức độ nhẹ, gọi hỏi biết (GCS 14-15).",
    "Tu_Khoa": ""
  },
  {
    "ID": "NL25",
    "Nhom_Benh": "Người lớn",
    "Tinh_Trang_Benh": "Thay đổi tri giác đột ngột hoặc rối loạn định hướng không gian, thời gian",
    "ICD_Chinh": "R41.0 (Mất định hướng, không xác định) hoặc F05 (Sảng)",
    "Ly_Do_Nhap_Vien": "Dấu hiệu của hội chứng sảng cấp (Delirium) hoặc tổn thương não cấp tính.",
    "ICD_Kem_Theo": "F10.4 (Trạng thái cai rượu)E15 (Hạ đường huyết)S06 (Chấn thương sọ não)",
    "Ngoai_Le": "Lú lẫn nhẹ ở người già sa sút trí tuệ (Dementia) giai đoạn ổn định, không có đợt cấp.",
    "Tu_Khoa": ""
  },
  {
    "ID": "NL26",
    "Nhom_Benh": "Người lớn",
    "Tinh_Trang_Benh": "Rối loạn chức năng nuốt (nuốt nghẹn, nuốt khó liên tục hoặc đột ngột)",
    "ICD_Chinh": "R13 (Chứng khó nuốt)",
    "Ly_Do_Nhap_Vien": "Cảnh báo tắc nghẽn thực quản (u, dị vật) hoặc tai biến mạch não (liệt hầu họng).",
    "ICD_Kem_Theo": "I69 (Di chứng đột quỵ)C15 (Ung thư thực quản)G70.0 (Nhược cơ)",
    "Ngoai_Le": "Cảm giác vướng họng (loạn cảm họng) do trào ngược dạ dày (GERD) hoặc tâm lý, vẫn ăn uống được.",
    "Tu_Khoa": ""
  },
  {
    "ID": "NL27",
    "Nhom_Benh": "Người lớn",
    "Tinh_Trang_Benh": "Áp xe hoặc nhiễm trùng lan tỏa",
    "ICD_Chinh": "L02 (Áp xe da, nhọt) hoặc A48 (Bệnh nhiễm khuẩn khác)",
    "Ly_Do_Nhap_Vien": "Tình trạng nhiễm trùng không còn khu trú, nguy cơ nhiễm khuẩn huyết cao.",
    "ICD_Kem_Theo": "A41.9 (Nhiễm khuẩn huyết)L03 (Viêm mô tế bào)K65 (Viêm phúc mạc)",
    "Ngoai_Le": "Nhọt nhỏ, khu trú nông dưới da, đã vỡ mủ hoặc chích rạch dẫn lưu tốt, không sốt.",
    "Tu_Khoa": ""
  },
  {
    "ID": "NL28",
    "Nhom_Benh": "Người lớn",
    "Tinh_Trang_Benh": "Đau bụng có phản ứng thành bụng hoặc cảm ứng phúc mạc; bụng cấp tính, dữ dội, chướng bụng ở người già, dấu hiệu rắn bò,…",
    "ICD_Chinh": "R10.0 (Bụng ngoại khoa cấp)",
    "Ly_Do_Nhap_Vien": "Các dấu hiệu điển hình của Thủng tạng rỗng, Viêm phúc mạc hoặc Tắc ruột cơ học.",
    "ICD_Kem_Theo": "K35 (Viêm ruột thừa cấp)K56 (Tắc ruột)K25.5 (Loét dạ dày thủng)",
    "Ngoai_Le": "Đau bụng do táo bón lâu ngày ở người già, sau khi thụt tháo đỡ đau, bụng mềm.",
    "Tu_Khoa": ""
  },
  {
    "ID": "NL29",
    "Nhom_Benh": "Người lớn",
    "Tinh_Trang_Benh": "Nuốt, hít phải chất độc hoặc tiếp xúc với chất độc trực tiếp qua da, niêm mạc",
    "ICD_Chinh": "T36-T65 (Ngộ độc thuốc/hóa chất)",
    "Ly_Do_Nhap_Vien": "Tình trạng nhiễm độc cấp tính cần các biện pháp thải độc hoặc dùng chất đối kháng (Antidote).",
    "ICD_Kem_Theo": "X49 (Ngộ độc hóa chất ngẫu nhiên)T62 (Độc chất trong thực phẩm)X60-X69 (Cố ý tự độc)",
    "Ngoai_Le": "Tiếp xúc hóa chất tẩy rửa nhẹ thông thường, đã rửa sạch ngay, da không bỏng rát, toàn trạng tốt.",
    "Tu_Khoa": ""
  },
  {
    "ID": "NL30",
    "Nhom_Benh": "Người lớn",
    "Tinh_Trang_Benh": "Bí đái, đái máu, thiểu niệu hoặc vô niệu, tiểu đau buốt do nguyên nhân nội hoặc ngoại khoa cần điều trị nội trú",
    "ICD_Chinh": "R33 (Bí tiểu) hoặc R31 (Đái máu)",
    "Ly_Do_Nhap_Vien": "Dấu hiệu tắc nghẽn đường tiết niệu cấp hoặc suy thận cấp/tổn thương thận.",
    "ICD_Kem_Theo": "N17 (Suy thận cấp)N40 (Phì đại tiền liệt tuyến)N20 (Sỏi tiết niệu)",
    "Ngoai_Le": "Tiểu buốt nhẹ do viêm bàng quang đơn thuần, không sốt, không đái máu đại thể (Kê đơn ngoại trú).",
    "Tu_Khoa": ""
  },
  {
    "ID": "NL31",
    "Nhom_Benh": "Người lớn",
    "Tinh_Trang_Benh": "Triệu chứng cấp tính ở chi: đau, tái nhợt hoặc tím, lạnh, mất mạch",
    "ICD_Chinh": "I74 (Tắc và hẹp động mạch)",
    "Ly_Do_Nhap_Vien": "\"Dấu hiệu 5P\" điển hình của Tắc mạch chi cấp tính. Cần can thiệp tái tưới máu khẩn cấp bảo tồn chi.",
    "ICD_Kem_Theo": "I80 (Huyết khối tĩnh mạch sâu)E11.5 (Bàn chân đái tháo đường)T33 (Tổn thương do lạnh)",
    "Ngoai_Le": "Lạnh đầu chi do cơ địa hoặc hội chứng Raynaud nhẹ, mạch ngoại vi vẫn bắt rõ.",
    "Tu_Khoa": ""
  },
  {
    "ID": "NL32",
    "Nhom_Benh": "Người lớn",
    "Tinh_Trang_Benh": "Tím tái hoặc hoại tử cục bộ hoặc toàn thân",
    "ICD_Chinh": "R23.0 (Chứng xanh tím) hoặc R02 (Hoại thư/Gangrene)",
    "Ly_Do_Nhap_Vien": "Dấu hiệu thiếu oxy mô nghiêm trọng hoặc tắc mạch gây chết hoại tử mô.",
    "ICD_Kem_Theo": "I70.2 (Xơ vữa động mạch chi)L89 (Loét tì đè)A48.0 (Hoại thư sinh hơi)",
    "Ngoai_Le": "Tím nhẹ đầu chi khi gặp lạnh (Cutis marmorata), ủ ấm hồng trở lại.",
    "Tu_Khoa": ""
  },
  {
    "ID": "NL33",
    "Nhom_Benh": "Người lớn",
    "Tinh_Trang_Benh": "Nghi ngờ các biến chứng cấp tính sau can thiệp thủ thuật, phẫu thuật",
    "ICD_Chinh": "T81 (Biến chứng của thủ thuật, không phân loại nơi khác)",
    "Ly_Do_Nhap_Vien": "Gồm: Chảy máu sau mổ, bục vết mổ, nhiễm trùng vết mổ, tụ máu...",
    "ICD_Kem_Theo": "T81.0 (Xuất huyết/Tụ máu)T81.3 (Bục vết mổ)T81.4 (Nhiễm trùng sau thủ thuật)",
    "Ngoai_Le": "Đau nhẹ vết mổ thông thường, không sưng nóng đỏ, không chảy dịch bất thường.",
    "Tu_Khoa": ""
  },
  {
    "ID": "NL34",
    "Nhom_Benh": "Người lớn",
    "Tinh_Trang_Benh": "Nghi ngờ hoặc xác định biến chứng sau ghép mô, bộ phận cơ thể",
    "ICD_Chinh": "T86 (Thất bại và thải ghép các cơ quan và mô ghép)",
    "Ly_Do_Nhap_Vien": "Phản ứng thải ghép cấp tính hoặc mạn tính đe dọa chức năng tạng ghép.",
    "ICD_Kem_Theo": "T86.1 (Thải ghép thận)T86.2 (Thải ghép tim)T86.4 (Thải ghép gan)",
    "Ngoai_Le": "Các chỉ số chức năng tạng ghép ổn định, tái khám định kỳ theo hẹn.",
    "Tu_Khoa": ""
  },
  {
    "ID": "NL35",
    "Nhom_Benh": "Người lớn",
    "Tinh_Trang_Benh": "Người bệnh suy giảm miễn dịch có nhiễm trùng cấp tính",
    "ICD_Chinh": "B20 (HIV/AIDS) hoặc D84 (Suy giảm miễn dịch khác)",
    "Ly_Do_Nhap_Vien": "Nhóm nguy cơ cao (HIV, dùng Corticoid dài ngày, ung thư...), nhiễm trùng diễn biến rất nhanh và nặng.",
    "ICD_Kem_Theo": "A41 (Nhiễm khuẩn huyết)J18 (Viêm phổi)B00 (Nhiễm Herpes lan tỏa)",
    "Ngoai_Le": "Nhiễm trùng da/niêm mạc nhẹ (nấm miệng) đã đáp ứng thuốc điều trị ngoại trú.",
    "Tu_Khoa": ""
  },
  {
    "ID": "NL36",
    "Nhom_Benh": "Người lớn",
    "Tinh_Trang_Benh": "Dấu hiệu của tiền sốc hoặc sốc",
    "ICD_Chinh": "R57 (Sốc, không phân loại nơi khác)",
    "Ly_Do_Nhap_Vien": "Gồm: Mạch nhanh nhỏ, huyết áp kẹt/tụt, da lạnh ẩm, thiểu niệu, lơ mơ.",
    "ICD_Kem_Theo": "R57.0 (Sốc tim)R57.1 (Sốc giảm thể tích)A41.9 (Sốc nhiễm khuẩn)",
    "Ngoai_Le": "Hạ huyết áp tư thế hoặc mệt lả do đói/hạ đường huyết nhẹ, bù dịch/đường tỉnh táo ngay.",
    "Tu_Khoa": ""
  },
  {
    "ID": "NL37",
    "Nhom_Benh": "Người lớn",
    "Tinh_Trang_Benh": "Thiếu máu nặng",
    "ICD_Chinh": "D64.9 (Thiếu máu, không xác định)",
    "Ly_Do_Nhap_Vien": "Mã hóa cho tình trạng Huyết sắc tố giảm thấp (thường < 70-80 g/L) cần truyền máu cấp cứu.",
    "ICD_Kem_Theo": "D62 (Thiếu máu cấp sau xuất huyết)D50 (Thiếu máu thiếu sắt nặng)D61 (Suy tủy)",
    "Ngoai_Le": "Thiếu máu mạn tính mức độ trung bình, huyết động ổn định, đang điều trị ngoại trú theo hẹn.",
    "Tu_Khoa": ""
  },
  {
    "ID": "NL38",
    "Nhom_Benh": "Người lớn",
    "Tinh_Trang_Benh": "Biến chứng do hóa trị liệu cần can thiệp cấp cứu",
    "ICD_Chinh": "T45.1 (Ngộ độc/Tác dụng phụ thuốc chống ung thư)",
    "Ly_Do_Nhap_Vien": "Gồm: Sốt hạ bạch cầu, nôn mửa dữ dội không kiểm soát, suy thận cấp do thuốc.",
    "ICD_Kem_Theo": "D70 (Giảm bạch cầu hạt)R11 (Buồn nôn và nôn)N17 (Suy thận cấp)",
    "Ngoai_Le": "Tác dụng phụ nhẹ (buồn nôn thoáng qua, mệt mỏi) được kiểm soát bằng thuốc uống tại nhà.",
    "Tu_Khoa": ""
  },
  {
    "ID": "NL39",
    "Nhom_Benh": "Người lớn",
    "Tinh_Trang_Benh": "Sau chấn thương kèm một (01) trong các biểu hiện: Đau đầu nhiều; nôn nhiều lần; tri giác giảm; co giật; liệt vận động; rối loạn cảm giác; thay đổi kích thước đồng tử; thất ngôn",
    "ICD_Chinh": "S06 (Tổn thương nội sọ)",
    "Ly_Do_Nhap_Vien": "Đây là các dấu hiệu \"Cờ đỏ\" của chấn thương sọ não, gợi ý máu tụ hoặc phù não tiến triển.",
    "ICD_Kem_Theo": "S06.0 (Chấn động não)S06.5 (Chảy máu dưới màng cứng)S06.2 (Chảy máu ngoài màng cứng)",
    "Ngoai_Le": "Chấn thương đầu nhẹ, đau đầu ít, Glasgow 15 điểm, không nôn, CT-Scan bình thường.",
    "Tu_Khoa": ""
  },
  {
    "ID": "NL40",
    "Nhom_Benh": "Người lớn",
    "Tinh_Trang_Benh": "Ý tưởng, hoặc hành vi tự sát hoặc tự gây thương tích hoặc nguy cơ gây nguy hiểm cho người khác ",
    "ICD_Chinh": "R45.8 (Các triệu chứng khác liên quan đến trạng thái cảm xúc - Ý tưởng tự sát)",
    "Ly_Do_Nhap_Vien": "Tình trạng cấp cứu tâm thần tối khẩn cấp. Cần giám sát an toàn nghiêm ngặt 24/24.",
    "ICD_Kem_Theo": "X60-X84 (Cố ý tự hại)F32.3 (Trầm cảm nặng có loạn thần)F10 (Rối loạn do rượu)",
    "Ngoai_Le": "Ý nghĩ thoáng qua nhưng không có kế hoạch cụ thể, có sự hỗ trợ gia đình mạnh mẽ (cần bác sĩ chuyên khoa đánh giá kỹ).",
    "Tu_Khoa": ""
  },
  {
    "ID": "NL41",
    "Nhom_Benh": "Người lớn",
    "Tinh_Trang_Benh": "Loạn thần, kích động, trầm cảm nặng ",
    "ICD_Chinh": "F23 (Rối loạn loạn thần cấp và thoáng qua) hoặc F32.2",
    "Ly_Do_Nhap_Vien": "Nguy cơ mất kiểm soát hành vi, gây hại cho bản thân và cộng đồng.",
    "ICD_Kem_Theo": "F20 (Tâm thần phân liệt)F31 (Rối loạn cảm xúc lưỡng cực)F19 (Rối loạn do dùng chất)",
    "Ngoai_Le": "Trầm cảm nhẹ/trung bình, tuân thủ điều trị, không có ý tưởng tự sát.",
    "Tu_Khoa": ""
  },
  {
    "ID": "NL42",
    "Nhom_Benh": "Người lớn",
    "Tinh_Trang_Benh": "Cơn lo âu kịch phát/cơn hoảng sợ, Trạng thái căng trương lực, Chống đối ăn uống, Trạng thái cai, ngộ độc, quá liều các chất tác động tâm thần, Các tác dụng không mong muốn cấp tính của các thuốc hướng thần: loạn trương lực cơ cấp, bồn chồn bất an, hội chứng an thần kinh ác tính, hội chứng serotonin ",
    "ICD_Chinh": "F41.0 (Rối loạn hoảng sợ) hoặc G21.0 (Hội chứng an thần kinh ác tính)",
    "Ly_Do_Nhap_Vien": "Hội chứng serotonin và NMS (An thần kinh ác tính) là cấp cứu đe dọa tính mạng (sốt cao, co cứng).",
    "ICD_Kem_Theo": "T43 (Ngộ độc thuốc hướng thần)F10.3 (Trạng thái cai rượu)T42 (Ngộ độc thuốc ngủ)",
    "Ngoai_Le": "Cơn lo âu nhẹ đã được xử trí ổn định tại phòng khám, bệnh nhân bình tĩnh lại.",
    "Tu_Khoa": ""
  },
  {
    "ID": "NL43",
    "Nhom_Benh": "Người lớn",
    "Tinh_Trang_Benh": "Các trường hợp khác: do người hành nghề nhận định, đánh giá, tiên lượng và quyết định chỉ định nhập viện đối với người bệnh trong tình trạng cấp cứu. ",
    "ICD_Chinh": "Z03.9 (Theo dõi y tế vì nghi ngờ bệnh lý) hoặc R69",
    "Ly_Do_Nhap_Vien": "Dành cho các ca bệnh khó, chưa rõ chẩn đoán nhưng lâm sàng không an toàn để về nhà (\"Cảm nhận lâm sàng\").",
    "ICD_Kem_Theo": "Z03 (Theo dõi y tế)R68 (Triệu chứng toàn thân khác)",
    "Ngoai_Le": "Không áp dụng cho các trường hợp bệnh nhân muốn nằm viện \"để kiểm tra sức khỏe\" mà không có yếu tố cấp cứu.",
    "Tu_Khoa": ""
  },
  {
    "ID": "NL44",
    "Nhom_Benh": "Người lớn",
    "Tinh_Trang_Benh": "Đau với mức độ nhiều, đột ngột ",
    "ICD_Chinh": "R52 (Đau, không phân loại nơi khác)",
    "Ly_Do_Nhap_Vien": "Đau cấp tính dữ dội luôn là dấu hiệu tổn thương mô hoặc thiếu máu cục bộ (nhồi máu).",
    "ICD_Kem_Theo": "R07 (Đau ngực)M54 (Đau cột sống)K80 (Cơn đau quặn mật)",
    "Ngoai_Le": "Đau mạn tính (đau lưng, đau khớp) không thay đổi tính chất, mức độ chịu đựng được.",
    "Tu_Khoa": ""
  },
  {
    "ID": "NL45",
    "Nhom_Benh": "Người lớn",
    "Tinh_Trang_Benh": "Đau tăng lên đột ngột",
    "ICD_Chinh": "R52 (Đau cấp tính)",
    "Ly_Do_Nhap_Vien": "Gợi ý biến chứng mới (ví dụ: thoát vị đĩa đệm gây chèn ép rễ cấp, vỡ nang...).",
    "ICD_Kem_Theo": "M51.1 (Thoát vị đĩa đệm)K85 (Viêm tụy cấp)N23 (Cơn đau quặn thận)",
    "Ngoai_Le": "Đau tăng nhẹ do vận động sai tư thế, nghỉ ngơi đỡ đau.",
    "Tu_Khoa": ""
  },
  {
    "ID": "NL46",
    "Nhom_Benh": "Người lớn",
    "Tinh_Trang_Benh": "Vết thương",
    "ICD_Chinh": "T14.1 (Vết thương hở vùng cơ thể chưa xác định)",
    "Ly_Do_Nhap_Vien": "Cần xử trí ngoại khoa (khâu, cắt lọc) hoặc tiêm SAT, kháng sinh đường tiêm.",
    "ICD_Kem_Theo": "S (Mã theo vị trí giải phẫu)T79.3 (Nhiễm trùng vết thương)A35 (Uốn ván)",
    "Ngoai_Le": "Vết sây sát da (abrasion), vết thương nông nhỏ đã xử lý sạch, không cần khâu.",
    "Tu_Khoa": ""
  },
  {
    "ID": "NL47",
    "Nhom_Benh": "Người lớn",
    "Tinh_Trang_Benh": "Nghi ngờ hoặc xác định các bệnh truyền nhiễm-nhiệt đới:- Viêm não, viêm màng não mủ- Uốn ván- Bệnh truyền nhiễm gây dịch, có nguy cơ cao ảnh hưởng đến người bệnh và cộng đồng nếu không nhập viện: tả, bạch hầu, viêm đường hô hấp cấp tiến triển...- Các bệnh gây dịch ở giai đoạn có biến chứng/ nguy cơ biến chứng: sốt xuất huyết Dengue nặng/có biến chứng nặng, sởi biến chứng hô hấp, não...- Các nhiễm khuẩn vùng đầu mặt cổ: tụ cầu mặt... ",
    "ICD_Chinh": "A00-B99 (Chương I: Bệnh nhiễm trùng và ký sinh trùng)",
    "Ly_Do_Nhap_Vien": "Nhóm bệnh bắt buộc cách ly và điều trị tích cực để tránh lây lan dịch và tử vong.",
    "ICD_Kem_Theo": "G00 (Viêm màng não mủ)A35 (Uốn ván)A91 (Sốt xuất huyết Dengue nặng)A36 (Bạch hầu)L02.0 (Áp xe mặt/Tụ cầu mặt)",
    "Ngoai_Le": "Sốt xuất huyết Dengue không có dấu hiệu cảnh báo (điều trị ngoại trú theo dõi hàng ngày). Sởi nhẹ không biến chứng.",
    "Tu_Khoa": ""
  },
  {
    "ID": "HCQ01",
    "Nhom_Benh": "Hệ thần kinh",
    "Tinh_Trang_Benh": "Đau đầu cấp có tính chất bất thường hoặc kèm dấu hiệu thần kinh khu trú",
    "ICD_Chinh": "R51 (Đau đầu)",
    "Ly_Do_Nhap_Vien": "Dấu hiệu cảnh báo chảy máu dưới nhện (đau đầu sét đánh) hoặc khối choán chỗ nội sọ.",
    "ICD_Kem_Theo": "I60 (Xuất huyết dưới nhện)D33 (U não)G44.0 (Hội chứng đau đầu Cluster)",
    "Ngoai_Le": "Đau đầu do căng cơ (Tension headache), không có dấu hiệu thần kinh khu trú, CT-Scan bình thường.",
    "Tu_Khoa": ""
  },
  {
    "ID": "HCQ02",
    "Nhom_Benh": "Hệ thần kinh",
    "Tinh_Trang_Benh": "Đau dây thần kinh V cấp",
    "ICD_Chinh": "G50.0 (Đau dây thần kinh sinh ba)",
    "Ly_Do_Nhap_Vien": "Cơn đau cấp tính dữ dội vùng mặt, cần điều trị giảm đau tích cực hoặc can thiệp.",
    "ICD_Kem_Theo": "B02.2 (Zona thần kinh mắt/mặt)G53.0 (Đau sau Zona)",
    "Ngoai_Le": "Đau mạn tính đã chẩn đoán, tái khám lĩnh thuốc định kỳ.",
    "Tu_Khoa": ""
  },
  {
    "ID": "HCQ03",
    "Nhom_Benh": "Hệ thần kinh",
    "Tinh_Trang_Benh": "Rối loạn trí nhớ cấp tính",
    "ICD_Chinh": "R41.3 (Các chứng quên khác) hoặc R41.0 (Mất định hướng)",
    "Ly_Do_Nhap_Vien": "Gợi ý hội chứng mất trí nhớ thoáng qua (TGA) hoặc tai biến mạch não vùng đồi thị/hải mã.",
    "ICD_Kem_Theo": "G45.4 (Mất trí nhớ toàn bộ thoáng qua)F05 (Sảng)I63 (Nhồi máu não)",
    "Ngoai_Le": "Quên lẩm cẩm ở người già sa sút trí tuệ (Alzheimer) diễn tiến từ từ, không thay đổi đột ngột.",
    "Tu_Khoa": ""
  },
  {
    "ID": "HCQ04",
    "Nhom_Benh": "Hệ thần kinh",
    "Tinh_Trang_Benh": "Liệt vận động hoặc liệt dây thần kinh sọ não cấp",
    "ICD_Chinh": "G81 (Liệt nửa người) hoặc G51.0 (Liệt Bell)",
    "Ly_Do_Nhap_Vien": "Dấu hiệu định vị tổn thương thần kinh trung ương hoặc ngoại biên cấp tính.",
    "ICD_Kem_Theo": "I64 (Đột quỵ não)G61.0 (Hội chứng Guillain-Barré)H49.0 (Liệt dây III)",
    "Ngoai_Le": "Liệt mặt ngoại biên (Bell's Palsy) đơn thuần, mức độ nhẹ, mắt nhắm kín, ăn uống được.",
    "Tu_Khoa": ""
  },
  {
    "ID": "HCQ05",
    "Nhom_Benh": "Hệ thần kinh",
    "Tinh_Trang_Benh": "Đột quỵ não cấp, bán cấp, giai đoạn sau đột quỵ với các biểu hiện: co giật, suy giảm ý thức, rối loạn vận động, cảm giác, ngôn ngữ… ",
    "ICD_Chinh": "I64 (Đột quỵ, không xác định) hoặc I69 (Di chứng đột quỵ)",
    "Ly_Do_Nhap_Vien": "Bao gồm cả đột quỵ mới và các biến chứng nặng nề của đột quỵ cũ cần nhập viện lại.",
    "ICD_Kem_Theo": "I63 (Nhồi máu não)I61 (Xuất huyết não)R56 (Co giật)",
    "Ngoai_Le": "Di chứng đột quỵ cũ ổn định, người bệnh đi tập vật lý trị liệu phục hồi chức năng ngoại trú.",
    "Tu_Khoa": ""
  },
  {
    "ID": "HCQ06",
    "Nhom_Benh": "Hệ thần kinh",
    "Tinh_Trang_Benh": "Phình mạch não có nguy cơ dấu hiệu dọa vỡ hoặc kích thước túi phình trên 5 mm.",
    "ICD_Chinh": "I67.1 (Phình mạch não, không vỡ)",
    "Ly_Do_Nhap_Vien": "Túi phình kích thước lớn hoặc có triệu chứng đè ép/dọa vỡ cần can thiệp mạch (Coiling/Stent).",
    "ICD_Kem_Theo": "Q28.3 (Dị dạng mạch não khác)I60 (Vỡ phình mạch gây XH dưới nhện)",
    "Ngoai_Le": "Túi phình nhỏ (<3-4mm) tình cờ phát hiện, không triệu chứng, kế hoạch theo dõi định kỳ.",
    "Tu_Khoa": ""
  },
  {
    "ID": "HCQ07",
    "Nhom_Benh": "Hệ thần kinh",
    "Tinh_Trang_Benh": "Hẹp động mạch cảnh hoặc động mạch nội sọ ≥70% hoặc có triệu chứng.",
    "ICD_Chinh": "I65.2 (Tắc và hẹp động mạch cảnh)",
    "Ly_Do_Nhap_Vien": "Hẹp khít động mạch nuôi não, nguy cơ đột quỵ rất cao. Cần can thiệp bóc tách/đặt stent.",
    "ICD_Kem_Theo": "I66 (Tắc và hẹp động mạch não)G45 (Cơn thoáng thiếu máu não)I63 (Nhồi máu não)",
    "Ngoai_Le": "Hẹp mức độ vừa (<50%), không triệu chứng lâm sàng, điều trị nội khoa kiểm soát mỡ máu/huyết áp.",
    "Tu_Khoa": ""
  },
  {
    "ID": "HCQ08",
    "Nhom_Benh": "Hệ thần kinh",
    "Tinh_Trang_Benh": "Sau chấn thương kèm 1 trong các biểu hiện: Đau đầu nhiều; nôn nhiều lần; tri giác giảm; co giật; liệt vận động; rối loạn cảm giác; giãn đồng tử; thất ngôn",
    "ICD_Chinh": "S06 (Tổn thương nội sọ)",
    "Ly_Do_Nhap_Vien": "Các dấu hiệu \"Cờ đỏ\" gợi ý máu tụ nội sọ chèn ép não (Khoảng tỉnh). Bắt buộc nhập viện.",
    "ICD_Kem_Theo": "S06.5 (Máu tụ dưới màng cứng)S06.2 (Máu tụ ngoài màng cứng)S06.0 (Chấn động não nặng)",
    "Ngoai_Le": "Chấn thương đầu nhẹ, đau đầu thoáng qua, không nôn, GCS 15 điểm, CT-Scan bình thường.",
    "Tu_Khoa": ""
  },
  {
    "ID": "HCQ09",
    "Nhom_Benh": "Hệ thần kinh",
    "Tinh_Trang_Benh": "Đau đầu nhiều và nôn vọt",
    "ICD_Chinh": "R51 (Đau đầu) kèm R11 (Buồn nôn và nôn)",
    "Ly_Do_Nhap_Vien": "\"Tam chứng màng não\" hoặc tăng áp lực nội sọ cấp tính.",
    "ICD_Kem_Theo": "G93.6 (Phù não)G03.9 (Viêm màng não)I61 (Xuất huyết não thất)",
    "Ngoai_Le": "Đau đầu migraine có nôn, nhưng đáp ứng tốt thuốc cắt cơn, bệnh nhân đã quen với cơn đau cũ.",
    "Tu_Khoa": ""
  },
  {
    "ID": "HCQ10",
    "Nhom_Benh": "Hệ thần kinh",
    "Tinh_Trang_Benh": "Đau đầu dữ dội cấp tính",
    "ICD_Chinh": "R51 (Đau đầu)",
    "Ly_Do_Nhap_Vien": "Đặc điểm của chảy máu dưới nhện (đau như búa bổ) hoặc viêm xoang cấp nặng/glaucoma.",
    "ICD_Kem_Theo": "I60 (Xuất huyết dưới nhện)H40.2 (Glaucoma góc đóng cấp)J01 (Viêm xoang cấp)",
    "Ngoai_Le": "Đau đầu căng thẳng (Stress), đau âm ỉ, không có yếu tố nguy hiểm.",
    "Tu_Khoa": ""
  },
  {
    "ID": "HCQ11",
    "Nhom_Benh": "Hệ thần kinh",
    "Tinh_Trang_Benh": "Tri giác giảm đột ngột",
    "ICD_Chinh": "R40 (Lơ mơ, ngầy ngật và hôn mê)",
    "Ly_Do_Nhap_Vien": "Dấu hiệu tổn thương hệ thống lưới hoạt hóa (RAS) ở thân não hoặc tổn thương bán cầu lan tỏa.",
    "ICD_Kem_Theo": "E15 (Hạ đường huyết)I63 (Đột quỵ)T40 (Ngộ độc Opioid)",
    "Ngoai_Le": "Ngủ sâu sau uống rượu say (đánh thức được), dấu hiệu sinh tồn ổn định.",
    "Tu_Khoa": ""
  },
  {
    "ID": "HCQ12",
    "Nhom_Benh": "Hệ thần kinh",
    "Tinh_Trang_Benh": "Co giật",
    "ICD_Chinh": "R56.8 (Co giật khác và không xác định)",
    "Ly_Do_Nhap_Vien": "Cần nhập viện để cắt cơn, tìm nguyên nhân và dự phòng trạng thái động kinh.",
    "ICD_Kem_Theo": "G40 (Động kinh)A81 (Nhiễm trùng thần kinh chậm)R56.0 (Co giật do sốt - ít gặp ở người lớn)",
    "Ngoai_Le": "Co giật do rối loạn phân ly (Hysteria/PNES), không có sóng động kinh trên EEG.",
    "Tu_Khoa": ""
  },
  {
    "ID": "HCQ13",
    "Nhom_Benh": "Hệ thần kinh",
    "Tinh_Trang_Benh": "Thất ngôn",
    "ICD_Chinh": "R47.0 (Mất ngôn ngữ và loạn ngôn ngữ)",
    "Ly_Do_Nhap_Vien": "Dấu hiệu tổn thương vùng Broca hoặc Wernicke (thường do đột quỵ bán cầu ưu thế).",
    "ICD_Kem_Theo": "I63 (Nhồi máu não)D33 (U não)G30 (Alzheimer giai đoạn nặng)",
    "Ngoai_Le": "Nói lắp hoặc rối loạn phát âm do bệnh lý thanh quản, không phải tổn thương não.",
    "Tu_Khoa": ""
  },
  {
    "ID": "HCQ14",
    "Nhom_Benh": "Hệ thần kinh",
    "Tinh_Trang_Benh": "Liệt vận động cấp tính",
    "ICD_Chinh": "G81.9 (Liệt nửa người, không xác định) hoặc G82 (Liệt hai chi dưới/tứ chi)",
    "Ly_Do_Nhap_Vien": "Dấu hiệu mất chức năng vận động đột ngột, gợi ý tổn thương tháp hoặc tủy sống cấp.",
    "ICD_Kem_Theo": "I64 (Đột quỵ não)G61.0 (Hội chứng Guillain-Barré)G04.9 (Viêm tủy)",
    "Ngoai_Le": "Yếu mỏi cơ năng do hạ Kali máu nhẹ (đã bù điện giải ổn định) hoặc rối loạn phân ly (Hysteria).",
    "Tu_Khoa": ""
  },
  {
    "ID": "HCQ15",
    "Nhom_Benh": "Hệ thần kinh",
    "Tinh_Trang_Benh": "Rối loạn cảm giác cấp tính",
    "ICD_Chinh": "R20.2 (Dị cảm da) hoặc R20.0 (Mất cảm giác da)",
    "Ly_Do_Nhap_Vien": "Dấu hiệu tổn thương đường dẫn truyền cảm giác (bó gai đồi thị/cột sau) hoặc rễ thần kinh.",
    "ICD_Kem_Theo": "G45 (Cơn thoáng thiếu máu não)M51.1 (Thoát vị đĩa đệm)E10.4 (Biến chứng thần kinh ĐTĐ)",
    "Ngoai_Le": "Tê bì tay chân do tư thế (ngủ đè lên tay), hết ngay sau khi vận động lại.",
    "Tu_Khoa": ""
  },
  {
    "ID": "HCQ16",
    "Nhom_Benh": "Hệ thần kinh",
    "Tinh_Trang_Benh": "Liệt dây III: Sụp mi, giãn đồng tử",
    "ICD_Chinh": "H49.0 (Liệt dây thần kinh số 3)",
    "Ly_Do_Nhap_Vien": "Dấu hiệu nguy hiểm của phình mạch não đoạn thông sau chèn ép hoặc tụt kẹt thùy thái dương.",
    "ICD_Kem_Theo": "I67.1 (Phình mạch não)E10 (Đái tháo đường)S06 (Chấn thương sọ não)",
    "Ngoai_Le": "Sụp mi bẩm sinh hoặc nhược cơ (MG) đã chẩn đoán và điều trị ổn định, không có giãn đồng tử.",
    "Tu_Khoa": ""
  },
  {
    "ID": "HCQ17",
    "Nhom_Benh": "Hệ thần kinh",
    "Tinh_Trang_Benh": "Liệt dây VII: Méo miệng",
    "ICD_Chinh": "G51.0 (Liệt Bell - Liệt dây VII ngoại biên)",
    "Ly_Do_Nhap_Vien": "Cần phân biệt liệt VII trung ương (đột quỵ) và ngoại biên. Nhập viện nếu nghi ngờ tổn thương sọ não.",
    "ICD_Kem_Theo": "I64 (Đột quỵ não)B02.2 (Zona tai - Ramsay Hunt)G04 (Viêm não)",
    "Ngoai_Le": "Liệt VII ngoại biên đơn thuần do lạnh, mắt nhắm kín, không dấu hiệu thần kinh khác (Điều trị ngoại trú).",
    "Tu_Khoa": ""
  },
  {
    "ID": "HCQ18",
    "Nhom_Benh": "Hệ thần kinh",
    "Tinh_Trang_Benh": "Rối loạn cơ tròn",
    "ICD_Chinh": "G95.8 (Các bệnh khác của tủy sống) hoặc R32 (Tiểu không tự chủ)",
    "Ly_Do_Nhap_Vien": "Dấu hiệu chèn ép chùm đuôi ngựa hoặc tổn thương tủy hoàn toàn (Bí tiểu/Đại tiểu tiện không tự chủ).",
    "ICD_Kem_Theo": "M51.0 (Thoát vị đĩa đệm gây bệnh tủy)G35 (Xơ cứng rải rác)S34 (Chấn thương tủy)",
    "Ngoai_Le": "Són tiểu gắng sức ở phụ nữ lớn tuổi (Stress incontinence) mạn tính, không kèm liệt chi.",
    "Tu_Khoa": ""
  },
  {
    "ID": "HCQ19",
    "Nhom_Benh": "Hệ thần kinh",
    "Tinh_Trang_Benh": "Đột quỵ giai đoạn bán cấp và mạn tính với biến chứng",
    "ICD_Chinh": "I69 (Di chứng bệnh mạch máu não)",
    "Ly_Do_Nhap_Vien": "Giai đoạn sau của đột quỵ nhưng xuất hiện các vấn đề sức khỏe mới cần can thiệp nội trú.",
    "ICD_Kem_Theo": "I69.3 (Di chứng nhồi máu não)J18 (Viêm phổi hít)L89 (Loét tì đè)",
    "Ngoai_Le": "Người bệnh tái khám định kỳ để lĩnh thuốc dự phòng cấp 2, tình trạng ổn định.",
    "Tu_Khoa": ""
  },
  {
    "ID": "HCQ20",
    "Nhom_Benh": "Hệ thần kinh",
    "Tinh_Trang_Benh": "cấp tính: co giật, suy đồi ý thức,…",
    "ICD_Chinh": "R56.8 (Co giật) hoặc R40 (Rối loạn ý thức)",
    "Ly_Do_Nhap_Vien": "Lưu ý: Đây là phần tiếp nối của mục 19 bị ngắt dòng. Các biến chứng cấp tính trên nền bệnh nhân đột quỵ cũ.",
    "ICD_Kem_Theo": "G40 (Động kinh sau đột quỵ)E15 (Hạ đường huyết)A41 (Nhiễm trùng huyết)",
    "Ngoai_Le": "Cơn co giật cục bộ ngắn đã kiểm soát, người bệnh tỉnh táo lại ngay (đã có phác đồ điều trị động kinh).",
    "Tu_Khoa": ""
  },
  {
    "ID": "HCQ21",
    "Nhom_Benh": "Hệ thần kinh",
    "Tinh_Trang_Benh": "Phình mạch não chưa vỡ có nguy cơ dấu hiệu dọa vỡ hoặc kích thước túi phình trên 5 mm.",
    "ICD_Chinh": "I67.1 (Phình mạch não, không vỡ)",
    "Ly_Do_Nhap_Vien": "Túi phình kích thước lớn (>5mm) có nguy cơ vỡ gây xuất huyết dưới nhện tử vong cao.",
    "ICD_Kem_Theo": "Q28 (Dị dạng mạch não bẩm sinh)I10 (Tăng huyết áp)R51 (Đau đầu)",
    "Ngoai_Le": "Túi phình nhỏ (<3mm) phát hiện tình cờ, không đau đầu, huyết áp kiểm soát tốt (Theo dõi định kỳ).",
    "Tu_Khoa": ""
  },
  {
    "ID": "HCQ22",
    "Nhom_Benh": "Hệ thần kinh",
    "Tinh_Trang_Benh": "Sững sờ không tiếp xúc, kích thích vật vã, ngủ gà, lú lẫn",
    "ICD_Chinh": "R40.1 (Lơ mơ/Sững sờ) hoặc F05 (Sảng)",
    "Ly_Do_Nhap_Vien": "Các mức độ rối loạn tri giác khác nhau, gợi ý tổn thương não cấp hoặc rối loạn chuyển hóa.",
    "ICD_Kem_Theo": "S06 (Chấn thương sọ não)E87 (Rối loạn điện giải)T40 (Ngộ độc thuốc)",
    "Ngoai_Le": "Ngủ gà do tác dụng phụ thuốc an thần đã biết, lay gọi tỉnh và tiếp xúc chậm nhưng đúng.",
    "Tu_Khoa": ""
  },
  {
    "ID": "HCQ23",
    "Nhom_Benh": "Hệ thần kinh",
    "Tinh_Trang_Benh": "Đột ngột mất thị lực. Thị trường, bán manh",
    "ICD_Chinh": "H54.0 (Mù, cả 2 mắt) hoặc H53.4 (Khuyết thị trường)",
    "Ly_Do_Nhap_Vien": "Dấu hiệu đột quỵ động mạch não sau hoặc tắc động mạch trung tâm võng mạc.",
    "ICD_Kem_Theo": "I63 (Nhồi máu não)H34.1 (Tắc động mạch trung tâm võng mạc)G35 (MS - Viêm thần kinh thị)",
    "Ngoai_Le": "Giảm thị lực từ từ do đục thủy tinh thể hoặc tật khúc xạ (Cận/Viễn/Loạn).",
    "Tu_Khoa": ""
  },
  {
    "ID": "HCQ24",
    "Nhom_Benh": "Hệ thần kinh",
    "Tinh_Trang_Benh": "Các triệu chứng thần kinh thoáng qua: Liệt vận động, cảm giác; mất thị trường; ngôn ngữ; ngất;…",
    "ICD_Chinh": "G45.9 (Cơn thiếu máu não thoáng qua - TIA)",
    "Ly_Do_Nhap_Vien": "Dấu hiệu báo trước của đột quỵ thật sự. Cần nhập viện để tìm nguyên nhân và dự phòng ngay.",
    "ICD_Kem_Theo": "I63 (Nhồi máu não)I48 (Rung nhĩ)I65 (Hẹp động mạch cảnh)",
    "Ngoai_Le": "Tê tay chân thoáng qua do tì đè, hết ngay sau vài phút, không có yếu tố nguy cơ tim mạch.",
    "Tu_Khoa": ""
  },
  {
    "ID": "HCQ25",
    "Nhom_Benh": "Hệ thần kinh",
    "Tinh_Trang_Benh": "Chóng mặt, mất thăng bằng đột ngột; chóng mặt dữ dội",
    "ICD_Chinh": "H81.1 (Chóng mặt kịch phát lành tính) hoặc A88.1 (Chóng mặt dịch tễ)",
    "Ly_Do_Nhap_Vien": "Cần phân biệt chóng mặt trung ương (đột quỵ tiểu não) và ngoại biên (tiền đình). Nhập viện nếu nôn nhiều/đi lại không vững.",
    "ICD_Kem_Theo": "I63 (Nhồi máu tiểu não)H81.0 (Bệnh Meniere)R42 (Chóng mặt và choáng váng)",
    "Ngoai_Le": "Chóng mặt tư thế nhẹ, không nôn, đi lại bình thường, Romberg (-).",
    "Tu_Khoa": ""
  },
  {
    "ID": "HCQ26",
    "Nhom_Benh": "Hệ thần kinh",
    "Tinh_Trang_Benh": "Xuất hiện triệu chứng của triệu chứng chèn ép tủy cấp như rối loạn cơ vòng, bí tiểu cấp, đau cột sống ngực hoặc thắt lưng trong vòng 24 giờ từ khi có triệu chứng ban đầu.",
    "ICD_Chinh": "G95.2 (Chèn ép tủy sống)",
    "Ly_Do_Nhap_Vien": "Tình trạng cấp cứu ngoại thần kinh tối khẩn để giải ép, tránh liệt vĩnh viễn.",
    "ICD_Kem_Theo": "C79.5 (Ung thư di căn xương/tủy)M51.0 (Thoát vị đĩa đệm)M46.2 (Viêm tủy xương)",
    "Ngoai_Le": "Đau lưng cấp do co cứng cơ (cụp lưng), không lan xuống chân, không rối loạn cơ tròn.",
    "Tu_Khoa": ""
  },
  {
    "ID": "HCQ27",
    "Nhom_Benh": "Hệ tuần hoàn",
    "Tinh_Trang_Benh": "Đau ngực kiểu động mạch vành cấp tính: đau thắt (bóp) nghẹt sau xương ức, có thể lan lên vai trái, lên cằm, lên cả hai vai, cơn đau thường xuất hiện sau một gắng sức nhẹ hoặc xảy ra cả trong khi nghỉ, cơn đau thường kéo dài trên 20 phút ",
    "ICD_Chinh": "I20.0 (Đau thắt ngực không ổn định)",
    "Ly_Do_Nhap_Vien": "Mô tả lâm sàng điển hình của Hội chứng vành cấp (ACS). Cần nhập viện để phân tầng nguy cơ và theo dõi men tim.",
    "ICD_Kem_Theo": "I21.9 (Nhồi máu cơ tim cấp)I25.1 (Bệnh tim thiếu máu cục bộ)R07.4 (Đau ngực không rõ NN)",
    "Ngoai_Le": "Cơn đau thắt ngực ổn định (Chronic Stable Angina), xảy ra khi gắng sức nhưng nghỉ ngơi đỡ ngay (<5-10p), đã có phác đồ điều trị.",
    "Tu_Khoa": ""
  },
  {
    "ID": "HCQ28",
    "Nhom_Benh": "Hệ tuần hoàn",
    "Tinh_Trang_Benh": "Bằng chứng tổn thương cơ tim cấp, thể hiện:- Thay đổi điện tâm đồ gợi ý hội chứng vành cấp (biến đổi ST - T)- Tăng chất chỉ điểm sinh học tim: Troponin T, Troponin I, CK-MB ",
    "ICD_Chinh": "I21.9 (Nhồi máu cơ tim cấp, không xác định)",
    "Ly_Do_Nhap_Vien": "Tiêu chuẩn vàng chẩn đoán Nhồi máu cơ tim (Lâm sàng + ECG + Men tim). Bắt buộc nhập viện cấp cứu/can thiệp.",
    "ICD_Kem_Theo": "I21.0-I21.3 (NMCT có ST chênh lên)I24.9 (Bệnh tim thiếu máu cục bộ cấp)I40 (Viêm cơ tim cấp - cũng tăng men tim)",
    "Ngoai_Le": "Tăng Troponin mạn tính nhẹ ở bệnh nhân suy thận mạn (CKD) nhưng không có biến đổi động học (delta) và không đau ngực.",
    "Tu_Khoa": ""
  },
  {
    "ID": "HCQ29",
    "Nhom_Benh": "Hệ tuần hoàn",
    "Tinh_Trang_Benh": "Tách thành động mạch chủ hoặc phình động mạch chủ đường kính lớn hơn 6cm hoặc các dấu hiệu nghi ngờ biến chứng của phình động mạch chủ",
    "ICD_Chinh": "I71.0 (Tách thành động mạch chủ) hoặc I71.4 (Phình ĐM chủ bụng)",
    "Ly_Do_Nhap_Vien": "Tình trạng dọa vỡ mạch máu lớn nhất cơ thể, nguy cơ tử vong tức thì.",
    "ICD_Kem_Theo": "I71.2 (Phình ĐM chủ ngực)I10 (Tăng huyết áp)Q87.4 (Hội chứng Marfan)",
    "Ngoai_Le": "Phình ĐM chủ kích thước nhỏ (<5cm), không triệu chứng, huyết áp kiểm soát tốt (Theo dõi định kỳ).",
    "Tu_Khoa": ""
  },
  {
    "ID": "HCQ30",
    "Nhom_Benh": "Hệ tuần hoàn",
    "Tinh_Trang_Benh": "Người bệnh huyết khối tĩnh mạch sâu chi dưới có Nguy cơ cao thuyên tắc động mạch phổi (Ước tính nguy cơ qua thang điểm Wells và Geneva)",
    "ICD_Chinh": "I80.2 (Huyết khối tĩnh mạch sâu chi dưới)",
    "Ly_Do_Nhap_Vien": "DVT đoạn gần (đùi/chậu) có nguy cơ bắn huyết khối lên phổi gây tử vong. Cần dùng chống đông liều điều trị.",
    "ICD_Kem_Theo": "I26 (Thuyên tắc phổi)O22.3 (Huyết khối tĩnh mạch sâu trong thai kỳ)Z92.1 (Tiền sử dùng chống đông)",
    "Ngoai_Le": "Huyết khối tĩnh mạch nông hoặc DVT đoạn xa (cẳng chân) nguy cơ thấp, tuân thủ điều trị chống đông uống (NOAC) tại nhà.",
    "Tu_Khoa": ""
  },
  {
    "ID": "HCQ31",
    "Nhom_Benh": "Hệ tuần hoàn",
    "Tinh_Trang_Benh": "Người bệnh có bằng chứng của huyết khối động mạch phổi trực tiếp hoặc gián tiếp trên phim chụp cắt lớp vi tính hoặc siêu âm tim: Huyết khối ở thân chung hoặc nhánh động mạch phổi, thất phải giãn, dấu hiệu Mc Conell… ",
    "ICD_Chinh": "I26.9 (Thuyên tắc mạch phổi - PE)",
    "Ly_Do_Nhap_Vien": "Chẩn đoán xác định Thuyên tắc phổi. Cần nhập viện để tiêu sợi huyết hoặc dùng chống đông.",
    "ICD_Kem_Theo": "I26.0 (PE có tâm phế cấp)I50.0 (Suy tim sung huyết)R06.0 (Khó thở)",
    "Ngoai_Le": "Thuyên tắc phổi nhánh nhỏ (sub-segmental) tình cờ phát hiện, không triệu chứng, huyết động ổn định.",
    "Tu_Khoa": ""
  },
  {
    "ID": "HCQ32",
    "Nhom_Benh": "Hệ tuần hoàn",
    "Tinh_Trang_Benh": "Thuyên tắc tĩnh mạch chi với bằng chứng ứ trệ tuần hoàn và/hoặc thiếu máu chi nặng nề",
    "ICD_Chinh": "I80 (Viêm tắc tĩnh mạch và huyết khối tĩnh mạch)",
    "Ly_Do_Nhap_Vien": "Phlegmasia Cerulea Dolens (Viêm tắc tĩnh mạch xanh đau) - thể nặng của DVT gây chèn ép động mạch.",
    "ICD_Kem_Theo": "I87.1 (Chèn ép tĩnh mạch)R60.0 (Phù khu trú)I74.3 (Tắc động mạch chi dưới)",
    "Ngoai_Le": "Suy van tĩnh mạch mạn tính gây phù chân nhẹ vào buổi chiều, không đau cấp tính.",
    "Tu_Khoa": ""
  },
  {
    "ID": "HCQ33",
    "Nhom_Benh": "Hệ tuần hoàn",
    "Tinh_Trang_Benh": "Dấu hiệu/triệu chứng thiếu máu chi cấp tính (Dấu hiệu 6P)",
    "ICD_Chinh": "I74.3 (Thuyên tắc và huyết khối động mạch chi dưới)",
    "Ly_Do_Nhap_Vien": "Dấu hiệu tắc mạch chi cấp tính (Pain, Pallor, Pulselessness...). Nguy cơ cắt cụt chi nếu không tái tưới máu trong 6h.",
    "ICD_Kem_Theo": "I74.2 (Tắc động mạch chi trên)I48 (Rung nhĩ - nguồn gốc huyết khối)E11.5 (Bàn chân ĐTĐ)",
    "Ngoai_Le": "Thiếu máu chi mạn tính (PAD), đau cách hồi, không có dấu hiệu đe dọa chi cấp tính.",
    "Tu_Khoa": ""
  },
  {
    "ID": "HCQ34",
    "Nhom_Benh": "Hệ tuần hoàn",
    "Tinh_Trang_Benh": "Dấu hiệu và/hoặc triệu chứng thiếu máu/chảy máu ở người bệnh đang dùng thuốc chống huyết khối (chống đông hoặc kháng kết tập tiểu cầu)",
    "ICD_Chinh": "D68.3 (Rối loạn chảy máu do thuốc chống đông)",
    "Ly_Do_Nhap_Vien": "Biến chứng chảy máu do quá liều thuốc hoặc tương tác thuốc. Cần nhập viện chỉnh liều/truyền chế phẩm máu.",
    "ICD_Kem_Theo": "R58 (Xuất huyết)K92.2 (Xuất huyết tiêu hóa)Z92.1 (Đang dùng thuốc chống đông)",
    "Ngoai_Le": "Chảy máu lợi nhẹ khi đánh răng hoặc bầm tím nhỏ dưới da, INR trong ngưỡng điều trị (hoặc hơi cao <4), không thiếu máu.",
    "Tu_Khoa": ""
  },
  {
    "ID": "HCQ35",
    "Nhom_Benh": "Hệ tuần hoàn",
    "Tinh_Trang_Benh": "Dấu hiệu lâm sàng đau ngực và/hoặc khó thở, kèm theo tổn thương tim trầm trọng qua siêu âm tim:- Tràn dịch màng ngoài tim- Bệnh lý cơ tim nặng (Bệnh cơ tim phì đại, bệnh cơ tim giãn)- Bệnh lý van tim nặng (hẹp chủ khít, hẹp hai lá khít…)- Tổn thương van tim cấp tính (Viêm nội tâm mạc nhiễm khuẩn)- Suy tim với phân suất tống máu thất trái giảm- Tăng áp lực động mạch phổi nặng- Khối trong tim gây cản trở huyết động ",
    "ICD_Chinh": "I50 (Suy tim) hoặc I30 (Viêm màng ngoài tim) hoặc I33 (Viêm nội tâm mạc)",
    "Ly_Do_Nhap_Vien": "Nhóm bệnh lý tim mạch cấu trúc nặng đã có triệu chứng cơ năng (NYHA III-IV). Nguy cơ đột tử hoặc suy tim mất bù.",
    "ICD_Kem_Theo": "I42 (Bệnh cơ tim)I35.0 (Hẹp van ĐM chủ)I27.0 (Tăng áp phổi nguyên phát)D15.1 (U tim)",
    "Ngoai_Le": "Các bệnh lý trên nhưng ở giai đoạn ổn định, người bệnh không khó thở khi gắng sức nhẹ (NYHA I-II), tuân thủ điều trị.",
    "Tu_Khoa": ""
  },
  {
    "ID": "HCQ36",
    "Nhom_Benh": "Hệ tuần hoàn",
    "Tinh_Trang_Benh": "Dấu hiệu điện tâm đồ/Holter điện tâm đồ thể hiện rối loạn nhịp tim nguy hiểm:- Ngoại tâm thu dạng R/T- Nhịp nhanh QRS giãn rộng- Cơn nhịp nhanh kịch phát- Block nhĩ thất cao độ, BAV III- Brugada type 1 kèm tiền sử có ngất hoặc dấu hiệu gợi ý rối loạn nhịp tim- QTc dài kèm tiền sử có ngất hoặc dấu hiệu gợi ý rối loạn nhịp tim ",
    "ICD_Chinh": "I49 (Loạn nhịp tim khác) hoặc I44.2 (Block nhĩ thất hoàn toàn)",
    "Ly_Do_Nhap_Vien": "Các rối loạn nhịp có nguy cơ chuyển thành Rung thất/Xoắn đỉnh gây ngừng tim. Cần đặt máy tạo nhịp hoặc cắt cơn.",
    "ICD_Kem_Theo": "I47.2 (Nhịp nhanh thất)I47.1 (Cơn nhịp nhanh kịch phát trên thất)I45.8 (Hội chứng Brugada/Long QT)",
    "Ngoai_Le": "Ngoại tâm thu thất thưa, đơn độc. Block AV độ 1. Block nhánh phải/trái đơn thuần không triệu chứng.",
    "Tu_Khoa": ""
  },
  {
    "ID": "HCQ37",
    "Nhom_Benh": "Hệ tuần hoàn",
    "Tinh_Trang_Benh": "Vỡ khí - phế quản sau một chấn thương",
    "ICD_Chinh": "S27.4 (Chấn thương phế quản) hoặc S27.5 (Chấn thương khí quản đoạn ngực)",
    "Ly_Do_Nhap_Vien": "Tổn thương đường dẫn khí lớn trong lồng ngực, gây tràn khí trung thất/màng phổi áp lực. Cần phẫu thuật cấp cứu.",
    "ICD_Kem_Theo": "S27.0 (Tràn khí màng phổi do chấn thương)J98.1 (Xẹp phổi)T79.4 (Sốc chấn thương)",
    "Ngoai_Le": "Không có ngoại lệ.",
    "Tu_Khoa": ""
  },
  {
    "ID": "HCQ38",
    "Nhom_Benh": "Hệ tuần hoàn",
    "Tinh_Trang_Benh": "Thoát vị hoành",
    "ICD_Chinh": "K44.0 (Thoát vị hoành có tắc nghẽn) hoặc S27.8 (Chấn thương cơ hoành)",
    "Ly_Do_Nhap_Vien": "Tình trạng tạng bụng chui lên lồng ngực gây chèn ép tim phổi và nghẹt ruột. S27.8 dùng nếu do chấn thương mới.",
    "ICD_Kem_Theo": "Q79.0 (Thoát vị hoành bẩm sinh)J96.0 (Suy hô hấp cấp)K56 (Tắc ruột)",
    "Ngoai_Le": "Thoát vị hoành trượt (Hiatal hernia) nhẹ K44.9, chỉ gây trào ngược, không có dấu hiệu nghẹt hay suy hô hấp.",
    "Tu_Khoa": ""
  },
  {
    "ID": "HCQ39",
    "Nhom_Benh": "Hệ tuần hoàn",
    "Tinh_Trang_Benh": "Tràn khí màng phổi tự phát",
    "ICD_Chinh": "J93.1 (Tràn khí màng phổi tự phát khác)",
    "Ly_Do_Nhap_Vien": "Khí lọt vào khoang màng phổi gây xẹp phổi. Cần dẫn lưu khí nếu lượng nhiều hoặc có khó thở.",
    "ICD_Kem_Theo": "J93.0 (Tràn khí màng phổi tự phát do áp lực)J43.9 (Khí phế thũng - Vỡ kén khí)A16.2 (Lao phổi)",
    "Ngoai_Le": "Tràn khí lượng ít (<15-20% thể tích bên phổi), không khó thở, SpO2 tốt (Cho thở oxy và theo dõi sát, có thể không cần dẫn lưu ngay).",
    "Tu_Khoa": ""
  },
  {
    "ID": "HCQ40",
    "Nhom_Benh": "Hệ tuần hoàn",
    "Tinh_Trang_Benh": "Chèn ép tim",
    "ICD_Chinh": "I31.9 (Bệnh màng ngoài tim, không xác định)",
    "Ly_Do_Nhap_Vien": "Thường dùng chỉ định cho \"Cardiac Tamponade\" (Chèn ép tim cấp). Cần chọc dịch giải áp ngay.",
    "ICD_Kem_Theo": "I30 (Viêm màng ngoài tim cấp)S26 (Chấn thương tim gây tràn máu)C38.0 (Ung thư tim)",
    "Ngoai_Le": "Tràn dịch màng tim lượng ít/trung bình, huyết động ổn định, không có dấu hiệu chèn ép (mạch nghịch đảo, gan to...).",
    "Tu_Khoa": ""
  },
  {
    "ID": "HCQ41",
    "Nhom_Benh": "Hệ tuần hoàn",
    "Tinh_Trang_Benh": "Vết thương tim",
    "ICD_Chinh": "S26.0 (Chấn thương tim có tràn máu màng ngoài tim) hoặc S26.8",
    "Ly_Do_Nhap_Vien": "Vết thương thấu ngực xuyên vào tim. Tối khẩn cấp (Code Red/Blue).",
    "ICD_Kem_Theo": "S21 (Vết thương hở lồng ngực)R57.1 (Sốc mất máu)T14.1 (Vết thương hở)",
    "Ngoai_Le": "Không có ngoại lệ.",
    "Tu_Khoa": ""
  },
  {
    "ID": "HCQ42",
    "Nhom_Benh": "Hệ tuần hoàn",
    "Tinh_Trang_Benh": "Chấn thương tim",
    "ICD_Chinh": "S26.9 (Chấn thương tim, không xác định)",
    "Ly_Do_Nhap_Vien": "Gồm đụng dập cơ tim (Myocardial Contusion) gây rối loạn nhịp hoặc suy tim sau tai nạn.",
    "ICD_Kem_Theo": "S22.3 (Gãy xương sườn)I49 (Rối loạn nhịp tim)I50 (Suy tim cấp)",
    "Ngoai_Le": "Đụng dập thành ngực trước tim nhẹ, ECG bình thường, men tim không tăng, siêu âm tim bình thường.",
    "Tu_Khoa": ""
  },
  {
    "ID": "HCQ43",
    "Nhom_Benh": "Hệ tuần hoàn",
    "Tinh_Trang_Benh": "Vết thương mạch máu ngoại vi",
    "ICD_Chinh": "T14.5 (Tổn thương mạch máu vùng chưa xác định)",
    "Ly_Do_Nhap_Vien": "Cần xác định vị trí để mã hóa cụ thể (Ví dụ: S55 - Mạch máu cẳng tay). Nguy cơ thiếu máu chi/sốc.",
    "ICD_Kem_Theo": "S75 (Tổn thương mạch máu vùng háng/đùi)S45 (Tổn thương mạch máu vai/cánh tay)R58 (Xuất huyết)",
    "Ngoai_Le": "Vết thương phần mềm chảy máu tĩnh mạch nông, đã cầm máu tốt, tưới máu đầu chi bình thường.",
    "Tu_Khoa": ""
  },
  {
    "ID": "HCQ44",
    "Nhom_Benh": "Hệ tuần hoàn",
    "Tinh_Trang_Benh": "Vết thương mạch máu vùng cổ và nền cổ",
    "ICD_Chinh": "S15 (Tổn thương mạch máu vùng cổ)",
    "Ly_Do_Nhap_Vien": "Nguy cơ tổn thương động mạch cảnh/tĩnh mạch cảnh gây thiếu máu não hoặc thuyên tắc khí.",
    "ICD_Kem_Theo": "S15.0 (Tổn thương động mạch cảnh)S11 (Vết thương hở vùng cổ)I63 (Nhồi máu não)",
    "Ngoai_Le": "Không có ngoại lệ đối với vết thương sâu vùng nền cổ.",
    "Tu_Khoa": ""
  },
  {
    "ID": "HCQ45",
    "Nhom_Benh": "Hệ tuần hoàn",
    "Tinh_Trang_Benh": "Vết thương mạch máu chủ ngực - bụng",
    "ICD_Chinh": "S25 (Tổn thương mạch máu lồng ngực) hoặc S35 (Mạch máu bụng)",
    "Ly_Do_Nhap_Vien": "Tổn thương Động mạch chủ hoặc Tĩnh mạch chủ. Tỷ lệ tử vong cực cao nếu không phẫu thuật ngay.",
    "ICD_Kem_Theo": "S25.0 (Tổn thương ĐM chủ ngực)S35.0 (Tổn thương ĐM chủ bụng)R57 (Sốc)",
    "Ngoai_Le": "Không có ngoại lệ.",
    "Tu_Khoa": ""
  },
  {
    "ID": "HCQ46",
    "Nhom_Benh": "Hệ tuần hoàn",
    "Tinh_Trang_Benh": "Thương tổn mạch máu trong gãy xương",
    "ICD_Chinh": "T14.5 (Tổn thương mạch máu) kèm mã gãy xương T14.2",
    "Ly_Do_Nhap_Vien": "Gãy xương hở hoặc kín chèn ép/làm rách mạch máu chính (Ví dụ: Gãy trên lồi cầu xương cánh tay).",
    "ICD_Kem_Theo": "S72 (Gãy xương đùi)S82 (Gãy xương cẳng chân)I74 (Tắc mạch cấp)",
    "Ngoai_Le": "Gãy xương không kèm dấu hiệu tổn thương mạch (mạch bắt rõ, chi hồng ấm).",
    "Tu_Khoa": ""
  },
  {
    "ID": "HCQ47",
    "Nhom_Benh": "Hệ tuần hoàn",
    "Tinh_Trang_Benh": "Vỡ eo động mạch chủ",
    "ICD_Chinh": "S25.0 (Tổn thương động mạch chủ ngực) hoặc I71.1",
    "Ly_Do_Nhap_Vien": "\"Vỡ eo\" (Isthmus rupture) thường gặp nhất trong chấn thương ngực kín (tai nạn giao thông). Nếu tự vỡ do bệnh lý dùng I71.1.",
    "ICD_Kem_Theo": "T14.2 (Gãy xương do chấn thương)I71.2 (Phình động mạch chủ ngực)R57 (Sốc)",
    "Ngoai_Le": "Không có ngoại lệ. Tỷ lệ tử vong gần như tuyệt đối nếu không can thiệp ngay.",
    "Tu_Khoa": ""
  },
  {
    "ID": "HCQ48",
    "Nhom_Benh": "Hệ tuần hoàn",
    "Tinh_Trang_Benh": "Tắc động mạch cấp tính",
    "ICD_Chinh": "I74 (Thuyên tắc và huyết khối động mạch)",
    "Ly_Do_Nhap_Vien": "Tình trạng thiếu máu nuôi dưỡng mô cấp tính. Cần chọn mã cụ thể theo vị trí (Ví dụ: I74.3 - Chi dưới).",
    "ICD_Kem_Theo": "I74.3 (Tắc động mạch chi dưới)I74.1 (Tắc động mạch chủ bụng)I48 (Rung nhĩ - nguồn gốc cục máu đông)",
    "Ngoai_Le": "Tắc động mạch mạn tính (PAD), có tuần hoàn bàng hệ tốt, không đau khi nghỉ, chỉ đau cách hồi.",
    "Tu_Khoa": ""
  },
  {
    "ID": "HCQ49",
    "Nhom_Benh": "Hệ tuần hoàn",
    "Tinh_Trang_Benh": "Tổn thương mạch máu do thầy thuốc gây nên",
    "ICD_Chinh": "T81.7 (Các biến chứng mạch máu sau thủ thuật, không phân loại nơi khác)",
    "Ly_Do_Nhap_Vien": "Gồm: Giả phình động mạch, thông động-tĩnh mạch, thủng mạch sau can thiệp (Cathlab, phẫu thuật...).",
    "ICD_Kem_Theo": "I72 (Giả phình động mạch)I77.0 (Dò động - tĩnh mạch)T80 (Biến chứng sau tiêm truyền)",
    "Ngoai_Le": "Vết bầm tím nhỏ (Hematoma) tại chỗ chọc kim lấy máu/tiêm truyền, tự cầm, không lan rộng.",
    "Tu_Khoa": ""
  },
  {
    "ID": "HCQ50",
    "Nhom_Benh": "Hệ tuần hoàn",
    "Tinh_Trang_Benh": "Phình động mạch chủ vỡ",
    "ICD_Chinh": "I71.3 (Phình động mạch chủ bụng vỡ) hoặc I71.1 (Phình ngực vỡ)",
    "Ly_Do_Nhap_Vien": "Tình trạng cấp cứu tối khẩn. I71.3 là phổ biến nhất (vỡ phình chủ bụng AAA).",
    "ICD_Kem_Theo": "I71.8 (Vỡ phình động mạch chủ vị trí khác)I10 (Tăng huyết áp)R57.1 (Sốc mất máu)",
    "Ngoai_Le": "Không có ngoại lệ.",
    "Tu_Khoa": ""
  },
  {
    "ID": "HCQ51",
    "Nhom_Benh": "Hệ tuần hoàn",
    "Tinh_Trang_Benh": "Tắc chạc ba chủ chậu cấp tính",
    "ICD_Chinh": "I74.0 (Thuyên tắc và huyết khối động mạch chủ bụng)",
    "Ly_Do_Nhap_Vien": "Hội chứng Leriche cấp tính. Tắc nghẽn tại ngã ba động mạch chủ - chậu, gây thiếu máu nuôi cả 2 chi dưới và vùng chậu.",
    "ICD_Kem_Theo": "I70.0 (Xơ vữa động mạch chủ)I74.5 (Tắc động mạch chậu)I48 (Rung nhĩ)",
    "Ngoai_Le": "Hẹp mạn tính ngã ba chủ chậu, bệnh nhân đi lại được quãng ngắn, mạch bẹn bắt yếu nhưng còn.",
    "Tu_Khoa": ""
  },
  {
    "ID": "HCQ52",
    "Nhom_Benh": "Hệ tuần hoàn",
    "Tinh_Trang_Benh": "Hội chứng tĩnh mạch chủ trên và vai trò của phẫu thuật",
    "ICD_Chinh": "I87.1 (Chèn ép tĩnh mạch)",
    "Ly_Do_Nhap_Vien": "Thường do khối u phổi/trung thất chèn ép gây phù áo khoác, khó thở. Cần nhập viện để đặt stent hoặc xạ trị/hóa trị cấp.",
    "ICD_Kem_Theo": "C34 (Ung thư phổi)C38.1 (U trung thất)J96 (Suy hô hấp)",
    "Ngoai_Le": "Phù nhẹ mặt buổi sáng, không khó thở, tuần hoàn bàng hệ ngực chưa rõ, đang chờ kết quả sinh thiết (có thể ngoại trú ngắn hạn).",
    "Tu_Khoa": ""
  },
  {
    "ID": "HCQ53",
    "Nhom_Benh": "Hệ tuần hoàn",
    "Tinh_Trang_Benh": "Bệnh huyết khối tĩnh mạch cấp tính hoặc bán cấp nhưng có ảnh hưởng đến toàn trạng",
    "ICD_Chinh": "I80 (Viêm tắc tĩnh mạch và huyết khối tĩnh mạch)",
    "Ly_Do_Nhap_Vien": "Nhóm DVT (Huyết khối tĩnh mạch sâu) gây sưng đau nhiều, sốt hoặc nguy cơ thuyên tắc phổi.",
    "ICD_Kem_Theo": "I80.2 (Huyết khối tĩnh mạch sâu chi dưới)I82 (Huyết khối tĩnh mạch khác)O22.3 (Huyết khối thai kỳ)",
    "Ngoai_Le": "Huyết khối tĩnh mạch nông, khu trú, ít đau, không ảnh hưởng toàn trạng, đi lại bình thường.",
    "Tu_Khoa": ""
  },
  {
    "ID": "HCQ54",
    "Nhom_Benh": "Hệ tuần hoàn",
    "Tinh_Trang_Benh": "Đối với người bệnh đang dùng thuốc chống đông, nếu tác dụng chống đông dưới ngưỡng điều trị (ví dụ INR < 2 ở người bệnh dùng kháng vitamin K). ",
    "ICD_Chinh": "Z92.1 (Tiền sử dùng thuốc chống đông dài hạn) + Mã bệnh chính",
    "Ly_Do_Nhap_Vien": "Nguy cơ hình thành huyết khối (đột quỵ, kẹt van) do liều thuốc không đủ. Cần nhập viện để gối đầu Heparin/Lovenox.",
    "ICD_Kem_Theo": "I48 (Rung nhĩ)Z95.2 (Mang van tim nhân tạo)R79.8 (Bất thường đông máu)",
    "Ngoai_Le": "INR hơi thấp (ví dụ 1.8 so với mục tiêu 2.0-3.0), bệnh nhân nguy cơ thấp, bác sĩ chỉnh liều uống và hẹn xét nghiệm lại sau 3-5 ngày.",
    "Tu_Khoa": ""
  },
  {
    "ID": "HCQ55",
    "Nhom_Benh": "Hệ tuần hoàn",
    "Tinh_Trang_Benh": "Các trường hợp kết quả siêu âm tim ghi nhận hình ảnh bất động hoàn toàn hoặc bán phần van tim nhân tạo cơ học.",
    "ICD_Chinh": "T82.0 (Biến chứng cơ học của van tim nhân tạo)",
    "Ly_Do_Nhap_Vien": "Kẹt van tim (Stuck valve) do huyết khối hoặc mô xơ. Nguy cơ tử vong do suy tim cấp/ngừng tim.",
    "ICD_Kem_Theo": "Z95.2 (Có van tim nhân tạo)I74 (Huyết khối)I50 (Suy tim cấp)",
    "Ngoai_Le": "Không có ngoại lệ. Đây là biến chứng nguy hiểm nhất của van cơ học.",
    "Tu_Khoa": ""
  },
  {
    "ID": "HCQ56",
    "Nhom_Benh": "Hệ tuần hoàn",
    "Tinh_Trang_Benh": "Mạch < 50 lần/phút; hoặc mạch > 120 lần/phút",
    "ICD_Chinh": "R00.1 (Nhịp tim chậm) hoặc R00.0 (Nhịp tim nhanh)",
    "Ly_Do_Nhap_Vien": "Các ngưỡng mạch này ảnh hưởng đến cung lượng tim. Cần tìm nguyên nhân (Rối loạn nhịp, Sốt, Cường giáp...).",
    "ICD_Kem_Theo": "I49 (Loạn nhịp tim)E05 (Nhiễm độc giáp)A41 (Nhiễm trùng)",
    "Ngoai_Le": "Nhịp chậm xoang (50-55) ở vận động viên thể thao không triệu chứng. Nhịp nhanh xoang (120) do lo lắng/gắng sức, nghỉ ngơi về bình thường.",
    "Tu_Khoa": ""
  },
  {
    "ID": "HCQ57",
    "Nhom_Benh": "Hệ tuần hoàn",
    "Tinh_Trang_Benh": "Nhiệt độ > 380C",
    "ICD_Chinh": "R50.9 (Sốt, không xác định)",
    "Ly_Do_Nhap_Vien": "Lưu ý: Văn bản gốc ghi \"380C\", hiểu là sốt > 38°C. Dấu hiệu nhiễm trùng hoặc phản ứng viêm hệ thống cấp tính.",
    "ICD_Kem_Theo": "A41.9 (Nhiễm khuẩn huyết)I33.0 (Viêm nội tâm mạc nhiễm khuẩn)J18.9 (Viêm phổi)",
    "Ngoai_Le": "Sốt do nhiễm siêu vi hô hấp trên nhẹ, không có ổ nhiễm trùng khu trú nguy hiểm, hạ sốt khi dùng thuốc.",
    "Tu_Khoa": ""
  },
  {
    "ID": "HCQ58",
    "Nhom_Benh": "Hệ tuần hoàn",
    "Tinh_Trang_Benh": "Huyết áp < 90/60 mmHg; hoặc huyết áp > 160/90 mmHg",
    "ICD_Chinh": "I95.9 (Tụt huyết áp) hoặc I10 (Tăng huyết áp vô căn - Cơn THA)",
    "Ly_Do_Nhap_Vien": "Ngưỡng huyết áp nguy hiểm báo động sốc (thấp) hoặc cơn tăng huyết áp cấp cứu (cao).",
    "ICD_Kem_Theo": "R57 (Sốc)I67.4 (Bệnh não do tăng huyết áp)I50 (Suy tim)",
    "Ngoai_Le": "Tăng huyết áp mạn tính kiểm soát kém (Urgency) nhưng không có tổn thương cơ quan đích cấp tính. Huyết áp thấp cơ địa không triệu chứng.",
    "Tu_Khoa": ""
  },
  {
    "ID": "HCQ59",
    "Nhom_Benh": "Hệ tuần hoàn",
    "Tinh_Trang_Benh": "Tần số thở > 30 lần/phút; hoặc SpO2 < 96%",
    "ICD_Chinh": "R06.0 (Khó thở) hoặc J96.0 (Suy hô hấp cấp)",
    "Ly_Do_Nhap_Vien": "Dấu hiệu suy hô hấp hoặc giảm oxy máu. SpO2 < 96% là chỉ điểm sớm cần hỗ trợ oxy.",
    "ICD_Kem_Theo": "J80 (ARDS)I50.1 (Suy tim trái - Phù phổi)J44.1 (Đợt cấp COPD)",
    "Ngoai_Le": "Bệnh phổi mạn tính (COPD) có SpO2 nền thấp (94-95%) nhưng ổn định, không khó thở tăng thêm.",
    "Tu_Khoa": ""
  },
  {
    "ID": "HCQ60",
    "Nhom_Benh": "Hệ tuần hoàn",
    "Tinh_Trang_Benh": "Suy tim NYHA III trở lên",
    "ICD_Chinh": "I50.9 (Suy tim, không xác định)",
    "Ly_Do_Nhap_Vien": "Suy tim mức độ nặng (khó thở khi gắng sức nhẹ hoặc nghỉ ngơi). Cần điều trị nội trú để tối ưu hóa tiền gánh/hậu gánh.",
    "ICD_Kem_Theo": "I50.0 (Suy tim sung huyết)I11.0 (Tim do tăng huyết áp)I42 (Bệnh cơ tim)",
    "Ngoai_Le": "Suy tim NYHA III mạn tính ổn định, đang điều trị thuốc theo phác đồ, tái khám định kỳ không có đợt cấp.",
    "Tu_Khoa": ""
  },
  {
    "ID": "HCQ61",
    "Nhom_Benh": "Hệ tuần hoàn",
    "Tinh_Trang_Benh": "Cơn đau thắt ngực mới xuất hiện lần đầu",
    "ICD_Chinh": "I20.0 (Đau thắt ngực không ổn định)",
    "Ly_Do_Nhap_Vien": "Đau ngực mới (New onset angina) là một dạng của Hội chứng vành cấp, nguy cơ tiến triển thành nhồi máu cơ tim.",
    "ICD_Kem_Theo": "I25.1 (Bệnh tim thiếu máu cục bộ)I21 (Nhồi máu cơ tim)R07.3 (Đau ngực khác)",
    "Ngoai_Le": "Đau ngực không điển hình (đau nhói, đau khi ấn), ECG và men tim bình thường.",
    "Tu_Khoa": ""
  },
  {
    "ID": "HCQ62",
    "Nhom_Benh": "Hệ tuần hoàn",
    "Tinh_Trang_Benh": "Cơn đau thắt ngực tái phát mức độ CCS III trở lên",
    "ICD_Chinh": "I20.8 (Các thể đau thắt ngực khác)",
    "Ly_Do_Nhap_Vien": "Đau ngực hạn chế đáng kể hoạt động thể lực (CCS III). Dấu hiệu hẹp mạch vành khít hoặc tắc lại stent/cầu nối.",
    "ICD_Kem_Theo": "I25.0 (Bệnh tim mạch vành do xơ vữa)Z95.1 (Có phẫu thuật bắc cầu mạch vành)Z95.5 (Có can thiệp mạch vành)",
    "Ngoai_Le": "Đau thắt ngực ổn định (CCS I-II), kiểm soát tốt bằng thuốc giãn mạch.",
    "Tu_Khoa": ""
  },
  {
    "ID": "HCQ63",
    "Nhom_Benh": "Hệ tuần hoàn",
    "Tinh_Trang_Benh": "Choáng hoặc ngất không rõ nguyên nhân",
    "ICD_Chinh": "R55 (Ngất và xỉu)",
    "Ly_Do_Nhap_Vien": "Cần nhập viện tầm soát nguyên nhân tim mạch (Rối loạn nhịp, Hẹp van tim, Bệnh cơ tim...).",
    "ICD_Kem_Theo": "I45.9 (Rối loạn dẫn truyền)I49.9 (Loạn nhịp tim)G40 (Động kinh)",
    "Ngoai_Le": "Ngất do phản xạ thần kinh phế vị (Vasovagal) có hoàn cảnh khởi phát rõ (sợ máu, đứng lâu), tỉnh táo ngay.",
    "Tu_Khoa": ""
  },
  {
    "ID": "HCQ64",
    "Nhom_Benh": "Hệ tuần hoàn",
    "Tinh_Trang_Benh": "Mất hoặc giảm mạch ngoại biên cấp tính",
    "ICD_Chinh": "I74 (Thuyên tắc và huyết khối động mạch)",
    "Ly_Do_Nhap_Vien": "Dấu hiệu tắc mạch chi cấp tính. Cần so sánh hai bên và dùng Doppler mạch máu chẩn đoán ngay.",
    "ICD_Kem_Theo": "I74.3 (Tắc động mạch chi dưới)I73.9 (Bệnh mạch máu ngoại biên)E11.5 (Biến chứng mạch máu ĐTĐ)",
    "Ngoai_Le": "Mạch ngoại biên yếu do phù nề mô mềm hoặc béo phì, nhưng siêu âm Doppler vẫn có phổ mạch bình thường.",
    "Tu_Khoa": ""
  },
  {
    "ID": "HCQ65",
    "Nhom_Benh": "Hệ tuần hoàn",
    "Tinh_Trang_Benh": "Dấu hiệu tím tái hoặc lạnh hoặc phù chi bất thường",
    "ICD_Chinh": "R23.0 (Chứng xanh tím) hoặc R60.9 (Phù, không xác định)",
    "Ly_Do_Nhap_Vien": "Gợi ý suy tim phải, huyết khối tĩnh mạch sâu (DVT) hoặc thiếu máu động mạch chi cấp.",
    "ICD_Kem_Theo": "I80 (Huyết khối tĩnh mạch sâu)I50.0 (Suy tim sung huyết)I87.2 (Suy tĩnh mạch)",
    "Ngoai_Le": "Phù nhẹ do tư thế hoặc suy van tĩnh mạch mạn tính, không đau, không tím cấp tính.",
    "Tu_Khoa": ""
  },
  {
    "ID": "HCQ66",
    "Nhom_Benh": "Hệ tuần hoàn",
    "Tinh_Trang_Benh": "Bất thường cận lâm sàng- Troponin Ths > 14 ng/L- Pro-BNP > 125 pg/ml hoặc BNP > 100 pg/ml- Siêu âm tim EF < 50% hoặc rối loạn vận động vùng- ECG có rối loạn nhịp tim (Block A.V độ II, ngoại tâm thu thất độ II trở lên, rung nhĩ nhanh hoặc chậm, khoảng ngừng xoang > 2.0s). ",
    "ICD_Chinh": "R79 (Kết quả bất thường của xét nghiệm máu) hoặc R94.3 (Kết quả bất thường tim mạch)",
    "Ly_Do_Nhap_Vien": "Nhóm các chỉ số vàng chẩn đoán Nhồi máu cơ tim (Troponin), Suy tim (BNP, EF) và Rối loạn nhịp nguy hiểm.",
    "ICD_Kem_Theo": "I21 (Nhồi máu cơ tim)I50 (Suy tim)I44.1 (Block nhĩ thất độ 2)I48 (Rung nhĩ)",
    "Ngoai_Le": "Troponin tăng nhẹ mạn tính ở bệnh nhân suy thận. Rung nhĩ mạn tính đã kiểm soát tần số. Suy tim EF thấp nhưng ổn định (không có triệu chứng cấp).",
    "Tu_Khoa": ""
  },
  {
    "ID": "HCQ67",
    "Nhom_Benh": "Hệ tuần hoàn",
    "Tinh_Trang_Benh": "Nhịp không đều mới phát hiện",
    "ICD_Chinh": "I49.9 (Loạn nhịp tim, không xác định)",
    "Ly_Do_Nhap_Vien": "Rối loạn nhịp mới (New onset arrhythmia) cần nhập viện để xác định loại (Rung nhĩ, Cuồng nhĩ...) và nguyên nhân.",
    "ICD_Kem_Theo": "I48 (Rung nhĩ và cuồng động nhĩ)I47.1 (Nhịp nhanh trên thất)E05 (Cường giáp)",
    "Ngoai_Le": "Nhịp xoang không đều theo hô hấp (Sinus arrhythmia) là biến đổi sinh lý bình thường.",
    "Tu_Khoa": ""
  },
  {
    "ID": "HCQ68",
    "Nhom_Benh": "Hệ hô hấp",
    "Tinh_Trang_Benh": "Ho cơn nhiều và nặng ngực",
    "ICD_Chinh": "R05 (Ho)",
    "Ly_Do_Nhap_Vien": "Triệu chứng cơ năng gợi ý kích thích đường thở nhiều hoặc co thắt phế quản.",
    "ICD_Kem_Theo": "J40 (Viêm phế quản không xác định)J20 (Viêm phế quản cấp)R07.4 (Đau ngực)",
    "Ngoai_Le": "Ho khan do kích ứng họng hoặc trào ngược nhẹ, phổi không rale, SpO2 bình thường.",
    "Tu_Khoa": ""
  },
  {
    "ID": "HCQ69",
    "Nhom_Benh": "Hệ hô hấp",
    "Tinh_Trang_Benh": "Ho ộc mủ",
    "ICD_Chinh": "J85.1 (Áp xe phổi có viêm phổi) hoặc J47 (Giãn phế quản)",
    "Ly_Do_Nhap_Vien": "Dấu hiệu vỡ áp xe phổi hoặc giãn phế quản bội nhiễm nặng.",
    "ICD_Kem_Theo": "J85.2 (Áp xe phổi không có viêm phổi)J18.9 (Viêm phổi)A16.2 (Lao phổi)",
    "Ngoai_Le": "Khạc đờm đục buổi sáng ở người hút thuốc lá mạn tính (COPD ổn định), không sốt, không khó thở tăng.",
    "Tu_Khoa": ""
  },
  {
    "ID": "HCQ70",
    "Nhom_Benh": "Hệ hô hấp",
    "Tinh_Trang_Benh": "Hội chứng chèn ép tĩnh mạch chủ trên",
    "ICD_Chinh": "I87.1 (Chèn ép tĩnh mạch)",
    "Ly_Do_Nhap_Vien": "Thường do khối u trung thất chèn ép. Gây phù áo khoác, tím mặt, giãn tĩnh mạch cổ/ngực.",
    "ICD_Kem_Theo": "C34 (Ung thư phổi)C38.1 (U trung thất)C78.1 (Ung thư di căn trung thất)",
    "Ngoai_Le": "Đã chẩn đoán và đang điều trị ổn định, triệu chứng không tiến triển cấp tính (phù không tăng thêm).",
    "Tu_Khoa": ""
  },
  {
    "ID": "HCQ71",
    "Nhom_Benh": "Hệ hô hấp",
    "Tinh_Trang_Benh": "Tràn khí màng phổi hoặc tràn khí trung thất, tràn khí dưới da",
    "ICD_Chinh": "J93.9 (Tràn khí màng phổi) hoặc J98.2 (Tràn khí trung thất)",
    "Ly_Do_Nhap_Vien": "Tình trạng khí lọt vào khoang màng phổi/trung thất gây xẹp phổi/chèn ép tim.",
    "ICD_Kem_Theo": "J93.1 (Tràn khí màng phổi tự phát)S27.0 (TKMP do chấn thương)J43 (Khí phế thũng)",
    "Ngoai_Le": "Tràn khí màng phổi lượng rất ít (khu trú vùng đỉnh), bệnh nhân không khó thở, bác sĩ chỉ định theo dõi.",
    "Tu_Khoa": ""
  },
  {
    "ID": "HCQ72",
    "Nhom_Benh": "Hệ hô hấp",
    "Tinh_Trang_Benh": "Tràn dịch màng phổi gây đau ngực hoặc gây khó thở",
    "ICD_Chinh": "J90 (Tràn dịch màng phổi, không phân loại nơi khác)",
    "Ly_Do_Nhap_Vien": "Tràn dịch lượng trung bình/nhiều chèn ép nhu mô phổi. Cần chọc dịch chẩn đoán/giải áp.",
    "ICD_Kem_Theo": "A16.5 (Lao màng phổi)C78.2 (Ung thư di căn màng phổi)I50 (Suy tim)",
    "Ngoai_Le": "Tràn dịch màng phổi lượng ít (góc sườn hoành tù nhẹ), không đau ngực, không khó thở.",
    "Tu_Khoa": ""
  },
  {
    "ID": "HCQ73",
    "Nhom_Benh": "Hệ hô hấp",
    "Tinh_Trang_Benh": "Áp xe phổi hoặc có tổn thương dạng hang ở phổi có nguy cơ vỡ",
    "ICD_Chinh": "J85.2 (Áp xe phổi không có viêm phổi)",
    "Ly_Do_Nhap_Vien": "Ổ mủ khu trú trong nhu mô phổi. Nguy cơ vỡ vào màng phổi gây tràn mủ/tràn khí.",
    "ICD_Kem_Theo": "A16.2 (Lao phổi hang)J86 (Mủ màng phổi)B44 (Nấm phổi)",
    "Ngoai_Le": "Hang lao cũ (xơ hóa), thành dày, ổn định, không có mức nước-hơi, xét nghiệm đờm âm tính.",
    "Tu_Khoa": ""
  },
  {
    "ID": "HCQ74",
    "Nhom_Benh": "Hệ hô hấp",
    "Tinh_Trang_Benh": "Nghi ngờ tắc động mạch phổi, nhồi máu phổi",
    "ICD_Chinh": "I26.9 (Thuyên tắc mạch phổi không có tâm phế cấp)",
    "Ly_Do_Nhap_Vien": "Tình trạng tắc nghẽn động mạch phổi do huyết khối. Cần chụp CT mạch phổi (CTPA) khẳng định.",
    "ICD_Kem_Theo": "I26.0 (Thuyên tắc phổi có tâm phế cấp)I80.2 (Huyết khối tĩnh mạch sâu)R06.0 (Khó thở)",
    "Ngoai_Le": "Khó thở không rõ nguyên nhân nhưng D-dimer âm tính, nguy cơ thấp (Wells score thấp).",
    "Tu_Khoa": ""
  },
  {
    "ID": "HCQ75",
    "Nhom_Benh": "Hệ hô hấp",
    "Tinh_Trang_Benh": "Ho ra máu.",
    "ICD_Chinh": "R04.2 (Ho ra máu)",
    "Ly_Do_Nhap_Vien": "Cần nhập viện để cầm máu và soi phế quản tìm nguyên nhân (Lao, giãn phế quản, K phổi).",
    "ICD_Kem_Theo": "A15 (Lao phổi)J47 (Giãn phế quản)C34 (Ung thư phổi)",
    "Ngoai_Le": "Khạc ra dây máu nhỏ lẫn đờm do viêm họng cấp hoặc viêm lợi chảy máu.",
    "Tu_Khoa": ""
  },
  {
    "ID": "HCQ76",
    "Nhom_Benh": "Hệ hô hấp",
    "Tinh_Trang_Benh": "Khó thở trong tất cả các nguyên nhân.",
    "ICD_Chinh": "R06.0 (Khó thở)",
    "Ly_Do_Nhap_Vien": "Triệu chứng báo động suy hô hấp. Cần nhập viện để xác định nguyên nhân và hỗ trợ oxy.",
    "ICD_Kem_Theo": "J45 (Hen phế quản)I50 (Suy tim)J44 (COPD)",
    "Ngoai_Le": "Cảm giác khó thở cơ năng (do lo âu), khám phổi bình thường, SpO2 98-100%.",
    "Tu_Khoa": ""
  },
  {
    "ID": "HCQ77",
    "Nhom_Benh": "Hệ hô hấp",
    "Tinh_Trang_Benh": "Cơn hen phế quản không đáp ứng với thuốc giãn phế quản điều trị tại nhà",
    "ICD_Chinh": "J45.9 (Hen phế quản, không xác định)",
    "Ly_Do_Nhap_Vien": "Dấu hiệu cơn hen cấp mức độ trung bình-nặng. Cần khí dung và Corticoid đường toàn thân.",
    "ICD_Kem_Theo": "J46 (Trạng thái hen)J96.0 (Suy hô hấp cấp)J18 (Viêm phổi bội nhiễm)",
    "Ngoai_Le": "Cơn hen nhẹ, cắt cơn hoàn toàn sau khi xịt Ventolin, PEF > 80% giá trị lý thuyết.",
    "Tu_Khoa": ""
  },
  {
    "ID": "HCQ78",
    "Nhom_Benh": "Hệ hô hấp",
    "Tinh_Trang_Benh": "Độ bão hoà oxy mao mạch SPO2 giảm xuống dưới 90% khi đã được thở oxy mark túi trên 6 l/p",
    "ICD_Chinh": "J96.0 (Suy hô hấp cấp)",
    "Ly_Do_Nhap_Vien": "Lưu ý: \"mark túi\" trong văn bản gốc là lỗi chính tả của \"mask túi\". Dấu hiệu suy hô hấp nặng (Type 1) kháng trị với liệu pháp oxy thông thường.",
    "ICD_Kem_Theo": "J80 (Hội chứng suy hô hấp cấp tiến triển - ARDS)J18.9 (Viêm phổi nặng)U07.1 (COVID-19)",
    "Ngoai_Le": "Bệnh nhân COPD giai đoạn cuối thở oxy dài hạn tại nhà, SpO2 nền thấp nhưng ổn định, không tụt thêm.",
    "Tu_Khoa": ""
  },
  {
    "ID": "HCQ79",
    "Nhom_Benh": "Hệ hô hấp",
    "Tinh_Trang_Benh": "Ho ộc mủ gây suy hô hấp",
    "ICD_Chinh": "J85.1 (Áp xe phổi có viêm phổi) hoặc J47 (Giãn phế quản) kèm J96.0",
    "Ly_Do_Nhap_Vien": "Tình trạng nặng hơn của mục 2 (có thêm suy hô hấp). Cần dẫn lưu tư thế, kháng sinh mạnh và hỗ trợ hô hấp.",
    "ICD_Kem_Theo": "J96.0 (Suy hô hấp cấp)J86.9 (Mủ màng phổi)A16.2 (Lao phổi)",
    "Ngoai_Le": "Không có ngoại lệ (đã có biến chứng suy hô hấp).",
    "Tu_Khoa": ""
  },
  {
    "ID": "HCQ80",
    "Nhom_Benh": "Hệ hô hấp",
    "Tinh_Trang_Benh": "Cơn hen phế quản nặng, nguy kịch",
    "ICD_Chinh": "J46 (Trạng thái hen - Status asthmaticus)",
    "Ly_Do_Nhap_Vien": "Cơn hen ác tính đe dọa tính mạng, không đáp ứng với thuốc giãn phế quản thông thường, phổi im lặng.",
    "ICD_Kem_Theo": "J45.9 (Hen phế quản)J96.0 (Suy hô hấp cấp)R09.2 (Ngừng hô hấp)",
    "Ngoai_Le": "Cơn hen mức độ trung bình, sau khi xử trí cấp cứu tại chỗ (khí dung, corticoid tiêm) bệnh nhân hết khó thở, phổi thông khí tốt.",
    "Tu_Khoa": ""
  },
  {
    "ID": "HCQ81",
    "Nhom_Benh": "Hệ hô hấp",
    "Tinh_Trang_Benh": "Hội chứng chèn ép tĩnh mạch chủ trên",
    "ICD_Chinh": "I87.1 (Chèn ép tĩnh mạch)",
    "Ly_Do_Nhap_Vien": "(Lặp lại nội dung mục 3). Thường do u phổi/trung thất. Cần nhập viện để điều trị nguyên nhân (hóa/xạ/stent).",
    "ICD_Kem_Theo": "C34 (Ung thư phổi)C38.1 (U trung thất)C78.1 (Ung thư di căn trung thất)",
    "Ngoai_Le": "Đã được chẩn đoán, tình trạng ổn định, phù không tăng thêm, không khó thở khi nghỉ (điều trị ngoại trú/theo hẹn).",
    "Tu_Khoa": ""
  },
  {
    "ID": "HCQ82",
    "Nhom_Benh": "Hệ hô hấp",
    "Tinh_Trang_Benh": "Đợt cấp COPD kèm theo khó thở nhiều, co kéo nhiều cơ hô hấp phụ, khí máu có tình trạng toan hô hấp cấp mất bù",
    "ICD_Chinh": "J44.1 (Bệnh phổi tắc nghẽn mạn tính với đợt cấp)",
    "Ly_Do_Nhap_Vien": "Tiêu chuẩn nhập viện rõ ràng: Đợt cấp Anthonisen có suy hô hấp (Toan hô hấp pH < 7.35).",
    "ICD_Kem_Theo": "J96.0 (Suy hô hấp cấp)E87.2 (Nhiễm toan)J18.9 (Viêm phổi bội nhiễm)",
    "Ngoai_Le": "Đợt cấp COPD nhẹ (chỉ tăng đờm/ho), không khó thở tăng đáng kể, khí máu bình thường (điều trị tại nhà).",
    "Tu_Khoa": ""
  },
  {
    "ID": "HCQ83",
    "Nhom_Benh": "Hệ hô hấp",
    "Tinh_Trang_Benh": "Tràn khí màng phổi hoặc tràn dịch màng phổi gây suy hô hấp",
    "ICD_Chinh": "J93.9 (TKMP) hoặc J90 (TDMP) kèm J96.0",
    "Ly_Do_Nhap_Vien": "(Lặp lại ý mục 4 và 5 nhưng nhấn mạnh biến chứng suy hô hấp). Chỉ định dẫn lưu màng phổi cấp cứu.",
    "ICD_Kem_Theo": "J96.0 (Suy hô hấp cấp)A16.2 (Lao phổi)C34 (Ung thư phổi)",
    "Ngoai_Le": "Không có ngoại lệ (vì đã gây suy hô hấp).",
    "Tu_Khoa": ""
  },
  {
    "ID": "HCQ84",
    "Nhom_Benh": "Hệ hô hấp",
    "Tinh_Trang_Benh": "Tràn máu màng phổi",
    "ICD_Chinh": "J94.2 (Tràn máu màng phổi)",
    "Ly_Do_Nhap_Vien": "Thường do chấn thương hoặc vỡ dị dạng mạch/ung thư. Cần dẫn lưu và theo dõi mất máu. Nếu do chấn thương dùng mã S.",
    "ICD_Kem_Theo": "S27.1 (Tràn máu màng phổi do chấn thương)C38.4 (Ung thư màng phổi)A16.5 (Lao màng phổi)",
    "Ngoai_Le": "Không có ngoại lệ.",
    "Tu_Khoa": ""
  },
  {
    "ID": "HCQ85",
    "Nhom_Benh": "Hệ hô hấp",
    "Tinh_Trang_Benh": "Nghi ngờ có tắc động mạch phổi, nhồi máu phổi",
    "ICD_Chinh": "I26.9 (Thuyên tắc phổi)",
    "Ly_Do_Nhap_Vien": "(Lặp lại nội dung mục 7). Cần nhập viện để dùng chống đông và theo dõi sát huyết động.",
    "ICD_Kem_Theo": "I80.2 (Huyết khối tĩnh mạch sâu chi dưới)R07.1 (Đau ngực khi hít thở)R04.2 (Ho ra máu)",
    "Ngoai_Le": "Nguy cơ thấp (Well score thấp), D-dimer âm tính.",
    "Tu_Khoa": ""
  },
  {
    "ID": "HCQ86",
    "Nhom_Benh": "Hệ hô hấp",
    "Tinh_Trang_Benh": "Áp xe phổi/ tổn thương dạng hang ở phổi có nguy cơ vỡ.",
    "ICD_Chinh": "J85.2 (Áp xe phổi không có viêm phổi)",
    "Ly_Do_Nhap_Vien": "(Lặp lại nội dung mục 6). Ổ áp xe lớn sát thành ngực hoặc hang lao mới có nguy cơ vỡ gây tràn mủ/khí màng phổi.",
    "ICD_Kem_Theo": "A16.2 (Lao phổi hang)J86 (Mủ màng phổi)J93 (Tràn khí màng phổi)",
    "Ngoai_Le": "Hang xơ cũ, thành dày, ổn định trên phim X-quang nhiều lần.",
    "Tu_Khoa": ""
  },
  {
    "ID": "HCQ87",
    "Nhom_Benh": "Hệ hô hấp",
    "Tinh_Trang_Benh": "Viêm phổi có tổn thương rộng trên Xquang và/hoặc có dấu hiệu giảm tưới máu tổ chức",
    "ICD_Chinh": "J18.9 (Viêm phổi, không xác định) hoặc J15 (Viêm phổi vi khuẩn)",
    "Ly_Do_Nhap_Vien": "Viêm phổi nặng (Severe Pneumonia). Tổn thương > 50% phế trường hoặc có dấu hiệu Sốc/Tiền sốc (giảm tưới máu).",
    "ICD_Kem_Theo": "J18.0 (Phế quản phế viêm)R57 (Sốc)A41 (Nhiễm khuẩn huyết)",
    "Ngoai_Le": "Viêm phổi thùy khu trú, bệnh nhân tỉnh táo, SpO2 tốt, uống thuốc được (CRB-65 = 0 điểm).",
    "Tu_Khoa": ""
  },
  {
    "ID": "HCQ88",
    "Nhom_Benh": "Hệ hô hấp",
    "Tinh_Trang_Benh": "Phù phổi cấp",
    "ICD_Chinh": "J81 (Phù phổi)",
    "Ly_Do_Nhap_Vien": "Tình trạng dịch thoát vào phế nang cấp tính (OAP). Cấp cứu hô hấp tối khẩn (thở máy/lợi tiểu).",
    "ICD_Kem_Theo": "I50.1 (Suy tim trái)I10 (Tăng huyết áp)J68.1 (Phù phổi do hóa chất)",
    "Ngoai_Le": "Không có ngoại lệ.",
    "Tu_Khoa": ""
  },
  {
    "ID": "HCQ89",
    "Nhom_Benh": "Tiêu hóa - Gan - Mật - Tụy",
    "Tinh_Trang_Benh": "Cổ trướng to cản trở hô hấp",
    "ICD_Chinh": "R18 (Cổ trướng)",
    "Ly_Do_Nhap_Vien": "Tình trạng dịch ổ bụng lượng nhiều gây chèn ép cơ hoành, dẫn đến khó thở. Cần nhập viện chọc tháo dịch giảm áp.",
    "ICD_Kem_Theo": "K74 (Xơ gan)C78.6 (Ung thư di căn phúc mạc)J96.0 (Suy hô hấp cấp)",
    "Ngoai_Le": "Cổ trướng mức độ trung bình, bệnh nhân còn chịu đựng được, SpO2 đảm bảo, điều trị lợi tiểu ngoại trú.",
    "Tu_Khoa": ""
  },
  {
    "ID": "HCQ90",
    "Nhom_Benh": "Tiêu hóa - Gan - Mật - Tụy",
    "Tinh_Trang_Benh": "Dị vật đường tiêu hóa",
    "ICD_Chinh": "T18 (Dị vật trong đường tiêu hóa)",
    "Ly_Do_Nhap_Vien": "Cần mã hóa cụ thể vị trí (Ví dụ: T18.1 - Thực quản). Nguy cơ thủng, tắc ruột hoặc áp xe.",
    "ICD_Kem_Theo": "T18.1 (Dị vật thực quản)T18.5 (Dị vật hậu môn/trực tràng)K56 (Tắc ruột)",
    "Ngoai_Le": "Dị vật nhỏ, tròn, đã xuống dạ dày (soi hoặc XQ), không gây đau, có khả năng tự đào thải (theo dõi tại nhà).",
    "Tu_Khoa": ""
  },
  {
    "ID": "HCQ91",
    "Nhom_Benh": "Tiêu hóa - Gan - Mật - Tụy",
    "Tinh_Trang_Benh": "Nhiễm khuẩn ổ bụng (nhiễm khuẩn huyết, nhiễm trùng đường mật, nhiễm trùng trong ổ bụng, nhiễm khuẩn tiêu hoá, áp xe trong ổ bụng) ",
    "ICD_Chinh": "K65 (Viêm phúc mạc) hoặc K83.0 (Viêm đường mật)",
    "Ly_Do_Nhap_Vien": "Nhóm bệnh nhiễm trùng ngoại khoa/nội khoa nặng. Cần kháng sinh tĩnh mạch và theo dõi sốc nhiễm khuẩn.",
    "ICD_Kem_Theo": "A41 (Nhiễm khuẩn huyết)K35 (Viêm ruột thừa)K63.0 (Áp xe ruột)",
    "Ngoai_Le": "Rối loạn tiêu hóa nhiễm khuẩn nhẹ (A09), không sốt cao, bụng mềm, bạch cầu máu không tăng.",
    "Tu_Khoa": ""
  },
  {
    "ID": "HCQ92",
    "Nhom_Benh": "Tiêu hóa - Gan - Mật - Tụy",
    "Tinh_Trang_Benh": "Vàng da mới xuất hiện, tiến triển nhanh ",
    "ICD_Chinh": "R17 (Vàng da, không xác định) hoặc K72",
    "Ly_Do_Nhap_Vien": "Dấu hiệu suy tế bào gan cấp hoặc tắc mật cấp tính (sỏi/u). Cần nhập viện tìm nguyên nhân.",
    "ICD_Kem_Theo": "K80 (Sỏi mật)B15 (Viêm gan A cấp)C24 (Ung thư đường mật)",
    "Ngoai_Le": "Vàng da nhẹ mạn tính (Hội chứng Gilbert), men gan bình thường, không tiến triển.",
    "Tu_Khoa": ""
  },
  {
    "ID": "HCQ93",
    "Nhom_Benh": "Tiêu hóa - Gan - Mật - Tụy",
    "Tinh_Trang_Benh": "Suy gan cấp",
    "ICD_Chinh": "K72.0 (Suy gan cấp và bán cấp)",
    "Ly_Do_Nhap_Vien": "Tình trạng mất chức năng gan đột ngột (rối loạn đông máu, bệnh não gan). Tỷ lệ tử vong cao.",
    "ICD_Kem_Theo": "K71 (Bệnh gan do độc chất)B15 (Viêm gan siêu vi)T39.1 (Ngộ độc Paracetamol)",
    "Ngoai_Le": "Men gan tăng cao đơn thuần nhưng chức năng gan (PT/INR, Bilirubin, Albumin) còn bù trừ tốt, tri giác tỉnh táo.",
    "Tu_Khoa": ""
  },
  {
    "ID": "HCQ94",
    "Nhom_Benh": "Tiêu hóa - Gan - Mật - Tụy",
    "Tinh_Trang_Benh": "Tắc mạch tạng, phình mạch tạng dọa vỡ ",
    "ICD_Chinh": "I74.8 (Thuyên tắc và huyết khối động mạch khác) hoặc I72 (Phình mạch)",
    "Ly_Do_Nhap_Vien": "Tắc động mạch mạc treo (nhồi máu ruột) hoặc phình động mạch lách/gan dọa vỡ. Cấp cứu ngoại khoa tối khẩn.",
    "ICD_Kem_Theo": "K55.0 (Bệnh mạch máu ruột cấp)I72.8 (Phình động mạch khác)K66.1 (Xuất huyết phúc mạc)",
    "Ngoai_Le": "Phình mạch tạng kích thước nhỏ, thành dày, phát hiện tình cờ, không đau bụng (theo dõi định kỳ).",
    "Tu_Khoa": ""
  },
  {
    "ID": "HCQ95",
    "Nhom_Benh": "Tiêu hóa - Gan - Mật - Tụy",
    "Tinh_Trang_Benh": "Dấu hiệu đụng dập, thủng, vỡ, xoắn, nghẹt ruột và mạc treo, mạc nối ",
    "ICD_Chinh": "S36 (Tổn thương các tạng trong ổ bụng) hoặc K56.2 (Xoắn ruột)",
    "Ly_Do_Nhap_Vien": "Các tổn thương tạng rỗng hoặc mạc treo do chấn thương hoặc bệnh lý (xoắn). Cần phẫu thuật.",
    "ICD_Kem_Theo": "S36.3 (Tổn thương dạ dày)S36.4 (Tổn thương ruột non)K40 (Thoát vị bẹn nghẹt)",
    "Ngoai_Le": "Đụng dập thành bụng nhẹ, siêu âm không thấy dịch tự do, không liềm hơi, bụng mềm.",
    "Tu_Khoa": ""
  },
  {
    "ID": "HCQ96",
    "Nhom_Benh": "Tiêu hóa - Gan - Mật - Tụy",
    "Tinh_Trang_Benh": "Đợt cấp của xơ gan mất bù",
    "ICD_Chinh": "K74.6 (Xơ gan) kèm K72 hoặc biến chứng",
    "Ly_Do_Nhap_Vien": "Biến chứng: Xuất huyết tiêu hóa, cổ trướng căng, viêm phúc mạc tiên phát, hôn mê gan.",
    "ICD_Kem_Theo": "K70.3 (Xơ gan rượu)K76.7 (Hội chứng gan thận)I85 (Giãn tĩnh mạch thực quản)",
    "Ngoai_Le": "Xơ gan giai đoạn ổn định, tái khám lĩnh thuốc định kỳ, tuân thủ điều trị.",
    "Tu_Khoa": ""
  },
  {
    "ID": "HCQ97",
    "Nhom_Benh": "Tiêu hóa - Gan - Mật - Tụy",
    "Tinh_Trang_Benh": "Thai phụ có bệnh gan mới phát hiện (tăng men gan cao, hội chứng HELLP, gan thoái hoá mỡ cấp) hoặc đợt tiến triển của bệnh gan mạn tính đã có (xơ gan, viêm gan virus mạn tính) ",
    "ICD_Chinh": "O26.6 (Các rối loạn gan trong thai kỳ, sinh đẻ)",
    "Ly_Do_Nhap_Vien": "Tình trạng gan mật thai kỳ nguy hiểm (HELLP, gan nhiễm mỡ cấp) đe dọa tính mạng mẹ và con.",
    "ICD_Kem_Theo": "O14.2 (Hội chứng HELLP)K74 (Xơ gan)B18 (Viêm gan virus mạn)",
    "Ngoai_Le": "Tăng men gan nhẹ thoáng qua, không có triệu chứng tiền sản giật, thai nhi phát triển bình thường.",
    "Tu_Khoa": ""
  },
  {
    "ID": "HCQ98",
    "Nhom_Benh": "Tiêu hóa - Gan - Mật - Tụy",
    "Tinh_Trang_Benh": "Viêm tụy cấp",
    "ICD_Chinh": "K85 (Viêm tụy cấp)",
    "Ly_Do_Nhap_Vien": "Đau bụng cấp dữ dội, men tụy (Amylase/Lipase) tăng cao. Cần nhập viện nhịn ăn, truyền dịch, giảm đau.",
    "ICD_Kem_Theo": "K85.1 (Viêm tụy cấp do sỏi mật)K85.2 (Viêm tụy cấp do rượu)E16.8 (Rối loạn tụy nội tiết khác)",
    "Ngoai_Le": "Men tụy tăng nhẹ không kèm đau bụng điển hình, hình ảnh học tụy bình thường (loại trừ nguyên nhân khác).",
    "Tu_Khoa": ""
  },
  {
    "ID": "HCQ99",
    "Nhom_Benh": "Tiêu hóa - Gan - Mật - Tụy",
    "Tinh_Trang_Benh": "Áp xe trong ổ bụng",
    "ICD_Chinh": "K65.0 (Viêm phúc mạc cấp tính - Áp xe)",
    "Ly_Do_Nhap_Vien": "Các ổ mủ khu trú trong khoang bụng (dưới hoành, douglas, ruột). Cần dẫn lưu/phẫu thuật và kháng sinh.",
    "ICD_Kem_Theo": "K35.3 (Áp xe ruột thừa)K63.0 (Áp xe ruột)N73.5 (Áp xe phần phụ)",
    "Ngoai_Le": "Ổ dịch tồn dư nhỏ sau mổ, không sốt, bạch cầu không tăng, đang đáp ứng kháng sinh uống.",
    "Tu_Khoa": ""
  },
  {
    "ID": "HCQ100",
    "Nhom_Benh": "Tiêu hóa - Gan - Mật - Tụy",
    "Tinh_Trang_Benh": "Chấn thương gan",
    "ICD_Chinh": "S36.1 (Tổn thương gan)",
    "Ly_Do_Nhap_Vien": "Tổn thương tạng đặc thường gặp nhất. Cần theo dõi nguy cơ chảy máu trong hoặc mổ cấp cứu.",
    "ICD_Kem_Theo": "S31 (Vết thương hở bụng)R57.1 (Sốc mất máu)T07 (Đa chấn thương)",
    "Ngoai_Le": "Chấn thương gan độ I (hematoma nhỏ dưới bao), huyết động ổn định, men gan tăng nhẹ.",
    "Tu_Khoa": ""
  },
  {
    "ID": "HCQ101",
    "Nhom_Benh": "Tiêu hóa - Gan - Mật - Tụy",
    "Tinh_Trang_Benh": "Chấn thương tụy",
    "ICD_Chinh": "S36.2 (Tổn thương tụy)",
    "Ly_Do_Nhap_Vien": "Tổn thương rất nặng, nguy cơ viêm tụy cấp sau chấn thương hoặc rò dịch tụy.",
    "ICD_Kem_Theo": "K85 (Viêm tụy cấp)S36.4 (Tổn thương ruột non)T79.4 (Sốc chấn thương)",
    "Ngoai_Le": "Đụng dập nhẹ vùng tụy trên siêu âm, Amylase máu bình thường, không đau bụng nhiều.",
    "Tu_Khoa": ""
  },
  {
    "ID": "HCQ102",
    "Nhom_Benh": "Tiêu hóa - Gan - Mật - Tụy",
    "Tinh_Trang_Benh": "Chấn thương lách",
    "ICD_Chinh": "S36.0 (Tổn thương lách)",
    "Ly_Do_Nhap_Vien": "Nguy cơ vỡ lách thì hai gây ngập máu ổ bụng. Cần nhập viện theo dõi sát Hct và siêu âm.",
    "ICD_Kem_Theo": "S36.1 (Chấn thương gan kèm theo)S22.4 (Gãy xương sườn trái)R58 (Xuất huyết nội)",
    "Ngoai_Le": "Chấn thương lách độ I, dịch ổ bụng không đáng kể, sinh hiệu ổn định.",
    "Tu_Khoa": ""
  },
  {
    "ID": "HCQ103",
    "Nhom_Benh": "Tiêu hóa - Gan - Mật - Tụy",
    "Tinh_Trang_Benh": "Vỡ tạng rỗng (thực quản, dạ dày, tá tràng, ruột non, đại trực tràng)",
    "ICD_Chinh": "S36 (Tổn thương các tạng trong ổ bụng) hoặc K63.1 (Thủng ruột không do chấn thương)",
    "Ly_Do_Nhap_Vien": "Tình trạng bụng ngoại khoa tối khẩn (Viêm phúc mạc). Mã S36 cho chấn thương, K cho bệnh lý.",
    "ICD_Kem_Theo": "K25.5 (Thủng dạ dày)S36.3 (Vỡ dạ dày do chấn thương)K65 (Viêm phúc mạc)",
    "Ngoai_Le": "Không có ngoại lệ.",
    "Tu_Khoa": ""
  },
  {
    "ID": "HCQ104",
    "Nhom_Benh": "Tiêu hóa - Gan - Mật - Tụy",
    "Tinh_Trang_Benh": "Viêm túi mật",
    "ICD_Chinh": "K81.0 (Viêm túi mật cấp tính)",
    "Ly_Do_Nhap_Vien": "Túi mật căng to, thành dày, đau hạ sườn phải (Murphy +). Nguy cơ hoại tử/thấm mật phúc mạc.",
    "ICD_Kem_Theo": "K80.0 (Sỏi túi mật có viêm)K82.2 (Thủng túi mật)A41 (Nhiễm khuẩn huyết)",
    "Ngoai_Le": "Cơn đau quặn mật do sỏi nhưng không viêm (thành mỏng, không sốt, bạch cầu bình thường).",
    "Tu_Khoa": ""
  },
  {
    "ID": "HCQ105",
    "Nhom_Benh": "Tiêu hóa - Gan - Mật - Tụy",
    "Tinh_Trang_Benh": "Nhiễm trùng đường mật",
    "ICD_Chinh": "K83.0 (Viêm đường mật)",
    "Ly_Do_Nhap_Vien": "Tam chứng Charcot (Đau - Sốt - Vàng da). Nguy cơ sốc nhiễm khuẩn đường mật tử vong cao.",
    "ICD_Kem_Theo": "K80.3 (Sỏi ống mật chủ có viêm đường mật)B15 (Viêm gan)A41.9 (Sốc nhiễm khuẩn)",
    "Ngoai_Le": "Sỏi ống mật chủ chưa gây tắc mật hoàn toàn, men gan tăng nhẹ, chưa sốt, chưa vàng da rõ.",
    "Tu_Khoa": ""
  },
  {
    "ID": "HCQ106",
    "Nhom_Benh": "Tiêu hóa - Gan - Mật - Tụy",
    "Tinh_Trang_Benh": "Áp xe gan trên 5cm hoặc áp xe gan dọa vỡ, áp xe gan điều trị nội khoa thất bại",
    "ICD_Chinh": "K75.0 (Áp xe gan)",
    "Ly_Do_Nhap_Vien": "Ổ mủ lớn trong gan nguy cơ vỡ vào ổ bụng/màng phổi. Cần chọc hút dẫn lưu dưới siêu âm.",
    "ICD_Kem_Theo": "A06.4 (Áp xe gan amip)J94.8 (Tràn dịch màng phổi phản ứng)R10.1 (Đau bụng trên)",
    "Ngoai_Le": "Áp xe gan nhỏ (<3cm), đang đáp ứng tốt với kháng sinh (hết sốt, giảm đau), theo dõi ngoại trú.",
    "Tu_Khoa": ""
  },
  {
    "ID": "HCQ107",
    "Nhom_Benh": "Tiêu hóa - Gan - Mật - Tụy",
    "Tinh_Trang_Benh": "U gan vỡ, u gan dọa vỡ",
    "ICD_Chinh": "C22 (Ung thư gan) kèm K76.8 (Bệnh khác của gan - vỡ)",
    "Ly_Do_Nhap_Vien": "Biến chứng chảy máu nội của ung thư gan (HCC). Cần nút mạch cầm máu (TOCE) cấp cứu.",
    "ICD_Kem_Theo": "C22.0 (Ung thư biểu mô tế bào gan)R58 (Xuất huyết nội)R57.1 (Sốc mất máu)",
    "Ngoai_Le": "U gan kích thước ổn định, đau nhẹ hạ sườn phải nhưng không có dấu hiệu dọa vỡ trên hình ảnh học.",
    "Tu_Khoa": ""
  },
  {
    "ID": "HCQ108",
    "Nhom_Benh": "Tiêu hóa - Gan - Mật - Tụy",
    "Tinh_Trang_Benh": "Hôn mê gan",
    "ICD_Chinh": "K72.9 (Suy gan, không xác định) có hôn mê",
    "Ly_Do_Nhap_Vien": "Bệnh não gan (Encephalopathy). Biến chứng nặng nề của xơ gan/suy gan cấp, rối loạn tri giác.",
    "ICD_Kem_Theo": "K70.4 (Suy gan do rượu)K74 (Xơ gan)E87.2 (Nhiễm toan)",
    "Ngoai_Le": "Tiền hôn mê gan nhẹ (Rối loạn giấc ngủ, run tay) nhưng vẫn tỉnh táo, điều trị ngoại trú được.",
    "Tu_Khoa": ""
  },
  {
    "ID": "HCQ109",
    "Nhom_Benh": "Tiêu hóa - Gan - Mật - Tụy",
    "Tinh_Trang_Benh": "Trĩ chảy máu, trĩ tắc mạch",
    "ICD_Chinh": "K64.8 (Trĩ khác - Trĩ có biến chứng) hoặc K64.5 (Trĩ tắc mạch)",
    "Ly_Do_Nhap_Vien": "Biến chứng cấp tính gây đau dữ dội (tắc mạch) hoặc thiếu máu (chảy máu). Cần phẫu thuật hoặc thủ thuật.",
    "ICD_Kem_Theo": "K64.0-K64.3 (Trĩ độ 1-4)D62 (Thiếu máu sau xuất huyết)I84 (Mã cũ của Trĩ)",
    "Ngoai_Le": "Trĩ độ 1-2 chảy máu ít, tự cầm, không đau tắc mạch, điều trị nội khoa bảo tồn.",
    "Tu_Khoa": ""
  },
  {
    "ID": "HCQ110",
    "Nhom_Benh": "Tiêu hóa - Gan - Mật - Tụy",
    "Tinh_Trang_Benh": "Hoại tử ruột (do xoắn, do tắc mạch, do nghẹt….)",
    "ICD_Chinh": "K55.0 (Bệnh mạch máu ruột cấp) hoặc K56",
    "Ly_Do_Nhap_Vien": "Tình trạng ruột bị chết do thiếu máu nuôi. Cấp cứu ngoại khoa tối khẩn để cắt đoạn ruột hoại tử.",
    "ICD_Kem_Theo": "K56.2 (Xoắn ruột)K40.3 (Thoát vị bẹn nghẹt)K91.3 (Tắc ruột sau mổ)",
    "Ngoai_Le": "Không có ngoại lệ.",
    "Tu_Khoa": ""
  },
  {
    "ID": "HCQ111",
    "Nhom_Benh": "Tiêu hóa - Gan - Mật - Tụy",
    "Tinh_Trang_Benh": "Thoát vị bẹn nghẹt, sa lồi thành bụng nghẹt, thoát vị thành bụng nghẹt",
    "ICD_Chinh": "K40.3 (Thoát vị bẹn nghẹt) hoặc K42/K43 (Thoát vị khác nghẹt)",
    "Ly_Do_Nhap_Vien": "Khối thoát vị không tự lên được, gây đau và tắc ruột. Nguy cơ hoại tử ruột trong bao thoát vị.",
    "ICD_Kem_Theo": "K40.9 (Thoát vị bẹn không nghẹt)K42.0 (Thoát vị rốn nghẹt)K56 (Tắc ruột)",
    "Ngoai_Le": "Thoát vị bẹn/rốn chưa nghẹt, khối thoát vị tự lên xuống dễ dàng, không đau (mổ phiên).",
    "Tu_Khoa": ""
  },
  {
    "ID": "HCQ112",
    "Nhom_Benh": "Tiêu hóa - Gan - Mật - Tụy",
    "Tinh_Trang_Benh": "Lồng ruột",
    "ICD_Chinh": "K56.1 (Lồng ruột)",
    "Ly_Do_Nhap_Vien": "Thường gặp ở trẻ em, nhưng ở người lớn thường do u. Gây tắc ruột và hoại tử khối lồng.",
    "ICD_Kem_Theo": "C18 (Ung thư đại tràng)D12 (Polyp đại tràng)R10.4 (Đau bụng khác)",
    "Ngoai_Le": "Nghi ngờ lồng ruột thoáng qua (tự tháo), siêu âm kiểm tra lại bình thường, hết đau bụng.",
    "Tu_Khoa": ""
  },
  {
    "ID": "HCQ113",
    "Nhom_Benh": "Tiêu hóa - Gan - Mật - Tụy",
    "Tinh_Trang_Benh": "Đau bụng cấp",
    "ICD_Chinh": "R10.0 (Bụng ngoại khoa)",
    "Ly_Do_Nhap_Vien": "Mã chung cho tình trạng đau bụng dữ dội chưa rõ nguyên nhân nhưng nghi ngờ ngoại khoa (Acute Abdomen).",
    "ICD_Kem_Theo": "K35 (Viêm ruột thừa)K85 (Viêm tụy cấp)N23 (Cơn đau quặn thận)",
    "Ngoai_Le": "Rối loạn tiêu hóa, đau bụng nhẹ quanh rốn, bụng mềm, không phản ứng thành bụng.",
    "Tu_Khoa": ""
  },
  {
    "ID": "HCQ114",
    "Nhom_Benh": "Tiêu hóa - Gan - Mật - Tụy",
    "Tinh_Trang_Benh": "Tiêu chảy cấp",
    "ICD_Chinh": "A09 (Tiêu chảy và viêm dạ dày ruột)",
    "Ly_Do_Nhap_Vien": "(Tương tự mục 12 phần Triệu chứng). Nguy cơ mất nước và rối loạn điện giải nặng cần truyền dịch.",
    "ICD_Kem_Theo": "E86 (Mất nước)A05.9 (Ngộ độc thực phẩm)K52 (Viêm dạ dày ruột khác)",
    "Ngoai_Le": "Tiêu chảy số lần ít, không mất nước, người bệnh uống Oresol bù dịch tốt.",
    "Tu_Khoa": ""
  },
  {
    "ID": "HCQ115",
    "Nhom_Benh": "Tiêu hóa - Gan - Mật - Tụy",
    "Tinh_Trang_Benh": "Áp xe gan trên 05 cm hoặc có dấu hiệu dọa vỡ",
    "ICD_Chinh": "K75.0 (Áp xe gan)",
    "Ly_Do_Nhap_Vien": "(Lặp lại nội dung mục 28). Nhấn mạnh kích thước > 5cm là chỉ định can thiệp chọc hút/dẫn lưu.",
    "ICD_Kem_Theo": "A06.4 (Áp xe gan amip)R10.1 (Đau bụng trên)K65 (Viêm phúc mạc)",
    "Ngoai_Le": "Áp xe nhỏ, ổn định.",
    "Tu_Khoa": ""
  },
  {
    "ID": "HCQ116",
    "Nhom_Benh": "Tiêu hóa - Gan - Mật - Tụy",
    "Tinh_Trang_Benh": "Áp xe gan nhỏ mà không đáp ứng điều trị",
    "ICD_Chinh": "K75.0 (Áp xe gan)",
    "Ly_Do_Nhap_Vien": "Áp xe < 5cm nhưng điều trị kháng sinh ngoại trú thất bại (vẫn sốt, đau tăng, bạch cầu tăng).",
    "ICD_Kem_Theo": "B96 (Vi khuẩn đề kháng)A06.4 (Amip gan)R50 (Sốt dai dẳng)",
    "Ngoai_Le": "Áp xe nhỏ đang đáp ứng tốt lâm sàng, kích thước trên siêu âm đang thu nhỏ lại.",
    "Tu_Khoa": ""
  },
  {
    "ID": "HCQ117",
    "Nhom_Benh": "Tiêu hóa - Gan - Mật - Tụy",
    "Tinh_Trang_Benh": "Vàng da mới xuất hiện, tiến triển nhanh",
    "ICD_Chinh": "R17 (Vàng da)",
    "Ly_Do_Nhap_Vien": "(Lặp lại nội dung mục 4). Báo động suy gan cấp hoặc tắc mật cấp tính hoàn toàn.",
    "ICD_Kem_Theo": "K83.1 (Tắc đường mật)C24 (K đường mật)B15 (Viêm gan cấp)",
    "Ngoai_Le": "Vàng da nhẹ mạn tính (Gilbert), không thay đổi.",
    "Tu_Khoa": ""
  },
  {
    "ID": "HCQ118",
    "Nhom_Benh": "Tiêu hóa - Gan - Mật - Tụy",
    "Tinh_Trang_Benh": "Hôn mê gan và các dấu hiệu hội chứng não-gan",
    "ICD_Chinh": "K72 (Suy gan) kèm K72.9 (Hôn mê)",
    "Ly_Do_Nhap_Vien": "(Lặp lại nội dung mục 30). Giai đoạn cuối của bệnh gan, rối loạn tri giác nặng.",
    "ICD_Kem_Theo": "K70.4 (Suy gan rượu)K74 (Xơ gan)E87 (Rối loạn điện giải)",
    "Ngoai_Le": "Rối loạn giấc ngủ nhẹ ở người xơ gan (Tiền hôn mê gan độ 1), điều trị Lactulose ngoại trú.",
    "Tu_Khoa": ""
  },
  {
    "ID": "HCQ119",
    "Nhom_Benh": "Hệ tiết niệu",
    "Tinh_Trang_Benh": "Hội chứng urê máu cao có triệu chứng nặng (1 trong các biểu hiện):- Viêm màng ngoài tim do urê máu cao.- Bệnh não do urê máu cao (lơ mơ, hôn mê, co giật).- Xuất huyết tiêu hóa hoặc xuất huyết nội tạng liên quan đến hội chứng ure máu cao ",
    "ICD_Chinh": "N18.5 (Bệnh thận mạn giai đoạn cuối) hoặc N19 (Suy thận không xác định)",
    "Ly_Do_Nhap_Vien": "Chỉ định chạy thận cấp cứu. Mã hóa kèm biến chứng tương ứng (Viêm màng tim, Bệnh não).",
    "ICD_Kem_Theo": "I30 (Viêm màng ngoài tim)G93.4 (Bệnh não không xác định)K92.2 (Xuất huyết tiêu hóa)",
    "Ngoai_Le": "Tăng Urê máu trung bình, bệnh nhân chỉ buồn nôn nhẹ, chưa có rối loạn tri giác, chưa có cọ màng tim.",
    "Tu_Khoa": ""
  },
  {
    "ID": "HCQ120",
    "Nhom_Benh": "Hệ tiết niệu",
    "Tinh_Trang_Benh": "Quá tải thể tích gây dọa phù phổi cấp, phù phổi cấp.",
    "ICD_Chinh": "E87.7 (Quá tải dịch) kèm J81 (Phù phổi)",
    "Ly_Do_Nhap_Vien": "Biến chứng thường gặp của suy thận vô niệu. Cần siêu lọc rút nước cấp cứu.",
    "ICD_Kem_Theo": "N17 (Suy thận cấp)I50 (Suy tim)N18 (Bệnh thận mạn)",
    "Ngoai_Le": "Phù nhẹ 2 chi dưới, phổi không rale, SpO2 tốt, đáp ứng với thuốc lợi tiểu uống.",
    "Tu_Khoa": ""
  },
  {
    "ID": "HCQ121",
    "Nhom_Benh": "Hệ tiết niệu",
    "Tinh_Trang_Benh": "Tăng huyết áp cấp cứu: tăng huyết áp nặng có kèm theo tổn thương cơ quan đích (não, tim, mắt, thận).",
    "ICD_Chinh": "I10 (Tăng huyết áp vô căn - Cơn cấp cứu)",
    "Ly_Do_Nhap_Vien": "Tăng huyết áp ác tính gây suy thận tiến triển hoặc bệnh não cao áp.",
    "ICD_Kem_Theo": "I12 (Bệnh thận do tăng huyết áp)I67.4 (Bệnh não do cao huyết áp)H35.0 (Bệnh võng mạc do THA)",
    "Ngoai_Le": "Tăng huyết áp khẩn trương (Urgency), huyết áp cao nhưng không có triệu chứng thần kinh/tim mạch/thận cấp.",
    "Tu_Khoa": ""
  },
  {
    "ID": "HCQ122",
    "Nhom_Benh": "Hệ tiết niệu",
    "Tinh_Trang_Benh": "Tăng kali máu nặng: K+ ≥ 6.5 mmol/L hoặc có biến đổi trên điện tâm đồ (sóng T cao nhọn, PR kéo dài, QRS giãn rộng, mất sóng P, hình sin).",
    "ICD_Chinh": "E87.5 (Tăng Kali máu)",
    "Ly_Do_Nhap_Vien": "Rối loạn điện giải nguy hiểm nhất gây ngừng tim. Cần lọc máu hoặc điều trị nội khoa tích cực ngay.",
    "ICD_Kem_Theo": "N17 (Suy thận cấp)N18 (Bệnh thận mạn)I46 (Ngừng tim)",
    "Ngoai_Le": "Tăng Kali máu nhẹ (5.5 - 6.0), ECG bình thường, điều trị nội khoa (Kalimate, lợi tiểu) ngoại trú.",
    "Tu_Khoa": ""
  },
  {
    "ID": "HCQ123",
    "Nhom_Benh": "Hệ tiết niệu",
    "Tinh_Trang_Benh": "Toan chuyển hóa nặng ở người bệnh có suy giảm chức năng thận (bệnh thận mạn tính hoặc tổn thương thận cấp): pH<7.20 hoặc HCO3- < 12 mmol/L.",
    "ICD_Chinh": "E87.2 (Nhiễm toan)",
    "Ly_Do_Nhap_Vien": "Toan chuyển hóa mất bù đe dọa tính mạng, thường do suy thận không đào thải được acid.",
    "ICD_Kem_Theo": "N17 (Tổn thương thận cấp)N18 (Bệnh thận mạn)E10 (Đái tháo đường)",
    "Ngoai_Le": "Toan chuyển hóa nhẹ/trung bình (HCO3 > 15), bệnh nhân tự bù trừ hô hấp tốt (thở nhanh nhẹ).",
    "Tu_Khoa": ""
  },
  {
    "ID": "HCQ124",
    "Nhom_Benh": "Hệ tiết niệu",
    "Tinh_Trang_Benh": "Các bệnh lý cầu thận tiến triển nhanh hoặc đợt cấp của bệnh hệ thống gây tổn thương thận nặng: đợt cấp của viêm thận lupus, viêm cầu thận tiến triển nhanh do hội chứng Goodpasture, viêm mạch máu ANCA",
    "ICD_Chinh": "N00 (Hội chứng viêm cầu thận cấp) hoặc N01 (Viêm cầu thận tiến triển nhanh)",
    "Ly_Do_Nhap_Vien": "Nhóm bệnh cầu thận nguy hiểm (RPGN). Cần sinh thiết thận và điều trị ức chế miễn dịch liều cao.",
    "ICD_Kem_Theo": "M32.1 (Lupus ban đỏ có tổn thương thận)M31.3 (U hạt Wegener)M31.0 (Hội chứng Goodpasture)",
    "Ngoai_Le": "Lupus ổn định, Protein niệu thấp, chức năng thận bình thường, tái khám định kỳ.",
    "Tu_Khoa": ""
  },
  {
    "ID": "HCQ125",
    "Nhom_Benh": "Hệ tiết niệu",
    "Tinh_Trang_Benh": "Người bệnh lọc máu chu kì có biến chứng:- Biến chứng tim mạch cấp tính: suy tim cấp, phù phổi cấp/dọa phù phổi cấp.- Biến chứng đường vào mạch máu:+ Chảy máu không cầm được từ vị trí chọc kim hoặc từ đường vào mạch máu.+ Nhiễm trùng đường vào mạch máu, nhiễm trùng huyết.+ Huyết khối cấp gây tắc nghẽn hoàn toàn đường vào mạch máu.+ Các biến chứng nặng khác: Thiếu máu nặng có triệu chứng (đau ngực, khó thở), tụt huyết áp kéo dài không đáp ứng điều trị, nhiễm trùng cấp tính nặng. ",
    "ICD_Chinh": "T82.7 (Nhiễm trùng do thiết bị tim mạch) hoặc T82.8 (Biến chứng khác)",
    "Ly_Do_Nhap_Vien": "Các cấp cứu thường gặp ở bệnh nhân chạy thận nhân tạo (HD). Cần xử trí đường hầm (AVF/Catheter) hoặc tim mạch.",
    "ICD_Kem_Theo": "I50.1 (Suy tim trái)T82.5 (Biến chứng cơ học của shunt tim mạch)A41 (Nhiễm khuẩn huyết)",
    "Ngoai_Le": "Tắc FAV cũ đã có đường vào khác thay thế ổn định. Nhiễm trùng chân catheter nhẹ (đỏ da), không sốt.",
    "Tu_Khoa": ""
  },
  {
    "ID": "HCQ126",
    "Nhom_Benh": "Hệ tiết niệu",
    "Tinh_Trang_Benh": "Người bệnh lọc màng bụng có biến chứng viêm phúc mạc",
    "ICD_Chinh": "K65.0 (Viêm phúc mạc cấp tính) hoặc T85.7",
    "Ly_Do_Nhap_Vien": "Nhiễm trùng dịch lọc màng bụng (PD). Dịch lọc đục, đau bụng, bạch cầu dịch tăng.",
    "ICD_Kem_Theo": "T85.7 (Nhiễm trùng do thiết bị thẩm phân phúc mạc)N18.5 (Bệnh thận mạn gđ cuối)A49 (Nhiễm trùng vi khuẩn)",
    "Ngoai_Le": "Đau bụng nhẹ do tư thế ống thông, dịch lọc trong, xét nghiệm tế bào dịch lọc bình thường.",
    "Tu_Khoa": ""
  },
  {
    "ID": "HCQ127",
    "Nhom_Benh": "Hệ tiết niệu",
    "Tinh_Trang_Benh": "Sỏi tiết niệu gây biến chứng",
    "ICD_Chinh": "N20 (Sỏi thận và niệu quản) kèm mã biến chứng",
    "Ly_Do_Nhap_Vien": "Biến chứng: Tắc nghẽn, suy thận, nhiễm trùng, đau quặn thận không đáp ứng thuốc.",
    "ICD_Kem_Theo": "N13.2 (Thận ứ nước do tắc nghẽn sỏi)N10 (Viêm bể thận cấp)N17 (Suy thận cấp)",
    "Ngoai_Le": "Sỏi nhỏ, không gây tắc nghẽn (không ứ nước), không đau hoặc đau nhẹ, chức năng thận bình thường.",
    "Tu_Khoa": ""
  },
  {
    "ID": "HCQ128",
    "Nhom_Benh": "Hệ tiết niệu",
    "Tinh_Trang_Benh": "Bí tiểu cấp",
    "ICD_Chinh": "R33 (Bí tiểu)",
    "Ly_Do_Nhap_Vien": "Cầu bàng quang căng, không đi tiểu được. Cần đặt sonde tiểu giải áp hoặc dẫn lưu bàng quang.",
    "ICD_Kem_Theo": "N40 (Phì đại tiền liệt tuyến)N32 (Bệnh bàng quang khác)R39.1 (Khó tiểu)",
    "Ngoai_Le": "Bí tiểu thoáng qua sau rút sonde, tập đi tiểu lại được.",
    "Tu_Khoa": ""
  },
  {
    "ID": "HCQ129",
    "Nhom_Benh": "Hệ tiết niệu",
    "Tinh_Trang_Benh": "Cấp cứu Nam khoa: xoắn tinh hoàn, cương dương vật kéo dài, chấn thương dương vật",
    "ICD_Chinh": "N44 (Xoắn tinh hoàn) hoặc N48.3 (Cương dương vật)",
    "Ly_Do_Nhap_Vien": "Các tình trạng đe dọa hoại tử tinh hoàn/dương vật. Xoắn tinh hoàn là tối khẩn cấp (mổ trước 6h).",
    "ICD_Kem_Theo": "S39.8 (Chấn thương cơ quan sinh dục ngoài)N50.8 (Bệnh khác của cơ quan sinh dục nam)I86.1 (Giãn tĩnh mạch thừng tinh)",
    "Ngoai_Le": "Đau tinh hoàn do viêm mào tinh hoàn nhẹ, không xoắn (siêu âm Doppler bình thường).",
    "Tu_Khoa": ""
  },
  {
    "ID": "HCQ130",
    "Nhom_Benh": "Hệ tiết niệu",
    "Tinh_Trang_Benh": "Đái máu",
    "ICD_Chinh": "R31 (Đái máu, không xác định)",
    "Ly_Do_Nhap_Vien": "Triệu chứng báo động tổn thương đường tiết niệu (u, sỏi, chấn thương, viêm cầu thận). Cần nhập viện tìm nguyên nhân.",
    "ICD_Kem_Theo": "N02 (Đái máu tái phát và dai dẳng)C67 (Ung thư bàng quang)N20 (Sỏi tiết niệu)",
    "Ngoai_Le": "Đái máu vi thể tình cờ phát hiện qua xét nghiệm, không triệu chứng lâm sàng, siêu âm bình thường.",
    "Tu_Khoa": ""
  },
  {
    "ID": "HCQ131",
    "Nhom_Benh": "Hệ tiết niệu",
    "Tinh_Trang_Benh": "Nghi ngờ sỏi hoặc vật cản đường tiết niệu, với một trong các triệu chứng sau:a. Cơn đau quặn thậnb. Buồn nôn và/hoặc nônc. Chảy máud. suy thận cấp hoặc mạn tínhđ. Thiểu niệu hoặc vô niệu ",
    "ICD_Chinh": "N20 (Sỏi thận và niệu quản) hoặc N13 (Bệnh thận tắc nghẽn)",
    "Ly_Do_Nhap_Vien": "Sỏi hoặc tắc nghẽn gây biến chứng cấp tính (đau, suy thận, vô niệu). Cần giải quyết tắc nghẽn cấp cứu.",
    "ICD_Kem_Theo": "N23 (Cơn đau quặn thận)N17 (Suy thận cấp)R33 (Bí tiểu)",
    "Ngoai_Le": "Sỏi thận nhỏ nằm trong đài thận, không gây tắc nghẽn (không ứ nước), đau lưng âm ỉ nhẹ.",
    "Tu_Khoa": ""
  },
  {
    "ID": "HCQ132",
    "Nhom_Benh": "Hệ tiết niệu",
    "Tinh_Trang_Benh": "Tắc nghẽn cấp tính thông tiểu không có khả năng xử lý",
    "ICD_Chinh": "T83.0 (Biến chứng cơ học của ống thông đường tiết niệu)",
    "Ly_Do_Nhap_Vien": "Tắc sonde tiểu (foley/dẫn lưu bàng quang) do cặn/máu cục mà không thể thông lại tại chỗ. Cần thay sonde hoặc dẫn lưu lại.",
    "ICD_Kem_Theo": "Z96.0 (Có thiết bị tiết niệu)N32 (Bàng quang thần kinh)R33 (Bí tiểu)",
    "Ngoai_Le": "Tắc thông tiểu do gập ống bên ngoài, điều chỉnh lại thông tốt.",
    "Tu_Khoa": ""
  },
  {
    "ID": "HCQ133",
    "Nhom_Benh": "Hệ tiết niệu",
    "Tinh_Trang_Benh": "Nhiễm trùng đường tiết niệu với các triệu chứng toàn thân (nôn, ớn lạnh, sốt, đau mặc dù đã điều trị kháng sinh sau 3 ngày) ",
    "ICD_Chinh": "N39.0 (Nhiễm khuẩn đường tiết niệu, vị trí không xác định)",
    "Ly_Do_Nhap_Vien": "Dấu hiệu nhiễm trùng thất bại điều trị hoặc nhiễm khuẩn huyết/viêm thận bể thận cấp.",
    "ICD_Kem_Theo": "N10 (Viêm thận bể thận cấp)A41 (Nhiễm khuẩn huyết)N30.0 (Viêm bàng quang cấp)",
    "Ngoai_Le": "Viêm bàng quang đơn thuần, tiểu buốt nhưng không sốt, toàn trạng tốt (đổi kháng sinh uống ngoại trú).",
    "Tu_Khoa": ""
  },
  {
    "ID": "HCQ134",
    "Nhom_Benh": "Hệ tiết niệu",
    "Tinh_Trang_Benh": "Thận bị tắc nghẽn hoặc không nhìn thấy được",
    "ICD_Chinh": "N13.3 (Thận ứ nước, không xác định) hoặc Q60 (Bất sản thận)",
    "Ly_Do_Nhap_Vien": "Lưu ý: \"Không nhìn thấy được\" có thể hiểu là thận câm chức năng hoặc bất sản. Tắc nghẽn hoàn toàn gây mất chức năng thận.",
    "ICD_Kem_Theo": "N13.0 (Thận ứ nước do tắc khúc nối)N20 (Sỏi tiết niệu)C64 (Ung thư thận)",
    "Ngoai_Le": "Thận nhỏ bẩm sinh (thiểu sản) phát hiện tình cờ, chức năng thận chung bình thường.",
    "Tu_Khoa": ""
  },
  {
    "ID": "HCQ135",
    "Nhom_Benh": "Hệ tiết niệu",
    "Tinh_Trang_Benh": "Rối loạn điện giải nặng (đủ tiêu chuẩn vào viện cấp cứu ở phần rối loạn điện giải) ở người bệnh mắc bệnh thận cấp và mạn tính",
    "ICD_Chinh": "E87 (Rối loạn dịch, điện giải) kèm N18/N17",
    "Ly_Do_Nhap_Vien": "Suy thận làm mất khả năng điều hòa điện giải (Kali, Natri). Nguy cơ tử vong do rối loạn nhịp/phù não.",
    "ICD_Kem_Theo": "E87.5 (Tăng Kali máu)E87.1 (Hạ Natri máu)N18.5 (Suy thận mạn gđ cuối)",
    "Ngoai_Le": "Rối loạn điện giải nhẹ, điều chỉnh được bằng chế độ ăn hoặc thuốc uống (Kalimate, Natri).",
    "Tu_Khoa": ""
  },
  {
    "ID": "HCQ136",
    "Nhom_Benh": "Hệ tiết niệu",
    "Tinh_Trang_Benh": "Thiếu máu nặng do suy thận mạn tính Hb dưới 70 g/l",
    "ICD_Chinh": "D63.8 (Thiếu máu trong bệnh mạn tính) kèm N18",
    "Ly_Do_Nhap_Vien": "Thiếu máu do thiếu Erythropoietin. Mức độ nặng (<70g/l) cần truyền khối hồng cầu cấp cứu.",
    "ICD_Kem_Theo": "N18.5 (Bệnh thận mạn giai đoạn cuối)D64.9 (Thiếu máu không xác định)I50 (Suy tim do thiếu máu)",
    "Ngoai_Le": "Thiếu máu mức độ trung bình (Hb 80-100 g/l), đang điều trị tiêm Erythropoietin định kỳ ngoại trú.",
    "Tu_Khoa": ""
  },
  {
    "ID": "HCQ137",
    "Nhom_Benh": "Hệ tiết niệu",
    "Tinh_Trang_Benh": "Người bệnh đang dùng thuốc ức chế miễn dịch có nhiễm trùng cấp tính ở các cơ quan khác nhau: Hô hấp, tiết niệu, tiêu hóa ",
    "ICD_Chinh": "T88.7 (Tác dụng phụ thuốc) hoặc Mã nhiễm trùng cụ thể",
    "Ly_Do_Nhap_Vien": "Bệnh nhân ghép thận hoặc bệnh cầu thận đang dùng thuốc chống thải ghép/ức chế miễn dịch. Nhiễm trùng diễn biến rất nhanh.",
    "ICD_Kem_Theo": "J18 (Viêm phổi)A09 (Tiêu chảy nhiễm trùng)Z94.0 (Trạng thái ghép thận)",
    "Ngoai_Le": "Nhiễm trùng da nhẹ, khu trú, đáp ứng tốt với thuốc sát khuẩn tại chỗ.",
    "Tu_Khoa": ""
  },
  {
    "ID": "HCQ138",
    "Nhom_Benh": "Hệ tiết niệu",
    "Tinh_Trang_Benh": "Rối loạn nồng độ thuốc thải ghép sau ghép thận",
    "ICD_Chinh": "T86.1 (Thất bại và thải ghép thận) hoặc Y40-Y59",
    "Ly_Do_Nhap_Vien": "Nồng độ thuốc quá thấp (nguy cơ thải ghép) hoặc quá cao (ngộ độc thuốc/suy thận).",
    "ICD_Kem_Theo": "Z94.0 (Ghép thận)N17 (Suy thận cấp do thuốc)T45.1 (Ngộ độc thuốc ức chế MD)",
    "Ngoai_Le": "Nồng độ thuốc dao động nhẹ trong ngưỡng an toàn, chức năng thận ghép ổn định.",
    "Tu_Khoa": ""
  },
  {
    "ID": "HCQ139",
    "Nhom_Benh": "Hệ tiết niệu",
    "Tinh_Trang_Benh": "Viêm phúc mạc ở người bệnh lọc màng bụng",
    "ICD_Chinh": "K65.0 (Viêm phúc mạc cấp tính) hoặc T85.7",
    "Ly_Do_Nhap_Vien": "(Lặp lại nội dung mục 8). Biến chứng nhiễm trùng dịch lọc. Cần nhập viện điều trị kháng sinh qua dịch lọc hoặc toàn thân.",
    "ICD_Kem_Theo": "T85.7 (Nhiễm trùng do thiết bị thẩm phân phúc mạc)N18.5 (Suy thận mạn gđ cuối)A49 (Nhiễm khuẩn chưa xác định)",
    "Ngoai_Le": "Đau bụng cơ năng, dịch lọc trong, xét nghiệm tế bào dịch lọc < 100 BC/mm3.",
    "Tu_Khoa": ""
  },
  {
    "ID": "HCQ140",
    "Nhom_Benh": "Hệ tiết niệu",
    "Tinh_Trang_Benh": "Người bệnh viêm thận Lupus có đợt cấp",
    "ICD_Chinh": "M32.1 (Lupus ban đỏ hệ thống có tổn thương cơ quan hoặc hệ thống)",
    "Ly_Do_Nhap_Vien": "Đợt bùng phát (Flare) gây suy thận cấp, tiểu đạm nhiều, tiểu máu. Cần liệu pháp Corticoid liều cao (Pulse therapy).",
    "ICD_Kem_Theo": "N00 (Viêm cầu thận cấp)N04 (Hội chứng thận hư)N17 (Suy thận cấp)",
    "Ngoai_Le": "Lupus ổn định, Protein niệu vết, bổ thể C3/C4 bình thường, không có cặn lắng nước tiểu hoạt động.",
    "Tu_Khoa": ""
  },
  {
    "ID": "HCQ141",
    "Nhom_Benh": "Hệ tiết niệu",
    "Tinh_Trang_Benh": "Người bệnh thận nhân tạo chu kỳ có biểu hiện: phù phổi, chảy máu FAV, nhiễm trùng đường vào mạch máu cấp tính, tắc đường vào mạch máu ",
    "ICD_Chinh": "Z99.2 (Lệ thuộc thận nhân tạo) kèm mã biến chứng T82 hoặc J81",
    "Ly_Do_Nhap_Vien": "Các biến chứng thường gặp và nguy hiểm nhất ở bệnh nhân chạy thận định kỳ.",
    "ICD_Kem_Theo": "T82.7 (Nhiễm trùng do thiết bị tim mạch)T82.5 (Tắc cầu nối FAV)J81 (Phù phổi cấp)",
    "Ngoai_Le": "Tắc cầu tay (FAV) cũ, bệnh nhân đã có Catheter tạm thời ổn định, nhập viện theo lịch mổ phiên để tạo cầu mới.",
    "Tu_Khoa": ""
  },
  {
    "ID": "HCQ142",
    "Nhom_Benh": "Hệ tiết niệu",
    "Tinh_Trang_Benh": "Người bệnh mắc bệnh thận mạn tính có các biến chứng của các cơ quan khác và đủ tiêu chuẩn nhập viện của những rối loạn thuộc cơ quan đó.",
    "ICD_Chinh": "N18 (Bệnh thận mạn) kèm mã bệnh cơ quan khác",
    "Ly_Do_Nhap_Vien": "Quy định mở để nhập viện cho bệnh nhân suy thận mạn có bệnh lý kèm theo (ví dụ: Suy thận mạn + Viêm phổi).",
    "ICD_Kem_Theo": "J18 (Viêm phổi)I50 (Suy tim)A41 (Nhiễm khuẩn huyết)",
    "Ngoai_Le": "Các bệnh lý kèm theo ở mức độ nhẹ (ví dụ: Viêm họng cấp trên nền suy thận mạn), điều trị ngoại trú được.",
    "Tu_Khoa": ""
  },
  {
    "ID": "HCQ143",
    "Nhom_Benh": "Hệ tiết niệu",
    "Tinh_Trang_Benh": "Người bệnh mắc bệnh thận cấp tính có các biến chứng của các cơ quan khác và đủ tiêu chuẩn nhập viện trong tình trạng cấp cứu của những rối loạn thuộc cơ quan đó",
    "ICD_Chinh": "N17 (Suy thận cấp) kèm mã bệnh biến chứng",
    "Ly_Do_Nhap_Vien": "Suy thận cấp (AKI) làm nặng thêm các bệnh lý cấp tính khác (thải trừ thuốc kém, quá tải dịch).",
    "ICD_Kem_Theo": "I50.1 (Suy tim trái)E87 (Rối loạn điện giải)J96 (Suy hô hấp)",
    "Ngoai_Le": "Không có ngoại lệ (vì đã là suy thận cấp kèm biến chứng cơ quan khác).",
    "Tu_Khoa": ""
  },
  {
    "ID": "HCQ144",
    "Nhom_Benh": "Hệ tiết niệu",
    "Tinh_Trang_Benh": "Người bệnh có thiểu niệu hoặc vô niệu",
    "ICD_Chinh": "R34 (Vô niệu và thiểu niệu)",
    "Ly_Do_Nhap_Vien": "Dấu hiệu lâm sàng của suy thận cấp (AKI) hoặc tắc nghẽn đường tiết niệu hoàn toàn.",
    "ICD_Kem_Theo": "N17 (Suy thận cấp)N13 (Bệnh thận tắc nghẽn)R33 (Bí tiểu)",
    "Ngoai_Le": "Uống ít nước dẫn đến tiểu ít cô đặc, nhưng chức năng thận bình thường, bù dịch tiểu lại tốt.",
    "Tu_Khoa": ""
  },
  {
    "ID": "HCQ145",
    "Nhom_Benh": "Hệ tiết niệu",
    "Tinh_Trang_Benh": "Người bệnh ghép thận có một trong các biểu hiện: Suy thận cấp, rối loạn nồng độ thuốc, tắc nghẽn đường niệu, đái máu, nhiễm khuẩn cơ hội cấp tính, hoặc các biến chứng của các cơ quan khác và đủ tiêu chuẩn nhập viện trong tình trạng cấp cứu của những rối loạn thuộc cơ quan đó ",
    "ICD_Chinh": "Z94.0 (Trạng thái ghép thận) kèm T86.1 hoặc mã bệnh khác",
    "Ly_Do_Nhap_Vien": "Nhóm bệnh nhân nguy cơ rất cao (đang dùng thuốc ức chế miễn dịch). Cần theo dõi sát thải ghép và nhiễm trùng.",
    "ICD_Kem_Theo": "T86.1 (Thải ghép thận)N17 (Suy thận cấp)A49 (Nhiễm trùng)",
    "Ngoai_Le": "Rối loạn nồng độ thuốc nhẹ, không triệu chứng lâm sàng, chỉnh liều ngoại trú.",
    "Tu_Khoa": ""
  },
  {
    "ID": "HCQ146",
    "Nhom_Benh": "Hệ tiết niệu",
    "Tinh_Trang_Benh": "Bệnh thận có cơn tăng huyết áp cấp tính khó kiểm soát",
    "ICD_Chinh": "I12 (Bệnh thận do tăng huyết áp) hoặc I15.1",
    "Ly_Do_Nhap_Vien": "Tăng huyết áp thứ phát do thận thường rất cao và khó hạ (kháng trị). Nguy cơ phù phổi/bệnh não.",
    "ICD_Kem_Theo": "N18 (Suy thận mạn)I10 (Tăng huyết áp vô căn)I67.4 (Bệnh não cao áp)",
    "Ngoai_Le": "Huyết áp cao nhưng chưa đến ngưỡng cấp cứu, bệnh nhân tuân thủ thuốc chưa tốt (tư vấn chỉnh thuốc ngoại trú).",
    "Tu_Khoa": ""
  },
  {
    "ID": "HCQ147",
    "Nhom_Benh": "Hệ tiết niệu",
    "Tinh_Trang_Benh": "Bệnh thận có biểu hiện tắc mạch cấp tính",
    "ICD_Chinh": "I82.3 (Huyết khối tĩnh mạch thận) hoặc I74.0",
    "Ly_Do_Nhap_Vien": "Tắc tĩnh mạch thận (trong Hội chứng thận hư) hoặc tắc động mạch thận (nhồi máu thận).",
    "ICD_Kem_Theo": "N04 (Hội chứng thận hư)I74.8 (Thuyên tắc mạch khác)I26 (Thuyên tắc phổi - biến chứng)",
    "Ngoai_Le": "Huyết khối cũ mạn tính đã tái thông một phần hoặc đang điều trị chống đông ổn định.",
    "Tu_Khoa": ""
  },
  {
    "ID": "HCQ148",
    "Nhom_Benh": "Hệ tiết niệu",
    "Tinh_Trang_Benh": "Người bệnh thận nhân tạo chu kỳ có một trong các biểu hiện suy tim cấp, dọa phù phổi, thiếu máu nặng, tụt huyết áp, nhiễm trùng cấp tính…hoặc các biến chứng của các cơ quan khác và đủ tiêu chuẩn nhập viện trong tình trạng cấp cứu của những rối loạn thuộc cơ quan đó. ",
    "ICD_Chinh": "Z99.2 (Thận nhân tạo) kèm I50 hoặc D63.8",
    "Ly_Do_Nhap_Vien": "(Nội dung chi tiết hóa mục 23). Nhấn mạnh các biến chứng nội khoa nặng ở người chạy thận.",
    "ICD_Kem_Theo": "I50.1 (Suy tim trái)D64.9 (Thiếu máu nặng)I95.9 (Tụt huyết áp)",
    "Ngoai_Le": "Tụt huyết áp thoáng qua trong lọc máu, sau khi kết thúc lọc huyết áp về bình thường, bệnh nhân tỉnh táo.",
    "Tu_Khoa": ""
  },
  {
    "ID": "HCQ149",
    "Nhom_Benh": "Hệ tiết niệu",
    "Tinh_Trang_Benh": "Chấn thương thận",
    "ICD_Chinh": "S37.0 (Tổn thương thận)",
    "Ly_Do_Nhap_Vien": "Chấn thương tạng đặc vùng hông lưng. Cần theo dõi nguy cơ chảy máu và thoát nước tiểu.",
    "ICD_Kem_Theo": "S31 (Vết thương hở bụng)R31 (Đái máu)T07 (Đa chấn thương)",
    "Ngoai_Le": "Chấn thương thận độ I (Đụng dập nhẹ), huyết động ổn định, không đái máu đại thể.",
    "Tu_Khoa": ""
  },
  {
    "ID": "HCQ150",
    "Nhom_Benh": "Hệ tiết niệu",
    "Tinh_Trang_Benh": "Chấn thương và vết thương niệu quản",
    "ICD_Chinh": "S37.1 (Tổn thương niệu quản)",
    "Ly_Do_Nhap_Vien": "Tổn thương ít gặp nhưng rất nặng (gây rò nước tiểu/viêm phúc mạc). Thường do tai biến phẫu thuật hoặc vết thương thấu bụng.",
    "ICD_Kem_Theo": "T81.2 (Thủng ngẫu nhiên trong thủ thuật)S31 (Vết thương hở)N13.5 (Xoắn/hẹp niệu quản)",
    "Ngoai_Le": "Không có ngoại lệ.",
    "Tu_Khoa": ""
  },
  {
    "ID": "HCQ151",
    "Nhom_Benh": "Hệ tiết niệu",
    "Tinh_Trang_Benh": "Chấn thương bàng quang",
    "ICD_Chinh": "S37.2 (Tổn thương bàng quang)",
    "Ly_Do_Nhap_Vien": "Thường kèm gãy xương chậu. Vỡ bàng quang (trong/ngoài phúc mạc) gây viêm phúc mạc nước tiểu.",
    "ICD_Kem_Theo": "S32 (Gãy xương chậu)R31 (Đái máu)K65 (Viêm phúc mạc)",
    "Ngoai_Le": "Đụng dập bàng quang nhẹ, không vỡ, thông tiểu ra nước tiểu trong (theo dõi ngắn).",
    "Tu_Khoa": ""
  },
  {
    "ID": "HCQ152",
    "Nhom_Benh": "Hệ tiết niệu",
    "Tinh_Trang_Benh": "Chấn thương niệu đạo",
    "ICD_Chinh": "S37.3 (Tổn thương niệu đạo)",
    "Ly_Do_Nhap_Vien": "Tổn thương gây bí tiểu hoặc chảy máu miệng sáo. Cần dẫn lưu bàng quang trên xương mu cấp cứu.",
    "ICD_Kem_Theo": "S39.9 (Chấn thương bụng, lưng dưới, chậu hông)R31 (Đái máu)R33 (Bí tiểu)",
    "Ngoai_Le": "Đụng dập nhẹ niêm mạc niệu đạo sau thông tiểu, tự cầm máu, tiểu được, không bí tiểu.",
    "Tu_Khoa": ""
  },
  {
    "ID": "HCQ153",
    "Nhom_Benh": "Hệ tiết niệu",
    "Tinh_Trang_Benh": "Tiểu ít, vô niệu ",
    "ICD_Chinh": "R34 (Vô niệu và thiểu niệu)",
    "Ly_Do_Nhap_Vien": "Dấu hiệu lâm sàng của suy thận cấp hoặc tắc nghẽn. Cần theo dõi lượng nước tiểu 24h.",
    "ICD_Kem_Theo": "N17 (Suy thận cấp)E86 (Mất thể tích dịch)N13 (Bệnh thận tắc nghẽn)",
    "Ngoai_Le": "Tiểu ít do uống ít nước (thiểu niệu sinh lý), chức năng thận bình thường, bù dịch tiểu tốt.",
    "Tu_Khoa": ""
  },
  {
    "ID": "HCQ154",
    "Nhom_Benh": "Hệ tiết niệu",
    "Tinh_Trang_Benh": "Sốt kèm theo hội chứng bàng quang kích thích",
    "ICD_Chinh": "N30.0 (Viêm bàng quang cấp) hoặc N39.0",
    "Ly_Do_Nhap_Vien": "Hội chứng bàng quang (tiểu buốt, rắt) kèm sốt gợi ý nhiễm trùng lan lên thận hoặc viêm tiền liệt tuyến.",
    "ICD_Kem_Theo": "N41.0 (Viêm tiền liệt tuyến cấp)N10 (Viêm thận bể thận cấp)R30 (Đau khi tiểu)",
    "Ngoai_Le": "Viêm bàng quang đơn thuần ở phụ nữ, không sốt (chỉ tiểu buốt), toàn trạng tốt.",
    "Tu_Khoa": ""
  },
  {
    "ID": "HCQ155",
    "Nhom_Benh": "Hệ tiết niệu",
    "Tinh_Trang_Benh": "Tiểu máu, tiểu mủ hoặc nước tiểu có màu bất thường ",
    "ICD_Chinh": "R31 (Đái máu) hoặc R82.9 (Dấu hiệu bất thường khác trong nước tiểu)",
    "Ly_Do_Nhap_Vien": "Báo động nhiễm trùng nặng (tiểu mủ) hoặc tổn thương niêm mạc đường niệu (tiểu máu).",
    "ICD_Kem_Theo": "N02 (Đái máu tái phát)N20 (Sỏi tiết niệu)N40 (Phì đại tiền liệt tuyến)",
    "Ngoai_Le": "Nước tiểu đỏ do thức ăn (củ dền) hoặc thuốc (Rifampicin), xét nghiệm nước tiểu bình thường.",
    "Tu_Khoa": ""
  },
  {
    "ID": "HCQ156",
    "Nhom_Benh": "Hệ tiết niệu",
    "Tinh_Trang_Benh": "Sốt kèm đau thắt lưng, đau lưng nhiều ",
    "ICD_Chinh": "N10 (Viêm ống thận mô kẽ cấp tính - Viêm bể thận)",
    "Ly_Do_Nhap_Vien": "Triệu chứng điển hình của Viêm thận bể thận cấp. Cần nhập viện điều trị kháng sinh tĩnh mạch.",
    "ICD_Kem_Theo": "M54.5 (Đau lưng vùng thắt lưng)N20.0 (Sỏi thận)A41 (Nhiễm khuẩn huyết)",
    "Ngoai_Le": "Đau lưng do thoái hóa cột sống kèm cảm cúm (sốt virus), xét nghiệm nước tiểu và siêu âm thận bình thường.",
    "Tu_Khoa": ""
  },
  {
    "ID": "HCQ157",
    "Nhom_Benh": "Hệ tiết niệu",
    "Tinh_Trang_Benh": "Có tiền sử bệnh thận được vào cấp cứu khi có một trong các triệu chứng sau: đánh trống ngực, hồi hộp, đau đầu, nhìn mờ, cơn tăng huyết áp, khó thở và khó thở tăng dần, mệt mỏi, ngất ",
    "ICD_Chinh": "N18 (Bệnh thận mạn) kèm mã triệu chứng cấp cứu",
    "Ly_Do_Nhap_Vien": "Quy định nhập viện cho bệnh nhân thận mạn có biến chứng tim mạch/thần kinh cấp tính.",
    "ICD_Kem_Theo": "I10 (Tăng huyết áp)R00.2 (Đánh trống ngực)I50 (Suy tim)R55 (Ngất)",
    "Ngoai_Le": "Triệu chứng nhẹ thoáng qua, huyết áp kiểm soát được, không có dấu hiệu suy tim/phù phổi cấp.",
    "Tu_Khoa": ""
  },
  {
    "ID": "HCQ158",
    "Nhom_Benh": "Hệ tiết niệu",
    "Tinh_Trang_Benh": "Bệnh thận mạn có một trong các biểu hiện sau:- Hội chứng ure huyết cao.- Rối loạn điện giải: Tăng/hạ Kali, tăng/hạ Natri mức độ nặng và/hoặc có những thay đổi về triệu chứng lâm sàng, cận lâm sàng cần theo dõi sát.- Rối loạn toan - kiềm mức độ nặng. ",
    "ICD_Chinh": "N18.5 (Bệnh thận mạn giai đoạn 5) kèm E87",
    "Ly_Do_Nhap_Vien": "Các chỉ định lọc máu cấp cứu hoặc điều chỉnh nội khoa tích cực ở bệnh nhân suy thận.",
    "ICD_Kem_Theo": "E87.5 (Tăng Kali)E87.2 (Nhiễm toan)N19 (Suy thận không xác định)",
    "Ngoai_Le": "Rối loạn điện giải nhẹ mạn tính, bệnh nhân dung nạp tốt, điều chỉnh bằng thuốc uống ngoại trú.",
    "Tu_Khoa": ""
  },
  {
    "ID": "HCQ159",
    "Nhom_Benh": "Hệ tiết niệu",
    "Tinh_Trang_Benh": "Tổn thương thận cấp giai đoạn 2, 3 theo KDIGO 2012. ",
    "ICD_Chinh": "N17 (Suy thận cấp)",
    "Ly_Do_Nhap_Vien": "Suy thận cấp mức độ trung bình-nặng (Creatinine tăng > 2-3 lần nền). Cần nhập viện tìm nguyên nhân.",
    "ICD_Kem_Theo": "N17.0 (Suy thận cấp hoại tử ống thận)T88 (Biến chứng do thuốc)A41 (Nhiễm trùng huyết)",
    "Ngoai_Le": "AKI giai đoạn 1 (tăng nhẹ Creatinine), nguyên nhân rõ (do thiếu nước), bù dịch đáp ứng tốt.",
    "Tu_Khoa": ""
  },
  {
    "ID": "HCQ160",
    "Nhom_Benh": "Hệ tiết niệu",
    "Tinh_Trang_Benh": "Nhiễm khuẩn đường tiết niệu.",
    "ICD_Chinh": "N39.0 (Nhiễm khuẩn đường tiết niệu, vị trí không xác định)",
    "Ly_Do_Nhap_Vien": "Mã chung. Thường nhập viện các trường hợp viêm thận bể thận hoặc nhiễm trùng trên nền tắc nghẽn/dị dạng.",
    "ICD_Kem_Theo": "N10 (Viêm thận bể thận)N30.0 (Viêm bàng quang cấp)A41 (Nhiễm khuẩn huyết)",
    "Ngoai_Le": "Nhiễm trùng tiểu dưới đơn thuần, không sốt, không biến chứng (điều trị ngoại trú 3-5 ngày).",
    "Tu_Khoa": ""
  },
  {
    "ID": "HCQ161",
    "Nhom_Benh": "Hệ tiết niệu",
    "Tinh_Trang_Benh": "Hội chứng thận hư có một trong các biểu hiện:- Phù toàn thân mức độ nhiều, tràn dịch màng phổi lượng nhiều, giảm albumin máu nặng.- Nhiễm trùng (da, hô hấp, tiêu hóa, thần kinh,… )- Tắc mạch (huyết khối tĩnh mạch sâu, thuyên tắc phổi,…) ",
    "ICD_Chinh": "N04 (Hội chứng thận hư) kèm mã biến chứng",
    "Ly_Do_Nhap_Vien": "Hội chứng thận hư bùng phát hoặc có biến chứng nguy hiểm. Cần truyền Albumin/kháng sinh/chống đông.",
    "ICD_Kem_Theo": "I26 (Thuyên tắc phổi)J90 (Tràn dịch màng phổi)L03 (Viêm mô tế bào)",
    "Ngoai_Le": "Hội chứng thận hư ổn định hoặc tái phát nhẹ (phù ít), Albumin máu > 25g/l, không nhiễm trùng.",
    "Tu_Khoa": ""
  },
  {
    "ID": "HCQ162",
    "Nhom_Benh": "Hệ tiết niệu",
    "Tinh_Trang_Benh": "Chấn thương tiết niệu.",
    "ICD_Chinh": "S37 (Tổn thương cơ quan tiết niệu và vùng chậu hông)",
    "Ly_Do_Nhap_Vien": "Mã chung cho chấn thương hệ niệu (thận, niệu quản, bàng quang, niệu đạo).",
    "ICD_Kem_Theo": "S37.0 (Thận)S37.1 (Niệu quản)S37.2 (Bàng quang)",
    "Ngoai_Le": "Chấn thương phần mềm vùng hông lưng, siêu âm thận bình thường, nước tiểu trong.",
    "Tu_Khoa": ""
  },
  {
    "ID": "HCQ163",
    "Nhom_Benh": "Hệ tiết niệu",
    "Tinh_Trang_Benh": "Áp xe quanh thận hoặc niệu đạo.",
    "ICD_Chinh": "N15.1 (Áp xe thận và quanh thận) hoặc N34.0",
    "Ly_Do_Nhap_Vien": "Tình trạng nhiễm trùng sâu, nguy cơ vỡ hoặc nhiễm khuẩn huyết. Cần rạch dẫn lưu mủ.",
    "ICD_Kem_Theo": "N10 (Viêm thận bể thận)A49 (Nhiễm khuẩn không xác định)N34 (Viêm niệu đạo)",
    "Ngoai_Le": "Nhọt da (Furuncle) vùng bẹn bìu nông, không thông với niệu đạo/thận.",
    "Tu_Khoa": ""
  },
  {
    "ID": "HCQ164",
    "Nhom_Benh": "Nội tiết",
    "Tinh_Trang_Benh": "Xuất huyết (Apoplexy) tuyến yên",
    "ICD_Chinh": "E23.6 (Các bệnh khác của tuyến yên)",
    "Ly_Do_Nhap_Vien": "Tình trạng nhồi máu hoặc xuất huyết trong u tuyến yên. Cấp cứu ngoại thần kinh/nội tiết (đau đầu dữ dội, mù mắt, suy tuyến yên cấp).",
    "ICD_Kem_Theo": "D35.2 (U tuyến yên lành tính)H54 (Mù)R51 (Đau đầu cấp)",
    "Ngoai_Le": "Phát hiện tình cờ trên MRI vi xuất huyết cũ trong u tuyến yên, không có triệu chứng lâm sàng cấp tính.",
    "Tu_Khoa": ""
  },
  {
    "ID": "HCQ165",
    "Nhom_Benh": "Nội tiết",
    "Tinh_Trang_Benh": "Basedow có giảm bạch cầu trung tính < 1G/l hoặc có suy gan, viêm gan cấp tính.",
    "ICD_Chinh": "E05.0 (Nhiễm độc giáp do Basedow) kèm D70 hoặc K71",
    "Ly_Do_Nhap_Vien": "Tác dụng phụ nguy hiểm của thuốc kháng giáp (PTU/Thyrozol). Cần nhập viện ngừng thuốc, dùng corticoid/G-CSF hoặc chuẩn bị mổ/iốt phóng xạ.",
    "ICD_Kem_Theo": "D70 (Giảm bạch cầu hạt)K71.2 (Viêm gan do thuốc)T38.2 (Ngộ độc thuốc kháng giáp)",
    "Ngoai_Le": "Giảm bạch cầu nhẹ (> 1.5 G/l), men gan tăng nhẹ (< 3 lần), bệnh nhân hoàn toàn khỏe mạnh, theo dõi sát ngoại trú.",
    "Tu_Khoa": ""
  },
  {
    "ID": "HCQ166",
    "Nhom_Benh": "Nội tiết",
    "Tinh_Trang_Benh": "Cường giáp, suy giáp nặng",
    "ICD_Chinh": "E05.5 (Cơn bão giáp) hoặc E03.5 (Hôn mê suy giáp)",
    "Ly_Do_Nhap_Vien": "Các biến chứng tối khẩn cấp của bệnh lý tuyến giáp đe dọa tính mạng (sốt cao, loạn nhịp hoặc hôn mê, tụt thân nhiệt).",
    "ICD_Kem_Theo": "E05.9 (Nhiễm độc giáp)E03.9 (Suy giáp)I49 (Loạn nhịp tim)",
    "Ngoai_Le": "Cường giáp/Suy giáp mức độ trung bình, triệu chứng lâm sàng rõ nhưng sinh hiệu ổn định, tuân thủ thuốc uống.",
    "Tu_Khoa": ""
  },
  {
    "ID": "HCQ167",
    "Nhom_Benh": "Nội tiết",
    "Tinh_Trang_Benh": "Tăng Triglyceride máu rất nặng > 11 mmol/L",
    "ICD_Chinh": "E78.1 (Tăng glycerid máu đơn thuần)",
    "Ly_Do_Nhap_Vien": "Nguy cơ rất cao gây Viêm tụy cấp. Cần nhập viện để điều trị bằng thuốc (Fibrate/Insulin) hoặc thay huyết tương.",
    "ICD_Kem_Theo": "K85 (Viêm tụy cấp)E11 (Đái tháo đường type 2)E78.5 (Rối loạn lipid máu không xác định)",
    "Ngoai_Le": "Tăng Triglyceride mức độ vừa (5-10 mmol/L), chưa đau bụng, không có yếu tố nguy cơ khác (điều trị ngoại trú tích cực).",
    "Tu_Khoa": ""
  },
  {
    "ID": "HCQ168",
    "Nhom_Benh": "Nội tiết",
    "Tinh_Trang_Benh": "Biến chứng cấp tính đái tháo đường như hạ đường huyết, nhiễm toan ceton, nhiễm toan lactic, tăng áp lực thẩm thấu",
    "ICD_Chinh": "E10.1/E11.1 (Nhiễm toan ceton) hoặc E10.0/E11.0 (Hôn mê)",
    "Ly_Do_Nhap_Vien": "Các cấp cứu chuyển hóa của Đái tháo đường. E1x.1 cho nhiễm toan (DKA), E1x.0 cho hôn mê (bao gồm hạ đường huyết E16.0 hoặc HHS).",
    "ICD_Kem_Theo": "E16.0 (Hạ đường huyết do thuốc)E16.2 (Hạ đường huyết không xác định)E87.2 (Nhiễm toan)",
    "Ngoai_Le": "Hạ đường huyết nhẹ, bệnh nhân còn tỉnh, tự uống nước đường và ăn được, đường huyết lên lại bình thường.",
    "Tu_Khoa": ""
  },
  {
    "ID": "HCQ169",
    "Nhom_Benh": "Nội tiết",
    "Tinh_Trang_Benh": "Người bệnh đái tháo đường có tình trạng nhiễm trùng nặng",
    "ICD_Chinh": "E11 (Đái tháo đường type 2) kèm mã nhiễm trùng",
    "Ly_Do_Nhap_Vien": "Nhiễm trùng trên nền ĐTĐ rất khó kiểm soát và dễ dẫn đến nhiễm toan hoặc sốc nhiễm khuẩn.",
    "ICD_Kem_Theo": "L03 (Viêm mô tế bào)N39.0 (Nhiễm trùng tiểu)J18 (Viêm phổi)",
    "Ngoai_Le": "Nhiễm trùng da nông, khu trú, đường huyết kiểm soát tốt, đáp ứng kháng sinh uống.",
    "Tu_Khoa": ""
  },
  {
    "ID": "HCQ170",
    "Nhom_Benh": "Nội tiết",
    "Tinh_Trang_Benh": "Đái tháo đường thai kỳ có Glucose máu đói > 10,0 mmol/L hoặc Glucose máu bất kỳ ≥ 13 mmol/l",
    "ICD_Chinh": "O24.4 (Đái tháo đường phát sinh trong thai kỳ)",
    "Ly_Do_Nhap_Vien": "Mức đường huyết rất cao đe dọa thai nhi (chết lưu, suy thai). Cần nhập viện để tiêm Insulin kiểm soát gấp.",
    "ICD_Kem_Theo": "O24.9 (ĐTĐ trong thai kỳ, không xác định)P08.0 (Thai to)O99.8 (Bệnh nội tiết mẹ)",
    "Ngoai_Le": "Đường huyết tăng nhẹ/vừa, đang điều chỉnh chế độ ăn hoặc insulin liều thấp, đường huyết mao mạch ổn định.",
    "Tu_Khoa": ""
  },
  {
    "ID": "HCQ171",
    "Nhom_Benh": "Nội tiết",
    "Tinh_Trang_Benh": "Suy thượng thận cấp",
    "ICD_Chinh": "E27.2 (Cơn Addison)",
    "Ly_Do_Nhap_Vien": "Tình trạng tụt huyết áp kháng trị do thiếu Cortisol cấp tính (thường gặp ở bệnh nhân cai Corticoid đột ngột).",
    "ICD_Kem_Theo": "E27.1 (Suy vỏ thượng thận nguyên phát)E27.4 (Suy vỏ thượng thận khác)R57.9 (Sốc)",
    "Ngoai_Le": "Suy thượng thận mạn tính, mệt mỏi nhưng huyết áp ổn định, điện giải đồ bình thường.",
    "Tu_Khoa": ""
  },
  {
    "ID": "HCQ172",
    "Nhom_Benh": "Hệ thống tạo máu và lympho",
    "Tinh_Trang_Benh": "Thiếu máu nặng (Huyết sắc tố < 70 g/l) hoặc thiếu máu có rối loạn huyết động.",
    "ICD_Chinh": "D64.9 (Thiếu máu, không xác định)",
    "Ly_Do_Nhap_Vien": "Chỉ định truyền máu cấp cứu. Ngưỡng Hb < 70g/l là ngưỡng truyền máu lâm sàng kinh điển.",
    "ICD_Kem_Theo": "D50.8 (Thiếu máu thiếu sắt nặng)D62 (Thiếu máu sau xuất huyết)N18.5 (Thiếu máu do suy thận)",
    "Ngoai_Le": "Thiếu máu mạn tính mức độ trung bình (Hb 75-80 g/l), huyết động ổn định, bệnh nhân dung nạp tốt, đang điều trị thuốc.",
    "Tu_Khoa": ""
  },
  {
    "ID": "HCQ173",
    "Nhom_Benh": "Hệ thống tạo máu và lympho",
    "Tinh_Trang_Benh": "Số lượng tiểu cầu < 10 G/l hoặc số lượng tiểu cầu < 20 G/l kèm theo xuất huyết trên lâm sàng.",
    "ICD_Chinh": "D69.6 (Giảm tiểu cầu, không xác định) hoặc D69.3 (ITP)",
    "Ly_Do_Nhap_Vien": "Nguy cơ xuất huyết não/nội tạng tự nhiên rất cao. Cần truyền khối tiểu cầu hoặc điều trị đặc hiệu.",
    "ICD_Kem_Theo": "D69.3 (Xuất huyết giảm tiểu cầu miễn dịch)A91 (Sốt xuất huyết Dengue)C91 (Bạch cầu cấp)",
    "Ngoai_Le": "Giảm tiểu cầu mức độ vừa (> 50 G/l), không có xuất huyết lâm sàng, theo dõi ngoại trú được.",
    "Tu_Khoa": ""
  },
  {
    "ID": "HCQ174",
    "Nhom_Benh": "Hệ thống tạo máu và lympho",
    "Tinh_Trang_Benh": "Số lượng bạch cầu trung tính < 0.5 G/l hoặc số lượng bạch cầu trung tính < 1.0 G/l kèm theo sốt ≥ 38.5 độ C hoặc có biểu hiện nhiễm trùng.",
    "ICD_Chinh": "D70 (Giảm bạch cầu hạt)",
    "Ly_Do_Nhap_Vien": "Tình trạng \"Sốt hạ bạch cầu\" (Febrile Neutropenia) - cấp cứu tối khẩn trong huyết học/ung thư.",
    "ICD_Kem_Theo": "T45.1 (Tác dụng phụ hóa chất trị liệu)A41 (Nhiễm khuẩn huyết)C92 (Bạch cầu cấp dòng tủy)",
    "Ngoai_Le": "Giảm bạch cầu nhẹ (Neutrophil > 1.5 G/l), không sốt, không có ổ nhiễm trùng khu trú.",
    "Tu_Khoa": ""
  },
  {
    "ID": "HCQ175",
    "Nhom_Benh": "Hệ thống tạo máu và lympho",
    "Tinh_Trang_Benh": "Rối loạn đông máu: Tỷ lệ Prothrombin < 40% hoặc INR > 1.5; APTT bệnh/chứng > 1.5 lần; Fibrinogen < 1.0 g/l.",
    "ICD_Chinh": "D68.9 (Rối loạn đông máu, không xác định)",
    "Ly_Do_Nhap_Vien": "Nguy cơ chảy máu tự nhiên hoặc chảy máu không cầm. Cần truyền huyết tương tươi/tủa lạnh/Vitamin K.",
    "ICD_Kem_Theo": "K72 (Suy gan)D65 (Đông máu nội mạch rải rác - DIC)Z92.1 (Dùng thuốc chống đông quá liều)",
    "Ngoai_Le": "Rối loạn đông máu nhẹ (INR 1.2 - 1.3), không có biểu hiện chảy máu lâm sàng.",
    "Tu_Khoa": ""
  },
  {
    "ID": "HCQ176",
    "Nhom_Benh": "Hệ thống tạo máu và lympho",
    "Tinh_Trang_Benh": "Tan máu cấp.",
    "ICD_Chinh": "D59.9 (Tan máu mắc phải, không xác định)",
    "Ly_Do_Nhap_Vien": "Tình trạng vỡ hồng cầu ồ ạt gây thiếu máu cấp và suy thận cấp (đái huyết sắc tố).",
    "ICD_Kem_Theo": "D59.6 (Tiểu huyết sắc tố kịch phát)D55.0 (Thiếu men G6PD)N17 (Suy thận cấp do tan máu)",
    "Ngoai_Le": "Tan máu mạn tính (Thalassemia), mức độ tan máu ổn định, không có cơn tan máu cấp.",
    "Tu_Khoa": ""
  },
  {
    "ID": "HCQ177",
    "Nhom_Benh": "Hệ thống tạo máu và lympho",
    "Tinh_Trang_Benh": "Huyết khối tĩnh mạch sâu chi dưới, thuyên tắc phổi, huyết khối các tạng.",
    "ICD_Chinh": "I80.2 (Huyết khối TM sâu chi dưới) hoặc I26 (Thuyên tắc phổi)",
    "Ly_Do_Nhap_Vien": "Tình trạng tăng đông gây tắc mạch. Cần nhập viện để dùng chống đông liều điều trị và theo dõi di trú huyết khối.",
    "ICD_Kem_Theo": "I82.2 (Huyết khối tĩnh mạch chủ)I81 (Huyết khối tĩnh mạch cửa)O22.3 (Huyết khối thai kỳ)",
    "Ngoai_Le": "Huyết khối tĩnh mạch nông, khu trú, viêm nhẹ tại chỗ, không có nguy cơ lan rộng.",
    "Tu_Khoa": ""
  },
  {
    "ID": "HCQ178",
    "Nhom_Benh": "Hệ thống tạo máu và lympho",
    "Tinh_Trang_Benh": "Chảy máu không cầm ở người bệnh ưa chảy máu (Hemophilia), bệnh von Willebrand, rối loạn chức năng tiểu cầu.",
    "ICD_Chinh": "D66 (Hemophilia A) hoặc D67 (Hemophilia B)",
    "Ly_Do_Nhap_Vien": "Bệnh di truyền gây rối loạn đông máu. Chảy máu (khớp, cơ) cần bù yếu tố đông máu cô đặc (VIII/IX) ngay.",
    "ICD_Kem_Theo": "D68.0 (Bệnh Von Willebrand)M25.0 (Chảy máu khớp)D69.1 (Bệnh Glanzmann)",
    "Ngoai_Le": "Chảy máu chân răng nhẹ hoặc bầm tím nhỏ dưới da, tự cầm được, đã được hướng dẫn xử trí tại nhà.",
    "Tu_Khoa": ""
  },
  {
    "ID": "HCQ179",
    "Nhom_Benh": "Hệ Da, Cơ, Xương, Khớp",
    "Tinh_Trang_Benh": "Bong gân độ 3, đứt dây chằng, rách sụn chêm, tổn thương sụn khớp",
    "ICD_Chinh": "S83 (Tổn thương dây chằng khớp gối) hoặc S93 (Cổ chân)",
    "Ly_Do_Nhap_Vien": "Tổn thương cấu trúc khớp nặng gây mất vững khớp hoặc kẹt khớp. Cần phẫu thuật nội soi tái tạo/sửa chữa.",
    "ICD_Kem_Theo": "S83.5 (Đứt dây chằng chéo trước)S83.2 (Rách sụn chêm)M23 (Tổn thương nội khớp)",
    "Ngoai_Le": "Bong gân độ 1-2 (giãn dây chằng), khớp còn vững, sưng đau ít, đi lại được (băng thun, nghỉ ngơi).",
    "Tu_Khoa": ""
  },
  {
    "ID": "HCQ180",
    "Nhom_Benh": "Hệ Da, Cơ, Xương, Khớp",
    "Tinh_Trang_Benh": "Viêm xương tủy",
    "ICD_Chinh": "M86 (Viêm tủy xương)",
    "Ly_Do_Nhap_Vien": "Nhiễm trùng sâu trong tủy xương, khó điều trị, nguy cơ gãy xương bệnh lý và nhiễm khuẩn huyết. Cần kháng sinh đường tiêm dài ngày/nạo viêm.",
    "ICD_Kem_Theo": "M86.1 (Viêm tủy xương cấp)M86.6 (Viêm tủy xương mạn)A41 (Nhiễm khuẩn huyết)",
    "Ngoai_Le": "Viêm màng xương nhẹ do chấn thương va đập, không có ổ mủ sâu, không sốt.",
    "Tu_Khoa": ""
  },
  {
    "ID": "HCQ181",
    "Nhom_Benh": "Hệ Da, Cơ, Xương, Khớp",
    "Tinh_Trang_Benh": "Lao xương khớp đang tiến triển hoặc có biến chứng",
    "ICD_Chinh": "A18.0 (Lao xương và khớp)",
    "Ly_Do_Nhap_Vien": "Lao phá hủy xương (Lao cột sống - Pott, Lao khớp háng). Biến chứng: áp xe lạnh, chèn ép tủy, biến dạng khớp.",
    "ICD_Kem_Theo": "M49.0 (Lao cột sống)M01.1 (Lao khớp)G99.2 (Bệnh tủy sống trong bệnh lây nhiễm)",
    "Ngoai_Le": "Lao xương giai đoạn ổn định, đang điều trị thuốc lao theo phác đồ chương trình chống lao quốc gia, không đau cấp.",
    "Tu_Khoa": ""
  },
  {
    "ID": "HCQ182",
    "Nhom_Benh": "Hệ Da, Cơ, Xương, Khớp",
    "Tinh_Trang_Benh": "U xương, u phần mềm có biến chứng (gãy xương, chèn ép thần kinh mạch máu, vỡ u…)",
    "ICD_Chinh": "C40/C41 (U ác của xương) hoặc D16 (U lành) kèm M84.4",
    "Ly_Do_Nhap_Vien": "Gãy xương bệnh lý trên nền u hoặc u to chèn ép. Cần phẫu thuật cắt u/kết hợp xương.",
    "ICD_Kem_Theo": "M84.4 (Gãy xương bệnh lý)C49 (U ác mô liên kết)G55 (Chèn ép rễ thần kinh)",
    "Ngoai_Le": "U xương lành tính (u sụn), kích thước nhỏ, không đau, không ảnh hưởng vận động, phát hiện tình cờ.",
    "Tu_Khoa": ""
  },
  {
    "ID": "HCQ183",
    "Nhom_Benh": "Hệ Da, Cơ, Xương, Khớp",
    "Tinh_Trang_Benh": "Dị vật trong phần mềm hoặc trong khớp gây biến chứng (đau, hạn chế vận động, nhiễm trùng,…)",
    "ICD_Chinh": "M24.0 (Dị vật trong khớp - Chuột khớp) hoặc T14.1",
    "Ly_Do_Nhap_Vien": "Dị vật gây kẹt khớp (locking), viêm mủ khớp hoặc áp xe phần mềm. Cần phẫu thuật lấy dị vật.",
    "ICD_Kem_Theo": "T81.5 (Dị vật bỏ quên sau mổ)L02 (Áp xe do dị vật)S60.8 (Dị vật nông)",
    "Ngoai_Le": "Dị vật kim loại nhỏ nằm yên trong cơ (mảnh đạn cũ), đã xơ hóa xung quanh, không đau, không viêm.",
    "Tu_Khoa": ""
  },
  {
    "ID": "HCQ184",
    "Nhom_Benh": "Hệ Da, Cơ, Xương, Khớp",
    "Tinh_Trang_Benh": "Hội chứng Stevens - Johnson",
    "ICD_Chinh": "L51.1 (Hội chứng Stevens-Johnson)",
    "Ly_Do_Nhap_Vien": "Phản ứng dị ứng thuốc nặng trên da và niêm mạc (loét miệng, mắt, sinh dục). Nguy cơ mù lòa và tử vong. Cấp cứu da liễu.",
    "ICD_Kem_Theo": "T88.7 (Phản ứng bất lợi của thuốc)L51.8 (Hồng ban đa dạng khác)J96 (Suy hô hấp do tổn thương niêm mạc)",
    "Ngoai_Le": "Dị ứng thuốc dạng ban đỏ ngứa đơn thuần (Urticaria), không tổn thương niêm mạc hốc tự nhiên.",
    "Tu_Khoa": ""
  },
  {
    "ID": "HCQ185",
    "Nhom_Benh": "Hệ Da, Cơ, Xương, Khớp",
    "Tinh_Trang_Benh": "Hội chứng Lyell (Hoại tử thượng bì nhiễm độc)",
    "ICD_Chinh": "L51.2 (Hoại tử thượng bì nhiễm độc - TEN)",
    "Ly_Do_Nhap_Vien": "Thể nặng nhất của dị ứng thuốc. Da tuột từng mảng như bỏng (>30% diện tích cơ thể). Tỷ lệ tử vong rất cao.",
    "ICD_Kem_Theo": "T30 (Bỏng)A41 (Nhiễm khuẩn huyết)E87 (Rối loạn điện giải)",
    "Ngoai_Le": "Không có ngoại lệ. Bắt buộc nhập viện (thường nằm ICU/Khoa Bỏng).",
    "Tu_Khoa": ""
  },
  {
    "ID": "HCQ186",
    "Nhom_Benh": "Hệ Da, Cơ, Xương, Khớp",
    "Tinh_Trang_Benh": "Đỏ da toàn thân",
    "ICD_Chinh": "L53.9 (Tình trạng đỏ da, không xác định) hoặc L26 (Viêm da tróc vảy)",
    "Ly_Do_Nhap_Vien": "Tình trạng viêm da lan tỏa > 90% diện tích cơ thể. Gây mất nhiệt, mất nước, rối loạn điện giải và suy tim cung lượng cao.",
    "ICD_Kem_Theo": "L40.8 (Vảy nến thể mủ/đỏ da)L20 (Viêm da cơ địa bùng phát)I50 (Suy tim)",
    "Ngoai_Le": "Đỏ da khu trú hoặc cháy nắng diện rộng nhưng toàn trạng tốt, không rét run, không rối loạn thân nhiệt.",
    "Tu_Khoa": ""
  },
  {
    "ID": "HCQ187",
    "Nhom_Benh": "Hệ Da, Cơ, Xương, Khớp",
    "Tinh_Trang_Benh": "Bệnh Pemphigus, Pemphigoid cấp tính",
    "ICD_Chinh": "L10 (Pemphigus) hoặc L12 (Pemphigoid)",
    "Ly_Do_Nhap_Vien": "Bệnh da bóng nước tự miễn. Đợt cấp gây loét da rộng, đau đớn, nguy cơ nhiễm trùng huyết thứ phát.",
    "ICD_Kem_Theo": "L10.0 (Pemphigus thông thường)L12.0 (Pemphigoid bọng nước)L08 (Nhiễm trùng da)",
    "Ngoai_Le": "Bệnh ổn định, tổn thương cũ đã khô, không có bóng nước mới, đang duy trì corticoid liều thấp.",
    "Tu_Khoa": ""
  },
  {
    "ID": "HCQ188",
    "Nhom_Benh": "Hệ Da, Cơ, Xương, Khớp",
    "Tinh_Trang_Benh": "Các nhiễm trùng da nặng: Viêm mô tế bào hoại tử, Viêm quầng, Eczema Herpeticum...",
    "ICD_Chinh": "L03 (Viêm mô tế bào) hoặc M72.6 (Viêm cân mạc hoại tử)",
    "Ly_Do_Nhap_Vien": "Nhiễm trùng lan nhanh, sâu. Viêm cân mạc hoại tử (vi khuẩn ăn thịt người) là cấp cứu ngoại khoa cắt lọc khẩn.",
    "ICD_Kem_Theo": "A46 (Bệnh đóng dấu/Viêm quầng)B00.0 (Eczema Herpeticum)A48.0 (Hoại thư sinh hơi)",
    "Ngoai_Le": "Chốc lở (Impetigo) hoặc viêm nang lông nông, diện tích nhỏ, bôi thuốc hoặc uống kháng sinh tại nhà.",
    "Tu_Khoa": ""
  },
  {
    "ID": "HCQ189",
    "Nhom_Benh": "Sản phụ khoa",
    "Tinh_Trang_Benh": "Đau bụng cấp vùng hạ vị",
    "ICD_Chinh": "R10.3 (Đau ở vị trí khác của bụng dưới)",
    "Ly_Do_Nhap_Vien": "Triệu chứng chung báo động các tai biến sản phụ khoa (vỡ nang, xoắn phần phụ, sảy thai).",
    "ICD_Kem_Theo": "N83.2 (Nang buồng trứng xoắn)N70 (Viêm vòi trứng)O00 (Thai ngoài tử cung)",
    "Ngoai_Le": "Đau bụng kinh (Thống kinh) thông thường, đáp ứng thuốc giảm đau; hoặc rối loạn tiêu hóa nhẹ.",
    "Tu_Khoa": ""
  },
  {
    "ID": "HCQ190",
    "Nhom_Benh": "Sản phụ khoa",
    "Tinh_Trang_Benh": "Ra máu âm đạo (trong thời kỳ mang thai, rong kinh, rong huyết...)",
    "ICD_Chinh": "O20.9 (Chảy máu trong thai kỳ) hoặc N93.8 (Rong kinh/huyết)",
    "Ly_Do_Nhap_Vien": "Dấu hiệu bất thường luôn cần kiểm tra. Trong thai kỳ gợi ý dọa sảy/rau tiền đạo. Phụ khoa gợi ý u xơ/polyp.",
    "ICD_Kem_Theo": "O46 (Chảy máu trước sinh)D25 (U xơ tử cung)O20.0 (Dọa sảy thai)",
    "Ngoai_Le": "Ra dịch hồng/nâu lượng ít báo hiệu chuyển dạ (nhầy hồng) nhưng chưa có cơn co; hoặc rong kinh nhẹ ổn định.",
    "Tu_Khoa": ""
  },
  {
    "ID": "HCQ191",
    "Nhom_Benh": "Sản phụ khoa",
    "Tinh_Trang_Benh": "Dọa sảy thai",
    "ICD_Chinh": "O20.0 (Dọa sảy thai)",
    "Ly_Do_Nhap_Vien": "Có cơn co tử cung, ra máu, cổ tử cung chưa mở. Cần nhập viện nghỉ ngơi, dùng thuốc giảm co/nội tiết.",
    "ICD_Kem_Theo": "O02.1 (Thai lưu)E31 (Rối loạn nội tiết)N96 (Sảy thai liên tiếp)",
    "Ngoai_Le": "Dọa sảy nhẹ (chỉ đau bụng lâm râm, không ra máu hoặc ra ít dịch nâu), siêu âm tim thai tốt, cổ tử cung đóng kín.",
    "Tu_Khoa": ""
  },
  {
    "ID": "HCQ192",
    "Nhom_Benh": "Sản phụ khoa",
    "Tinh_Trang_Benh": "Sảy thai (Sảy thai khó tránh, đang sảy thai, sảy thai sót rau, sảy thai băng huyết, sảy thai nhiễm khuẩn)",
    "ICD_Chinh": "O03 (Sảy thai tự nhiên)",
    "Ly_Do_Nhap_Vien": "Tình trạng thai tống xuất ra ngoài. Cần nhập viện để kiểm soát chảy máu và nạo/hút buồng tử cung nếu sót rau.",
    "ICD_Kem_Theo": "O03.4 (Sảy thai không trọn)O03.0 (Sảy thai nhiễm khuẩn)O03.1 (Sảy thai băng huyết)",
    "Ngoai_Le": "Sảy thai hoàn toàn tự nhiên (đã ra hết khối thai), siêu âm lòng tử cung sạch, không chảy máu.",
    "Tu_Khoa": ""
  },
  {
    "ID": "HCQ193",
    "Nhom_Benh": "Sản phụ khoa",
    "Tinh_Trang_Benh": "Thai chết lưu",
    "ICD_Chinh": "O36.4 (Chăm sóc mẹ vì thai chết trong tử cung)",
    "Ly_Do_Nhap_Vien": "Thai ngừng phát triển trong buồng tử cung > 48h. Nguy cơ rối loạn đông máu mẹ. Cần gây chuyển dạ tống thai.",
    "ICD_Kem_Theo": "O02.1 (Thai chết lưu sớm)D68.9 (Rối loạn đông máu)O80 (Đẻ thường - sau gây chuyển dạ)",
    "Ngoai_Le": "Thai ngừng phát triển giai đoạn sớm (túi thai trống), chưa có biến chứng, có thể theo dõi sảy tự nhiên hoặc hẹn ngày hút.",
    "Tu_Khoa": ""
  },
  {
    "ID": "HCQ194",
    "Nhom_Benh": "Sản phụ khoa",
    "Tinh_Trang_Benh": "Thai ngoài tử cung (nghi ngờ, chửa ở đoạn kẽ, cổ tử cung, vết mổ cũ, chửa trong ổ bụng)",
    "ICD_Chinh": "O00.1 (Thai ngoài tử cung ở vòi trứng) hoặc O00.8 (Vị trí khác)",
    "Ly_Do_Nhap_Vien": "Cấp cứu sản khoa. Khối thai làm tổ sai vị trí có nguy cơ vỡ gây ngập máu ổ bụng.",
    "ICD_Kem_Theo": "O00.0 (TNTC trong ổ bụng)R57.1 (Sốc mất máu)A18.1 (Lao vòi trứng - nguy cơ)",
    "Ngoai_Le": "Thai ngoài tử cung thể thoái triển (Beta hCG giảm tự nhiên), khối thai nhỏ, không đau bụng, huyết động ổn định.",
    "Tu_Khoa": ""
  },
  {
    "ID": "HCQ195",
    "Nhom_Benh": "Sản phụ khoa",
    "Tinh_Trang_Benh": "Chửa trứng",
    "ICD_Chinh": "O01.9 (Chửa trứng, không xác định)",
    "Ly_Do_Nhap_Vien": "Bệnh lý nguyên bào nuôi. Nguy cơ biến chứng thành ung thư (Choriocarcinoma). Cần hút trứng và theo dõi sát.",
    "ICD_Kem_Theo": "O01.0 (Chửa trứng toàn phần)O01.1 (Chửa trứng bán phần)C58 (Ung thư nhau)",
    "Ngoai_Le": "Không có ngoại lệ.",
    "Tu_Khoa": ""
  },
  {
    "ID": "HCQ196",
    "Nhom_Benh": "Sản phụ khoa",
    "Tinh_Trang_Benh": "Dọa đẻ non",
    "ICD_Chinh": "O47.0 (Dọa đẻ non trước 37 tuần)",
    "Ly_Do_Nhap_Vien": "Có cơn co tử cung gây biến đổi cổ tử cung trước 37 tuần. Cần nhập viện dùng thuốc cắt cơn co và tiêm trưởng thành phổi.",
    "ICD_Kem_Theo": "O60 (Đẻ non)N39.0 (Nhiễm trùng tiểu - kích thích)O30 (Đa thai)",
    "Ngoai_Le": "Cơn co tử cung sinh lý (Braxton Hicks), không đều, nghỉ ngơi hết đau, cổ tử cung không thay đổi.",
    "Tu_Khoa": ""
  },
  {
    "ID": "HCQ197",
    "Nhom_Benh": "Sản phụ khoa",
    "Tinh_Trang_Benh": "Chuyển dạ đẻ (đủ tháng, non tháng)",
    "ICD_Chinh": "O80 (Đẻ thường đơn thai) hoặc O60.1 (Đẻ non)",
    "Ly_Do_Nhap_Vien": "Quá trình sinh nở. Cần nhập viện theo dõi tim thai và tiến trình xóa mở cổ tử cung.",
    "ICD_Kem_Theo": "O42 (Vỡ ối sớm)O63 (Chuyển dạ kéo dài)O48 (Thai già tháng)",
    "Ngoai_Le": "Giai đoạn tiềm thời (cổ tử cung < 3cm), cơn co thưa, mẹ khỏe, nhà gần bệnh viện (có thể theo dõi thêm tại nhà).",
    "Tu_Khoa": ""
  },
  {
    "ID": "HCQ198",
    "Nhom_Benh": "Sản phụ khoa",
    "Tinh_Trang_Benh": "Rau tiền đạo",
    "ICD_Chinh": "O44.1 (Rau tiền đạo có chảy máu) hoặc O44.0 (Không chảy máu)",
    "Ly_Do_Nhap_Vien": "Bánh rau bám thấp che lấp cổ tử cung. Nguy cơ chảy máu ồ ạt đe dọa mẹ và con.",
    "ICD_Kem_Theo": "O72 (Băng huyết sau sinh)O60 (Đẻ non)D50 (Thiếu máu)",
    "Ngoai_Le": "Rau bám thấp (nhóm 1-2) chưa chảy máu, thai chưa đủ tháng, sinh hoạt nhẹ nhàng, không có cơn co (Theo dõi ngoại trú).",
    "Tu_Khoa": ""
  },
  {
    "ID": "HCQ199",
    "Nhom_Benh": "Mắt",
    "Tinh_Trang_Benh": "Chấn thương mắt: Rách mi, đứt lệ quản, dị vật kết giác mạc sâu, rách kết giác mạc, vết thương xuyên thủng nhãn cầu, đụng dập nhãn cầu, xuất huyết tiền phòng, phòi tổ chức nội nhãn, chấn thương hốc mắt, dị vật hốc mắt, gãy thành hốc mắt, tổn thương thị thần kinh",
    "ICD_Chinh": "S05 (Tổn thương mắt và hốc mắt)",
    "Ly_Do_Nhap_Vien": "Mã nhóm S05 bao phủ hầu hết các chấn thương mắt. Ví dụ: S05.2 (Rách nhãn cầu), S05.1 (Đụng dập).",
    "ICD_Kem_Theo": "S02.3 (Gãy sàn hốc mắt)S01.1 (Vết thương mi mắt)H21.0 (Xuất huyết tiền phòng)",
    "Ngoai_Le": "Dị vật kết mạc/giác mạc nông, lấy dị vật dễ dàng, không xuyên thủng, không nhiễm trùng.",
    "Tu_Khoa": ""
  },
  {
    "ID": "HCQ200",
    "Nhom_Benh": "Mắt",
    "Tinh_Trang_Benh": "Bỏng mắt: Bỏng do nhiệt, do hóa chất, do các tia vật lý",
    "ICD_Chinh": "T26 (Bỏng và ăn mòn khu trú ở mắt)",
    "Ly_Do_Nhap_Vien": "Bỏng mắt (đặc biệt là bỏng hóa chất kiềm/axit) là cấp cứu tối khẩn. Cần rửa mắt liên tục và dùng màng ối/thuốc.",
    "ICD_Kem_Theo": "T26.1 (Bỏng giác mạc)T26.6 (Ăn mòn hóa chất)H16.0 (Loét giác mạc do bỏng)",
    "Ngoai_Le": "Bỏng nhẹ kết mạc (độ I), không tổn thương giác mạc, thị lực bình thường.",
    "Tu_Khoa": ""
  },
  {
    "ID": "HCQ201",
    "Nhom_Benh": "Mắt",
    "Tinh_Trang_Benh": "Viêm loét giác mạc, áp xe giác mạc, doạ thủng hoặc thủng giác mạc",
    "ICD_Chinh": "H16.0 (Loét giác mạc)",
    "Ly_Do_Nhap_Vien": "Nguy cơ thủng giác mạc và sẹo giác mạc gây mù. Cần kháng sinh/kháng nấm tích cực (nhỏ/tiêm).",
    "ICD_Kem_Theo": "H16.3 (Viêm nhu mô giác mạc)B00.5 (Loét do Herpes)H19.2 (Viêm GM do nấm)",
    "Ngoai_Le": "Viêm giác mạc chấm nông (SPK), trợt biểu mô nhỏ, đã liền tốt.",
    "Tu_Khoa": ""
  },
  {
    "ID": "HCQ202",
    "Nhom_Benh": "Mắt",
    "Tinh_Trang_Benh": "Viêm mủ nội nhãn, viêm toàn bộ nhãn cầu",
    "ICD_Chinh": "H44.0 (Viêm mủ nội nhãn) hoặc H44.1 (Viêm nội nhãn khác)",
    "Ly_Do_Nhap_Vien": "Tình trạng nhiễm trùng trong mắt rất nặng, phá hủy cấu trúc mắt nhanh chóng. Cần tiêm nội nhãn hoặc cắt dịch kính.",
    "ICD_Kem_Theo": "H20.0 (Viêm mống mắt thể mi cấp)H59.8 (Biến chứng sau mổ mắt)S05 (Sau chấn thương)",
    "Ngoai_Le": "Không có ngoại lệ.",
    "Tu_Khoa": ""
  },
  {
    "ID": "HCQ203",
    "Nhom_Benh": "Mắt",
    "Tinh_Trang_Benh": "Viêm màng bồ đào (trước, trung gian, sau, toàn bộ)",
    "ICD_Chinh": "H20 (Viêm mống mắt - thể mi) hoặc H30 (Viêm võng mạc - hắc mạc)",
    "Ly_Do_Nhap_Vien": "Nguy cơ dính đồng tử, tăng nhãn áp thứ phát và giảm thị lực vĩnh viễn. Cần corticoid liều cao/ức chế miễn dịch.",
    "ICD_Kem_Theo": "H20.0 (Cấp tính)H30.9 (Viêm hắc võng mạc)B02.3 (Zona mắt)",
    "Ngoai_Le": "Viêm màng bồ đào trước nhẹ, tái phát cũ, dính cũ ổn định, không đỏ mắt cấp tính.",
    "Tu_Khoa": ""
  },
  {
    "ID": "HCQ204",
    "Nhom_Benh": "Mắt",
    "Tinh_Trang_Benh": "Viêm tổ chức hốc mắt, áp xe hốc mắt, viêm tắc tĩnh mạch xoang hang",
    "ICD_Chinh": "H05.0 (Viêm cấp tính của hốc mắt)",
    "Ly_Do_Nhap_Vien": "Nhiễm trùng nguy hiểm vùng đầu mặt, có thể lan vào nội sọ (viêm tắc xoang hang) gây tử vong.",
    "ICD_Kem_Theo": "J01 (Viêm xoang cấp - nguyên nhân)G08 (Viêm tắc tĩnh mạch nội sọ)A41 (Nhiễm khuẩn huyết)",
    "Ngoai_Le": "Viêm tổ chức tiền vách (Preseptal cellulitis) nhẹ, mắt vận động tốt, không lồi mắt, uống kháng sinh đáp ứng.",
    "Tu_Khoa": ""
  },
  {
    "ID": "HCQ205",
    "Nhom_Benh": "Mắt",
    "Tinh_Trang_Benh": "Glocom: Cơn glocom cấp, glocom chấn thương, glocom tân mạch, glocom tuyệt đối đau nhức, glocom do viêm màng bồ đào, glocom ác tính, glocom bẩm sinh",
    "ICD_Chinh": "H40.2 (Glocom góc đóng nguyên phát - Cơn cấp)",
    "Ly_Do_Nhap_Vien": "Cấp cứu nhãn khoa. Nhãn áp tăng rất cao gây đau nhức dữ dội và tổn thương thị thần kinh không hồi phục.",
    "ICD_Kem_Theo": "H40.0 (Nghi ngờ Glocom)H40.5 (Glocom thứ phát)H40.3 (Glocom sau chấn thương)",
    "Ngoai_Le": "Glocom góc mở (mạn tính), nhãn áp kiểm soát ổn định bằng thuốc tra mắt, không đau nhức.",
    "Tu_Khoa": ""
  },
  {
    "ID": "HCQ206",
    "Nhom_Benh": "Mắt",
    "Tinh_Trang_Benh": "Đục thể thủy tinh các hình thái, lệch thể thủy tinh, vô thể thủy tinh, còn tồn tại màng đồng tử",
    "ICD_Chinh": "H25 (Đục thủy tinh thể người già) hoặc H26 (Đục TTT khác)",
    "Ly_Do_Nhap_Vien": "Bệnh lý gây mù lòa phổ biến nhất. Nhập viện để phẫu thuật Phaco thay thủy tinh thể nhân tạo.",
    "ICD_Kem_Theo": "H27.1 (Lệch thủy tinh thể)H25.1 (Đục nhân)Q12.3 (Đục TTT bẩm sinh)",
    "Ngoai_Le": "Đục thủy tinh thể giai đoạn sớm, thị lực còn tốt (> 3/10), chưa ảnh hưởng sinh hoạt.",
    "Tu_Khoa": ""
  },
  {
    "ID": "HCQ207",
    "Nhom_Benh": "Mắt",
    "Tinh_Trang_Benh": "Bong võng mạc, co kéo dịch kính võng mạc, lỗ hoàng điểm, màng trước võng mạc",
    "ICD_Chinh": "H33 (Bong võng mạc) hoặc H35.3 (Thoái hóa hoàng điểm)",
    "Ly_Do_Nhap_Vien": "Tình trạng lớp thần kinh cảm thụ bị tách rời. Cần phẫu thuật cấp cứu (ấn độn, cắt dịch kính) để cứu vãn thị lực.",
    "ICD_Kem_Theo": "H33.0 (Bong võng mạc có rách)H43.3 (Bất thường dịch kính)H35.3 (Lỗ hoàng điểm)",
    "Ngoai_Le": "Bong dịch kính sau đơn thuần (PVD) ở người già, chớp sáng nhẹ, không có rách võng mạc (Laser quang đông ngoại trú).",
    "Tu_Khoa": ""
  },
  {
    "ID": "HCQ208",
    "Nhom_Benh": "Mắt",
    "Tinh_Trang_Benh": "Xuất huyết dịch kính, vẩn đục dịch kính nhiều ảnh hưởng thị lực, viêm dịch kính",
    "ICD_Chinh": "H43.1 (Xuất huyết dịch kính) hoặc H43.8",
    "Ly_Do_Nhap_Vien": "Máu tràn vào buồng dịch kính che lấp thị lực. Cần tìm nguyên nhân (rách võng mạc, đái tháo đường) và điều trị.",
    "ICD_Kem_Theo": "E14.3 (Biến chứng mắt do ĐTĐ)H35.0 (Bệnh võng mạc nền)S05 (Chấn thương)",
    "Ngoai_Le": "Vẩn đục dịch kính nhẹ (\"Ruồi bay\"), không tăng thêm, không chớp sáng, soi đáy mắt bình thường.",
    "Tu_Khoa": ""
  },
  {
    "ID": "HCQ209",
    "Nhom_Benh": "Mắt",
    "Tinh_Trang_Benh": "Bệnh lý võng mạc, thị thần kinh: Tắc động mạch, tĩnh mạch trung tâm võng mạc; Bệnh võng mạc đái tháo đường, cao huyết áp giai đoạn biến chứng; Viêm thị thần kinh, bệnh lý hoàng điểm",
    "ICD_Chinh": "H34 (Tắc mạch máu võng mạc) hoặc H46 (Viêm thần kinh thị giác)",
    "Ly_Do_Nhap_Vien": "\"Đột quỵ của mắt\" (Tắc động mạch) hoặc viêm thần kinh thị gây mù nhanh. Cần điều trị cấp cứu nội khoa tích cực.",
    "ICD_Kem_Theo": "H34.1 (Tắc động mạch trung tâm)H34.8 (Tắc tĩnh mạch)E11.3 (Võng mạc ĐTĐ)",
    "Ngoai_Le": "Bệnh võng mạc đái tháo đường giai đoạn chưa tăng sinh, chưa phù hoàng điểm (kiểm soát đường huyết, tái khám định kỳ).",
    "Tu_Khoa": ""
  },
  {
    "ID": "HCQ210",
    "Nhom_Benh": "Mắt",
    "Tinh_Trang_Benh": "Lác cơ năng, lác liệt",
    "ICD_Chinh": "H50 (Lác/Lé)",
    "Ly_Do_Nhap_Vien": "Mắt lệch trục gây song thị hoặc nhược thị. Nhập viện để phẫu thuật chỉnh trục nhãn cầu.",
    "ICD_Kem_Theo": "H50.0 (Lác trong)H50.1 (Lác ngoài)H49 (Lác liệt)",
    "Ngoai_Le": "Lác ẩn hoặc lác nhẹ không ảnh hưởng thị lực, không gây song thị.",
    "Tu_Khoa": ""
  },
  {
    "ID": "HCQ211",
    "Nhom_Benh": "Mắt",
    "Tinh_Trang_Benh": "Các bệnh lý mi mắt, hốc mắt: Sụp mi, quặm, hở mi, hẹp khe mi, dính mi cầu, hở mi do liệt dây VII, u mi, u hốc mắt",
    "ICD_Chinh": "H02 (Các bệnh khác của mi mắt) hoặc D31 (U lành hốc mắt)",
    "Ly_Do_Nhap_Vien": "Các bất thường cấu trúc mi mắt gây loét giác mạc (quặm/hở mi) hoặc che lấp tầm nhìn (sụp mi). Cần phẫu thuật tạo hình.",
    "ICD_Kem_Theo": "H02.0 (Quặm mi)H02.4 (Sụp mi)G51.0 (Liệt dây VII)",
    "Ngoai_Le": "Sụp mi nhẹ người già do thừa da mi, không che trục thị giác, nhu cầu thẩm mỹ (tiểu phẫu ngoại trú).",
    "Tu_Khoa": ""
  },
  {
    "ID": "HCQ212",
    "Nhom_Benh": "Mắt",
    "Tinh_Trang_Benh": "Mộng thịt độ II trở lên, mộng thịt tái phát, dính mi cầu",
    "ICD_Chinh": "H11.0 (Mộng thịt - Pterygium)",
    "Ly_Do_Nhap_Vien": "Khối tăng sinh kết mạc xâm lấn vào giác mạc gây loạn thị/giảm thị lực. Cần phẫu thuật cắt mộng + ghép kết mạc.",
    "ICD_Kem_Theo": "H11.3 (Xuất huyết kết mạc)H11.8 (Bệnh kết mạc khác)H18.4 (Thoái hóa giác mạc)",
    "Ngoai_Le": "Mộng thịt độ I (chưa bò qua rìa giác mạc), chưa gây cộm xốn nhiều, chưa ảnh hưởng thị lực.",
    "Tu_Khoa": ""
  },
  {
    "ID": "HCQ213",
    "Nhom_Benh": "Tai Mũi Họng",
    "Tinh_Trang_Benh": "Dị vật đường ăn, dị vật đường thở",
    "ICD_Chinh": "T17 (Dị vật đường hô hấp) hoặc T18 (Dị vật đường tiêu hóa)",
    "Ly_Do_Nhap_Vien": "Cấp cứu số 1 của TMH. Dị vật đường thở có thể gây tử vong/áp xe phổi. Dị vật thực quản gây thủng/viêm trung thất.",
    "ICD_Kem_Theo": "T17.3 (Dị vật thanh quản)T18.1 (Dị vật thực quản)J98.0 (Bệnh phế quản)",
    "Ngoai_Le": "Dị vật họng miệng (xương cá nhỏ cắm amidan), gắp dễ dàng tại phòng khám, không chảy máu, không phù nề.",
    "Tu_Khoa": ""
  },
  {
    "ID": "HCQ214",
    "Nhom_Benh": "Tai Mũi Họng",
    "Tinh_Trang_Benh": "Chảy máu mũi",
    "ICD_Chinh": "R04.0 (Chảy máu cam)",
    "Ly_Do_Nhap_Vien": "Chảy máu mũi (Epistaxis) số lượng nhiều, không tự cầm hoặc chảy máu điểm mạch tiffa/chảy máu mũi sau. Cần nhét meche/đốt.",
    "ICD_Kem_Theo": "I10 (Tăng huyết áp)D68 (Rối loạn đông máu)J01 (Viêm xoang cấp)",
    "Ngoai_Le": "Chảy máu điểm mạch Kisselbach lượng ít, tự cầm hoặc đặt bấc mũi trước cầm máu tốt, huyết động ổn định.",
    "Tu_Khoa": ""
  },
  {
    "ID": "HCQ215",
    "Nhom_Benh": "Tai Mũi Họng",
    "Tinh_Trang_Benh": "Chấn thương Tai Mũi Họng và vùng cổ mặt",
    "ICD_Chinh": "S00-S09 (Chấn thương đầu) hoặc S10-S19 (Cổ)",
    "Ly_Do_Nhap_Vien": "Gồm: Vỡ xương chính mũi, vỡ xoang, rách vành tai, vết thương cổ hở khí quản... Cần phẫu thuật/khâu phục hồi.",
    "ICD_Kem_Theo": "S02.2 (Gãy xương mũi)S07 (Đụng dập đầu)S11 (Vết thương hở cổ)",
    "Ngoai_Le": "Chấn thương phần mềm nông, không gãy xương, không khó thở, vết thương sạch khâu tiểu phẫu về trong ngày.",
    "Tu_Khoa": ""
  },
  {
    "ID": "HCQ216",
    "Nhom_Benh": "Tai Mũi Họng",
    "Tinh_Trang_Benh": "Viêm tai xương chũm cấp, đợt cấp viêm tai xương chũm mạn",
    "ICD_Chinh": "H70.0 (Viêm xương chũm cấp) hoặc H70.1 (Mạn tính)",
    "Ly_Do_Nhap_Vien": "Tình trạng nhiễm trùng lan vào xương chũm. Nguy cơ biến chứng nội sọ (viêm màng não) hoặc liệt mặt.",
    "ICD_Kem_Theo": "H66 (Viêm tai giữa mủ)H71 (Cholesteatoma)A41 (Nhiễm khuẩn huyết)",
    "Ngoai_Le": "Viêm tai giữa cấp mủ chưa có phản ứng xương chũm, màng nhĩ chưa vỡ hoặc dẫn lưu tốt, trẻ chơi ngoan.",
    "Tu_Khoa": ""
  },
  {
    "ID": "HCQ217",
    "Nhom_Benh": "Tai Mũi Họng",
    "Tinh_Trang_Benh": "Biến chứng nội sọ do tai",
    "ICD_Chinh": "H70 kèm G00-G09 (Bệnh viêm hệ TKTW)",
    "Ly_Do_Nhap_Vien": "Biến chứng nặng nề nhất: Viêm màng não, áp xe não, viêm tắc tĩnh mạch bên do tai.",
    "ICD_Kem_Theo": "G00 (Viêm màng não mủ)G06.0 (Áp xe não)H66.3 (Viêm tai giữa mạn)",
    "Ngoai_Le": "Không có ngoại lệ.",
    "Tu_Khoa": ""
  },
  {
    "ID": "HCQ218",
    "Nhom_Benh": "Tai Mũi Họng",
    "Tinh_Trang_Benh": "Liệt mặt (Liệt dây VII) do tai",
    "ICD_Chinh": "G51.0 (Liệt Bell) hoặc H66 kèm G51",
    "Ly_Do_Nhap_Vien": "Do viêm tai giữa cấp/mạn chèn ép hoặc hủy xương ống Fallop. Cần phẫu thuật giải áp dây VII.",
    "ICD_Kem_Theo": "H66 (Viêm tai giữa)H71 (Cholesteatoma)H70 (Viêm xương chũm)",
    "Ngoai_Le": "Liệt VII ngoại biên do lạnh đơn thuần, điều trị nội khoa ngoại trú/đông y kết hợp.",
    "Tu_Khoa": ""
  },
  {
    "ID": "HCQ219",
    "Nhom_Benh": "Tai Mũi Họng",
    "Tinh_Trang_Benh": "Điếc đột ngột",
    "ICD_Chinh": "H91.2 (Mất thính lực đột ngột vô căn)",
    "Ly_Do_Nhap_Vien": "Cấp cứu thính học. Mất thính lực thần kinh giác quan trong vòng 72h. Cần điều trị tích cực (corticoid/oxy cao áp) trong \"giờ vàng\".",
    "ICD_Kem_Theo": "H81 (Rối loạn tiền đình)H90 (Điếc dẫn truyền/tiếp nhận)I63 (Nhồi máu vi mạch)",
    "Ngoai_Le": "Điếc dẫn truyền do nút ráy tai hoặc tắc vòi nhĩ đơn thuần.",
    "Tu_Khoa": ""
  },
  {
    "ID": "HCQ220",
    "Nhom_Benh": "Tai Mũi Họng",
    "Tinh_Trang_Benh": "Viêm tai ngoài ác tính, nhọt ống tai ngoài, viêm tấy/áp xe vành tai",
    "ICD_Chinh": "H60.2 (Viêm tai ngoài ác tính) hoặc H60.0 (Áp xe tai ngoài)",
    "Ly_Do_Nhap_Vien": "Viêm tai ngoài ác tính (thường gặp ở người ĐTĐ) gây hoại tử xương. Áp xe vành tai gây viêm sụn vành tai (biến dạng tai súp lơ).",
    "ICD_Kem_Theo": "E11 (Đái tháo đường)L02.0 (Áp xe da đầu)M95.1 (Biến dạng vành tai)",
    "Ngoai_Le": "Viêm ống tai ngoài do nấm hoặc chàm hóa, nhọt ống tai nhỏ mới sưng đỏ, chưa hóa mủ.",
    "Tu_Khoa": ""
  },
  {
    "ID": "HCQ221",
    "Nhom_Benh": "Tai Mũi Họng",
    "Tinh_Trang_Benh": "Viêm mũi xoang cấp, mạn tính đợt hồi viêm có biến chứng, viêm xoang do răng",
    "ICD_Chinh": "J01 (Viêm xoang cấp) hoặc J32 (Viêm xoang mạn)",
    "Ly_Do_Nhap_Vien": "Viêm xoang có biến chứng (ổ mắt/nội sọ) hoặc đau nhức dữ dội không đáp ứng thuốc uống.",
    "ICD_Kem_Theo": "H05 (Viêm tổ chức hốc mắt)K04 (Bệnh tủy răng)G00 (Viêm màng não)",
    "Ngoai_Le": "Viêm mũi xoang cấp mức độ nhẹ/vừa, chỉ chảy mũi và đau nhẹ, chưa có biến chứng mắt, đáp ứng kháng sinh uống.",
    "Tu_Khoa": ""
  },
  {
    "ID": "HCQ222",
    "Nhom_Benh": "Tai Mũi Họng",
    "Tinh_Trang_Benh": "U vùng tai mũi họng, đầu mặt cổ",
    "ICD_Chinh": "D10-D36 (U lành) hoặc C00-C14 (U ác)",
    "Ly_Do_Nhap_Vien": "Khối u gây chèn ép, chảy máu hoặc nghi ngờ ung thư (Vòm họng, Thanh quản...). Cần sinh thiết/phẫu thuật.",
    "ICD_Kem_Theo": "C11 (K vòm họng)C32 (K thanh quản)D14.0 (U lành tai giữa)",
    "Ngoai_Le": "U mỡ (Lipoma) nhỏ dưới da vùng cổ, u bã đậu không viêm, không chèn ép (Tiểu phẫu ngoại trú).",
    "Tu_Khoa": ""
  },
  {
    "ID": "HCQ223",
    "Nhom_Benh": "Tai Mũi Họng",
    "Tinh_Trang_Benh": "Viêm tấy, áp xe quanh amidan, khoảng bên họng, sau họng",
    "ICD_Chinh": "J36 (Áp xe quanh amidan) hoặc J39.0 (Áp xe sau họng)",
    "Ly_Do_Nhap_Vien": "Tình trạng nhiễm trùng sâu đe dọa chèn ép đường thở và lan xuống trung thất. Cần chích rạch dẫn lưu cấp cứu.",
    "ICD_Kem_Theo": "J03 (Viêm amidan cấp)A41 (Nhiễm khuẩn huyết)J98.5 (Viêm trung thất)",
    "Ngoai_Le": "Viêm tấy nhẹ quanh amidan chưa hóa mủ, chưa khít hàm, đáp ứng tốt với kháng sinh tiêm/uống.",
    "Tu_Khoa": ""
  },
  {
    "ID": "HCQ224",
    "Nhom_Benh": "Tai Mũi Họng",
    "Tinh_Trang_Benh": "Viêm amidan cấp, viêm VA cấp, viêm thanh quản cấp gây khó thở, xuất tiết nhiều, sốt cao, co giật, biến chứng vào tim, thận, khớp…",
    "ICD_Chinh": "J03 (Viêm amidan cấp) hoặc J04 (Viêm thanh quản cấp)",
    "Ly_Do_Nhap_Vien": "Các trường hợp viêm cấp có biến chứng toàn thân hoặc đe dọa đường thở (khó thở thanh quản).",
    "ICD_Kem_Theo": "J35.0 (Viêm amidan mạn)I00 (Thấp tim)N00 (Viêm cầu thận)",
    "Ngoai_Le": "Viêm amidan/VA cấp thông thường, sốt nhẹ, ăn uống được, không khó thở (Điều trị ngoại trú).",
    "Tu_Khoa": ""
  },
  {
    "ID": "HCQ225",
    "Nhom_Benh": "Tai Mũi Họng",
    "Tinh_Trang_Benh": "Viêm thanh thiệt cấp, phù nề thanh quản",
    "ICD_Chinh": "J05.1 (Viêm nắp thanh quản cấp) hoặc J38.4 (Phù nề thanh quản)",
    "Ly_Do_Nhap_Vien": "Cấp cứu đường thở tối khẩn (đặc biệt ở trẻ em). Nắp thanh thiệt sưng to bít tắc đường thở nhanh chóng.",
    "ICD_Kem_Theo": "J96.0 (Suy hô hấp cấp)T78.2 (Sốc phản vệ)R06.0 (Khó thở)",
    "Ngoai_Le": "Khàn tiếng nhẹ do viêm thanh quản, không khó thở, không nuốt nghẹn (soi thanh quản nắp thanh thiệt bình thường).",
    "Tu_Khoa": ""
  },
  {
    "ID": "HCQ226",
    "Nhom_Benh": "Tai Mũi Họng",
    "Tinh_Trang_Benh": "Hạt xơ dây thanh, polyp dây thanh, u nang dây thanh, u nang thanh thiệt, u nang hố lưỡi thanh thiệt, u nang rãnh thanh môn gây ảnh hưởng đến giọng nói và thở",
    "ICD_Chinh": "J38.1 (Polyp dây thanh) hoặc J38.2 (Hạt xơ)",
    "Ly_Do_Nhap_Vien": "Các tổn thương lành tính nhưng ảnh hưởng chức năng (khàn tiếng kéo dài, khó thở). Chỉ định phẫu thuật nội soi vi phẫu.",
    "ICD_Kem_Theo": "R49.0 (Khàn tiếng)D14.1 (U lành thanh quản)R06 (Khó thở)",
    "Ngoai_Le": "Hạt xơ dây thanh nhỏ, mới khàn tiếng, điều trị bảo tồn (luyện giọng, chống viêm) trước khi xét phẫu thuật.",
    "Tu_Khoa": ""
  },
  {
    "ID": "HCQ227",
    "Nhom_Benh": "Tai Mũi Họng",
    "Tinh_Trang_Benh": "Khó thở thanh quản",
    "ICD_Chinh": "R06.0 (Khó thở) hoặc J38.6 (Hẹp thanh quản)",
    "Ly_Do_Nhap_Vien": "Triệu chứng nguy hiểm (Tiếng rít Rit, co kéo hõm ức). Cần mở khí quản hoặc đặt nội khí quản cấp cứu.",
    "ICD_Kem_Theo": "J05 (Viêm thanh khí phế quản cấp - Croup)C32 (Ung thư thanh quản)T17.3 (Dị vật)",
    "Ngoai_Le": "Khàn tiếng đơn thuần không kèm khó thở.",
    "Tu_Khoa": ""
  },
  {
    "ID": "HCQ228",
    "Nhom_Benh": "Tai Mũi Họng",
    "Tinh_Trang_Benh": "Nấm xoang xâm lấn",
    "ICD_Chinh": "B49 (Nấm, không xác định) kèm J32",
    "Ly_Do_Nhap_Vien": "Thể bệnh nấm nguy hiểm (ăn mòn xương), thường gặp ở người suy giảm miễn dịch/ĐTĐ. Cần phẫu thuật nạo vét sạch.",
    "ICD_Kem_Theo": "B44 (Nấm Aspergillus)E11 (Đái tháo đường)J32.9 (Viêm xoang mạn)",
    "Ngoai_Le": "Nấm xoang thể u nấm (Fungus ball) khu trú, chưa xâm lấn, người bệnh không đau nhức dữ dội (Mổ phiên).",
    "Tu_Khoa": ""
  },
  {
    "ID": "HCQ229",
    "Nhom_Benh": "Răng Hàm Mặt",
    "Tinh_Trang_Benh": "Gãy xương vùng hàm mặt: Gãy xương hàm trên, xương hàm dưới, xương gò má, cung tiếp, xương ổ răng, xương mũi...",
    "ICD_Chinh": "S02 (Gãy xương hộp sọ và xương mặt)",
    "Ly_Do_Nhap_Vien": "Cần chụp XQ/CT và phẫu thuật kết hợp xương (nẹp vít) hoặc cố định hàm.",
    "ICD_Kem_Theo": "S02.4 (Gãy xương gò má-hàm trên)S02.6 (Gãy xương hàm dưới)S02.2 (Gãy xương mũi)",
    "Ngoai_Le": "Gãy xương mũi kín, không di lệch, không khó thở. Gãy xương ổ răng đơn thuần đã được cố định/nhổ bỏ mảnh rời tại phòng khám.",
    "Tu_Khoa": ""
  },
  {
    "ID": "HCQ230",
    "Nhom_Benh": "Răng Hàm Mặt",
    "Tinh_Trang_Benh": "Vết thương phần mềm vùng hàm mặt: Vết thương thấu má, rách vùng môi, rách nát vùng hàm mặt, đứt tuyến nước bọt, tổn thương thần kinh V, VII...",
    "ICD_Chinh": "S01 (Vết thương hở đầu)",
    "Ly_Do_Nhap_Vien": "Vết thương phức tạp ảnh hưởng thẩm mỹ và chức năng (nhai, nuốt, tiết nước bọt). Cần phẫu thuật tạo hình/nối ống tuyến.",
    "ICD_Kem_Theo": "S01.4 (Vết thương má/vùng thái dương hàm)S01.5 (Vết thương môi/khoang miệng)S04 (Tổn thương thần kinh sọ)",
    "Ngoai_Le": "Vết thương nông, nhỏ, gọn, sạch, không tổn thương ống tuyến nước bọt hay thần kinh (khâu tiểu phẫu).",
    "Tu_Khoa": ""
  },
  {
    "ID": "HCQ231",
    "Nhom_Benh": "Răng Hàm Mặt",
    "Tinh_Trang_Benh": "Chảy máu sau nhổ răng, sau phẫu thuật hàm mặt không tự cầm",
    "ICD_Chinh": "T81.0 (Xuất huyết và tụ máu là biến chứng của thủ thuật)",
    "Ly_Do_Nhap_Vien": "Biến chứng chảy máu kéo dài do rối loạn đông máu hoặc tổn thương mạch máu lớn. Cần khâu cầm máu/nhét meche.",
    "ICD_Kem_Theo": "D66/D67 (Hemophilia)T14.5 (Tổn thương mạch máu)R58 (Xuất huyết)",
    "Ngoai_Le": "Chảy máu rỉ rả nhẹ, cắn gạc 30 phút tự cầm, huyết động ổn định.",
    "Tu_Khoa": ""
  },
  {
    "ID": "HCQ232",
    "Nhom_Benh": "Răng Hàm Mặt",
    "Tinh_Trang_Benh": "Nhiễm khuẩn vùng hàm mặt: Viêm tấy lan tỏa, áp xe vùng hàm mặt, viêm tấy sàn miệng, viêm mô tế bào...",
    "ICD_Chinh": "K12.2 (Viêm tấy và áp xe của miệng) hoặc L03.2 (Viêm mô tế bào mặt)",
    "Ly_Do_Nhap_Vien": "Nguy hiểm nhất là Viêm tấy sàn miệng (Ludwig's Angina) gây chèn ép đường thở tử vong. Cần rạch dẫn lưu và kháng sinh liều cao.",
    "ICD_Kem_Theo": "J39.0 (Áp xe quanh họng/sau họng)J96 (Suy hô hấp)A41 (Nhiễm khuẩn huyết)",
    "Ngoai_Le": "Viêm lợi hoặc áp xe quanh chóp răng khu trú, nhỏ, đã chích rạch dẫn lưu mủ tốt, uống thuốc được.",
    "Tu_Khoa": ""
  },
  {
    "ID": "HCQ233",
    "Nhom_Benh": "Răng Hàm Mặt",
    "Tinh_Trang_Benh": "Viêm xương hàm (cấp, mạn tính, hoại tử xương hàm)",
    "ICD_Chinh": "K10.2 (Các tình trạng viêm của xương hàm)",
    "Ly_Do_Nhap_Vien": "Nhiễm trùng xương khó điều trị. Thường cần phẫu thuật nạo viêm/lấy xương chết (sequestrectomy).",
    "ICD_Kem_Theo": "M87 (Hoại tử xương)K10.2 (Viêm tủy xương hàm)T38.7 (Hoại tử xương do thuốc Bisphosphonate)",
    "Ngoai_Le": "Viêm xương ổ răng khô (Dry socket) sau nhổ răng, đau nhiều nhưng không có mủ, điều trị tại chỗ (đặt Alvogyl).",
    "Tu_Khoa": ""
  },
  {
    "ID": "HCQ234",
    "Nhom_Benh": "Răng Hàm Mặt",
    "Tinh_Trang_Benh": "Viêm khớp thái dương hàm cấp tính (đau, hạn chế há miệng, sai khớp cắn)",
    "ICD_Chinh": "K07.6 (Các rối loạn của khớp thái dương hàm)",
    "Ly_Do_Nhap_Vien": "Đợt cấp gây khít hàm (Trismus), không ăn uống được. Cần điều trị lý liệu pháp tích cực hoặc rửa khớp.",
    "ICD_Kem_Theo": "S03.0 (Trật khớp hàm)M19 (Thoái hóa khớp)R68.8 (Triệu chứng khác - Khít hàm)",
    "Ngoai_Le": "Rối loạn năng thái dương hàm mạn tính (tiếng kêu lục cục), đau nhẹ, vẫn ăn nhai được.",
    "Tu_Khoa": ""
  },
  {
    "ID": "HCQ235",
    "Nhom_Benh": "Răng Hàm Mặt",
    "Tinh_Trang_Benh": "Các khối u vùng hàm mặt (u lành, u ác tính)",
    "ICD_Chinh": "D10-D36 (U lành) hoặc C00-C14 (U ác)",
    "Ly_Do_Nhap_Vien": "Cần phẫu thuật cắt u. U ác tính (K lưỡi, K sàn miệng) cần phẫu thuật rộng và tạo hình vạt.",
    "ICD_Kem_Theo": "C02 (Ung thư lưỡi)D16.4 (U lành xương hàm)D11 (U tuyến nước bọt)",
    "Ngoai_Le": "U lành tính nhỏ niêm mạc miệng (u nhú, u xơ), cắt tiểu phẫu bằng Laser/dao điện tại phòng khám.",
    "Tu_Khoa": ""
  },
  {
    "ID": "HCQ236",
    "Nhom_Benh": "Răng Hàm Mặt",
    "Tinh_Trang_Benh": "Khe hở môi, vòm miệng",
    "ICD_Chinh": "Q35-Q37 (Khe hở môi/vòm)",
    "Ly_Do_Nhap_Vien": "Dị tật bẩm sinh phổ biến. Cần phẫu thuật tạo hình môi (Cheiloplasty) hoặc vòm (Palatoplasty) theo lứa tuổi.",
    "ICD_Kem_Theo": "Q35 (Khe hở vòm)Q36 (Khe hở môi)Q37 (Khe hở môi kèm vòm)",
    "Ngoai_Le": "Trẻ chưa đủ cân nặng hoặc chưa đủ tháng tuổi để phẫu thuật, khám tư vấn dinh dưỡng ngoại trú.",
    "Tu_Khoa": ""
  },
  {
    "ID": "HCQ237",
    "Nhom_Benh": "Răng Hàm Mặt",
    "Tinh_Trang_Benh": "Các dị tật bẩm sinh khác vùng hàm mặt: thiểu sản xương hàm, lệch lạc xương hàm...",
    "ICD_Chinh": "K07 (Các bất thường của độ cắn và xương hàm) hoặc Q75",
    "Ly_Do_Nhap_Vien": "Các biến dạng xương hàm nặng ảnh hưởng chức năng nhai/thẩm mỹ (Hô/Móm quá mức). Cần phẫu thuật chỉnh hình xương (Orthognathic surgery).",
    "ICD_Kem_Theo": "Q75.4 (Loạn xương hàm mặt)K07.1 (Bất thường vị trí xương hàm)K07.4 (Sai khớp cắn)",
    "Ngoai_Le": "Lệch lạc khớp cắn nhẹ, điều trị bằng niềng răng (chỉnh nha) đơn thuần tại phòng khám.",
    "Tu_Khoa": ""
  },
  {
    "ID": "HCQ238",
    "Nhom_Benh": "Răng Hàm Mặt",
    "Tinh_Trang_Benh": "Răng mọc lệch, mọc ngầm biến chứng: viêm lợi trùm, viêm quanh thân răng, khít hàm...",
    "ICD_Chinh": "K01 (Răng mọc kẹt và mọc ngầm) kèm K05.2 (Viêm nướu cấp)",
    "Ly_Do_Nhap_Vien": "Răng khôn (R8) mọc lệch gây tai biến nhiễm trùng (viêm lợi trùm có mủ, áp xe) hoặc xô lệch răng. Cần nhổ răng tiểu phẫu/phẫu thuật.",
    "ICD_Kem_Theo": "K01.1 (Răng mọc kẹt)K04.7 (Áp xe quanh chóp)R68.8 (Khít hàm)",
    "Ngoai_Le": "Răng khôn mọc lệch nhưng chưa có triệu chứng viêm nhiễm, chưa đau, chụp phim kiểm tra (nhổ theo hẹn hoặc theo dõi).",
    "Tu_Khoa": ""
  },
  {
    "ID": "HCQ239",
    "Nhom_Benh": "Răng Hàm Mặt",
    "Tinh_Trang_Benh": "Nang vùng hàm mặt: nang xương hàm, nang phần mềm...",
    "ICD_Chinh": "K09 (Nang vùng miệng) hoặc K04.8 (Nang quanh chóp)",
    "Ly_Do_Nhap_Vien": "Nang phát triển phá hủy xương hàm hoặc gây biến dạng mặt. Cần phẫu thuật bóc nang (Cystectomy) và ghép xương nếu cần.",
    "ICD_Kem_Theo": "K09.0 (Nang do phát triển răng)K09.2 (Nang xương hàm khác)D16.5 (U xương hàm)",
    "Ngoai_Le": "Nang nhầy môi dưới (Mucocele) nhỏ, tiểu phẫu cắt bỏ tại phòng khám.",
    "Tu_Khoa": ""
  },
  {
    "ID": "HCQ240",
    "Nhom_Benh": "Răng Hàm Mặt",
    "Tinh_Trang_Benh": "Sỏi tuyến nước bọt gây viêm cấp",
    "ICD_Chinh": "K11.5 (Bệnh sỏi tuyến nước bọt)",
    "Ly_Do_Nhap_Vien": "Sỏi gây tắc ống tuyến, sưng đau tuyến mang tai/dưới hàm cấp tính (bữa ăn). Cần mổ lấy sỏi hoặc nội soi.",
    "ICD_Kem_Theo": "K11.2 (Viêm tuyến nước bọt)K11.3 (Áp xe tuyến nước bọt)A41 (Nhiễm khuẩn huyết)",
    "Ngoai_Le": "Sỏi nhỏ, không gây viêm cấp, bệnh nhân uống nhiều nước và massage tuyến tự thoát được.",
    "Tu_Khoa": ""
  },
  {
    "ID": "HCQ241",
    "Nhom_Benh": "Răng Hàm Mặt",
    "Tinh_Trang_Benh": "Bệnh lý tủy răng, vùng quanh chóp răng có biến chứng (sưng đau, áp xe...)",
    "ICD_Chinh": "K04 (Bệnh của tủy và mô quanh chóp)",
    "Ly_Do_Nhap_Vien": "Viêm tủy cấp hoại tử hoặc áp xe dưới màng xương (Subperiosteal abscess) gây sưng mặt. Cần chích rạch và điều trị tủy/nhổ răng.",
    "ICD_Kem_Theo": "K04.0 (Viêm tủy răng)K04.7 (Áp xe quanh chóp không có lỗ dò)L03.2 (Viêm mô tế bào mặt)",
    "Ngoai_Le": "Viêm tủy răng chưa biến chứng sưng mặt, đau khu trú, điều trị nội nha (chữa tủy) đi về trong ngày.",
    "Tu_Khoa": ""
  },
  {
    "ID": "HCQ242",
    "Nhom_Benh": "Răng Hàm Mặt",
    "Tinh_Trang_Benh": "Phẫu thuật tạo hình, thẩm mỹ vùng hàm mặt (sẹo xấu, khuyết hổng phần mềm, khuyết xương...)",
    "ICD_Chinh": "L90.5 (Sẹo dính/xấu) hoặc T90 (Di chứng tổn thương đầu)",
    "Ly_Do_Nhap_Vien": "Phẫu thuật sửa sẹo (Z-plasty), ghép da, ghép xương để phục hồi chức năng và thẩm mỹ sau chấn thương/ung thư.",
    "ICD_Kem_Theo": "M95.0 (Biến dạng mũi mắc phải)Z42.0 (Phẫu thuật tạo hình đầu cổ)L91.0 (Sẹo lồi)",
    "Ngoai_Le": "Sẹo nhỏ không ảnh hưởng chức năng, phẫu thuật thẩm mỹ đơn giản gây tê tại chỗ.",
    "Tu_Khoa": ""
  },
  {
    "ID": "HCQ243",
    "Nhom_Benh": "Chuyên khoa Bỏng",
    "Tinh_Trang_Benh": "Bỏng nông diện tích trên 10% diện tích cơ thể, hoặc bỏng sâu từ 5% diện tích cơ thể trở lên",
    "ICD_Chinh": "T31 (Bỏng phân loại theo diện tích cơ thể)",
    "Ly_Do_Nhap_Vien": "Mã T31 giúp phân loại % diện tích (VD: T31.1 = 10-19%). Diện tích rộng gây mất nước và rối loạn điện giải nhanh.",
    "ICD_Kem_Theo": "T30.0 (Bỏng mức độ không xác định)T20-T29 (Bỏng theo vị trí)E86 (Mất nước)",
    "Ngoai_Le": "Bỏng nông (độ 1-2) diện tích nhỏ (< 5-7%), đau ít, người bệnh uống bù nước tốt, thay băng tại nhà được.",
    "Tu_Khoa": ""
  },
  {
    "ID": "HCQ244",
    "Nhom_Benh": "Chuyên khoa Bỏng",
    "Tinh_Trang_Benh": "Bỏng vùng đầu mặt cổ, bàn tay, bàn chân, tầng sinh môn",
    "ICD_Chinh": "T20 (Đầu cổ), T23 (Bàn tay), T25 (Bàn chân)",
    "Ly_Do_Nhap_Vien": "Vị trí \"chức năng và thẩm mỹ\". Bỏng mặt gây phù nề đường thở. Bỏng tay/chân gây sẹo co rút phế tàn. Bỏng sinh dục dễ nhiễm trùng.",
    "ICD_Kem_Theo": "T21 (Bỏng thân mình)J98.8 (Phù nề đường hô hấp)N49 (Viêm cơ quan sinh dục)",
    "Ngoai_Le": "Bỏng độ 1 (đỏ da) diện tích rất nhỏ ở các vùng này, không phỏng nước, không ảnh hưởng vận động.",
    "Tu_Khoa": ""
  },
  {
    "ID": "HCQ245",
    "Nhom_Benh": "Chuyên khoa Bỏng",
    "Tinh_Trang_Benh": "Bỏng hô hấp, bỏng điện, bỏng hóa chất",
    "ICD_Chinh": "T27 (Bỏng đường hô hấp) hoặc T75.4 (Điện giật)",
    "Ly_Do_Nhap_Vien": "Bỏng hô hấp gây phù phổi/ngạt thở cấp. Bỏng điện gây hoại tử cơ sâu/ngừng tim. Bỏng hóa chất ăn mòn liên tục.",
    "ICD_Kem_Theo": "T26 (Bỏng mắt - hóa chất)J96 (Suy hô hấp)I46 (Ngừng tim)",
    "Ngoai_Le": "Bỏng điện sinh hoạt nhẹ (điện hạ thế), chỉ bỏng điểm vào/ra nhỏ, không rối loạn nhịp tim, ECG bình thường.",
    "Tu_Khoa": ""
  },
  {
    "ID": "HCQ246",
    "Nhom_Benh": "Chuyên khoa Bỏng",
    "Tinh_Trang_Benh": "Bỏng có biến chứng: sốc, suy thận, rối loạn điện giải, nhiễm trùng huyết...",
    "ICD_Chinh": "T30 kèm R57.1 (Sốc) hoặc N17 (Suy thận)",
    "Ly_Do_Nhap_Vien": "Bỏng diễn tiến nặng. Sốc bỏng (giảm thể tích) và nhiễm trùng huyết là 2 nguyên nhân tử vong hàng đầu.",
    "ICD_Kem_Theo": "A41 (Nhiễm khuẩn huyết)E87 (Rối loạn điện giải)T79.4 (Sốc chấn thương)",
    "Ngoai_Le": "Không có ngoại lệ.",
    "Tu_Khoa": ""
  },
  {
    "ID": "HCQ247",
    "Nhom_Benh": "Chuyên khoa Bỏng",
    "Tinh_Trang_Benh": "Bỏng ở người già, trẻ em, phụ nữ có thai, người có bệnh mạn tính kèm theo",
    "ICD_Chinh": "T30 kèm mã đối tượng (Z35 - thai kỳ, I10 - cao HA...)",
    "Ly_Do_Nhap_Vien": "Nhóm đối tượng dễ tổn thương. Da mỏng, sức đề kháng kém, dễ sốc và khó hồi phục hơn người thường.",
    "ICD_Kem_Theo": "O09 (Thai kỳ nguy cơ cao)E11 (Đái tháo đường)I50 (Suy tim)",
    "Ngoai_Le": "Bỏng rất nhẹ, nông, diện tích nhỏ (< 2%), toàn trạng người bệnh ổn định, gia đình cam kết chăm sóc tốt.",
    "Tu_Khoa": ""
  },
  {
    "ID": "HCQ248",
    "Nhom_Benh": "Chuyên khoa Bỏng",
    "Tinh_Trang_Benh": "Di chứng bỏng: sẹo co kéo, loét sẹo bỏng, ung thư hóa trên nền sẹo bỏng...",
    "ICD_Chinh": "L90.5 (Sẹo dính và biến dạng) hoặc C44 (Ung thư da)",
    "Ly_Do_Nhap_Vien": "Di chứng muộn cần phẫu thuật chỉnh hình (ghép da, chuyển vạt) hoặc điều trị ung thư (Loét Marjolin).",
    "ICD_Kem_Theo": "L91.0 (Sẹo lồi)M95.9 (Biến dạng cơ xương)Z42 (Phẫu thuật tạo hình)",
    "Ngoai_Le": "Sẹo bỏng ổn định, không co kéo hạn chế vận động, nhu cầu thẩm mỹ thấp hoặc chờ mổ phiên.",
    "Tu_Khoa": ""
  },
  {
    "ID": "HCQ249",
    "Nhom_Benh": "Y học cổ truyền và Phục hồi chức năng",
    "Tinh_Trang_Benh": "Liệt nửa người, liệt 2 chi dưới, liệt tứ chi",
    "ICD_Chinh": "G81 (Liệt nửa người) hoặc G82 (Liệt 2 chân/tứ chi)",
    "Ly_Do_Nhap_Vien": "Di chứng tai biến hoặc chấn thương tủy. Cần tập vận động trị liệu chuyên sâu và châm cứu phục hồi.",
    "ICD_Kem_Theo": "I69 (Di chứng đột quỵ)T90.5 (Di chứng chấn thương sọ não)T91.3 (Di chứng tổn thương tủy)",
    "Ngoai_Le": "Liệt cũ đã hồi phục một phần, di chuyển được, hoặc liệt cứng đã ổn định không còn tiến triển (giai đoạn di chứng xa).",
    "Tu_Khoa": ""
  },
  {
    "ID": "HCQ250",
    "Nhom_Benh": "Y học cổ truyền và Phục hồi chức năng",
    "Tinh_Trang_Benh": "Các liệt thần kinh sọ não: Liệt dây VII ngoại biên, liệt các dây thần kinh sọ não khác",
    "ICD_Chinh": "G51.0 (Liệt Bell - Dây VII)",
    "Ly_Do_Nhap_Vien": "Giai đoạn cấp/bán cấp. Cần điện châm, xoa bóp và thuốc để tránh di chứng méo miệng/nhắm mắt không kín.",
    "ICD_Kem_Theo": "G52 (Các rối loạn dây TK sọ khác)B02 (Zona thần kinh)J04 (Sau nhiễm lạnh)",
    "Ngoai_Le": "Liệt dây VII cũ (> 6 tháng), co thắt nửa mặt ổn định, chỉ nhu cầu thẩm mỹ.",
    "Tu_Khoa": ""
  },
  {
    "ID": "HCQ251",
    "Nhom_Benh": "Y học cổ truyền và Phục hồi chức năng",
    "Tinh_Trang_Benh": "Các bệnh lý cột sống: Đau lưng cấp, đau thắt lưng hông, thoát vị đĩa đệm, thoái hóa cột sống, đau thần kinh tọa... hạn chế vận động",
    "ICD_Chinh": "M54.5 (Đau thắt lưng) hoặc M51.1 (Thoát vị đĩa đệm có chèn ép)",
    "Ly_Do_Nhap_Vien": "Đau cấp tính gây hạn chế vận động nhiều, chèn ép rễ thần kinh (Lasegue dương tính). Cần kéo giãn cột sống/giảm đau tích cực.",
    "ICD_Kem_Theo": "M47 (Thoái hóa cột sống)M54.3 (Đau thần kinh tọa)M48.0 (Hẹp ống sống)",
    "Ngoai_Le": "Đau lưng mạn tính nhẹ, không lan, vận động cúi ngửa bình thường, đáp ứng thuốc uống.",
    "Tu_Khoa": ""
  },
  {
    "ID": "HCQ252",
    "Nhom_Benh": "Y học cổ truyền và Phục hồi chức năng",
    "Tinh_Trang_Benh": "Các bệnh lý khớp: Viêm quanh khớp vai, thoái hóa khớp, viêm khớp dạng thấp (giai đoạn ổn định), viêm cột sống dính khớp... gây đau, hạn chế vận động",
    "ICD_Chinh": "M75.0 (Viêm quanh khớp vai) hoặc M17 (Thoái hóa khớp gối)",
    "Ly_Do_Nhap_Vien": "Hạn chế tầm vận động (ROM) nhiều (đông cứng khớp vai, cứng khớp gối). Cần tập vận động cưỡng bức/thụ động.",
    "ICD_Kem_Theo": "M05/M06 (Viêm khớp dạng thấp)M45 (Viêm CS dính khớp)M16 (Thoái hóa khớp háng)",
    "Ngoai_Le": "Thoái hóa khớp nhẹ, không sưng, đau ít, tầm vận động khớp bình thường.",
    "Tu_Khoa": ""
  },
  {
    "ID": "HCQ253",
    "Nhom_Benh": "Y học cổ truyền và Phục hồi chức năng",
    "Tinh_Trang_Benh": "Tổn thương các dây thần kinh ngoại biên, đám rối thần kinh",
    "ICD_Chinh": "G54 (Rối loạn rễ và đám rối) hoặc G56 (Đơn dây thần kinh chi trên)",
    "Ly_Do_Nhap_Vien": "Ví dụ: Hội chứng ống cổ tay, tổn thương đám rối cánh tay. Gây teo cơ, tê bì nhiều. Cần kích thích điện/tập mạnh cơ.",
    "ICD_Kem_Theo": "G56.0 (Hội chứng ống cổ tay)S14.3 (Chấn thương đám rối vai)E11.4 (Biến chứng thần kinh ĐTĐ)",
    "Ngoai_Le": "Tê bì nhẹ đầu chi, chưa teo cơ, chưa ảnh hưởng cầm nắm/vận động.",
    "Tu_Khoa": ""
  },
  {
    "ID": "HCQ254",
    "Nhom_Benh": "Y học cổ truyền và Phục hồi chức năng",
    "Tinh_Trang_Benh": "Di chứng sau chấn thương, sau phẫu thuật cần phục hồi chức năng",
    "ICD_Chinh": "T90-T98 (Di chứng chấn thương) hoặc Z98",
    "Ly_Do_Nhap_Vien": "Cứng khớp sau bó bột, teo cơ sau mổ dây chằng/kết hợp xương. Cần PHCN để trở lại sinh hoạt.",
    "ICD_Kem_Theo": "S82 (Gãy xương cẳng chân)S72 (Gãy xương đùi)Z54.0 (Giai đoạn hồi phục sau mổ)",
    "Ngoai_Le": "Liền xương tốt, khớp vận động trơn tru, sức cơ tốt (tự tập tại nhà theo hướng dẫn).",
    "Tu_Khoa": ""
  },
  {
    "ID": "HCQ255",
    "Nhom_Benh": "Y học cổ truyền và Phục hồi chức năng",
    "Tinh_Trang_Benh": "Các bệnh lý thần kinh khác: Đau đầu, mất ngủ, tâm căn suy nhược, thiểu năng tuần hoàn não... điều trị ngoại trú không kết quả",
    "ICD_Chinh": "G44 (Đau đầu) hoặc G47.0 (Mất ngủ)",
    "Ly_Do_Nhap_Vien": "Các hội chứng thuộc phạm vi YHCT (Hư hỏa, can khí uất kết...). Nhập viện để kết hợp thuốc thang và dưỡng sinh/châm cứu.",
    "ICD_Kem_Theo": "I67.8 (Thiểu năng tuần hoàn não)F48.0 (Suy nhược thần kinh)N95.1 (Mãn kinh)",
    "Ngoai_Le": "Mất ngủ thoáng qua do stress, đau đầu nhẹ đáp ứng với giảm đau thông thường.",
    "Tu_Khoa": ""
  },
  {
    "ID": "HCQ256",
    "Nhom_Benh": "Y học cổ truyền và Phục hồi chức năng",
    "Tinh_Trang_Benh": "Trẻ bại não, chậm phát triển tinh thần vận động, tự kỷ, tăng động giảm chú ý... cần can thiệp phục hồi chức năng",
    "ICD_Chinh": "G80 (Bại não) hoặc F84 (Tự kỷ)",
    "Ly_Do_Nhap_Vien": "Cần can thiệp đa chuyên ngành (ngôn ngữ trị liệu, hoạt động trị liệu, tâm vận động) cường độ cao.",
    "ICD_Kem_Theo": "F90 (Tăng động giảm chú ý)R62 (Chậm phát triển)Q90 (Hội chứng Down)",
    "Ngoai_Le": "Trẻ rối loạn nhẹ, đang theo học hòa nhập tốt, can thiệp ngoại trú theo giờ.",
    "Tu_Khoa": ""
  },
  {
    "ID": "HCQ257",
    "Nhom_Benh": "Y học cổ truyền và Phục hồi chức năng",
    "Tinh_Trang_Benh": "Các bệnh lý hô hấp: Hen phế quản (ngoài cơn), viêm phế quản mạn tính, bệnh phổi tắc nghẽn mạn tính (giai đoạn ổn định)",
    "ICD_Chinh": "J44 (COPD) hoặc J45 (Hen)",
    "Ly_Do_Nhap_Vien": "Nhập viện đợt ổn định để tập thở (thở chúm môi, thở cơ hoành), vỗ rung long đờm và dùng thuốc YHCT bồi bổ tạng phế/thận.",
    "ICD_Kem_Theo": "J42 (Viêm phế quản mạn)J98.4 (Bệnh phổi khác)R05 (Ho mạn tính)",
    "Ngoai_Le": "Đang trong đợt cấp (suy hô hấp) cần chuyển khoa Nội/Hồi sức. Hoặc bệnh ổn định hoàn toàn không triệu chứng.",
    "Tu_Khoa": ""
  },
  {
    "ID": "HCQ258",
    "Nhom_Benh": "Y học cổ truyền và Phục hồi chức năng",
    "Tinh_Trang_Benh": "Các rối loạn cơ tròn: Bí tiểu, tiểu không tự chủ, đại tiện không tự chủ (do nguyên nhân thần kinh)",
    "ICD_Chinh": "R33 (Bí tiểu) hoặc R32 (Tiểu không tự chủ)",
    "Ly_Do_Nhap_Vien": "Thường gặp sau tổn thương tủy hoặc tai biến. Cần tập phản xạ bàng quang, đặt thông tiểu ngắt quãng.",
    "ICD_Kem_Theo": "N31 (Bàng quang thần kinh)R15 (Đại tiện không tự chủ)G82 (Liệt tủy)",
    "Ngoai_Le": "Són tiểu gắng sức nhẹ ở phụ nữ sau sinh, tập bài tập Kegel ngoại trú hiệu quả.",
    "Tu_Khoa": ""
  },
  {
    "ID": "HCQ259",
    "Nhom_Benh": "Y học cổ truyền và Phục hồi chức năng",
    "Tinh_Trang_Benh": "Các bệnh lý khác điều trị hiệu quả bằng Y học cổ truyền: Viêm tắc động mạch chi, suy giãn tĩnh mạch chi...",
    "ICD_Chinh": "I73.9 (Bệnh mạch máu ngoại biên) hoặc I83",
    "Ly_Do_Nhap_Vien": "Điều trị triệu chứng (đau, tê, phù) bằng thuốc YHCT hoạt huyết và các phương pháp vật lý trị liệu (nhiệt, áp lực hơi).",
    "ICD_Kem_Theo": "I83.9 (Giãn tĩnh mạch chi dưới)I70 (Xơ vữa động mạch)R60 (Phù)",
    "Ngoai_Le": "Giãn tĩnh mạch độ 1 (thẩm mỹ), không đau, không nặng chân.",
    "Tu_Khoa": ""
  },
  {
    "ID": "HCQ260",
    "Nhom_Benh": "Y học cổ truyền và Phục hồi chức năng",
    "Tinh_Trang_Benh": "Phục hồi chức năng hô hấp, tim mạch, chỉnh hình, nhi khoa...",
    "ICD_Chinh": "Z50 (Chăm sóc liên quan đến quy trình phục hồi chức năng)",
    "Ly_Do_Nhap_Vien": "Mã chung cho các chỉ định PHCN chuyên sâu cho từng hệ cơ quan (sau mổ tim, sau nhồi máu cơ tim...).",
    "ICD_Kem_Theo": "Z50.1 (VLTL khác)Z50.8 (PHCN khác)I21 (Sau nhồi máu cơ tim)",
    "Ngoai_Le": "Các bài tập đơn giản người bệnh đã thành thạo và tự thực hiện được tại nhà.",
    "Tu_Khoa": ""
  },
  {
    "ID": "HCQ261",
    "Nhom_Benh": "Chuyên khoa Tâm thần",
    "Tinh_Trang_Benh": "Tâm thần phân liệt, các rối loạn phân liệt và các rối loạn hoang tưởng",
    "ICD_Chinh": "F20 (Tâm thần phân liệt) hoặc F22 (Rối loạn hoang tưởng)",
    "Ly_Do_Nhap_Vien": "Bệnh mạn tính có đợt cấp (kích động, hoang tưởng, ảo giác chi phối hành vi). Cần nhập viện để chỉnh liều thuốc an thần kinh.",
    "ICD_Kem_Theo": "F20.0 (TTPL thể Paranoia)F25 (Rối loạn phân liệt cảm xúc)F21 (Rối loạn kiểu phân liệt)",
    "Ngoai_Le": "Bệnh nhân giai đoạn ổn định, tuân thủ điều trị, không có hành vi nguy hiểm, tái khám lĩnh thuốc định kỳ.",
    "Tu_Khoa": ""
  },
  {
    "ID": "HCQ262",
    "Nhom_Benh": "Chuyên khoa Tâm thần",
    "Tinh_Trang_Benh": "Rối loạn loạn thần cấp và nhất thời",
    "ICD_Chinh": "F23 (Rối loạn loạn thần cấp và nhất thời)",
    "Ly_Do_Nhap_Vien": "Khởi phát đột ngột (trong vòng 2 tuần), triệu chứng rầm rộ (hoang tưởng, ảo giác). Cần can thiệp khẩn cấp.",
    "ICD_Kem_Theo": "F23.1 (Loạn thần cấp có triệu chứng TTPL)F23.9 (Loạn thần cấp không xác định)R44 (Triệu chứng ảo giác)",
    "Ngoai_Le": "Các triệu chứng nhẹ, gia đình có khả năng quản lý và giám sát tốt tại nhà.",
    "Tu_Khoa": ""
  },
  {
    "ID": "HCQ263",
    "Nhom_Benh": "Chuyên khoa Tâm thần",
    "Tinh_Trang_Benh": "Rối loạn khí sắc (cảm xúc): Giai đoạn hưng cảm, Rối loạn lưỡng cực",
    "ICD_Chinh": "F30 (Giai đoạn hưng cảm) hoặc F31 (Rối loạn cảm xúc lưỡng cực)",
    "Ly_Do_Nhap_Vien": "Hưng cảm nặng: Hoạt động quá mức, không ngủ, chi tiêu hoang phí, nguy cơ kiệt sức hoặc gây hấn.",
    "ICD_Kem_Theo": "F30.1 (Hưng cảm không có loạn thần)F31.1 (RL lưỡng cực, hưng cảm)F31.4 (RL lưỡng cực, trầm cảm nặng)",
    "Ngoai_Le": "Hưng cảm nhẹ (Hypomania), bệnh nhân vẫn kiểm soát được hành vi, làm việc hiệu quả tăng lên nhưng chưa rối loạn xã hội.",
    "Tu_Khoa": ""
  },
  {
    "ID": "HCQ264",
    "Nhom_Benh": "Chuyên khoa Tâm thần",
    "Tinh_Trang_Benh": "Giai đoạn trầm cảm, Rối loạn trầm cảm tái diễn",
    "ICD_Chinh": "F32 (Giai đoạn trầm cảm) hoặc F33 (Trầm cảm tái diễn)",
    "Ly_Do_Nhap_Vien": "Trầm cảm nặng có ý tưởng/hành vi tự sát, hoặc bỏ ăn uống hoàn toàn (tự hủy hoại).",
    "ICD_Kem_Theo": "F32.2 (Trầm cảm nặng không loạn thần)F32.3 (Trầm cảm nặng có loạn thần)X60-X84 (Cố ý tự hại)",
    "Ngoai_Le": "Trầm cảm nhẹ/vừa, không có ý định tự sát, còn khả năng lao động và sinh hoạt, đáp ứng thuốc uống.",
    "Tu_Khoa": ""
  },
  {
    "ID": "HCQ265",
    "Nhom_Benh": "Chuyên khoa Tâm thần",
    "Tinh_Trang_Benh": "Các rối loạn lo âu, ám ảnh, phản ứng với stress trầm trọng",
    "ICD_Chinh": "F41 (Rối loạn lo âu) hoặc F43 (Phản ứng với stress)",
    "Ly_Do_Nhap_Vien": "Cơn hoảng loạn kịch phát (Panic attack) hoặc Rối loạn stress sau sang chấn (PTSD) gây mất chức năng sống nghiêm trọng.",
    "ICD_Kem_Theo": "F41.0 (Rối loạn hoảng sợ)F41.1 (Lo âu lan tỏa)F43.1 (PTSD)",
    "Ngoai_Le": "Lo âu lan tỏa mức độ vừa, bệnh nhân vẫn đi làm được, liệu pháp tâm lý và thuốc ngoại trú hiệu quả.",
    "Tu_Khoa": ""
  },
  {
    "ID": "HCQ266",
    "Nhom_Benh": "Chuyên khoa Tâm thần",
    "Tinh_Trang_Benh": "Rối loạn phân ly (Hysteria)",
    "ICD_Chinh": "F44 (Các rối loạn phân ly)",
    "Ly_Do_Nhap_Vien": "Các triệu chứng mất chức năng thần kinh đột ngột (mù, liệt, co giật) không do tổn thương thực thể, thường sau sang chấn tâm lý.",
    "ICD_Kem_Theo": "F44.4 (Rối loạn vận động phân ly)F44.5 (Co giật phân ly)F44.6 (Mất cảm giác phân ly)",
    "Ngoai_Le": "Cơn phân ly thoáng qua, hồi phục nhanh sau khi được trấn an/ám thị.",
    "Tu_Khoa": ""
  },
  {
    "ID": "HCQ267",
    "Nhom_Benh": "Chuyên khoa Tâm thần",
    "Tinh_Trang_Benh": "Rối loạn dạng cơ thể",
    "ICD_Chinh": "F45 (Rối loạn dạng cơ thể)",
    "Ly_Do_Nhap_Vien": "Người bệnh than phiền nhiều triệu chứng cơ thể dai dẳng, đi khám nhiều nơi nhưng không tìm thấy nguyên nhân thực thể, gây lo âu trầm trọng.",
    "ICD_Kem_Theo": "F45.0 (Rối loạn hóa cơ thể)F45.2 (Nghi bệnh)F45.4 (Đau dạng cơ thể dai dẳng)",
    "Ngoai_Le": "Mức độ nhẹ, chấp nhận giải thích của bác sĩ, đồng ý điều trị ngoại trú.",
    "Tu_Khoa": ""
  },
  {
    "ID": "HCQ268",
    "Nhom_Benh": "Chuyên khoa Tâm thần",
    "Tinh_Trang_Benh": "Các rối loạn ăn uống: Chán ăn tâm thần, cuồng ăn tâm thần",
    "ICD_Chinh": "F50 (Rối loạn ăn uống)",
    "Ly_Do_Nhap_Vien": "Chán ăn tâm thần (Anorexia) gây suy kiệt nặng (BMI thấp), rối loạn điện giải đe dọa tính mạng.",
    "ICD_Kem_Theo": "F50.0 (Chán ăn tâm thần)F50.2 (Cuồng ăn tâm thần)E41 (Suy dinh dưỡng nặng)",
    "Ngoai_Le": "Chán ăn mức độ nhẹ, BMI trong giới hạn cho phép, tuân thủ chế độ dinh dưỡng tại nhà.",
    "Tu_Khoa": ""
  },
  {
    "ID": "HCQ269",
    "Nhom_Benh": "Chuyên khoa Tâm thần",
    "Tinh_Trang_Benh": "Rối loạn giấc ngủ không thực tổn",
    "ICD_Chinh": "F51 (Rối loạn giấc ngủ không thực tổn)",
    "Ly_Do_Nhap_Vien": "Mất ngủ mạn tính kháng trị, hoặc ác mộng/miên hành gây nguy hiểm/kiệt sức.",
    "ICD_Kem_Theo": "F51.0 (Mất ngủ không thực tổn)G47.0 (Rối loạn bắt đầu và duy trì giấc ngủ)F51.3 (Miên hành)",
    "Ngoai_Le": "Mất ngủ do thay đổi múi giờ hoặc stress ngắn hạn, đáp ứng với vệ sinh giấc ngủ và thuốc an thần nhẹ.",
    "Tu_Khoa": ""
  },
  {
    "ID": "HCQ270",
    "Nhom_Benh": "Chuyên khoa Tâm thần",
    "Tinh_Trang_Benh": "Chậm phát triển tâm thần có rối loạn hành vi",
    "ICD_Chinh": "F70-F79 (Chậm phát triển tâm thần) kèm .1 (Có rối loạn hành vi)",
    "Ly_Do_Nhap_Vien": "Bệnh nhân CPTTT có đợt kích động, đập phá, không kiểm soát được hành vi, gây nguy hiểm.",
    "ICD_Kem_Theo": "F70.1 (CPTTT nhẹ, rối loạn hành vi)F72.1 (CPTTT nặng, rối loạn hành vi)R45 (Triệu chứng cảm xúc)",
    "Ngoai_Le": "Chậm phát triển tâm thần thể ngoan, phụ thuộc, được gia đình chăm sóc tốt.",
    "Tu_Khoa": ""
  },
  {
    "ID": "HCQ271",
    "Nhom_Benh": "Chuyên khoa Tâm thần",
    "Tinh_Trang_Benh": "Rối loạn tâm thần và hành vi do sử dụng các chất tác động tâm thần (rượu, ma túy, thuốc an thần...)",
    "ICD_Chinh": "F10-F19 (RLTT do dùng chất)",
    "Ly_Do_Nhap_Vien": "Bao gồm: Say chất (ngộ độc), Hội chứng cai (Sảng run), Loạn thần do chất (Ngáo đá). Cần giải độc và điều trị loạn thần.",
    "ICD_Kem_Theo": "F10.4 (Hội chứng cai rượu/Sảng run)F19.5 (Loạn thần do đa chất)F10.2 (Nghiện rượu mạn tính)",
    "Ngoai_Le": "Say rượu đơn thuần, ngủ một giấc tỉnh táo; hoặc đang điều trị duy trì (Methadone) ổn định.",
    "Tu_Khoa": ""
  },
  {
    "ID": "HCQ272",
    "Nhom_Benh": "Chuyên khoa Tâm thần",
    "Tinh_Trang_Benh": "Các rối loạn tâm thần ở trẻ em: Tự kỷ, tăng động giảm chú ý, rối loạn hành vi... cần can thiệp nội trú",
    "ICD_Chinh": "F84 (Tự kỷ) hoặc F90 (ADHD)",
    "Ly_Do_Nhap_Vien": "Trẻ có hành vi tự hủy hoại hoặc tấn công người khác, cần môi trường cách ly/bảo vệ để can thiệp tích cực.",
    "ICD_Kem_Theo": "F91 (Rối loạn cư xử)F90.1 (Tăng động rối loạn cư xử)F98 (Rối loạn cảm xúc/hành vi khác)",
    "Ngoai_Le": "Trẻ Tự kỷ/ADHD mức độ nhẹ/trung bình, can thiệp giáo dục đặc biệt ngoại trú.",
    "Tu_Khoa": ""
  }
];
