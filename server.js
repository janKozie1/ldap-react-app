
let ActiveDirectory = require('activedirectory')
let express = require('express')
let cors = require('cors')
let app = express();
let { config } = require('./config')
const sql = require("msnodesqlv8");

app.use(cors({ origin: '*' }))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const connectionString = `server=localhost\\SQLEXPRESS;Database=test;Trusted_Connection=yes;Driver={SQL Server Native Client 11.0}`;

let ad = new ActiveDirectory(config);



let getFolderInfo = (userID) => {
    return new Promise((resolve, reject) => {
        sql.query(connectionString, `select Grupa, Description from dbo.Klucze where UPPER([User ID])=UPPER('${userID}')`, (err, rows) => {
            if (!err) {
                let uniques = [
                    ...new Set(
                        rows.map(e => {
                            return {
                                group: e.Grupa,
                                path: e.Description
                            }
                        })
                            .filter(e => e.group && e.path))  //removes the empty ones
                ]
                resolve(uniques);
            }
            resolve(null);
        })

    })
}

let getGroupMemembers = (group) => {
    return new Promise((resolve, reject) => {
        ad.getUsersForGroup(group, (err, res) => {
            let parsed = res ? res.map(({ cn, displayName, description }) => {
                return {
                    cn,
                    displayName,
                    description
                }
            }) : [];
            resolve(parsed);
        })

    })

}
let parseFolderData = (data) =>{

}
app.post('/getUserData', async (req, res) => {
    let folderInfo = await getFolderInfo(req.body.query);
    let results = folderInfo.map(async(e) => {
        let members = await getGroupMemembers(e.group);
        return {
            ...e,
            members
        }
    })
   Promise.all(results).then((data)=>res.json(data))
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
