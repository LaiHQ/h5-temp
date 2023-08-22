import request from "@/utils/request"

export function login(data) {
    return request({
        url: "/login11",
        method: "post",
        loading: true,
        loadingText: "正在登录...",
        data
    })
}

/**
 * @description: 获取用户信息
 */
export function getUserInfo() {
    return request({
        url: "/getUserInfo",
        method: "get"
        // successMessage: true,

        // cacheFlag: "cache",
        // maxAge: 5000,
        // forceUpdate: true,
        // retryTimes: 1,
        // retryDelay: 3000
    })
}

/**
 * @description: 导出
 */
export function exportFile(params: object, fileName: string) {
    request({
        url: "/export",
        method: "get",
        responseType: "arraybuffer",
        params
    }).then((blob) => {
        const url = window.URL.createObjectURL(
            new Blob([blob], {
                type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
            })
        )
        const link = document.createElement("a")
        link.style.display = "none"
        link.href = url
        link.setAttribute("download", fileName ? `${fileName}.xlsx` : "excel.xlsx")
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
    })
}
