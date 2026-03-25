interface Spec {
  label: string
  value: string
}

export function SpecsTable({ specs }: { specs: Spec[] }) {
  return (
    <section className="bg-neutral-50 py-16">
      <div className="mx-auto max-w-4xl px-4">
        <h2 className="mb-8 text-center text-2xl font-bold text-neutral-900">
          Especificaciones Técnicas
        </h2>
        <div className="overflow-hidden rounded-lg border bg-white">
          <table className="w-full">
            <tbody>
              {specs.map((spec, i) => (
                <tr key={spec.label} className={i % 2 === 0 ? "bg-white" : "bg-neutral-50"}>
                  <td className="px-6 py-3 text-sm font-medium text-neutral-900">{spec.label}</td>
                  <td className="px-6 py-3 text-sm text-neutral-600">{spec.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}
