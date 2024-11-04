import { MemberData, TeamData } from "../types"


export class Team {
    private static teams: Map<string, TeamData> = new Map()

    static createTeam(teamName: string): boolean {
        if(Team.teams.has(teamName)){
            return false
        }
        Team.teams.set(teamName, { name: teamName, steps: 0, members: new Map() })
        return true
    }

    static deleteTeam(teamName: string): boolean {
        return Team.teams.delete(teamName)
    }

    static addMember(teamName: string, memberName: string): boolean {
        const team = Team.teams.get(teamName)
        if(team && !team.members.has(memberName)){
            team.members.set(memberName, { name: memberName, steps: 0 })
            return true
        }
        return false
    }

    static deleteMember(teamName: string, memberName: string): boolean {
        const team = Team.teams.get(teamName)
        if(team && team.members.has(memberName)){
            const memberSteps = team.members.get(memberName)?.steps || 0
            team.steps -= memberSteps
            team.members.delete(memberName)
            return true
        }
        return false
    }

    static getTeamMembers(teamName: string): MemberData[] | null {
        const team = Team.teams.get(teamName)
        if(team){
            return Array.from(team.members.values())
        }
        return null
    }

    static addSteps(teamName: string, memberName: string, steps: number): void {
        const team = Team.teams.get(teamName)
        const member = team?.members.get(memberName)
        if(team && member){
            member.steps += steps
            team.steps += steps
        }
    }

    static getTotalSteps(teamName: string): number | null {
        return Team.teams.get(teamName)?.steps ?? null
    }

    static getAllTeams(): TeamData[] {
        return Array.from(Team.teams.values()).map(({ name, steps, members }) => ({ name, steps, members }))
    }
}