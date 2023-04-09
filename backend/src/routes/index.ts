import { Router, Request, Response } from 'express'

const router = Router();

router.get('/api', (req : Request, res : Response) => {
    try {
        throw new Error('test')
        res.status(200).json({message: 'First api'})
    } catch (e: any) {
        res.status(400).json({error: e.message})
    }
})

module.exports = router;
