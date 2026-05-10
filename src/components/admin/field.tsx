export function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-2">
      <label className="text-[11px] font-semibold uppercase tracking-[0.15em] text-[#86868b]">{label}</label>
      {children}
    </div>
  );
}
