import express from 'express'
import axios from 'axios'
import Contributor from './types/ContributorType'

const app = express();
const PORT = process.env.PORT||3000;

const getHTML = (list: Contributor[]): string => {
    return `<div style="display:flex; gap:10px;justify-content:center;">`+list.map(item => (
        `<a href=${item.html_url}>
            <img style="display:block;border-radius:50%;"  height=100 src=${item.avatar_url} alt=${item.login} title=${item.login} />
        </a>`
    )).join(" ")+"</div>"
}

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
    
    res.send(getHTML(data));
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
