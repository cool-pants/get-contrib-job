import express from 'express'
import axios from 'axios'
import Contributor from './types/ContributorType'

const app = express();
const PORT = process.env.PORT||3000;

type GetUsersResponse = {
    data: Contributor[];
};

app.get('/contributors/:owner/:repo', async (req:any,res:any) => {
    const url:string = ["https://api.github.com/repos",req.params.owner,req.params.repo,"contributors"].join("/")
    try{
    const {data, status} = await axios.get<Contributor[]>(
        url,
        {
            headers: {
                Accept: 'application/json',
            },
        },
    );

    if (!status)
    {
        res.send("Bad request!")
        return
    }               
    
    res.send(data.map(item => ({user: item.login, github:item.html_url, avatar:item.avatar_url})));
    } catch (error) {
        if (axios.isAxiosError(error)) {
            res.send(error.message);
          } else {
            res.send('An unexpected error occurred');
          }
    }
})

app.listen(PORT, () => {
    console.log('EXPRESS WITH TS');
    
})
