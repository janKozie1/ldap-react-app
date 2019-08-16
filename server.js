
let ActiveDirectory = require('activedirectory')
let express = require('express')
let cors = require('cors')
let app = express();
let { config } = require('./config')
const sql = require('mssql')

app.use(cors({ origin: '*' }))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

let ad = new ActiveDirectory(config.AD);

let parsePolish = (string) => {
    let pl  = new Map([['ą','a'],['ę','e'],['ć','c'],['ń','n'],['ż','z'],['ź','z'],['ó','o'],['ó','o',],['ś','s'],['ł','l']]);
    return string.split("").map(e=>pl.get(e) || e).join("")
}

let getFolderInfoFromDB = async (pool, query, type) => {
    let response = [];
    let baseQuery = 'select ID, Grupa, Description  from dbo.Klucze where' 
    if (type === "id"){
        response = await pool.request()
            .input('userID',sql.NVarChar(255),query)
            .query(`${baseQuery} [User ID] = @userID`)
    }else if(type="fullName"){
        response = await pool.request()
            .input('name',sql.NVarChar(255),
                parsePolish(query))
            .input('reversedName',sql.NVarChar(255),
                parsePolish(query.split(" ").reverse().join(" ")))
            .query(`${baseQuery} dbo.parse(Name) LIKE @name or  dbo.parse(Name) LIKE @reversedName`)
    }
    return response.recordset.length ? 
                response.recordset.map(({ Grupa, Description, ID }) => {
                    return {
                        group: Grupa,
                        groupType: determineGroupType(Grupa),
                        path: Description,
                        ID,
                        members: []
                    }
                }).filter(e => e.group && e.path) 
                : 
                []
}

let determineGroupType = (name) => {
    let unparsed = name.split("_");
    if (unparsed[unparsed.length - 1] === 'C' || unparsed[unparsed.length - 1] === 'R') {
        return unparsed[unparsed.length - 1];
    }
    return '';
}

let getGroupOwnersFromDB = async(pool,group, path) => {
    let response = [];
    response = await pool.request()
            .input('group',sql.NVarChar(255),group)
            .input('path',sql.NVarChar(255),path)
            .query('select Name, [User ID] as cn, Access from dbo.Klucze where Grupa=@group AND Description=@path');
    return response.recordset.length ? 
                response.recordset.map(({ Name, cn, Access }) => {
                    return {
                        description: Name,
                        cn,
                        Access
                    }
                }).filter(e => e.cn && e.description) 
                : 
                []  
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
    try {
        let temp = Date.now();
        let pool = await sql.connect(config.DB)
        let folderInfo = await getFolderInfoFromDB(pool, req.body.query, req.body.type);
        let results = folderInfo.map(async (e) => {
            let members = await getGroupMemembers(e.group);
            let owners = await getGroupOwnersFromDB(pool,e.group, e.path);
            return {
                ...e,
                members,
                owners,
                ownersCount: owners.length,
                membersCount: members.length
            }
        })
        Promise.all(results).then((data) => {
            sql.close();
            console.log('response', (Date.now() - temp) / 1000)
            return res.json(data)
        })
    } catch (err) {
        console.log(err)
    }
})


app.listen('8080', async () => {
    console.log('start')

})
