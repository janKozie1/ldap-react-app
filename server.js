
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

let getFolderInfo = (queryCondition) => {
    return new Promise((resolve, reject) => {
        sql.query(connectionString, `select ID, Grupa, Description from dbo.Klucze where ${queryCondition}`, (err, rows) => {
            if (!err) {
                let uniques = 
                            rows.map(({ Grupa, Description, ID }) => {
                                return {
                                    group: Grupa,
                                    groupType: determineGroupType(Grupa),
                                    path: Description,
                                    ID,
                                    members: []
                                }
                            })
                            .filter(e => e.group && e.path)  //removes the empty ones
                resolve(uniques);
            }
            resolve(null);
        })

    })
}

let determineGroupType = (name) => {
    let unparsed = name.split("_");
    if (unparsed[unparsed.length - 1] === 'C' || unparsed[unparsed.length - 1] === 'R') {
        return unparsed[unparsed.length - 1];
    }
    return '';
}

let getGroupOwners = (group,path) => {
    return new Promise((resolve, reject) => {
        sql.query(connectionString, `select Name, [User ID] as cn, Access from dbo.Klucze where Grupa='${group}' AND Description='${path}'`, (err, rows) => {
            // console.log("----------")
            // console.log(group,path)
            // console.log(rows)
            // console.log("----------")
            if (!err) {
                let uniques = 
                    rows.map(({ Name, cn, Access }) => {
                        return {
                            description: Name,
                            cn,
                            Access
                        }
                    })
                    .filter(e => e.cn && e.description)  //removes the empty ones
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

let getQueryCondition = (query, type) => {
    switch (type) {
        default:
        case 'id':
            return `UPPER([User ID])=UPPER('${query}')`
        case 'fullName':
            return `UPPER(Name)=UPPER('${query}') OR UPPER(Name) LIKE '${query.split(" ")[1]} ${query.split(" ")[0]}'`

    }
}

app.post('/getUserData', async (req, res) => {
    let temp = Date.now();
    console.log("request")
    let folderInfo = await getFolderInfo(getQueryCondition(req.body.query, req.body.type));
    let results = folderInfo.map(async (e) => {
        let members = await getGroupMemembers(e.group);
        let owners = await getGroupOwners(e.group,e.path);
        return {
            ...e,
            members,
            owners,
            ownersCount:owners.length,
            membersCount: members.length
        }
    })
    Promise.all(results).then((data) => {
        console.log('response', (Date.now() - temp) / 1000)
        return res.json(data)
    })

})


app.listen('8080', () => {
    console.log('started at 8080')
})
