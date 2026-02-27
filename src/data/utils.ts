type EasternDateParts = {
  year: number
  month: number
  day: number
  hour: number
  minute: number
}

const EASTERN_FORMATTER = new Intl.DateTimeFormat('en-US', {
  timeZone: 'America/New_York',
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
  hour: '2-digit',
  minute: '2-digit',
  hourCycle: 'h23',
})

function getEasternParts(utcMs: number): EasternDateParts {
  const parts = EASTERN_FORMATTER.formatToParts(new Date(utcMs))
  let year: number | undefined
  let month: number | undefined
  let day: number | undefined
  let hour: number | undefined
  let minute: number | undefined

  for (const part of parts) {
    if (part.type === 'year') year = Number(part.value)
    if (part.type === 'month') month = Number(part.value)
    if (part.type === 'day') day = Number(part.value)
    if (part.type === 'hour') hour = Number(part.value)
    if (part.type === 'minute') minute = Number(part.value)
  }

  if (
    year === undefined ||
    month === undefined ||
    day === undefined ||
    hour === undefined ||
    minute === undefined
  ) {
    throw new Error('Failed to parse Eastern date parts')
  }

  return { year, month, day, hour, minute }
}

function getEasternOffsetMinutes(utcMs: number): number {
  const p = getEasternParts(utcMs)
  const easternAsUtcMs = Date.UTC(p.year, p.month - 1, p.day, p.hour, p.minute)
  return (easternAsUtcMs - utcMs) / (60 * 1000)
}

function easternLocalToDate(
  year: number,
  month: number,
  day: number,
  hour: number,
  minute: number,
): Date {
  const localMsAsUtc = Date.UTC(year, month - 1, day, hour, minute)
  let utcMs = localMsAsUtc

  for (let i = 0; i < 4; i += 1) {
    const offsetMinutes = getEasternOffsetMinutes(utcMs)
    const nextUtcMs = localMsAsUtc - offsetMinutes * 60 * 1000
    if (nextUtcMs === utcMs) break
    utcMs = nextUtcMs
  }

  return new Date(utcMs)
}

function parseEtTime(timeEt: string): { hour: number; minute: number } {
  const normalized = timeEt.trim().toLowerCase()
  const match = normalized.match(/^(\d{1,2}):(\d{2})\s*([ap]m)$/)

  if (!match) {
    throw new Error(`Invalid timeEt: ${timeEt}. Expected format like 9:30pm`)
  }

  const hour12 = Number(match[1])
  const minute = Number(match[2])
  const meridiem = match[3]

  if (hour12 < 1 || hour12 > 12 || minute < 0 || minute > 59) {
    throw new Error(`Invalid timeEt: ${timeEt}`)
  }

  let hour = hour12 % 12
  if (meridiem === 'pm') hour += 12

  return { hour, minute }
}

export function easternDateTimeToDate(dateEt: string, timeEt: string): Date {
  const match = dateEt.match(/^(\d{4})-(\d{2})-(\d{2})$/)

  if (!match) {
    throw new Error(`Invalid dateEt: ${dateEt}. Expected format YYYY-MM-DD`)
  }

  const year = Number(match[1])
  const month = Number(match[2])
  const day = Number(match[3])
  const { hour, minute } = parseEtTime(timeEt)

  return easternLocalToDate(year, month, day, hour, minute)
}
