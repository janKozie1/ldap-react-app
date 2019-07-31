
var ActiveDirectory = require('activedirectory');
var config = { url: 'ldap://velvetcare.pl',
               baseDN: 'dc=velvetcare,dc=pl',
               username: 'in99037@velvetcare.pl',
               password: 'Lato,2019a' }
var ad = new ActiveDirectory(config);

ad.getUsersForGroup('PLKLCorpSAP_R', function(err, user) {
    if (err) {
      console.log('ERROR: ' +JSON.stringify(err,null, 2));
      return;
    }
  
    if (! user) console.log('User:  not found.');
    else console.log(JSON.stringify(user,null, 2));
  });