import waitlistWatermelon from '../models/waitlist.model.js';

class waitlistWatermelonController{


    static async checkWaitlistWatermelon(req, res) { 
        try {
            const checkUser = await waitlistWatermelon.checkWaitlistWatermelon(req.authKey.id);
            res.status(200).json({
                status: 'success',
                message: 'You have successfully checked the waitlist watermelon',
                data: checkUser
            });
        } catch (error) {
            res.status(500).json({
                status: 'error',
                message: 'Internal server error'
            });
        }
    }
    static async getWaitlistWatermelon(req, res){
        try {
            const status = await waitlistWatermelon.getWaitlistWatermelon();
            res.status(200).json({
                status: 'success',
                message: 'You have successfully fetched the waitlist watermelon',
                data: status
            });
        } catch (error) {
            res.status(500).json({
                status: 'error',
                message: 'Internal server error'
            });
        }
    }

    static async addWaitlistWatermelon(req, res){
        try {
            const checkUser = await waitlistWatermelon.checkWaitlistWatermelon(req.authKey.id);
            if (checkUser) {
                return res.status(400).json({
                    status: 'error',
                    message: 'You are already in the waitlist watermelon'
                });
            }
            const joinWaitlist = await waitlistWatermelon.joinWaitlistWatermelon(req.authKey.id);
            if(!joinWaitlist){
                return res.status(400).json({
                    status: 'error',
                    message: 'Failed to join the waitlist watermelon'
                });
            }
            res.status(201).json({
                status: 'success',
                message: 'You have successfully added to the waitlist watermelon'
            });
        } catch (error) {
            res.status(500).json({
                status: 'error',
                message: 'Internal server error'
            });
        }
    }
}

export default waitlistWatermelonController;