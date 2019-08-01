
let ActiveDirectory = require('activedirectory')
let express = require('express')
let cors = require('cors')
let app = express();

let config = {
    url: 'ldap://velvetcare.pl',
    baseDN: 'dc=velvetcare,dc=pl',
    username: 'n99037@velvetcare.pl',
    password: 'Lato,2019'
}

let ad = new ActiveDirectory(config);

app.use(cors({ origin: '*' }))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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

app.post('/getUserData', (req, res) => {
    let fullName = req.body.query.split(" ")
    console.log(req.body.query)
    let query;
    if (req.body.type === 'id') {
        query = `cn=${req.body.query}`
    } else if (req.body.type === 'fullName') {
        query = `(&(sn=*${fullName[1]}*)(givenName=*${fullName[0]}*))`
    }
    ad.find(query, function (err, results) {
        console.log(results)
    });
})


app.listen('8080', () => {
    console.log('started at 8080')
})
