"use client";

export default function PrintButton() {
  return (
    <button onClick={() => window.print()} className="btn btn-ink">
      <span>Drucken / PDF</span>
    </button>
  );
}
