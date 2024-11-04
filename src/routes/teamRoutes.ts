import { IncomingMessage, ServerResponse } from 'http'
import { TeamController } from '../controllers/TeamController'
import { CONTENT_TYPE, NOT_FOUND } from '../constans'

export function teamRoutes(req: IncomingMessage, res: ServerResponse): void {
    if(req.method === 'POST' && req.url === '/team/create'){
        TeamController.createTeam(req, res)
    } else if (req.method === 'POST' && req.url === '/team/addMember'){
        TeamController.addMember(req, res)
    } else if (req.method === 'DELETE' && req.url?.startsWith('/team/deleteMember')){
        TeamController.deleteMember(req, res)
    } else if (req.method === 'DELETE' && req.url?.startsWith('/team/delete')){
        TeamController.deleteTeam(req, res)
    } else if (req.method === 'POST' && req.url === '/team/addSteps'){
        TeamController.addSteps(req, res)
    } else if (req.method === 'GET' && req.url?.startsWith('/team/totalSteps')){
        TeamController.getTotalSteps(req, res)
    } else if (req.method === 'GET' && req.url === '/team/list'){
        TeamController.listTeams(req, res)
    } else if (req.method === 'GET' && req.url?.startsWith('/team/members')){
        TeamController.listTeamMembers(req, res)
    } else {
        res.writeHead(404, { 'Content-Type': CONTENT_TYPE })
        res.end( JSON.stringify({ message: NOT_FOUND }))
    }
}