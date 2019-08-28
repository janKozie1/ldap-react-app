export let createCSVTable = data => {
    let createDataRow = args => {
        return args.map(e => (e ? `"${e}"` : '')).join(';') + '\n'
    }
    let getUserString = user => {
        return user ? `${user.description} - ${user.cn}` : ''
    }
    return data
        .filter(e => e.check)
        .reduce((prev, { path, members, owners }) => {
            let longer = owners.length >= members.length ? owners : members
            return prev.concat(
                longer
                    .map((e, i) => {
                        return createDataRow([
                            !i ? path : '',
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
