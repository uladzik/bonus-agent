import { useRef, useState } from "react"
import { Button } from "./button"

interface Props {
  label: string
  size?: "default" | "lg" | "sm"
}

export function ContactModal({ label, size = "lg" }: Props) {
  const [open, setOpen]       = useState(false)
  const [sent, setSent]       = useState(false)
  const [pending, setPending] = useState(false)
  const formRef               = useRef<HTMLFormElement>(null)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setPending(true)
    await new Promise(r => setTimeout(r, 600))
    setSent(true)
    setPending(false)
  }

  function close() {
    setOpen(false)
    setTimeout(() => setSent(false), 300)
  }

  return (
    <>
      <Button size={size} onClick={() => setOpen(true)}>
        {label}
      </Button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center">
          <div
            aria-hidden
            className="absolute inset-0 bg-background/70 backdrop-blur-sm"
            onClick={close}
          />

          <div className="relative z-10 w-full max-w-md rounded-t-2xl bg-background border border-border p-8 shadow-2xl sm:rounded-2xl">
            <button
              type="button"
              onClick={close}
              aria-label="Close"
              className="absolute right-5 top-5 text-muted-foreground transition hover:text-foreground"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M2 2l12 12M14 2L2 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </button>

            {!sent ? (
              <>
                <h2 className="text-xl font-semibold text-foreground">Get in touch</h2>
                <p className="mt-1.5 text-sm text-muted-foreground">
                  Tell us about your setup — we reply within 24 hours.
                </p>

                <form ref={formRef} onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Field label="Name"  name="name"  required placeholder="Ivan" />
                    <Field label="Email" name="email" type="email" required placeholder="ivan@casino.com" />
                  </div>
                  <Field label="Company" name="company" placeholder="Casino XYZ" />
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                      Your setup{" "}
                      <span className="font-normal normal-case tracking-normal opacity-50">(optional)</span>
                    </label>
                    <textarea
                      name="message"
                      rows={3}
                      placeholder="Which Promo Engine, how many brands, current bonus volume..."
                      className="w-full resize-none rounded-lg border border-border bg-background px-3.5 py-2.5 text-sm text-foreground outline-none transition placeholder:text-muted-foreground/40 focus:border-foreground/30"
                    />
                  </div>

                  <Button type="submit" disabled={pending} className="mt-1 w-full">
                    {pending ? "Sending…" : "Send message"}
                  </Button>
                </form>
              </>
            ) : (
              <div className="py-6 text-center">
                <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-surface-1">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path
                      d="M4 10l4.5 4.5L16 6"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <h2 className="mt-4 text-lg font-semibold text-foreground">We'll be in touch</h2>
                <p className="mt-2 text-sm text-muted-foreground">Usually within 24 hours.</p>
                <button
                  type="button"
                  onClick={close}
                  className="mt-6 text-sm text-muted-foreground transition hover:text-foreground"
                >
                  Close
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  )
}

function Field({
  label, name, type = "text", required, placeholder,
}: {
  label: string; name: string; type?: string; required?: boolean; placeholder?: string
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
        {label}{required && <span className="ml-0.5 text-foreground">*</span>}
      </label>
      <input
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        className="rounded-lg border border-border bg-background px-3.5 py-2.5 text-sm text-foreground outline-none transition placeholder:text-muted-foreground/40 focus:border-foreground/30"
      />
    </div>
  )
}
