export let createCSVTable = data => {
    let createDataRow = args => {
        return args.map(e => (e ? `"${e}"` : '')).join(';') + '\n'
    }
    let getUserString = user => {
        return user
            ? `${user.userFullName || user.description} - ${user.user_ID ||
                  user.cn}`
            : ''
    }
    console.log(data)
    return data
        .filter(e => e.check)
        .reduce((prev, { folderPath, members, owners }) => {
            let longer = owners.length >= members.length ? owners : members
            return prev.concat(
                longer
                    .map((e, i) => {
                        return createDataRow([
                            !i ? folderPath : '',
                            getUserString(owners[i]),
                            getUserString(members[i])
                        ])
                    })
                    .join(''),
                '"";"";""\n'
            )
        }, '\uFEFFSciezka;Wlasciciele;Czlonkowie\n')
}

export let downloadObject = blob => {
    let csvURL = window.URL.createObjectURL(blob)
    let tempLink = document.createElement('a')
    tempLink.href = csvURL
    tempLink.setAttribute('download', 'eksport.csv')
    tempLink.click()
}
