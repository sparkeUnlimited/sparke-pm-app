import { useRef, useEffect } from "react";

const SignaturePad = ({
  value,
  onChange,
}: {
  value?: string;
  onChange: (dataUrl: string) => void;
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const drawing = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.lineWidth = 2;
    ctx.lineCap = "round";

    const start = (e: MouseEvent | TouchEvent) => {
      drawing.current = true;
      const { offsetX, offsetY } = getPoint(e, canvas);
      ctx.beginPath();
      ctx.moveTo(offsetX, offsetY);
    };

    const draw = (e: MouseEvent | TouchEvent) => {
      if (!drawing.current) return;
      const { offsetX, offsetY } = getPoint(e, canvas);
      ctx.lineTo(offsetX, offsetY);
      ctx.stroke();
    };

    const end = () => {
      if (!drawing.current) return;
      drawing.current = false;
      onChange(canvas.toDataURL());
    };

    const mouseup = () => end();
    const touchend = () => end();

    canvas.addEventListener("mousedown", start);
    canvas.addEventListener("mousemove", draw);
    window.addEventListener("mouseup", mouseup);
    canvas.addEventListener("touchstart", start);
    canvas.addEventListener("touchmove", draw);
    window.addEventListener("touchend", touchend);

    return () => {
      canvas.removeEventListener("mousedown", start);
      canvas.removeEventListener("mousemove", draw);
      window.removeEventListener("mouseup", mouseup);
      canvas.removeEventListener("touchstart", start);
      canvas.removeEventListener("touchmove", draw);
      window.removeEventListener("touchend", touchend);
    };
  }, [onChange]);

  const clear = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    onChange("");
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas && value) {
      const img = new Image();
      img.src = value;
      img.onload = () => {
        const ctx = canvas.getContext("2d");
        if (ctx) ctx.drawImage(img, 0, 0);
      };
    }
  }, [value]);

  return (
    <div>
      <canvas
        ref={canvasRef}
        width={300}
        height={150}
        style={{ border: "1px solid #000", display: "block" }}
      />
      <button type="button" onClick={clear} style={{ marginTop: 4 }}>
        Clear
      </button>
    </div>
  );
};

function getPoint(e: MouseEvent | TouchEvent, canvas: HTMLCanvasElement) {
  if (e instanceof MouseEvent) {
    const rect = canvas.getBoundingClientRect();
    return { offsetX: e.clientX - rect.left, offsetY: e.clientY - rect.top };
  }
  const t = e.touches[0];
  const rect = canvas.getBoundingClientRect();
  return { offsetX: t.clientX - rect.left, offsetY: t.clientY - rect.top };
}

export default SignaturePad;
