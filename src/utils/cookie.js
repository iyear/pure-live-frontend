function getCookie(cookieName) {
    const strCookie = document.cookie
    const cookieList = strCookie.split(';')

    for (let i = 0; i < cookieList.length; i++) {
        const arr = cookieList[i].trim().split('=')
        console.log(arr);
        if (cookieName === arr[0]) {
            console.log(arr[1]);
            return arr[1]
        }
    }
    return ''
}

export default getCookie
