import { NUMBER, STRING } from "../constans"

export function validateStepIncrement(teamName: string, steps: number): boolean {
    return typeof teamName === STRING && teamName.length > 0 && typeof steps === NUMBER && steps > 0
}

export function validateName(name: string): boolean {
    return typeof name === STRING && name.trim().length > 0
}