const uploadToIpfs = async (file: any) => {
    const formData = new FormData();
    formData.append('file', file);
    console.log(formData)
    return fetch('https://ipfs.infura.io:5001/api/v0/add', {
        method: "POST",
        body: formData
    }).then((response: any) => {
        if(response.ok) {
            return response.json()
        }
    });
}

export default uploadToIpfs;