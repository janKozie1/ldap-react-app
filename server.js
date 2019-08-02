
let ActiveDirectory = require('activedirectory')
let express = require('express')
let cors = require('cors')
let app = express();
let {config} = require('./config')
const sql = require("msnodesqlv8");

app.use(cors({ origin: '*' }))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const connectionString = `server=localhost\\SQLEXPRESS;Database=test;Trusted_Connection=yes;Driver={SQL Server Native Client 11.0}`;

let ad = new ActiveDirectory(config);



let getFolderPaths = (userID)  => {
    return new Promise((resolve,reject)=>{
        sql.query(connectionString, `select Grupa from dbo.Klucze where [User ID]='${userID}'`, (err, rows) => {
            if(!err){
                let uniques = [
                    ...new Set(
                        rows.map(e=>e.Grupa)
                            .filter(e=>e))
                ].map(e=>{
                    return {
                        group: e
                    }
                })
                resolve(uniques);
            }
            resolve(null);
        })

    })
}

let getGroupMemembers = (group) => {
   
    ad.getUsersForGroup(group,(err,res)=>{
        console.log('query: ' + group)
        res ? res.map(e=>{
            console.log(e.description);
        }) : null;

        console.log("--------------------------")
    })
} 

app.post('/getUserData', async(req, res) => {
    let result = await getFolderPaths(req.body.query);
    
    result.map(e=>{
       getGroupMemembers(e.group)
    })
    // let queryToAD;
    // console.log(req.body.query,req.body.type)
    // if (req.body.type === 'id') {
    //     queryToAD = `cn=${req.body.query}`
    // } else if (req.body.type === 'fullName') {
    // let fullName = req.body.query.split(" ")
    //     queryToAD = `(&(sn=${fullName[1]})(givenName=${fullName[0]}))`
    // }
    // ad.find(queryToAD, function (err, results) {
    //     if(results && results.users){
    //         results.users.map(e=>{
    //             console.log(e)
    //         })
    //     }
    // });
})


app.listen('8080', () => {
    console.log('started at 8080')
})





    




// ad.getUsersForGroup('PLKLCorpSAP_R', function(err, user) {
//     if (err) {
//       console.log('ERROR: ' +JSON.stringify(err,null, 2));
//       return;
//     }

//     if (! user) console.log('User:  not found.');
//     else console.log(JSON.stringify(user,null, 2));
// });
// ad.findUser('in99037', function(err, groups) {
//     if (err) {
//       console.log('ERROR: ' +JSON.stringify(err));
//       return;
//     }

//     if (! groups) console.log('User:  not found.');
//     else console.log(JSON.stringify(groups,null,2));
//   });
// ad.find('(&(sn=*Kozieł*)(givenName=*Jan*))', function(err, results) {
//     console.log(results)
//   });    
