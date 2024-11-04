import { IncomingMessage, ServerResponse } from 'http'
import { Team } from '../models/Team'
import { validateStepIncrement, validateName } from '../utils/Validator'
import { CONTENT_TYPE, SERVER_ERROR } from '../constans'


export class TeamController {
    static createTeam(req: IncomingMessage, res: ServerResponse): void {
        let body = ''
        req.on('data', chunk => {
            body += chunk
        })

        req.on('end', () => {
            try {
                const { teamName } = JSON.parse(body)
                if(!validateName(teamName)){
                    res.writeHead(400, { 'Content-Type': CONTENT_TYPE })
                    res.end(JSON.stringify({ messeage: 'Invalid team name' }))
                    return
                }

                if(!Team.createTeam(teamName)){
                    res.writeHead(409, { 'Content-Type': CONTENT_TYPE })
                    res.end(JSON.stringify({ messeage: `Team ${teamName} already exist` }))
                }
                res.writeHead(201, { 'Content-Type': CONTENT_TYPE })
                res.end(JSON.stringify({ messeage: `Team ${teamName} created succesfully` }))
            } catch (err){
                res.writeHead(500, { 'Content-Type': CONTENT_TYPE })
                res.end(JSON.stringify({ messeage: 'Server error' }))
            }
        })
    }

    static deleteTeam (req: IncomingMessage, res: ServerResponse): void {
        const teamName = new URL(req.url || '', `http://${req.headers.host}`).searchParams.get('teamName')

        if(!teamName){
            res.writeHead(400, { 'Content-Type': CONTENT_TYPE })
            res.end( JSON.stringify({ message: 'teamName is required'}))
            return
        }

        if(!Team.deleteTeam(teamName)){
            res.writeHead(404, { 'Content-Type': CONTENT_TYPE })
            res.end(JSON.stringify({ message: `Team ${teamName} does not exist` }))
        } else {
            res.writeHead(200, { 'Content-Type': CONTENT_TYPE })
            res.end(JSON.stringify({ message: `Team ${teamName} deleted succesfully` }))
        }
    }

    static addMember(req: IncomingMessage, res: ServerResponse): void {
        let body = ''
        req.on('data', chunk => {
            body += chunk
        })

        req.on('end', () => {
            try {
                const { teamName, memberName } = JSON.parse(body)

                if(!validateName(teamName) || !validateName(memberName)){
                    res.writeHead(400, { 'Content-Type': CONTENT_TYPE })
                    res.end(JSON.stringify({ messeage: 'Invalid team or member name' }))
                    return
                }

                if(!Team.addMember(teamName, memberName)){
                    res.writeHead(409, { 'Content-Type': CONTENT_TYPE })
                    res.end(JSON.stringify({ messeage: `Member ${memberName} already exists in team ${teamName}` }))
                }
                res.writeHead(201, { 'Content-Type': CONTENT_TYPE })
                res.end(JSON.stringify({ messeage: `Member ${memberName} added to team ${teamName}` }))
            } catch (err){
                res.writeHead(500, { 'Content-Type': CONTENT_TYPE })
                res.end(JSON.stringify({ messeage: 'Server error' }))
            }
        })
    }

    static deleteMember (req: IncomingMessage, res: ServerResponse): void {
        const teamName = new URL(req.url || '', `http://${req.headers.host}`).searchParams.get('teamName')
        const memberName = new URL(req.url || '', `http://${req.headers.host}`).searchParams.get('memberName')

        if(!teamName || !memberName){
            res.writeHead(400, { 'Content-Type': CONTENT_TYPE })
            res.end(JSON.stringify({ messeage: 'teamName and memberName are required' }))
            return
        }

        if(!Team.deleteMember(teamName, memberName)){
            res.writeHead(404, { 'Content-Type': CONTENT_TYPE })
            res.end( JSON.stringify({ message: `Member ${memberName} does not exist in team ${teamName} or team does not exist` }))
            return
        } else {
            res.writeHead(200, { 'Content-Type': CONTENT_TYPE })
            res.end(JSON.stringify({ message: `Member ${memberName} deleted from team ${teamName}` }))
        }
    }

    static listTeamMembers (req: IncomingMessage, res: ServerResponse): void {
        const teamName = new URL(req.url || '', `http://${req.headers.host}`).searchParams.get('teamName')

        if(!teamName){
            res.writeHead(400, { 'Content-Type': CONTENT_TYPE })
            res.end( JSON.stringify({ message: 'teamName is required' }))
            return
        }

        const members = Team.getTeamMembers(teamName)
        if(members === null){
            res.writeHead(404, { 'Content-Type': CONTENT_TYPE })
            res.end( JSON.stringify({ message: `Team ${teamName} does not exist or has no member` }))
            return
        } else {
            res.writeHead(200, { 'Content-Type': CONTENT_TYPE })
            res.end(JSON.stringify({ teamName, members }))
        }
    }

    static addSteps (req: IncomingMessage, res: ServerResponse): void {
        let body = ''
        req.on('data', chunk => {
            body += chunk
        })

        req.on('end', () => {
            try {
                const { teamName, memberName, steps } = JSON.parse(body)

                if(!validateStepIncrement(teamName, steps) || !validateName(memberName)){
                    res.writeHead(400, { 'Content-Type': CONTENT_TYPE })
                    res.end( JSON.stringify({ message: 'Invalid input'}))
                    return
                }

                if(Team.getTotalSteps(teamName) === null){
                    res.writeHead(404, { 'Content-Type': CONTENT_TYPE })
                    res.end( JSON.stringify({ message: `Team ${teamName} does not exist` }))
                    return
                }

                Team.addMember(teamName, memberName)
                Team.addSteps(teamName, memberName, steps)
                
                res.writeHead(200, { 'Content-Type': CONTENT_TYPE })
                res.end(JSON.stringify({ message: `Added ${steps} steps to ${memberName} in ${teamName}`, totalSteps: Team.getTotalSteps(teamName) }))
            } catch (err) {
                res.writeHead(500, { 'Content-Type': CONTENT_TYPE })
                res.end(JSON.stringify({ message: SERVER_ERROR }))
            }
        })
    }

    static listTeams(req: IncomingMessage, res: ServerResponse): void {
        try {
            const teams = Team.getAllTeams()
            res.writeHead(200, { 'Content-Type': CONTENT_TYPE })
            res.end(JSON.stringify({ teams }))
        } catch (err){
            res.writeHead(500, { 'Content-Type': CONTENT_TYPE })
            res.end(JSON.stringify({ message: SERVER_ERROR }))
        }
    }

    static getTotalSteps(req: IncomingMessage, res: ServerResponse): void {
        const teamName = new URL(req.url || '', `http://${req.headers.host}`).searchParams.get('teamName')

        if(!teamName){
            res.writeHead(400, { 'Content-Type': CONTENT_TYPE })
            res.end(JSON.stringify({ message: 'teamName is required' }))
            return
        }

        const totalSteps = Team.getTotalSteps(teamName)
        if(totalSteps === null){
            res.writeHead(404, { 'Content-Type': CONTENT_TYPE })
            res.end(JSON.stringify({ message: `Team ${teamName} does not exist` }))
        } else {
            res.writeHead(200, { 'Content-Type': CONTENT_TYPE })
            res.end(JSON.stringify({ teamName, totalSteps }))
        }
    }
}