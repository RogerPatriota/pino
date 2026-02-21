import { pgSequence } from "drizzle-orm/pg-core";

export function osSequence(assistenciaId: string) {
    const osSequence = pgSequence(`os_sequence_${assistenciaId}`)
    return osSequence
}
