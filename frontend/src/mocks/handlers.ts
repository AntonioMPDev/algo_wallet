import { rest } from "msw"

export const handlers = [
    rest.get(`${process.env.REACT_APP_API_DOMAIN}/api/transactions/user/62ca11a2d40190a289bdaa20`, (rq, res, ctx)=>{
        return res(
            ctx.status(200),
            ctx.json([
                {
                    "_id": "62ca10c3d40190a289bdaa10",
                    "user": "62c95160682af7e65c62c3d2",
                    "txId": "MRGPNM75JXDM7XXCRVPVJGD5Y5U6SBHSG7DHZTGEV35W2JAI545A",
                    "amount": "10000",
                    "createdAt": "2022-07-09T23:35:31.659Z",
                    "updatedAt": "2022-07-09T23:35:31.659Z"
                },
                {
                    "_id": "62cb0c14ad459efe8b2e5127",
                    "user": "62c95160682af7e65c62c3d2",
                    "txId": "MRGPNM75JXDM7XXCRVPVJGD5Y5U6SBHSG7DHZTGEV35W2JAI545A",
                    "amount": "10000",
                    "createdAt": "2022-07-09T23:35:31.659Z",
                    "updatedAt": "2022-07-09T23:35:31.659Z"
                }
            ])
        )
    })
]