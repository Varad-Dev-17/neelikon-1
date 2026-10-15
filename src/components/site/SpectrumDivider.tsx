/** Signature motif: a thin spectrum line that travels across major section boundaries. */
export function SpectrumDivider() {
  return (
    <div aria-hidden className="container-x">
      <div className="relative h-px overflow-hidden bg-border">
        <div className="spectrum-trace absolute inset-0" />
      </div>
    </div>
  );
}
