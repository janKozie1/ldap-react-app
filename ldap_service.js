var Service = require('node-windows').Service
var path = require('path')
process.chdir(__dirname)

// Create a new service object
var svc

switch (process.argv[2]) {
    case '--add':
        console.log()
        svc = new Service({
            name: 'Ldap browser server',
            description: 'Server for browsing ldap records',
            script: path.join(__dirname, 'backend/server.js'),
            nodeOptions: ['--harmony', '--max_old_space_size=4096']
        })
        if (svc.exists) {
            console.log(
                'This service is already installed and should be running automatically'
            )
            console.log("If it's not running properly, check services.msc\n")
            break
        } else {
            svc.install()
            svc.on('install', function() {
                svc.start()
                console.log(
                    'The service has been installed successfully and should launch automatically\n'
                )
            })
            break
        }
    case '--remove':
        svc = new Service({
            name: 'Ldap browser server',
            script: path.join(__dirname, 'backend/server.js')
        })
        if (svc.exists) {
            svc.uninstall()
            svc.on('uninstall', function() {
                console.log('This service has been removed successfully.\n')
            })
            break
        } else {
            console.log('This service has already been uninstalled')
            console.log("If it's still running, check services.msc\n")
            break
        }

    default:
        svc = new Service({
            name: 'Ldap browser server',
            script: path.join(__dirname, 'backend/server.js')
        })
        console.log(
            'usage: node pres_service.js --add     //installs the service'
        )
        console.log(
            '       node pres_service.js --remove      //removes the service'
        )
        console.log(
            `\nService status: ${svc.exists ? 'installed' : 'not installed'}\n`
        )
        break
}
