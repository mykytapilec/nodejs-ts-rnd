export interface MemberData {
    name: string
    steps: number
}

export interface TeamData {
    name: string
    steps: number
    members: Map<string, MemberData>
}