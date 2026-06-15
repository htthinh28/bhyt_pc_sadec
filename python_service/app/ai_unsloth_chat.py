"""
Trò chuyện LLM — mô hình Unsloth-compatible (Hugging Face, ví dụ unsloth/Qwen2.5-*-Instruct-bnb-4bit).

- Weight không nằm trong repo; tải về qua Hugging Face khi chạy lần đầu (HF_HOME).
- Cần GPU NVIDIA + CUDA để chạy 4-bit (bitsandbytes). Không GPU: đặt CDSS_AI_MOCK=1 để thử luồng app.

Biến môi trường:
  CDSS_AI_MODEL_ID   — mặc định unsloth/Qwen2.5-3B-Instruct-bnb-4bit
  CDSS_AI_MOCK       — "1" / "true" → không load model, trả lời giả lập
  CDSS_AI_MAX_NEW    — mặc định 512
"""
from __future__ import annotations

import os
from typing import Any, Dict, List, Optional

_MODEL = None
_TOKENIZER = None
_LOAD_ERROR: Optional[str] = None

DEFAULT_MODEL_ID = "unsloth/Qwen2.5-3B-Instruct-bnb-4bit"

SYSTEM_PROMPT_CDSS = (
    "Bạn là trợ lý nội bộ CDSS BHYT tại bệnh viện. "
    "Trả lời tiếng Việt, ngắn gọn, đúng nghiệp vụ giám định BHYT. "
    "Không suy diễn thay cho quyết định thanh toán; nếu thiếu dữ liệu, nói rõ không đủ thông tin."
)


def _truthy(val: Optional[str]) -> bool:
    return str(val or "").strip().lower() in ("1", "true", "yes", "on")


def deps_co_the_import() -> bool:
    try:
        import torch  # noqa: F401
        import transformers  # noqa: F401
        import bitsandbytes  # noqa: F401
        return True
    except ImportError:
        return False


def cuda_san_sang() -> bool:
    try:
        import torch
        return bool(torch.cuda.is_available())
    except Exception:
        return False


def lay_model_id() -> str:
    return (os.environ.get("CDSS_AI_MODEL_ID") or DEFAULT_MODEL_ID).strip()


def mock_bat() -> bool:
    return _truthy(os.environ.get("CDSS_AI_MOCK"))


def trang_thai_ai() -> Dict[str, Any]:
    mid = lay_model_id()
    return {
        "default_model_id": DEFAULT_MODEL_ID,
        "model_id": mid,
        "deps_installed": deps_co_the_import(),
        "cuda_available": cuda_san_sang(),
        "mock_mode": mock_bat(),
        "model_loaded": _MODEL is not None,
        "load_error": _LOAD_ERROR,
        "hint": (
            "Cài: pip install -r requirements-ai.txt | GPU NVIDIA + CUDA | "
            "HF: https://huggingface.co/unsloth | Repo thư viện: https://github.com/unslothai/unsloth"
        ),
    }


def _load_weights() -> None:
    global _MODEL, _TOKENIZER, _LOAD_ERROR
    if _MODEL is not None:
        return
    if mock_bat():
        _LOAD_ERROR = None
        return
    if not deps_co_the_import():
        _LOAD_ERROR = "Thiếu gói: pip install -r python_service/requirements-ai.txt"
        raise RuntimeError(_LOAD_ERROR)
    if not cuda_san_sang():
        _LOAD_ERROR = "Cần GPU NVIDIA (torch.cuda.is_available() == False)."
        raise RuntimeError(_LOAD_ERROR)

    import torch
    from transformers import AutoModelForCausalLM, AutoTokenizer, BitsAndBytesConfig

    model_id = lay_model_id()
    try:
        bnb = BitsAndBytesConfig(
            load_in_4bit=True,
            bnb_4bit_compute_dtype=torch.bfloat16,
            bnb_4bit_use_double_quant=True,
            bnb_4bit_quant_type="nf4",
        )
        _TOKENIZER = AutoTokenizer.from_pretrained(model_id, trust_remote_code=True)
        _MODEL = AutoModelForCausalLM.from_pretrained(
            model_id,
            quantization_config=bnb,
            device_map="auto",
            trust_remote_code=True,
        )
        _LOAD_ERROR = None
    except Exception as e:
        _LOAD_ERROR = str(e)
        raise


def _xay_dung_messages(messages: List[Dict[str, Any]]) -> List[Dict[str, str]]:
    out: List[Dict[str, str]] = []
    # Luôn chèn system nếu chưa có
    has_system = any(str(m.get("role", "")).lower() == "system" for m in messages)
    if not has_system:
        out.append({"role": "system", "content": SYSTEM_PROMPT_CDSS})
    for m in messages:
        role = str(m.get("role", "user")).lower()
        if role not in ("system", "user", "assistant"):
            role = "user"
        content = str(m.get("content", "")).strip()
        if not content:
            continue
        out.append({"role": role, "content": content})
    return out


def sinh_tra_loi(messages: List[Dict[str, Any]], max_new_tokens: Optional[int] = None) -> Dict[str, Any]:
    """Sinh văn bản trả lời từ danh sách message (chat)."""
    if mock_bat():
        last_user = ""
        for m in reversed(messages):
            if str(m.get("role", "")).lower() == "user":
                last_user = str(m.get("content", ""))[:500]
                break
        return {
            "reply": (
                "[CDSS_AI_MOCK] Trả lời giả lập (không load GPU). Câu hỏi: "
                f"{last_user or '(trống)'}"
            ),
            "model_id": lay_model_id(),
            "mock": True,
        }

    _load_weights()
    assert _MODEL is not None and _TOKENIZER is not None

    import torch

    msgs = _xay_dung_messages(messages)
    max_nt = max_new_tokens
    if max_nt is None or max_nt < 1:
        max_nt = int(os.environ.get("CDSS_AI_MAX_NEW", "512"))
    max_nt = min(max_nt, 2048)

    text = _TOKENIZER.apply_chat_template(
        msgs,
        tokenize=False,
        add_generation_prompt=True,
    )
    inputs = _TOKENIZER(text, return_tensors="pt")
    device = next(_MODEL.parameters()).device
    inputs = {k: v.to(device) for k, v in inputs.items()}

    with torch.no_grad():
        out_ids = _MODEL.generate(
            **inputs,
            max_new_tokens=max_nt,
            do_sample=True,
            temperature=0.35,
            top_p=0.9,
            pad_token_id=_TOKENIZER.eos_token_id,
        )

    in_len = inputs["input_ids"].shape[-1]
    gen_ids = out_ids[0][in_len:]
    reply = _TOKENIZER.decode(gen_ids, skip_special_tokens=True).strip()

    return {
        "reply": reply,
        "model_id": lay_model_id(),
        "mock": False,
    }
