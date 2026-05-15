/* "€" + narrow no-break space + amount. Thousands separator (also U+202F) only
   when the integer has 5+ digits: "€ 1500", "€ 4600", but "€ 13 000". The space
   is U+202F so the digits never wrap away from the symbol. Shared by every
   locale (currency formatting stays the same regardless of UI language). */
const NS = " "

function grp(n: number): string {
  return n < 10000 ? String(n) : String(n).replace(/\B(?=(\d{3})+(?!\d))/g, NS)
}

export function eur(value: string | number, suffix = ""): string {
  const body = typeof value === "number" ? grp(value) : value
  return `€${NS}${body}${suffix}`
}
