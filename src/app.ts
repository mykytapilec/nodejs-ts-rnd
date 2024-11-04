import http from 'http'
import { teamRoutes } from './routes/teamRoutes'
import { CONTENT_TYPE, PORT } from './constans'

const server = http.createServer((req, res) => {
    if(req.url?.startsWith('/team')){
        teamRoutes(req, res)
    } else {
        res.writeHead(404, { 'Content-Type': CONTENT_TYPE })
        res.end(JSON.stringify({ message: 'Not found'}))
    }
})

server.listen(PORT, () => {
    console.log(`starting on port ${PORT}`)
})